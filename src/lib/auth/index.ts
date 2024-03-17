import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig, User } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/prisma/index";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      // session.user.address is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      return {
        ...session,
        user: {
          ...session.user,
          address: user.email,
        },
      };
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
