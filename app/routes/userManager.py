# user registration

from fastapi import APIRouter, HTTPException, Depends
from app.models.create_db import get_session

from app.models.schemas import User
from sqlmodel import Session, select
from typing import List

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=User)
def create_user(user: User, session: Session = Depends(get_session)):
    existing_user = session.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
