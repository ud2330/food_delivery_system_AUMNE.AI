from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas
from ..database import get_db
from ..auth import get_current_user

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/", response_model=schemas.OrderOut, status_code=status.HTTP_201_CREATED)
def place_order(
    data: schemas.OrderCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Place a new order.

    Trick Logic:
    1. Reject if target restaurant is closed (is_open = False).
    2. Reject if user already has an active order at that restaurant (duplicate prevention).
    """
    # --- TRICK LOGIC 1: Check restaurant exists and is open ---
    restaurant = db.query(models.Restaurant).filter(
        models.Restaurant.id == data.restaurant_id
    ).first()

    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found."
        )

    if not restaurant.is_open:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot place an order. This restaurant is currently closed."
        )

    # --- TRICK LOGIC 2: Prevent duplicate active orders ---
    existing_order = db.query(models.Order).filter(
        models.Order.user_id == current_user.id,
        models.Order.restaurant_id == data.restaurant_id,
        models.Order.status == "active"
    ).first()

    if existing_order:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already have an active order at this restaurant."
        )

    order = models.Order(
        restaurant_id=data.restaurant_id,
        user_id=current_user.id,
        user_name=current_user.email,
        status="active"
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


@router.get("/", response_model=List[schemas.OrderOut])
def list_my_orders(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Retrieve all orders placed by the authenticated user."""
    return (
        db.query(models.Order)
        .filter(models.Order.user_id == current_user.id)
        .order_by(models.Order.created_at.desc())
        .all()
    )


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Cancel an existing order (only the owner can cancel)."""
    order = db.query(models.Order).filter(
        models.Order.id == order_id,
        models.Order.user_id == current_user.id
    ).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found or does not belong to you."
        )

    if order.status != "active":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only active orders can be cancelled."
        )

    order.status = "cancelled"
    db.commit()
