"""
Dependencies for API endpoints (auth, db sessions, etc.).
"""
from typing import Generator
from app.database import SessionLocal

def get_db() -> Generator:
    """
    Dependency function to get database session.
    Use this in FastAPI route dependencies.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Future: Add authentication dependencies here
# def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
#     ...
