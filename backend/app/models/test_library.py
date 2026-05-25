from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import relationship

from app.database import Base


class CambridgeBook(Base):
    __tablename__ = "cambridge_books"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(80), unique=True, index=True, nullable=False)

    title = Column(String(120), nullable=False)
    book_number = Column(Integer, unique=True, index=True, nullable=False)

    description = Column(Text, nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    tests = relationship(
        "CambridgeTest",
        back_populates="book",
        cascade="all, delete-orphan",
    )


class CambridgeTest(Base):
    __tablename__ = "cambridge_tests"
    __table_args__ = (
        UniqueConstraint("book_id", "test_number", name="uq_book_test_number"),
    )

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(120), unique=True, index=True, nullable=False)

    book_id = Column(
        Integer,
        ForeignKey("cambridge_books.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    test_number = Column(Integer, nullable=False)
    title = Column(String(120), nullable=False)

    difficulty = Column(String(50), nullable=False, default="Standard")
    status = Column(String(50), nullable=False, default="not-started")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    book = relationship("CambridgeBook", back_populates="tests")

    modules = relationship(
        "TestModule",
        back_populates="test",
        cascade="all, delete-orphan",
    )


class TestModule(Base):
    __tablename__ = "test_modules"
    __table_args__ = (
        UniqueConstraint("test_id", "module_type", name="uq_test_module_type"),
    )

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(160), unique=True, index=True, nullable=False)

    test_id = Column(
        Integer,
        ForeignKey("cambridge_tests.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    module_type = Column(String(40), nullable=False)
    title = Column(String(120), nullable=False)

    duration_minutes = Column(Integer, nullable=False)
    total_questions = Column(Integer, nullable=False)

    instructions = Column(Text, nullable=True)

    audio_url = Column(String(500), nullable=True)
    passage_text = Column(Text, nullable=True)
    writing_prompt = Column(Text, nullable=True)
    speaking_prompt = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    test = relationship("CambridgeTest", back_populates="modules")

    questions = relationship(
        "TestQuestion",
        back_populates="module",
        cascade="all, delete-orphan",
    )


class TestQuestion(Base):
    __tablename__ = "test_questions"
    __table_args__ = (
        UniqueConstraint("module_id", "question_number", name="uq_module_question"),
    )

    id = Column(Integer, primary_key=True, index=True)

    module_id = Column(
        Integer,
        ForeignKey("test_modules.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    question_number = Column(Integer, nullable=False)

    question_type = Column(String(80), nullable=False)
    prompt = Column(Text, nullable=False)

    options_json = Column(Text, nullable=True)
    correct_answer = Column(Text, nullable=True)
    explanation = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    module = relationship("TestModule", back_populates="questions")