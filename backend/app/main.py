from dotenv import load_dotenv
load_dotenv()

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.router import router
from app.core.config import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup/shutdown lifecycle."""
    # ── Startup ──
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    logger.info(f"Environment: {settings.app_environment}")
    logger.info(f"LLM configured: {settings.has_llm}")

    # Seed demo data if none exists
    from app.services.email_service import seed_demo_emails
    from app.services.schedule_service import seed_demo_events
    seed_demo_emails()
    seed_demo_events()
    logger.info("Demo data seeded (if empty)")

    # Score all emails on startup
    from app.services.priority_service import score_all_emails
    scored = score_all_emails()
    logger.info(f"Priority scores calculated for {len(scored)} emails")

    # Generate summaries for emails missing them
    from app.services.email_service import get_all_emails, update_email
    from app.services.summary_service import generate_email_summary
    for email in get_all_emails():
        if not email.get("ai_summary", {}).get("key_points"):
            summary = generate_email_summary(
                sender=email["sender"],
                subject=email["subject"],
                content=email.get("content", ""),
            )
            update_email(email["id"], {"ai_summary": summary})
    logger.info("AI summaries generated for all emails")

    yield

    # ── Shutdown ──
    logger.info(f"{settings.app_name} shutting down")


app = FastAPI(
    title="MemAG API",
    version=settings.app_version,
    description="Memory-Augmented Agent — AI Personal Assistant Backend",
    lifespan=lifespan,
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "MemAG backend running",
        "version": settings.app_version,
        "llm_configured": settings.has_llm,
    }