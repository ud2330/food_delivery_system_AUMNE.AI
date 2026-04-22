from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth import verify_password, get_password_hash, create_access_token
from ..database import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
def signup(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user account."""
    print(f"DEBUG: Attempting signup for email: {user_data.email}")
    existing = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing:
        print(f"DEBUG: Email {user_data.email} already exists")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered."
        )
    print("DEBUG: Hashing password...")
    try:
        hashed_pw = get_password_hash(user_data.password)
        print("DEBUG: Password hashed successfully")
        user = models.User(email=user_data.email, full_name=user_data.full_name, hashed_password=hashed_pw)
        db.add(user)
        db.commit()
        db.refresh(user)
        print(f"DEBUG: User {user.email} created successfully with ID {user.id}")
        return user
    except Exception as e:
        print(f"DEBUG: Error during signup: {str(e)}")
        raise e


@router.post("/login", response_model=schemas.Token)
def login(user_data: schemas.UserLogin, db: Session = Depends(get_db)):
    """Authenticate and receive a JWT access token."""
    user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
