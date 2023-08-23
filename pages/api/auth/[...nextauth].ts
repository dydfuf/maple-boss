import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_HOST } from "constants/common";
import { env } from "env.mjs";
import { CommonResponse } from "types/common";

export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    CredentialsProvider({
      id: "Credentials",
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      secret: env.NEXTAUTH_SECRET,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      async authorize(credentials) {
        const { email, password } = credentials || {};

        if (!email || !password) {
          return true;
        }

        const { data } = await sendLogin({ email, password });

        if (data.data?.accessToken) {
          return {
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          };
        }

        // TODO: 코드값 enum화
        if (data.code !== "S000") {
          throw new Error("Error");
        }

        return true;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      if (token.accessToken) {
        // TODO: jwt parsing  zod 이용하여 안정성확보.
        const base64payload = String(token.accessToken).split(".")[1];
        const payload = Buffer.from(base64payload, "base64");
        const result = JSON.parse(payload.toString()) as { exp: number };

        if (result.exp < Date.now() / 1000) {
          const { data } = await rotateRefreshToken({
            accessToken: token.accessToken as string,
            refreshToken: token.refreshToken as string,
          });

          return {
            ...token,
            accessToken: data.data.accessToken,
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken as string;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const sendLogin = ({ email, password }: LoginParams) => {
  return axios.post<CommonResponse<LoginResponse>>(
    `${API_HOST}/api/auth/login`,
    { email, password }
  );
};

interface RotateRefreshTokenParams {
  accessToken: string;
  refreshToken: string;
}

interface RotateRefreshTokenResponse {
  accessToken: string;
}

const rotateRefreshToken = ({
  accessToken,
  refreshToken,
}: RotateRefreshTokenParams) => {
  return axios.post<CommonResponse<RotateRefreshTokenResponse>>(
    `${API_HOST}/api/auth/refresh-access-token`,
    {
      accessToken,
      refreshToken,
    }
  );
};
