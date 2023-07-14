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
import { useEffect, useState } from 'react'
import { FhirResource, fhirVersions } from 'fhir-react';


export default function Home() {
  
  const { data, status } = useSession()
  const [appointments, setAppointments] = useState();

  useEffect(() => {
    async function fetchData() {
      const appointments = await fetch(`https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation/?patient=${data?.user?.id}&category=laboratory&_count=10`, {
        headers: {
          "Content-Type": "application/fhir+json",
          Accept: "application/json",
          Authorization: `Bearer ${data?.accessToken}`,
        },
      }).then((res) => res.json());
      // console.log({appointments})
      setAppointments(appointments)
    }
    if (data?.accessToken) {
      fetchData();
    }
    
  }, [data]);

  console.log(appointments);

  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Observation.Search</Text>
      </section>

      <hr className="border-t border-accents-2 my-3" />

      <section className="flex flex-col gap-3">
        {status === 'authenticated' ? (
          <section className="flex flex-col gap-3">
            <FhirResource
                  fhirResource={appointments}
                  fhirVersion={fhirVersions.R4}
                  // fhirIcons={false}
                  withCarinBBProfile
                  withDaVinciPDex
                  thorough
                />
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
