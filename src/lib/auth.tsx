"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "reos.auth";

/** Demo credentials — pre-filled on the login screen so sign-in is one click. */
export const DEMO_CREDENTIALS = {
  email: "alexandra.reed@northstarre.com",
  password: "northstar",
};

interface AuthCtx {
  authed: boolean;
  /** True once the client has read persisted auth state (avoids SSR flash). */
  hydrated: boolean;
  /** Returns true on success, false on bad credentials. */
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setAuthed(localStorage.getItem(STORAGE_KEY) === "1");
    setHydrated(true);
  }, []);

  const login = (email: string, password: string) => {
    const ok =
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password;
    if (ok) {
      localStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
    }
    return ok;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
  };

  return (
    <Ctx.Provider value={{ authed, hydrated, login, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
