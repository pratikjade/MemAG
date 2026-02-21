from fastapi import APIRouter
from app.api.routes.memory import router as memory_router
from app.api.routes.health import router as health_router
from app.api.routes.emails import router as email_router
from app.api.routes.actions import router as actions_router
from app.api.routes.schedule import router as schedule_router

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

router.include_router(
    email_router,
    prefix="/emails",
    tags=["Emails"]
)

router.include_router(
    actions_router,
    prefix="/actions",
    tags=["Actions & Priority"]
)

router.include_router(
    schedule_router,
    prefix="/schedule",
    tags=["Schedule"]
)