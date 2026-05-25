from typing import Optional

from pydantic import BaseModel


class TestQuestionResponse(BaseModel):
    id: int
    module_id: int
    question_number: int
    question_type: str
    prompt: str
    options_json: Optional[str]
    correct_answer: Optional[str]
    explanation: Optional[str]

    class Config:
        from_attributes = True


class TestModuleResponse(BaseModel):
    id: int
    slug: str
    test_id: int
    module_type: str
    title: str
    duration_minutes: int
    total_questions: int
    instructions: Optional[str]
    audio_url: Optional[str]
    passage_text: Optional[str]
    writing_prompt: Optional[str]
    speaking_prompt: Optional[str]

    class Config:
        from_attributes = True


class TestModuleWithQuestionsResponse(TestModuleResponse):
    questions: list[TestQuestionResponse] = []


class CambridgeTestResponse(BaseModel):
    id: int
    slug: str
    book_id: int
    test_number: int
    title: str
    difficulty: str
    status: str

    class Config:
        from_attributes = True


class CambridgeTestWithModulesResponse(CambridgeTestResponse):
    modules: list[TestModuleResponse] = []


class CambridgeBookResponse(BaseModel):
    id: int
    slug: str
    title: str
    book_number: int
    description: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True


class CambridgeBookWithTestsResponse(CambridgeBookResponse):
    tests: list[CambridgeTestResponse] = []


class SeedResponse(BaseModel):
    status: str
    message: str
    books_created: int
    tests_created: int
    modules_created: int
    questions_created: int