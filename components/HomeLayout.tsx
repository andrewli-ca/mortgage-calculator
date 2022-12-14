import { ReactNode } from 'react';
import styled from 'styled-components';
import { Container } from './sharedstyles';
import Head from 'next/head';

const PageLayout = styled.div`
  background-color: #e3eaf7;
  box-shadow: inset 0 2px 21px -7px #9ca3e2;
  min-height: 100%;
  margin: auto;
  padding: 48px 16px;

  @media screen and (min-width: 768px) {
    padding: 60px 54px;
  }
`;

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <PageLayout>
      <Head>
        <title>Mortgage Calculator | Produce8</title>
        <meta
          name="description"
          content="Qualify or apply your mortgage in minutes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>{children}</Container>
    </PageLayout>
  );
}

export { HomeLayout };
