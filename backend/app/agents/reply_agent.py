"""
Reply generation agent.
Generates AI-powered email replies with configurable tone.
Uses semantic memory for context-aware responses.
"""

import logging

from app.core.llm import get_llm
from app.core.prompts import REPLY_GENERATION_PROMPT
from app.langchain.memory import search_memory

logger = logging.getLogger(__name__)

# User name — will come from user profile in production
USER_NAME = "Pratik"


def generate_reply(
    sender: str,
    subject: str,
    content: str,
    tone: str = "concise",
) -> str:
    """
    Generate an AI email reply.
    Uses semantic memory to add context from past interactions.
    Falls back to template-based reply when no LLM is available.
    """
    tone = tone.lower()
    if tone not in ("concise", "formal", "direct"):
        tone = "concise"

    # Retrieve relevant memory for context
    memory_context = _get_memory_context(sender, subject)

    llm = get_llm()

    if llm is not None:
        try:
            prompt = REPLY_GENERATION_PROMPT.format(
                user_name=USER_NAME,
                tone=tone,
                sender=sender,
                subject=subject,
                content=content,
                memory_context=memory_context or "No relevant past context found.",
            )
            response = llm.invoke(prompt)
            return response.content.strip()
        except Exception as e:
            logger.error(f"LLM reply generation failed: {e}")

    # Fallback to template-based reply
    return _fallback_reply(sender, subject, content, tone)


def _get_memory_context(sender: str, subject: str) -> str:
    """Search semantic memory for relevant context about sender/topic."""
    try:
        results = search_memory(f"{sender} {subject}")
        if results:
            return "\n".join(f"- {r}" for r in results[:3])
    except Exception as e:
        logger.warning(f"Memory search failed: {e}")
    return ""


def _fallback_reply(sender: str, subject: str, content: str, tone: str) -> str:
    """Generate a template-based reply when LLM is unavailable."""
    first_name = sender.split()[0] if sender else "there"

    # Extract action items from content
    action_items = []
    for line in content.split("\n"):
        stripped = line.strip()
        if stripped.startswith("-") or stripped.startswith("•"):
            item = stripped.lstrip("-•").strip()
            if item:
                action_items.append(item)

    if tone == "concise":
        reply = f"Hi {first_name},\n\n"
        reply += f"Thanks for the update on {subject.split('-')[0].strip().lower()}. "
        reply += "I'll review this and get back to you shortly."
        if action_items:
            reply += f" I've noted the key items you mentioned."
        reply += f"\n\nBest,\n{USER_NAME}"

    elif tone == "formal":
        reply = f"Dear {first_name},\n\n"
        reply += f"Thank you for bringing this to my attention regarding {subject.lower()}. "
        reply += "I have reviewed the details you've shared and appreciate the thorough overview.\n\n"
        if action_items:
            reply += "I have noted the following items for action:\n"
            for item in action_items[:3]:
                reply += f"  • {item}\n"
            reply += "\n"
        reply += "I will follow up with you shortly with my thoughts and next steps.\n\n"
        reply += f"Kind regards,\n{USER_NAME}"

    elif tone == "direct":
        reply = f"Hi {first_name},\n\n"
        reply += f"Got it. Here's where I stand on {subject.split('-')[0].strip().lower()}:\n\n"
        if action_items:
            for i, item in enumerate(action_items[:3], 1):
                reply += f"{i}. {item} — will address this.\n"
            reply += "\n"
        else:
            reply += "I'll handle this. "
        reply += f"Let's sync if you need anything else.\n\n{USER_NAME}"

    else:
        reply = f"Hi {first_name},\n\nThanks for your email. I'll review and respond soon.\n\nBest,\n{USER_NAME}"

    return reply
