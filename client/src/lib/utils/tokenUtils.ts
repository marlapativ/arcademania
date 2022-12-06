import type { AuthState } from "lib/types/components/auth.types";

const AUTH_TOKEN = "AUTH_TOKEN";

export const parseJwtAndGet = (token: string, property = "id") => {
  if (!token) return undefined;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64))[property];
};

export const isAuthenticated = (state: AuthState) => {
  return state && state.token && state.token !== "";
};

export const getSessionStorageToken = (): string => {
  return typeof window !== "undefined"
    ? window.localStorage.getItem(AUTH_TOKEN) || ""
    : "";
};

export const setSessionStorageToken = (token: string) => {
  if (typeof window !== "undefined")
    window.localStorage.setItem(AUTH_TOKEN, token);
};
