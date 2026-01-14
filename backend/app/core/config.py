"""
Core configuration settings.
"""
# Optional: Use pydantic-settings if available, otherwise use simple dict
try:
    from pydantic_settings import BaseSettings
    PYDANTIC_SETTINGS_AVAILABLE = True
except ImportError:
    PYDANTIC_SETTINGS_AVAILABLE = False
    # Create a simple BaseSettings-like class
    class BaseSettings:
        class Config:
            env_file = ".env"
            case_sensitive = False

class Settings(BaseSettings):
    """Application settings."""
    app_name: str = "Vibe-Coding Backend"
    app_version: str = "1.0.0"
    debug: bool = False
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
