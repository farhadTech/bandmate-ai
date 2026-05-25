from sqlalchemy import (
    Column,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    String,
    func,
)
from sqlalchemy.orm import relationship

from app.database import Base


class UserOnboarding(Base):
    __tablename__ = "user_onboarding"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )

    current_band = Column(String(10), nullable=True)
    target_band = Column(String(10), nullable=True)

    study_hours_per_day = Column(Integer, nullable=True)

    weakest_skill = Column(String(50), nullable=True)
    strongest_skill = Column(String(50), nullable=True)

    exam_type = Column(String(50), nullable=True)
    purpose = Column(String(120), nullable=True)

    country = Column(String(120), nullable=True)

    exam_date = Column(Date, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    user = relationship("User")