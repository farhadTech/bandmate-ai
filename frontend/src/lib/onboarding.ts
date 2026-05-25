import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

export type OnboardingPayload = {
  current_band: string | null;
  target_band: string | null;
  study_hours_per_day: number | null;
  weakest_skill: string | null;
  strongest_skill: string | null;
  exam_type: string | null;
  purpose: string | null;
  country: string | null;
  exam_date: string | null;
};

export type OnboardingResponse = {
  id: number;
  current_band: string | null;
  target_band: string | null;
  study_hours_per_day: number | null;
  weakest_skill: string | null;
  strongest_skill: string | null;
  exam_type: string | null;
  purpose: string | null;
  country: string | null;
  exam_date: string | null;
};

export async function saveOnboarding ( payload: OnboardingPayload ) {
  const token = getAuthToken();

  if ( !token ) {
    throw new Error( "You must be logged in to save onboarding." );
  }

  return apiRequest<OnboardingResponse>( "/onboarding/save", {
    method: "POST",
    body: payload,
    token,
  } );
}

export async function getMyOnboarding () {
  const token = getAuthToken();

  if ( !token ) {
    return null;
  }

  return apiRequest<OnboardingResponse | null>( "/onboarding/me", {
    method: "GET",
    token,
  } );
}