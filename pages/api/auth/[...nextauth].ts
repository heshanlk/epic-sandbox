import NextAuth from "next-auth";

const useSecureCookies = !!process.env.VERCEL_URL;

export default NextAuth({
  // epic-sandbox.vercel.app/api/auth/callback/epic-mychart
  providers: [
    {
      id: "epic-mychart",
      name: "Epic MyChart",
      type: "oauth",
      authorization: {
        url: "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize",
        params: { scope: "PATIENT.READ" },
      },
      // @ts-expect-error
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.EPIC_MYCHART_CLIENT_ID as string}:${
            process.env.EPIC_MYCHART_CLIENT_SECRET as string
          }`
        ).toString("base64")}`,
      },
      token: "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token",
      userinfo: {
        url: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient",
        async request({ tokens, provider }) {
          const url = new URL(
            `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient/${tokens.patient}`
          );
          // @ts-ignore
          return fetch(url, {
            headers: {
              "Content-Type": "application/fhir+json",
              Accept: "application/json",
              Authorization: `Bearer ${tokens.access_token}`,
            },
          }).then((res) => res.json());
        },
      },
      clientId: process.env.EPIC_MYCHART_CLIENT_ID as string,
      clientSecret: process.env.EPIC_MYCHART_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name.find((i: any) => i.use === "official")?.text,
          email: profile.telecom.find((i: any) => i.system === "email")?.value,
          image: null,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          // @ts-ignore
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // console.log({ token });
      // Send properties to the client, like an access_token and user id from a provider.
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.user = token.user;
      // session.user = token.profile;
      return session;
    },
  },
  secret: process.env.SECRET as string,
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },
});
