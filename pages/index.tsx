import { Fragment, ReactElement } from 'react';
import styled from 'styled-components';
import { HomeLayout } from '../components/HomeLayout';
import Layout from '../components/Layout';
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

  & p {
    color: #9faeb9;
    font-weight: 500;
    text-align: center;
  }
`;

const PaymentAmount = styled.div`
  text-align: center;
  margin-top: 48px;

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
    font-size: 82px;
    line-height: 1;
    vertical-align: top;
  }

  .unit {
    margin-top: 32px;
    margin-bottom: 32px;
    letter-spacing: 0em;
  }
`;

const ApplyButton = styled(Button)`
  position: absolute;
  left: 0;
  right: 0;
  width: fit-content;
  margin: 0 auto;
`;

const Page: NextPageWithLayout = () => {
  return (
    <Fragment>
      <Title>Get started with Digital Credit Experience</Title>
      <Spacer size={8} />
      <Description>Qualify or apply your mortgage in minutes</Description>
      <Spacer size={48} />
      <form>
        <Slider
          type="price"
          label="Purchase Price"
          value={250000}
          min={50000}
          max={2500000}
        />
        <Spacer size={48} />
        <Slider
          type="percentage"
          label="Interest Rate"
          value={150}
          min={0}
          max={2500}
        />
        <Spacer size={48} />
      </form>
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
        <ApplyButton>Apply Today</ApplyButton>
      </Card>
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
