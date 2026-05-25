from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import get_db
from app.schemas.health import DatabaseHealthResponse, HealthResponse

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("/", response_model=HealthResponse)
def health_check():
    settings = get_settings()

    return HealthResponse(
        status="ok",
        app_name=settings.APP_NAME,
        environment=settings.APP_ENV,
    )


@router.get("/database", response_model=DatabaseHealthResponse)
def database_health_check(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))

    return DatabaseHealthResponse(
        status="ok",
        database="connected",
    )