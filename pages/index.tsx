import { Fragment, ReactElement } from 'react';
import { HomeLayout } from '../components/HomeLayout';
import Layout from '../components/Layout';
import { Description, Spacer, Title } from '../components/sharedstyles';
import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
  return (
    <Fragment>
      <Title>Get started with Digital Credit Experience</Title>
      <Spacer size={8} />
      <Description>Qualify or apply your mortgage in minutes</Description>
    </Fragment>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HomeLayout>{page}</HomeLayout>
    </Layout>
  );
};

export default Page;
