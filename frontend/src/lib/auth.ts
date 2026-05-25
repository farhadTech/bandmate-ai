import { apiRequest } from "@/lib/api";

const TOKEN_KEY = "bandmate_access_token";
const USER_KEY = "bandmate_user";

export type AuthUser = {
  id: number;
  full_name: string;
  email: string;
  role: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: AuthUser;
};

export type RegisterPayload = {
  full_name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export function saveAuthSession ( response: AuthResponse ) {
  if ( typeof window === "undefined" ) return;

  localStorage.setItem( TOKEN_KEY, response.access_token );
  localStorage.setItem( USER_KEY, JSON.stringify( response.user ) );
}

export function getAuthToken () {
  if ( typeof window === "undefined" ) return null;

  return localStorage.getItem( TOKEN_KEY );
}

export function getStoredUser (): AuthUser | null {
  if ( typeof window === "undefined" ) return null;

  const storedUser = localStorage.getItem( USER_KEY );

  if ( !storedUser ) return null;

  try {
    return JSON.parse( storedUser ) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuthSession () {
  if ( typeof window === "undefined" ) return;

  localStorage.removeItem( TOKEN_KEY );
  localStorage.removeItem( USER_KEY );
}

export async function registerUser ( payload: RegisterPayload ) {
  const response = await apiRequest<AuthResponse>( "/auth/register", {
    method: "POST",
    body: payload,
  } );

  saveAuthSession( response );

  return response;
}

export async function loginUser ( payload: LoginPayload ) {
  const response = await apiRequest<AuthResponse>( "/auth/login", {
    method: "POST",
    body: payload,
  } );

  saveAuthSession( response );

  return response;
}

export async function getCurrentUser () {
  const token = getAuthToken();

  if ( !token ) {
    return null;
  }

  return apiRequest<AuthUser>( "/auth/me", {
    method: "GET",
    token,
  } );
}