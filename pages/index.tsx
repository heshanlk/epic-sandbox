import { signIn, signOut, useSession } from 'next-auth/react'
import {
  Button,
  Layout,
  Link,
  Page,
  Text,
  List,
  Code,
} from '@vercel/examples-ui'

export default function Home() {
  const { data, status } = useSession()

  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Epic Sandbox</Text>
        <Text>
          Applications must secure and protect the privacy of patients and their data. To help meet this objective, Epic supports using the OAuth 2.0 framework to authenticate and authorize applications.
        </Text>
      </section>

      <hr className="border-t border-accents-2 my-6" />

      <section className="flex flex-col gap-3">
        {status === 'authenticated' ? (
          <section className="flex flex-col gap-3">
            Welcome {data?.user?.name}!{' '}
            <Button onClick={() => signOut()}>Sign out</Button>
            <List>
              <li>
                <Link href="https://subdomain.solutions-subdomain-auth.vercel.sh">
                  subdomain.solutions-subdomain-auth.vercel.sh
                </Link>
              </li>
              <li>
                <Link href="https://solutions-subdomain-auth.vercel.sh">
                  solutions-subdomain-auth.vercel.sh
                </Link>
              </li>
            </List>
          </section>
        ) : status === 'loading' ? (
          <section className="text-center">
            <Text>Loading...</Text>
          </section>
        ) : (
          <section className="m-auto w-fit">  
            <Button size="lg" onClick={() => signIn('epic-mychart')}>
              Sign in with Epic MyChart
            </Button>
          </section>
        )}
      </section>
    </Page>
  )
}

Home.Layout = Layout
