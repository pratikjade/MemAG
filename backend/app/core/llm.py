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
            "Set OPENAI_API_KEY or GOOGLE_API_KEY in your .env file to enable AI features."
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

        elif settings.default_llm_provider == "gemini":
            from langchain_google_genai import ChatGoogleGenerativeAI

            _llm_instance = ChatGoogleGenerativeAI(
                model=settings.gemini_model,
                temperature=settings.gemini_temperature,
                max_output_tokens=settings.gemini_max_tokens,
                google_api_key=settings.google_api_key,
                max_retries=2,
                timeout=30,
            )
            logger.info(f"LLM initialized: Gemini ({settings.gemini_model})")

        elif settings.default_llm_provider == "nvidia":
            from langchain_nvidia_ai_endpoints import ChatNVIDIA

            _llm_instance = ChatNVIDIA(
                model=settings.nvidia_model,
                api_key=settings.nvidia_api_key,
                temperature=settings.nvidia_temperature,
                max_tokens=settings.nvidia_max_tokens,
            )
            logger.info(f"LLM initialized: NVIDIA ({settings.nvidia_model})")

        else:
            logger.error(f"Unknown LLM provider: {settings.default_llm_provider}")
            return None

    except Exception as e:
        logger.error(f"Failed to initialize LLM: {e}")
        return None

    return _llm_instance


def parse_llm_json_response(response) -> dict:
    """
    Parse JSON from an LLM response, handling provider differences.

    Handles:
    - Gemini 2.5 thinking models (content blocks with 'type' fields)
    - Gemini returning content as a list of dicts/strings
    - Markdown code fences (```json ... ```)
    - JSON embedded within extra text
    """
    import json
    import re

    content = response.content
    logger.debug(f"Raw LLM response content type: {type(content)}, value: {repr(content)[:500]}")

    # Handle list-type content (Gemini thinking models return this)
    if isinstance(content, list):
        text_parts = []
        for block in content:
            if isinstance(block, str):
                text_parts.append(block)
            elif isinstance(block, dict):
                # Gemini 2.5 thinking models use {"type": "text", "text": "..."}
                # Skip thinking blocks, only take text blocks
                block_type = block.get("type", "")
                if block_type == "thinking":
                    continue  # skip internal reasoning
                if "text" in block:
                    text_parts.append(block["text"])
            elif hasattr(block, "text"):
                # Handle object-style content blocks
                text_parts.append(block.text)
            else:
                text_parts.append(str(block))
        content = "\n".join(text_parts)

    if not content or not content.strip():
        raise ValueError(f"LLM returned empty content. Raw: {repr(response.content)[:300]}")

    # Strip markdown code fences if present
    content = content.strip()
    content = re.sub(r"^```(?:json)?\s*\n?", "", content)
    content = re.sub(r"\n?```\s*$", "", content)
    content = content.strip()

    # Try direct JSON parse first
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        pass

    # Fallback: extract first JSON object from the text
    match = re.search(r"\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}", content, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except json.JSONDecodeError:
            pass

    raise ValueError(f"Could not extract JSON from LLM response: {content[:300]}")
