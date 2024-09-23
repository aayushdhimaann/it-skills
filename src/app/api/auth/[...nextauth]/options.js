import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/app/model/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        try {
          const user = await User.findOne({
            // $or is used to with multiple edge cases like with username or with email
            $or: [{ email: credentials.identifier }],
          });
          if (!user) {
            throw new Error("No user exists with this email of password");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect email of password");
          } else {
            return user;
          }
        } catch (error) {
          throw new Error("Error while signing user");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token?._id;
        session.user._email = token?._email;
        session.user._username = token?._username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user?._id.toString();
        token._email = user?.email;
        token._username = user?.username;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
