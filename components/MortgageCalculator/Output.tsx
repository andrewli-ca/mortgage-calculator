import { Fragment } from 'react';
import styled from 'styled-components';
import { MortgageData } from '../../utils/api-client';
import { Button, Spacer, Card, Spinner } from '../sharedstyles';

const Wrapper = styled(Card)`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

function MortgagePaymentResults({
  dollars,
  cents,
}: {
  dollars: number;
  cents: number;
}) {
  return (
    <Wrapper>
      <p>Your total monthly payment will be</p>
      <PaymentAmount>
        <Fragment>
          <span className="symbol">$</span>
          <span className="dollars">
            {new Intl.NumberFormat().format(dollars)}
          </span>
          <span className="cents">{String(cents).padStart(2, '0')}</span>
          <p className="unit">/month</p>
        </Fragment>
      </PaymentAmount>
      <Spacer size={48} />
      <ApplyButton>Apply Today</ApplyButton>
    </Wrapper>
  );
}

function MortgagePaymentLoading() {
  return (
    <Wrapper>
      <Spinner />
      <Spacer size={12} />
      <p>calculating</p>
    </Wrapper>
  );
}

function MortgagePaymentError({ error }: { error: Error | undefined | null }) {
  return (
    <Wrapper>
      <p>{error?.message || 'Unable to calculate mortgage.'}</p>
    </Wrapper>
  );
}

interface MortgagePaymentProps {
  isLoading: boolean;
  data: MortgageData | null | undefined;
  error: Error | undefined | null;
}

function MortgagePaymentOutput({
  isLoading,
  data,
  error,
}: MortgagePaymentProps) {
  if (isLoading) {
    return <MortgagePaymentLoading />;
  } else if (data) {
    return <MortgagePaymentResults dollars={data.dollars} cents={data.cents} />;
  }

  return <MortgagePaymentError error={error} />;
}

export { MortgagePaymentOutput };
