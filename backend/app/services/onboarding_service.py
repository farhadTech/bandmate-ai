from sqlalchemy.orm import Session

from app.models.onboarding import UserOnboarding
from app.schemas.onboarding import OnboardingRequest


def get_user_onboarding(
    db: Session,
    user_id: int,
) -> UserOnboarding | None:
    return (
        db.query(UserOnboarding)
        .filter(UserOnboarding.user_id == user_id)
        .first()
    )


def create_or_update_onboarding(
    db: Session,
    user_id: int,
    payload: OnboardingRequest,
) -> UserOnboarding:
    onboarding = get_user_onboarding(db, user_id)

    if not onboarding:
        onboarding = UserOnboarding(user_id=user_id)
        db.add(onboarding)

    onboarding.current_band = payload.current_band
    onboarding.target_band = payload.target_band

    onboarding.study_hours_per_day = payload.study_hours_per_day

    onboarding.weakest_skill = payload.weakest_skill
    onboarding.strongest_skill = payload.strongest_skill

    onboarding.exam_type = payload.exam_type

    onboarding.purpose = payload.purpose

    onboarding.country = payload.country

    onboarding.exam_date = payload.exam_date

    db.commit()
    db.refresh(onboarding)

    return onboarding