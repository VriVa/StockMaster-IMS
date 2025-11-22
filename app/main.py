from fastapi import FastAPI
from app.models.create_db import create_db_and_tables

app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    print("Startup complete.")


@app.get("/")
def read_root():
    return {"Hello": "World"}


# Include user manager routes
from app.routes import userManager

app.include_router(userManager.router)
