import styled from 'styled-components';
import { MortgageData } from '../../utils/api-client';
import { Button, Card, Spacer, Spinner } from '../sharedstyles';

const CardWrapper = styled(Card)`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 36px;
  padding-bottom: 36px;
  padding-left: 32px;
  padding-right: 32px;

  @media screen and (min-width: 768px) {
    padding-top: 24px;
    padding-bottom: 24px;
  }

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

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

interface StyledPaymentAmountProps {
  dollars: number;
}

const StyledPaymentAmount = styled.div<StyledPaymentAmountProps>`
  text-align: center;
  margin-top: 32px;
  margin-bottom: 32px;

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
    font-size: ${(props) =>
      props.dollars.toString().length <= 3 ? '28px' : '26px'};
    line-height: ${(props) =>
      props.dollars.toString().length <= 3 ? 1.5 : 1.8};

    @media screen and (min-width: 768px) {
      font-size: ${(props) =>
        props.dollars.toString().length <= 3 ? '32px' : '24px'};
      line-height: ${(props) =>
        props.dollars.toString().length <= 3 ? 1.5 : 1.8};
    }

    @media screen and (min-width: 896px) {
      font-size: ${(props) =>
        props.dollars.toString().length <= 3 ? '32px' : '36px'};
      line-height: ${(props) =>
        props.dollars.toString().length <= 3 ? 1.4 : 1.9};
    }
  }

  .dollars {
    font-size: ${(props) =>
      props.dollars.toString().length <= 3 ? '76px' : '56px'};
    line-height: ${(props) =>
      props.dollars.toString().length <= 3 ? 1 : 1.25};
    vertical-align: top;

    @media screen and (min-width: 768px) {
      font-size: ${(props) =>
        props.dollars.toString().length <= 3 ? '76px' : '52px'};
    }

    @media screen and (min-width: 896px) {
      font-size: 82px;
    }
  }

  .unit {
    margin-top: 32px;
    letter-spacing: 0em;
  }
`;

interface PaymentAmountProps {
  dollars: number;
  cents: number;
}

function PaymentAmount({ dollars, cents }: PaymentAmountProps) {
  console.log({ dollars });

  return (
    <StyledPaymentAmount dollars={dollars}>
      <span className="symbol">$</span>
      <span className="dollars">{new Intl.NumberFormat().format(dollars)}</span>
      <span className="cents">{String(cents).padStart(2, '0')}</span>
      <p className="unit">/month</p>
    </StyledPaymentAmount>
  );
}

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
    <CardWrapper>
      <ContentWrapper>
        <p>Your total monthly payment will be</p>
        <PaymentAmount dollars={dollars} cents={cents} />
        <ApplyButton>Apply Today</ApplyButton>
      </ContentWrapper>
    </CardWrapper>
  );
}

function MortgagePaymentLoading() {
  return (
    <CardWrapper>
      <Spinner />
      <Spacer size={12} />
      <p>calculating</p>
    </CardWrapper>
  );
}

function MortgagePaymentError({ error }: { error: Error | undefined | null }) {
  return (
    <CardWrapper>
      <p>{error?.message || 'Unable to calculate mortgage.'}</p>
    </CardWrapper>
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
