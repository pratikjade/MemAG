"""
Centralized configuration for MemAG backend.
Reads from .env file and provides typed settings throughout the app.
"""

from pydantic_settings import BaseSettings
from pydantic import Field
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables / .env file."""

    # ── LLM Configuration ──────────────────────────────────────────────
    openai_api_key: Optional[str] = Field(default=None, alias="OPENAI_API_KEY")
    openai_model: str = "gpt-4-turbo-preview"
    openai_temperature: float = 0.7
    openai_max_tokens: int = 2000

    anthropic_api_key: Optional[str] = Field(default=None, alias="ANTHROPIC_API_KEY")
    anthropic_model: str = "claude-3-opus-20240229"

    google_api_key: Optional[str] = Field(default=None, alias="GOOGLE_API_KEY")
    gemini_model: str = "gemini-2.0-flash"
    gemini_temperature: float = 0.7
    gemini_max_tokens: int = 2000

    nvidia_api_key: Optional[str] = Field(default=None, alias="NVIDIA_API_KEY")
    nvidia_model: str = "openai/gpt-oss-20b"
    nvidia_temperature: float = 0.7
    nvidia_max_tokens: int = 4096

    default_llm_provider: str = "nvidia"

    # ── Embedding Configuration ────────────────────────────────────────
    embedding_model: str = "all-MiniLM-L6-v2"

    # ── Vector DB Configuration ────────────────────────────────────────
    vector_db_path: str = "./chroma_db"
    vector_db_collection: str = "memag_memories"

    # ── Memory Configuration ───────────────────────────────────────────
    memory_retrieval_top_k: int = 5
    memory_similarity_threshold: float = 0.7
    memory_max_context_length: int = 4000

    # ── Application ────────────────────────────────────────────────────
    app_name: str = "MemAG"
    app_version: str = "0.1.0"
    app_environment: str = "development"
    debug: bool = True

    # ── Data Storage ───────────────────────────────────────────────────
    data_dir: str = "./data"

    # ── API ─────────────────────────────────────────────────────────────
    cors_origins: str = "http://localhost:3000,http://localhost:5173,http://localhost:8000"

    # ── Agent ───────────────────────────────────────────────────────────
    agent_max_iterations: int = 10
    agent_timeout_seconds: int = 300

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "ignore",
        "populate_by_name": True,
    }

    @property
    def has_llm(self) -> bool:
        """Check if any LLM API key is configured."""
        if self.default_llm_provider == "openai":
            return bool(self.openai_api_key)
        elif self.default_llm_provider == "anthropic":
            return bool(self.anthropic_api_key)
        elif self.default_llm_provider == "gemini":
            return bool(self.google_api_key)
        elif self.default_llm_provider == "nvidia":
            return bool(self.nvidia_api_key)
        return False

    @property
    def cors_origin_list(self) -> list[str]:
        """Parse comma-separated CORS origins into a list."""
        return [origin.strip() for origin in self.cors_origins.split(",")]


# Singleton settings instance
settings = Settings()
