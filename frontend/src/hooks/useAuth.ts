"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AuthUser,
  clearAuthSession,
  getAuthToken,
  getCurrentUser,
  getStoredUser,
} from "@/lib/auth";

type UseAuthReturn = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  authenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
};

export default function useAuth (): UseAuthReturn {
  const [ user, setUser ] = useState<AuthUser | null>( null );
  const [ token, setToken ] = useState<string | null>( null );
  const [ loading, setLoading ] = useState( true );

  const refreshUser = useCallback( async () => {
    const savedToken = getAuthToken();

    setToken( savedToken );

    if ( !savedToken ) {
      setUser( null );
      setLoading( false );
      return;
    }

    try {
      const currentUser = await getCurrentUser();
      setUser( currentUser );
    } catch {
      clearAuthSession();
      setUser( null );
      setToken( null );
    } finally {
      setLoading( false );
    }
  }, [] );

  useEffect( () => {
    const storedUser = getStoredUser();
    const savedToken = getAuthToken();

    setUser( storedUser );
    setToken( savedToken );

    refreshUser();
  }, [ refreshUser ] );

  function logout () {
    clearAuthSession();
    setUser( null );
    setToken( null );
    window.location.href = "/login";
  }

  return {
    user,
    token,
    loading,
    authenticated: Boolean( user && token ),
    refreshUser,
    logout,
  };
}