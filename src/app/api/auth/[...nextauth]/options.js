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
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No user exists with this email of password");
          }
          console.log(user)
          if (!user.isVerified) {
            throw new Error("Please verify your account");
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
          throw new Error(error);
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
        session.user._role = token?._role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user?._id.toString();
        token._email = user?.email;
        token._username = user?.username;
        token._role = user?.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
