import { Fragment, ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HomeLayout } from '../components/HomeLayout';
import Layout from '../components/Layout';
import { MortgagePaymentOutput } from '../components/MortgageCalculator/Output';
import { Radio, RadioGroup } from '../components/Radio';
import { Button, Description, Spacer, Title } from '../components/sharedstyles';
import { Slider } from '../components/Slider';
import { useAsync } from '../hooks/useAsync';
import { fetchMortgage, MortgageData } from '../utils/api-client';
import type { NextPageWithLayout } from './_app';

const MortgageCalculatorWrapper = styled.div`
  > div:last-child {
    margin-top: 36px;

    @media screen and (min-width: 768px) {
      margin-top: 0px;
    }
  }

  @media screen and (min-width: 768px) {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr 1fr;

    > div:first-child {
      width: 76%;
    }
  }

  @media screen and (min-width: 896px) {
    max-width: 1024px;
  }
`;

const InputsWrapper = styled.div`
  > div:not(:last-child) {
    margin-bottom: 32px;

    @media screen and (min-width: 896px) {
      margin-bottom: 42px;
    }
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
        annualInterestRate: annualInterestRate / 100,
        termOfLoan,
      })
    );
  }, [principal, annualInterestRate, termOfLoan, run]);

  return (
    <Fragment>
      <Title>Get started with Digital Credit Experience</Title>
      <Spacer size={6} />
      <Description>Qualify or apply your mortgage in minutes</Description>
      <Spacer size={36} />
      <MortgageCalculatorWrapper>
        <InputsWrapper>
          <Slider
            type="price"
            label="Purchase Price"
            defaultValue={principal}
            min={50000}
            max={2500000}
            onChange={setPrincipal}
          />
          <Slider
            type="percentage"
            label="Interest Rate"
            defaultValue={annualInterestRate}
            min={0}
            max={2500}
            onChange={setAnnualInterestRate}
          />
          <RadioGroup
            label="Period"
            onSelect={setTermOfLoan}
            defaultValue={termOfLoan.toString()}
          >
            <Radio value="20">20 Years</Radio>
            <Radio value="25">25 Years</Radio>
            <Radio value="30">30 Years</Radio>
          </RadioGroup>
        </InputsWrapper>
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
