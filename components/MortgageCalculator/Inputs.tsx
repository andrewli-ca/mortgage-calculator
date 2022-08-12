import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Radio, RadioGroup } from '../Radio';
import { Slider } from '../Slider';

const InputsWrapper = styled.div`
  > div:not(:last-child) {
    margin-bottom: 32px;

    @media screen and (min-width: 896px) {
      margin-bottom: 42px;
    }
  }
`;

interface MortgagePaymentInputsProps {
  principal: number;
  setPrincipal: Dispatch<SetStateAction<number>>;
  annualInterestRate: number;
  setAnnualInterestRate: Dispatch<SetStateAction<number>>;
  termOfLoan: number;
  setTermOfLoan: Dispatch<SetStateAction<number>>;
}

function MortgagePaymentInputs({
  principal,
  setPrincipal,
  annualInterestRate,
  setAnnualInterestRate,
  termOfLoan,
  setTermOfLoan,
}: MortgagePaymentInputsProps) {
  return (
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
  );
}

export { MortgagePaymentInputs };
