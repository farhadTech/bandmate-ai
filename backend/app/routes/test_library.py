from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.test_library import (
    CambridgeBookResponse,
    CambridgeBookWithTestsResponse,
    CambridgeTestResponse,
    CambridgeTestWithModulesResponse,
    SeedResponse,
    TestModuleResponse,
    TestModuleWithQuestionsResponse,
    TestQuestionResponse,
)
from app.services.test_library_service import (
    get_book_by_id,
    get_books,
    get_module_with_questions,
    get_modules_by_test,
    get_questions_by_module,
    get_test_by_id,
    get_tests_by_book,
    seed_test_library,
)

router = APIRouter(
    prefix="/test-library",
    tags=["Test Library"],
)


@router.get("/books", response_model=list[CambridgeBookResponse])
def list_books(db: Session = Depends(get_db)):
    return get_books(db)


@router.get("/books/{book_id}", response_model=CambridgeBookWithTestsResponse)
def retrieve_book(book_id: int, db: Session = Depends(get_db)):
    return get_book_by_id(db, book_id)


@router.get("/books/{book_id}/tests", response_model=list[CambridgeTestResponse])
def list_tests_by_book(book_id: int, db: Session = Depends(get_db)):
    return get_tests_by_book(db, book_id)


@router.get("/tests/{test_id}", response_model=CambridgeTestWithModulesResponse)
def retrieve_test(test_id: int, db: Session = Depends(get_db)):
    return get_test_by_id(db, test_id)


@router.get("/tests/{test_id}/modules", response_model=list[TestModuleResponse])
def list_modules_by_test(test_id: int, db: Session = Depends(get_db)):
    return get_modules_by_test(db, test_id)


@router.get(
    "/modules/{module_id}",
    response_model=TestModuleWithQuestionsResponse,
)
def retrieve_module(module_id: int, db: Session = Depends(get_db)):
    return get_module_with_questions(db, module_id)


@router.get(
    "/modules/{module_id}/questions",
    response_model=list[TestQuestionResponse],
)
def list_questions_by_module(module_id: int, db: Session = Depends(get_db)):
    return get_questions_by_module(db, module_id)


@router.post("/seed", response_model=SeedResponse)
def seed_library(db: Session = Depends(get_db)):
    result = seed_test_library(db)

    already_seeded = result["books_created"] == 0

    return SeedResponse(
        status="ok",
        message="Test library already seeded"
        if already_seeded
        else "Test library seeded successfully",
        books_created=result["books_created"],
        tests_created=result["tests_created"],
        modules_created=result["modules_created"],
        questions_created=result["questions_created"],
    )