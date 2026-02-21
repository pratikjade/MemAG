from fastapi import APIRouter
from app.api.routes.memory import router as memory_router
from app.api.routes.health import router as health_router

router = APIRouter()

router.include_router(
    memory_router,
    prefix="/memory",
    tags=["Memory"]
)

router.include_router(
    health_router,
    prefix="/health",
    tags=["Health"]
)