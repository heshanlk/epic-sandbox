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
      // @ts-expect-error - TODO fix this
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
          const url = new URL(`${provider.userinfo?.url}/${tokens.patient}`);
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
        return profile;
      },
    },
  ],
  secret: process.env.SECRET as string,
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: ".solutions-subdomain-auth.vercel.sh",
        secure: useSecureCookies,
      },
    },
  },
});
