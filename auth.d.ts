import { DefaultSession, DefaultUser } from "next-auth";

// user 객체에 id와 acceessToken 프로퍼티 타입을 추가함
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
  }

  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;
    refreshToke: string;
  }
}
