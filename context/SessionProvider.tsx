import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { getSupabase } from '../lib/supabase';

// Define the context type
interface SessionContextType {
  session: Session | null;
  loading: boolean;
}

// Create the context with a default value of null
const SessionContext = createContext<SessionContextType | null>(null);

// Custom hook to use the session context
export const useSession = () => {
  return useContext(SessionContext);
};

// Define the props for the provider
interface SessionProviderProps {
  children: React.ReactNode;
}

// SessionProvider component
export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();

    // Fetch the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = React.useMemo(() => ({
    session,
    loading,
  }), [session, loading]);

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
