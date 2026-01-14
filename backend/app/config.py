"""
Configuration and environment variables.
"""
import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env from possible locations
current_dir = Path(__file__).parent
env_path = current_dir / ".env"
load_dotenv(env_path, override=True)

# Fallback: try loading .env from the project root (one level up)
if not os.getenv("OPENROUTER_API_KEY"):
    project_root = current_dir.parent
    fallback_path = project_root / ".env"
    load_dotenv(fallback_path, override=True)

# API Configuration
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "").strip()
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

# Application Configuration
APP_NAME = "Vibe-Coding Backend"
APP_VERSION = "1.0.0"
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

# CORS Configuration
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]

# Database Configuration (for future use)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

# Security Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def validate_config():
    """Validate required configuration values."""
    if not OPENROUTER_API_KEY:
        raise ValueError("OPENROUTER_API_KEY is missing. Please set it in .env.")
    if not OPENROUTER_API_KEY.startswith('sk-') or len(OPENROUTER_API_KEY) < 20:
        raise ValueError("Invalid OPENROUTER_API_KEY format. Ensure a valid key is set in .env.")
    return True
