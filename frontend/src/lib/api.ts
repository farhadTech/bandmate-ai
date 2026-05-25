const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
};

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor ( message: string, status: number, details?: unknown ) {
    super( message );
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export async function apiRequest<T> (
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = "GET", body, token } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if ( token ) {
    headers.Authorization = `Bearer ${ token }`;
  }

  const response = await fetch( `${ API_BASE_URL }${ endpoint }`, {
    method,
    headers,
    body: body ? JSON.stringify( body ) : undefined,
  } );

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if ( !response.ok ) {
    const message =
      typeof data === "object" &&
        data !== null &&
        "detail" in data &&
        typeof ( data as { detail: unknown; } ).detail === "string"
        ? ( data as { detail: string; } ).detail
        : "Something went wrong";

    throw new ApiError( message, response.status, data );
  }

  return data as T;
}

export { API_BASE_URL };