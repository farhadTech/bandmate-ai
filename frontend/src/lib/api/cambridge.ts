import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const api = axios.create( {
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
} );



// =========================
// BOOKS
// =========================

export async function getBooks () {
  const response = await api.get( "/test-library/books" );

  return response.data;
}

export async function getBook ( bookId: number ) {
  const response = await api.get(
    `/test-library/books/${ bookId }`
  );

  return response.data;
}

export async function getBookTests ( bookId: number ) {
  const response = await api.get(
    `/test-library/books/${ bookId }/tests`
  );

  return response.data;
}



// =========================
// TESTS
// =========================

export async function getTest ( testId: number ) {
  const response = await api.get(
    `/test-library/tests/${ testId }`
  );

  return response.data;
}

export async function getTestModules ( testId: number ) {
  const response = await api.get(
    `/test-library/tests/${ testId }/modules`
  );

  return response.data;
}



// =========================
// MODULES
// =========================

export async function getModule ( moduleId: number ) {
  const response = await api.get(
    `/test-library/modules/${ moduleId }`
  );

  return response.data;
}

export async function getModuleQuestions ( moduleId: number ) {
  const response = await api.get(
    `/test-library/modules/${ moduleId }/questions`
  );

  return response.data;
}