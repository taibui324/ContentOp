"""Application configuration using Pydantic Settings."""

from functools import lru_cache
from typing import Any

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Application
    app_name: str = "RankPot API"
    debug: bool = False
    log_level: str = "INFO"

    # Database (Supabase)
    database_url: str = "postgresql://localhost:5432/rankpot"
    database_pool_size: int = 5
    database_max_overflow: int = 10

    # Redis (Upstash)
    redis_url: str = "redis://localhost:6379"
    cache_ttl_seconds: int = 3600  # 1 hour

    # JWT Authentication
    jwt_secret: str = "your-secret-key-change-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expiration_hours: int = 24

    # External APIs
    rapidapi_key: str = ""
    rapidapi_tiktok_host: str = "tiktok-scraper7.p.rapidapi.com"
    rapidapi_instagram_host: str = "instagram-scraper-api2.p.rapidapi.com"
    openai_api_key: str = ""

    # CORS
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    # Email (for password reset)
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    email_from: str = "noreply@rankpot.com"

    @property
    def async_database_url(self) -> str:
        """Convert database URL to async format."""
        if self.database_url.startswith("postgresql://"):
            return self.database_url.replace(
                "postgresql://", "postgresql+asyncpg://", 1
            )
        return self.database_url


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


settings = get_settings()
