export interface CambridgeBook {
  id: number;
  title: string;
  description?: string;
}

export interface CambridgeTest {
  id: number;
  title: string;
  book_id?: number;
}

export interface TestModule {
  id: number;
  module_type: string;
  title?: string;
}

export interface TestQuestion {
  id: number;
  question_number: number;
  question_text: string;
  question_type?: string;
  options?: string[];
  answer?: string;
}