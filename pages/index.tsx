import { Fragment, ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HomeLayout } from '../components/HomeLayout';
import Layout from '../components/Layout';
import { MortgagePaymentInputs } from '../components/MortgageCalculator/Inputs';
import { MortgagePaymentOutput } from '../components/MortgageCalculator/Output';
import { Description, Spacer, Title } from '../components/sharedstyles';
import { useAsync } from '../hooks/useAsync';
import { fetchMortgage, MortgageData } from '../utils/api-client';
import type { NextPageWithLayout } from './_app';

const MortgageCalculatorWrapper = styled.div`
  margin-top: 36px;

  > div:last-child {
    margin-top: 36px;

    @media screen and (min-width: 768px) {
      margin-top: 0px;
    }
  }

  @media screen and (min-width: 768px) {
    display: grid;
    gap: 24px;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

    > div:first-child {
      width: 76%;
    }
  }

  @media screen and (min-width: 896px) {
    max-width: 1024px;
  }
`;

const Page: NextPageWithLayout = () => {
  const [principal, setPrincipal] = useState(250000);
  const [annualInterestRate, setAnnualInterestRate] = useState(150);
  const [termOfLoan, setTermOfLoan] = useState(20);
  const { run, data, error, isLoading } = useAsync<MortgageData>();

  useEffect(() => {
    run(
      fetchMortgage({
        principal,
        annualInterestRate: annualInterestRate / 10,
        termOfLoan,
      })
    );
  }, [principal, annualInterestRate, termOfLoan, run]);

  return (
    <Fragment>
      <Title>Get started with Digital Credit Experience</Title>
      <Spacer size={6} />
      <Description>Qualify or apply your mortgage in minutes</Description>

      <MortgageCalculatorWrapper>
        <MortgagePaymentInputs
          principal={principal}
          termOfLoan={termOfLoan}
          annualInterestRate={annualInterestRate}
          setPrincipal={setPrincipal}
          setAnnualInterestRate={setAnnualInterestRate}
          setTermOfLoan={setTermOfLoan}
          isLoading={isLoading}
        />
        <MortgagePaymentOutput
          data={data}
          isLoading={isLoading}
          error={error}
        />
      </MortgageCalculatorWrapper>
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
