import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const useSecureCookies = !!process.env.VERCEL_URL;

export default NextAuth({
  providers: [
    {
      id: "epic-mychart",
      name: "Epic MyChart",
      type: "oauth",
      wellKnown:
        "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/.well-known/openid-configuration",
      authorization: { params: { scope: "PATIENT.READ" } },
      idToken: true,
      checks: ["state"],
      clientId: process.env.EPIC_MYCHART_CLIENT_ID as string,
      clientSecret: process.env.EPIC_MYCHART_CLIENT_SECRET as string,
      profile(profile) {
        console.log(profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
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
