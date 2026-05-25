from datetime import date
from typing import Optional

from pydantic import BaseModel, Field


class OnboardingRequest(BaseModel):
    current_band: Optional[str] = Field(default=None)
    target_band: Optional[str] = Field(default=None)

    study_hours_per_day: Optional[int] = Field(default=None)

    weakest_skill: Optional[str] = Field(default=None)
    strongest_skill: Optional[str] = Field(default=None)

    exam_type: Optional[str] = Field(default=None)

    purpose: Optional[str] = Field(default=None)

    country: Optional[str] = Field(default=None)

    exam_date: Optional[date] = Field(default=None)


class OnboardingResponse(BaseModel):
    id: int

    current_band: Optional[str]
    target_band: Optional[str]

    study_hours_per_day: Optional[int]

    weakest_skill: Optional[str]
    strongest_skill: Optional[str]

    exam_type: Optional[str]

    purpose: Optional[str]

    country: Optional[str]

    exam_date: Optional[date]

    class Config:
        from_attributes = True