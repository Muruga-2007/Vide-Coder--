"""
Security utilities: password hashing, JWT tokens, etc.
"""
from datetime import datetime, timedelta
from typing import Optional

# Optional imports for authentication (install python-jose and passlib when needed)
try:
    from jose import JWTError, jwt
    from passlib.context import CryptContext
    JWT_AVAILABLE = True
except ImportError:
    JWT_AVAILABLE = False
    # Create dummy classes for type checking
    class JWTError(Exception):
        pass
    class CryptContext:
        def __init__(self, *args, **kwargs):
            pass
        def verify(self, *args, **kwargs):
            raise NotImplementedError("Install passlib to use password hashing")
        def hash(self, *args, **kwargs):
            raise NotImplementedError("Install passlib to use password hashing")

from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

# Password hashing context
if JWT_AVAILABLE:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
else:
    pwd_context = CryptContext()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash."""
    if not JWT_AVAILABLE:
        raise NotImplementedError("Install passlib[bcrypt] to use password verification")
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password."""
    if not JWT_AVAILABLE:
        raise NotImplementedError("Install passlib[bcrypt] to use password hashing")
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    if not JWT_AVAILABLE:
        raise NotImplementedError("Install python-jose[cryptography] to use JWT tokens")
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    """Decode and verify a JWT token."""
    if not JWT_AVAILABLE:
        raise NotImplementedError("Install python-jose[cryptography] to use JWT tokens")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
