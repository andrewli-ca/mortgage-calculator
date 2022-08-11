import { ReactElement } from 'react';
import { HomeLayout } from '../components/HomeLayout';
import Layout from '../components/Layout';

import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Get started with Digital Credit Experience</h1>
      <p>Qualify or apply your mortgage in minutes</p>
    </div>
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
