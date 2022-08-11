import { Fragment, ReactElement } from 'react';
import styled from 'styled-components';
import { HomeLayout } from '../components/HomeLayout';
import Layout from '../components/Layout';
import { Radio, RadioGroup } from '../components/Radio';
import {
  Button,
  Card,
  Description,
  Spacer,
  Title,
} from '../components/sharedstyles';
import { Slider } from '../components/Slider';
import type { NextPageWithLayout } from './_app';

const PaymentAmountWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 36px;
  padding-bottom: 18px;
  padding-left: 32px;
  padding-right: 32px;

  & p {
    color: #9faeb9;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
  }
`;

const PaymentAmount = styled.div`
  text-align: center;
  margin-top: 56px;

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

const MortgageCalculatorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 672px;
  gap: 80px;

  > div:nth-child(1) {
    flex-grow: 1;
    min-width: 256px;

    @media screen and (min-width: 768px) {
      max-width: 256px;
      flex-grow: 0;
    }
  }

  > div:nth-child(2) {
    flex-grow: 1;
  }
`;

const Page: NextPageWithLayout = () => {
  return (
    <Fragment>
      <Title>Get started with Digital Credit Experience</Title>
      <Spacer size={6} />
      <Description>Qualify or apply your mortgage in minutes</Description>
      <Spacer size={36} />
      <MortgageCalculatorWrapper>
        <div>
          <Slider
            type="price"
            label="Purchase Price"
            value={250000}
            min={50000}
            max={2500000}
          />
          <Spacer size={36} />
          <Slider
            type="percentage"
            label="Interest Rate"
            value={150}
            min={0}
            max={2500}
          />
          <Spacer size={36} />
          <RadioGroup label="Period">
            <Radio value="20">20 Years</Radio>
            <Radio value="25">25 Years</Radio>
            <Radio value="30">30 Years</Radio>
          </RadioGroup>
        </div>
        <div>
          <Card>
            <PaymentAmountWrapper>
              <p>Your total monthly payment will be</p>
              <PaymentAmount>
                <span className="symbol">$</span>
                <span className="dollars">853</span>
                <span className="cents">50</span>
                <p className="unit">/month</p>
              </PaymentAmount>
            </PaymentAmountWrapper>
            <Spacer size={48} />
            <ApplyButton>Apply Today</ApplyButton>
          </Card>
        </div>
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
