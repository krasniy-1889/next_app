import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';


export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId:
        '1062315001535-9b0gau20egpkirmbn9jtmna0futf6mng.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const res = await fetch('http://127.0.0.1:8000/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await res.json();
        if (res.ok && data.access) {
          return data;
        }
      },
    }),
  ],
});

export const session = ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> => {
  if (
    Date.now() / 1000 > token?.accessTokenExpires &&
    token?.refreshTokenExpires &&
    Date.now() / 1000 > token?.refreshTokenExpires
  ) {
    return Promise.reject({
      error: new Error(
        'Refresh token has expired. Please log in again to get a new refresh token.'
      ),
    });
  }

  const accessTokenData = JSON.parse(atob(token.token.split('.')?.at(1)));
  session.user = accessTokenData;
  token.accessTokenExpires = accessTokenData.exp;

  session.token = token?.token;

  return Promise.resolve(session);
};

export const jwt = async ({ token, user }: { token: JWT; user?: User }) => {
  // first call of jwt function just user object is provided
  if (user?.email) {
    return { ...token, ...user };
  }

  // on subsequent calls, token is provided and we need to check if it's expired
  if (token?.accessTokenExpires) {
    if (Date.now() / 1000 < token?.accessTokenExpires)
      return { ...token, ...user };
  } else if (token?.refreshToken) return refreshAccessToken(token);

  return { ...token, ...user };
};

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      secure: true,
    },
  },
  callbackUrl: {
    name: `next-auth.callback-url`,
    options: {},
  },
  csrfToken: {
    name: 'next-auth.csrf-token',
    options: {},
  },
};
