from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.routes.auth import get_current_user
from app.schemas.auth import UserResponse
from app.schemas.onboarding import (
    OnboardingRequest,
    OnboardingResponse,
)
from app.services.onboarding_service import (
    create_or_update_onboarding,
    get_user_onboarding,
)

router = APIRouter(
    prefix="/onboarding",
    tags=["Onboarding"],
)


@router.get(
    "/me",
    response_model=OnboardingResponse | None,
)
def get_my_onboarding(
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    onboarding = get_user_onboarding(
        db,
        current_user.id,
    )

    return onboarding


@router.post(
    "/save",
    response_model=OnboardingResponse,
)
def save_onboarding(
    payload: OnboardingRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    onboarding = create_or_update_onboarding(
        db,
        current_user.id,
        payload,
    )

    return onboarding