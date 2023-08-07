import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        let obj = JSON.stringify({
          email,
          password,
        });
        var requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: obj,
        };

        console.log("Request options: ", requestOptions);
        try {
          const res = await fetch(
            "http://3.145.60.30/api/v1/users/login",
            requestOptions
          );
          const resJson = await res.json();
          console.log("Result is: ", resJson);

          if (resJson.status === "fail") {
            throw Error("Credentials are invalid. Please try again.");
          }

          let user = resJson.data.user;
          let token = resJson.token;
          return {
            name: user.name,
            email: user.email,
            role: user.role,
            id: user._id,
            token: token,
          };
        } catch (error) {
          throw Error("There was an unexpected error. Please try again later.");
        }
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
        params.token.jwt = params.user.token;
      }
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role: string }).role = token.role as string;
        (session.user as { id: string }).id = token.id as string;
        (session.user as { jwt: string }).jwt = token.jwt as string;
      }
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
