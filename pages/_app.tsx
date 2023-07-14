import type { AppProps } from 'next/app'
import type { LayoutProps } from '@vercel/examples-ui/layout'

import { SessionProvider } from 'next-auth/react'
import { getLayout } from '@vercel/examples-ui'

import 'fhir-react/build/style.css';
import 'fhir-react/build/bootstrap-reboot.min.css';

import '@vercel/examples-ui/globals.css'

function App({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component)

  return (
    <Layout
      title="Epic sandbox"
      path="solutions/subdomain-auth"
      description="How to use oAuth in Epic MyChart"
    >
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  )
}

export default App
