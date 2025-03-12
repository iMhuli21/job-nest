import bcryptjs from 'bcryptjs';
import prisma from './lib/db';
import { signInSchema } from '@/lib/schemas';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { AuthError } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export class InvalidLoginError extends AuthError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token }) {
      return token;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.userId = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const validData = signInSchema.safeParse(credentials);

        if (validData.error) {
          throw new InvalidLoginError('Invalid login details.');
        }

        const { email, password } = validData.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new InvalidLoginError('Invalid login details.');
        }

        const isPassword = await bcryptjs.compare(password, user.password);

        if (!isPassword) {
          throw new InvalidLoginError('Email and password do not match.');
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 84600,
  },
  secret: process.env.AUTH_SECRET,
});
