import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

// Providers
const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  authorization: {
    params: {
      scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
    },
  },
  profile(profile) {
    return {
      id: profile.sub,
      firstName: profile.given_name,
      secondName: profile.family_name,
      email: profile.email,
      image: profile.picture,
      likedProducts: [],
    };
  },
});

const githubProvider = GithubProvider({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  profile(profile) {
    return {
      id: profile.id,
      firstName: profile?.name,
      secondName: "",
      email: profile.email,
      image: profile.avatar_url,
      likedProducts: [],
    };
  },
});

const credentialsProvider = CredentialsProvider({
  type: "credentials",
  credentials: {},
  async authorize(credentials, req) {
    const { email, password } = credentials;

    try {
      const response = await axios.post(
        `/user/signIn`,
        {
          email: email,
          password: password,
        },
        { headers: { "Content-type": "application/json" } }
      );
      const user = response.data;

      if (response.status === 200) {
        return user;
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      throw new Error("User not authenticated");
    }
  },
});

// Callbacks
const callbacks = {
  async signIn({ user, account, profile }) {
    return true;
  },
  async jwt({ token, user, account, profile }) {
    if (account) {
      token.access_token = account.access_token;
      token.provider = account.provider;
      token.user = user;
    }
    return token;
  },
  async session({ session, token }) {
    session.provider = token.provider;
    session.access_token = token.access_token;
    session.user = token.user;
    return session;
  },
};

// Auth options
export const authOptions = {
  providers: [googleProvider, githubProvider, credentialsProvider],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  callbacks,
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth({
  ...authOptions,
  debug: process.env.NODE_ENV === "development" ? true : false,
});

//todo implement facebook and apple
// import FacebookProvider from "next-auth/providers/facebook";
// import AppleProvider from "next-auth/providers/apple";

// FacebookProvider({
//   clientId: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
// }),
// AppleProvider({
//   clientId: process.env.APPLE_ID,
//   clientSecret: process.env.APPLE_SECRET
// }),

//callback for user updating their information, so that session will be updated
// jwt({ token, trigger, session }) {
//   if (trigger === "update" && session?.name) {
//     // todo Noote, that `session` can be any arbitrary object, remember to validate it!
//     token.name = session.name;
//   }
//   return token;
// },
//  // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
//  async session({ session, trigger, newSession }) {
//   // Note, that `rest.session` can be any arbitrary object, remember to validate it!
//   if (trigger === "update" && newSession?.name) {
//     // You can update the session in the database if it's not already updated.
//     // await adapter.updateUser(session.user.id, { name: newSession.name })

//     // Make sure the updated value is reflected on the client
//     session.name = newSession.name
//   }
//   return session
// }
