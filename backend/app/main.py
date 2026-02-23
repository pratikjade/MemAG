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

# Silence noisy third-party loggers
logging.getLogger("google_genai").setLevel(logging.WARNING)
logging.getLogger("httpx").setLevel(logging.WARNING)


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

    # Score all emails on startup (uses rule-based scoring only for fast boot)
    # AI-enhanced scoring happens lazily on individual requests
    from app.services.priority_service import score_all_emails
    scored = score_all_emails(use_llm=False)
    logger.info(f"Priority scores calculated for {len(scored)} emails")

    # NOTE: AI summaries are generated lazily when emails are requested,
    # not at startup. This avoids burning Gemini free-tier quota on boot.
    logger.info("Server ready — AI summaries will be generated on first request")

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