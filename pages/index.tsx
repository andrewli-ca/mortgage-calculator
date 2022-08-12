import { Fragment, ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HomeLayout } from '../components/HomeLayout';
import Layout from '../components/Layout';
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

const PaymentAmountWrapper = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 36px;
  padding-bottom: 18px;
  padding-left: 32px;
  padding-right: 32px;

  @media screen and (min-width: 896px) {
    padding-top: 60px;
    padding-bottom: 48px;
    padding-left: 32px;
    padding-right: 32px;
  }

  & p {
    color: #9faeb9;
    font-weight: 600;
    font-size: 14px;
    text-align: center;

    @media screen and (min-width: 896px) {
      font-size: 16px;
    }
  }
`;

const PaymentAmount = styled.div`
  text-align: center;
  margin-top: 60px;

  .symbol,
  .dollars,
  .cents {
    color: #3d515b;
    font-weight: 900;
    vertical-align: top;
    letter-spacing: 0.025em;
  }

  .symbol,
  .cents {
    font-size: 32px;
    line-height: 1.5;
  }

  .dollars {
    font-size: 72px;
    line-height: 1;
    vertical-align: top;

    @media screen and (min-width: 896px) {
      font-size: 82px;
    }
  }

  .unit {
    margin-top: 36px;
    letter-spacing: 0em;
  }
`;

const ApplyButton = styled(Button)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -24px;
  width: fit-content;
  margin: 0 auto;
`;

const Page: NextPageWithLayout = () => {
  const [principal, setPrincipal] = useState(250000);
  const [annualInterestRate, setAnnualInterestRate] = useState(150);
  const [termOfLoan, setTermOfLoan] = useState(20);
  const { run, data, isLoading } = useAsync<MortgageData>();

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

        <PaymentAmountWrapper>
          <p>Your total monthly payment will be</p>
          <PaymentAmount>
            {isLoading ? (
              <div>calculating...</div>
            ) : !data ? (
              <div>no data</div>
            ) : (
              <Fragment>
                <span className="symbol">$</span>
                <span className="dollars">
                  {new Intl.NumberFormat().format(data.dollars)}
                </span>
                <span className="cents">
                  {String(data.cents).padStart(2, '0')}
                </span>
                <p className="unit">/month</p>
              </Fragment>
            )}
          </PaymentAmount>
          <Spacer size={48} />
          <ApplyButton>Apply Today</ApplyButton>
        </PaymentAmountWrapper>
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
