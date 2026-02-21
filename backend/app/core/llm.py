"""
LLM provider initialization.
Returns a configured ChatModel based on the settings.
Falls back gracefully when no API key is configured.
"""

import logging
from typing import Optional
from app.core.config import settings

logger = logging.getLogger(__name__)

_llm_instance = None


def get_llm():
    """
    Get the configured LLM instance.
    Returns None if no API key is configured.
    """
    global _llm_instance

    if _llm_instance is not None:
        return _llm_instance

    if not settings.has_llm:
        logger.warning(
            "No LLM API key configured. AI features will use fallback responses. "
            "Set OPENAI_API_KEY in your .env file to enable AI features."
        )
        return None

    try:
        if settings.default_llm_provider == "openai":
            from langchain_openai import ChatOpenAI

            _llm_instance = ChatOpenAI(
                model=settings.openai_model,
                temperature=settings.openai_temperature,
                max_tokens=settings.openai_max_tokens,
                api_key=settings.openai_api_key,
            )
            logger.info(f"LLM initialized: OpenAI ({settings.openai_model})")

        elif settings.default_llm_provider == "anthropic":
            from langchain_anthropic import ChatAnthropic

            _llm_instance = ChatAnthropic(
                model=settings.anthropic_model,
                api_key=settings.anthropic_api_key,
            )
            logger.info(f"LLM initialized: Anthropic ({settings.anthropic_model})")

        else:
            logger.error(f"Unknown LLM provider: {settings.default_llm_provider}")
            return None

    except Exception as e:
        logger.error(f"Failed to initialize LLM: {e}")
        return None

    return _llm_instance
