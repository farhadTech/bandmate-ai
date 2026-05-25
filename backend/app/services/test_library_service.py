import json

from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.models.test_library import (
    CambridgeBook,
    CambridgeTest,
    TestModule,
    TestQuestion,
)


def get_books(db: Session) -> list[CambridgeBook]:
    return (
        db.query(CambridgeBook)
        .filter(CambridgeBook.is_active == True)
        .order_by(CambridgeBook.book_number.desc())
        .all()
    )


def get_book_by_id(db: Session, book_id: int) -> CambridgeBook:
    book = (
        db.query(CambridgeBook)
        .options(joinedload(CambridgeBook.tests))
        .filter(CambridgeBook.id == book_id)
        .first()
    )

    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found",
        )

    book.tests = sorted(book.tests, key=lambda item: item.test_number)

    return book


def get_tests_by_book(db: Session, book_id: int) -> list[CambridgeTest]:
    book = db.query(CambridgeBook).filter(CambridgeBook.id == book_id).first()

    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found",
        )

    return (
        db.query(CambridgeTest)
        .filter(CambridgeTest.book_id == book_id)
        .order_by(CambridgeTest.test_number.asc())
        .all()
    )


def get_test_by_id(db: Session, test_id: int) -> CambridgeTest:
    test = (
        db.query(CambridgeTest)
        .options(joinedload(CambridgeTest.modules))
        .filter(CambridgeTest.id == test_id)
        .first()
    )

    if not test:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test not found",
        )

    order = {"listening": 1, "reading": 2, "writing": 3, "speaking": 4}
    test.modules = sorted(
        test.modules,
        key=lambda item: order.get(item.module_type, 99),
    )

    return test


def get_modules_by_test(db: Session, test_id: int) -> list[TestModule]:
    test = db.query(CambridgeTest).filter(CambridgeTest.id == test_id).first()

    if not test:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test not found",
        )

    order = {
        "listening": 1,
        "reading": 2,
        "writing": 3,
        "speaking": 4,
    }

    modules = (
        db.query(TestModule)
        .filter(TestModule.test_id == test_id)
        .all()
    )

    return sorted(modules, key=lambda item: order.get(item.module_type, 99))


def get_questions_by_module(db: Session, module_id: int) -> list[TestQuestion]:
    module = db.query(TestModule).filter(TestModule.id == module_id).first()

    if not module:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Module not found",
        )

    return (
        db.query(TestQuestion)
        .filter(TestQuestion.module_id == module_id)
        .order_by(TestQuestion.question_number.asc())
        .all()
    )


def get_module_with_questions(db: Session, module_id: int) -> TestModule:
    module = (
        db.query(TestModule)
        .options(joinedload(TestModule.questions))
        .filter(TestModule.id == module_id)
        .first()
    )

    if not module:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Module not found",
        )

    module.questions = sorted(
        module.questions,
        key=lambda item: item.question_number,
    )

    return module


def seed_test_library(db: Session) -> dict[str, int]:
    existing_books = db.query(CambridgeBook).count()

    if existing_books > 0:
        return {
            "books_created": 0,
            "tests_created": 0,
            "modules_created": 0,
            "questions_created": 0,
        }

    books_created = 0
    tests_created = 0
    modules_created = 0
    questions_created = 0

    for book_number in range(20, 4, -1):
        book = CambridgeBook(
            slug=f"cambridge-{book_number}",
            title=f"Cambridge {book_number}",
            book_number=book_number,
            description=f"Computer-based IELTS practice tests from Cambridge {book_number}.",
            is_active=True,
        )

        db.add(book)
        db.flush()
        books_created += 1

        for test_number in range(1, 5):
            test = CambridgeTest(
                slug=f"cambridge-{book_number}-test-{test_number}",
                book_id=book.id,
                test_number=test_number,
                title=f"Test {test_number}",
                difficulty="Standard",
                status="not-started",
            )

            db.add(test)
            db.flush()
            tests_created += 1

            module_templates = [
                {
                    "module_type": "listening",
                    "title": "Listening",
                    "duration_minutes": 30,
                    "total_questions": 40,
                    "instructions": "Listen to the audio and answer questions 1-40.",
                    "audio_url": None,
                    "passage_text": None,
                    "writing_prompt": None,
                    "speaking_prompt": None,
                },
                {
                    "module_type": "reading",
                    "title": "Reading",
                    "duration_minutes": 60,
                    "total_questions": 40,
                    "instructions": "Read the passages and answer questions 1-40.",
                    "audio_url": None,
                    "passage_text": sample_reading_passage(book_number, test_number),
                    "writing_prompt": None,
                    "speaking_prompt": None,
                },
                {
                    "module_type": "writing",
                    "title": "Writing",
                    "duration_minutes": 60,
                    "total_questions": 2,
                    "instructions": "Complete Writing Task 1 and Writing Task 2.",
                    "audio_url": None,
                    "passage_text": None,
                    "writing_prompt": sample_writing_prompt(book_number, test_number),
                    "speaking_prompt": None,
                },
                {
                    "module_type": "speaking",
                    "title": "Speaking",
                    "duration_minutes": 15,
                    "total_questions": 3,
                    "instructions": "Complete Speaking Part 1, Part 2 and Part 3.",
                    "audio_url": None,
                    "passage_text": None,
                    "writing_prompt": None,
                    "speaking_prompt": sample_speaking_prompt(book_number, test_number),
                },
            ]

            for template in module_templates:
                module = TestModule(
                    slug=f"cambridge-{book_number}-test-{test_number}-{template['module_type']}",
                    test_id=test.id,
                    module_type=template["module_type"],
                    title=template["title"],
                    duration_minutes=template["duration_minutes"],
                    total_questions=template["total_questions"],
                    instructions=template["instructions"],
                    audio_url=template["audio_url"],
                    passage_text=template["passage_text"],
                    writing_prompt=template["writing_prompt"],
                    speaking_prompt=template["speaking_prompt"],
                )

                db.add(module)
                db.flush()
                modules_created += 1

                module_questions = build_sample_questions(
                    module.module_type,
                    module.total_questions,
                )

                for question_data in module_questions:
                    question = TestQuestion(
                        module_id=module.id,
                        question_number=question_data["question_number"],
                        question_type=question_data["question_type"],
                        prompt=question_data["prompt"],
                        options_json=question_data.get("options_json"),
                        correct_answer=question_data.get("correct_answer"),
                        explanation=question_data.get("explanation"),
                    )

                    db.add(question)
                    questions_created += 1

    db.commit()

    return {
        "books_created": books_created,
        "tests_created": tests_created,
        "modules_created": modules_created,
        "questions_created": questions_created,
    }


