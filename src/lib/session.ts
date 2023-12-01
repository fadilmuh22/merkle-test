import { SessionOptions } from "iron-session";

const SESSION_PASSWORD = process.env.NEXT_SESSION_PASSWORD as string;
const COOKIE_NAME = process.env.NEXT_COOKIE_NAME as string;

export interface SessionData {
  username: string;
  isLoggedIn: boolean;
  token: string;
}

export const defaultSession: SessionData = {
  username: "",
  isLoggedIn: false,
  token: "",
};

export const sessionOptions: SessionOptions = {
  password: SESSION_PASSWORD,
  cookieName: COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export type SessionPayload = {
  username: string;
  password: string;
  token: string;
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
