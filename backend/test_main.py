import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.main import app
from backend.database import Base, get_db
from backend.auth import get_password_hash

# Setup Test Database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_food_delivery.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_auth_flow(client):
    # Signup
    response = client.post("/auth/signup", json={"email": "test@example.com", "password": "password123"})
    assert response.status_code == 201
    assert response.json()["email"] == "test@example.com"

    # Login
    response = client.post("/auth/login", json={"email": "test@example.com", "password": "password123"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_order_trick_logic(client):
    # 1. Setup Data
    client.post("/auth/signup", json={"email": "user1@example.com", "password": "password123"})
    login_resp = client.post("/auth/login", json={"email": "user1@example.com", "password": "password123"})
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Open Restaurant
    open_resp = client.post("/restaurants/", json={"name": "Open Resto", "is_open": True}, headers=headers)
    open_id = open_resp.json()["id"]

    # Closed Restaurant
    closed_resp = client.post("/restaurants/", json={"name": "Closed Resto", "is_open": False}, headers=headers)
    closed_id = closed_resp.json()["id"]

    # 2. Test Logic 1: Reject order if restaurant closed
    response = client.post("/orders/", json={"restaurant_id": closed_id}, headers=headers)
    assert response.status_code == 400
    assert "closed" in response.json()["detail"].lower()

    # 3. Test Logic 2: Reject duplicate active orders
    # Place first valid order to Open Resto
    response = client.post("/orders/", json={"restaurant_id": open_id}, headers=headers)
    assert response.status_code == 201
    
    # Try placing second order to same restaurant
    response = client.post("/orders/", json={"restaurant_id": open_id}, headers=headers)
    assert response.status_code == 400
    assert "already have an active order" in response.json()["detail"].lower()
