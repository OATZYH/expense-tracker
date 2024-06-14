import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: 'john@doe.com' },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const db = await pool.getConnection();
        try {
          const query = "SELECT * FROM user WHERE email = ? ";
          const [rows] = await db.execute(query, [credentials.email]);

          if (rows.length === 0) {
            console.log("No user found with this identifier");
            return null;
          }

          const user = rows[0];
          const passwordValid = bcrypt.compareSync(credentials.password, user.password_hash);
          
          if (!passwordValid) {
            console.log("Password is incorrect");
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error in authorization:", error);
          return null;
        } finally {
          db.release();
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
