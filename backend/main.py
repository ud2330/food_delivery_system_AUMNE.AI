from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .routes import auth, restaurants, orders

# Ensure tables are created (backup for Alembic)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Food Delivery System",
    description="A RESTful API for managing restaurants and food orders.",
    version="1.0.0",
    contact={"name": "Food Delivery Team"},
)

# CORS — allow the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # More permissive for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(restaurants.router)
app.include_router(orders.router)

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    import traceback
    print(f"CRITICAL ERROR: {str(exc)}")
    traceback.print_exc()
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal Server Error: {str(exc)}"},
    )

@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "Food Delivery API is running."}
