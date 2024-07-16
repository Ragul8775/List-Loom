import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt, { compare } from "bcryptjs";
import { createUser, getUserByEmail } from "@/models/user";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "abc@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          if (!credentials) {
            throw new Error("No credentials provided");
          }
          const user = await getUserByEmail(credentials.email);

          if (!user) {
            throw new Error("User not found");
          }
          const passwordCorrect = await compare(
            credentials.password,
            user.passwordhash
          );

          if (passwordCorrect) {
            return { id: user.id, name: user.name, email: user.email };
          } else {
            throw new Error("Password incorrect");
          }
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const email = user.email;
        let existingUser = await getUserByEmail(email!);

        if (!existingUser) {
          const newUser = {
            name: user.name!,
            email: user.email!,
            passwordhash: "",
          };
          existingUser = await createUser(newUser);
        }
        user.id = existingUser.id.toString();
      }
      return true;
    },
  },
});