def sample_reading_passage(book_number: int, test_number: int) -> str:
    return (
        f"Cambridge {book_number} Test {test_number} Reading Passage.\n\n"
        "The kākāpō is a nocturnal, flightless parrot that is critically endangered "
        "and one of New Zealand's unique treasures. The bird is known for its owl-like "
        "face, green feathers, and inability to fly. Conservation efforts have helped "
        "protect the species, but it remains vulnerable.\n\n"
        "Researchers believe that careful monitoring, predator control, and protected "
        "islands have all contributed to the survival of the species."
    )


def sample_writing_prompt(book_number: int, test_number: int) -> str:
    return (
        f"Cambridge {book_number} Test {test_number} Writing Task 1:\n"
        "The chart below shows changes in the population of a city over time. "
        "Summarise the information by selecting and reporting the main features.\n\n"
        "Writing Task 2:\n"
        "Some people believe that technology has made communication less personal. "
        "Others think it has improved the way people communicate. Discuss both views "
        "and give your own opinion."
    )


def sample_speaking_prompt(book_number: int, test_number: int) -> str:
    return (
        f"Cambridge {book_number} Test {test_number} Speaking Practice.\n\n"
        "Part 1: Do you work or are you a student?\n"
        "Part 2: Describe a place you visited that you found interesting.\n"
        "Part 3: Why do people like to travel to different places?"
    )


def build_sample_questions(module_type: str, total_questions: int) -> list[dict]:
    if module_type == "listening":
        return build_listening_questions(total_questions)

    if module_type == "reading":
        return build_reading_questions(total_questions)

    if module_type == "writing":
        return build_writing_questions()

    if module_type == "speaking":
        return build_speaking_questions()

    return []


def build_listening_questions(total_questions: int) -> list[dict]:
    questions = []

    for number in range(1, total_questions + 1):
        questions.append(
            {
                "question_number": number,
                "question_type": "fill_blank",
                "prompt": f"Listening question {number}: Complete the answer.",
                "correct_answer": sample_answer_for_number(number),
                "explanation": "Listen for the keyword before the gap and write the exact word you hear.",
            }
        )

    return questions


def build_reading_questions(total_questions: int) -> list[dict]:
    questions = []

    for number in range(1, total_questions + 1):
        if number <= 10:
            questions.append(
                {
                    "question_number": number,
                    "question_type": "true_false_not_given",
                    "prompt": f"Reading question {number}: Decide whether the statement is TRUE, FALSE or NOT GIVEN.",
                    "options_json": json.dumps(["true", "false", "not given"]),
                    "correct_answer": "true" if number % 2 == 0 else "false",
                    "explanation": "Compare the statement carefully with the passage and avoid using outside knowledge.",
                }
            )
        else:
            questions.append(
                {
                    "question_number": number,
                    "question_type": "short_answer",
                    "prompt": f"Reading question {number}: Write the answer from the passage.",
                    "correct_answer": sample_answer_for_number(number),
                    "explanation": "The answer should come directly from the passage.",
                }
            )

    return questions


def build_writing_questions() -> list[dict]:
    return [
        {
            "question_number": 1,
            "question_type": "writing_task_1",
            "prompt": "Writing Task 1: Summarise the chart or table in at least 150 words.",
            "correct_answer": None,
            "explanation": "Writing Task 1 is scored by task achievement, coherence, vocabulary and grammar.",
        },
        {
            "question_number": 2,
            "question_type": "writing_task_2",
            "prompt": "Writing Task 2: Write an essay in at least 250 words.",
            "correct_answer": None,
            "explanation": "Writing Task 2 needs a clear position, strong examples and well-developed paragraphs.",
        },
    ]


def build_speaking_questions() -> list[dict]:
    return [
        {
            "question_number": 1,
            "question_type": "speaking_part_1",
            "prompt": "Part 1: Do you work or are you a student?",
            "correct_answer": None,
            "explanation": "Give a natural answer with one reason or example.",
        },
        {
            "question_number": 2,
            "question_type": "speaking_part_2",
            "prompt": "Part 2: Describe a place you visited that you found interesting.",
            "correct_answer": None,
            "explanation": "Speak for 1-2 minutes and cover all cue card points.",
        },
        {
            "question_number": 3,
            "question_type": "speaking_part_3",
            "prompt": "Part 3: Why do people like to travel to different places?",
            "correct_answer": None,
            "explanation": "Give a developed answer with abstract ideas and examples.",
        },
    ]


def sample_answer_for_number(number: int) -> str:
    answers = [
        "fish",
        "bar",
        "Italian",
        "vegetarian",
        "garden",
        "hill",
        "desserts",
        "local",
        "25",
        "average",
    ]

    return answers[(number - 1) % len(answers)]