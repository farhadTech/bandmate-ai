export type TestStatus = "not-started" | "in-progress" | "completed";

export type CambridgeBook = {
  id: number;
  slug?: string;
  title: string;
  book_number?: number;
  description?: string | null;
  is_active?: boolean;
};

export type CambridgeTest = {
  id: number;
  slug?: string;
  book_id: number;
  test_number?: number;
  title: string;
  difficulty?: string;
  status?: TestStatus;
};

export type CambridgeBookWithTests = CambridgeBook & {
  label: string;
  tests: CambridgeTest[];
};

export type TestModule = {
  id: number;
  slug?: string;
  test_id: number;
  module_type: "listening" | "reading" | "writing" | "speaking";
  title: string;
  duration_minutes: number;
  total_questions: number;
  instructions?: string | null;
  audio_url?: string | null;
  passage_text?: string | null;
  writing_prompt?: string | null;
  speaking_prompt?: string | null;
};

export type TestQuestion = {
  id: number;
  module_id: number;
  question_number: number;
  question_type: string;
  prompt: string;
  options_json?: string | null;
  correct_answer?: string | null;
  explanation?: string | null;
};