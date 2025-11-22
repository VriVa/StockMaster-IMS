from fastapi import FastAPI, Depends
from sqlmodel import SQLModel, Session, create_engine
from app.settings import get_settings
from typing import Annotated

app = FastAPI()
settings = get_settings()

DATABASE_URL = settings.PG_DB
engine = create_engine(DATABASE_URL)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    print("Database and tables created.")


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
