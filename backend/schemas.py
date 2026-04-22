from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# --- User Schemas ---

class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str


# --- Restaurant Schemas ---

class RestaurantCreate(BaseModel):
    name: str
    is_open: bool = True


class RestaurantOut(BaseModel):
    id: int
    name: str
    is_open: bool

    model_config = {"from_attributes": True}


# --- Order Schemas ---

class OrderCreate(BaseModel):
    restaurant_id: int


class OrderOut(BaseModel):
    id: int
    restaurant_id: int
    user_id: int
    user_name: str
    status: str
    created_at: datetime
    restaurant: Optional[RestaurantOut] = None

    model_config = {"from_attributes": True}
