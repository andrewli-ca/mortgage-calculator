import { useFocusRing } from '@react-aria/focus';
import {
  AriaRadioGroupProps,
  AriaRadioProps,
  useRadio,
  useRadioGroup,
} from '@react-aria/radio';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { RadioGroupState, useRadioGroupState } from '@react-stately/radio';
import * as React from 'react';
import styled from 'styled-components';
import { Spacer } from './sharedstyles';

let RadioContext = React.createContext<RadioGroupState | null>(null);

interface RadioGroupProps {
  children: React.ReactChild[];
  onSelect: any;
}

const StyledRadioGroup = styled.div`
  > span {
    color: #929ba4;
    font-size: 10px;

    @media screen and (min-width: 896px) {
      font-size: 12px;
    }
  }

  > label:not(:last-child) {
    padding-bottom: 6px;

    @media screen and (min-width: 896px) {
      padding-bottom: 12px;
    }
  }
`;

function RadioGroup(props: AriaRadioGroupProps & RadioGroupProps) {
  let { children, onSelect, label } = props;
  let state = useRadioGroupState(props);
  let { radioGroupProps, labelProps } = useRadioGroup(props, state);

  React.useEffect(() => {
    if (state.selectedValue) {
      onSelect(+state.selectedValue);
    }
  }, [onSelect, state.selectedValue]);

  return (
    <StyledRadioGroup {...radioGroupProps}>
      <span {...labelProps}>{label}</span>
      <Spacer size={12} />
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </StyledRadioGroup>
  );
}

interface StyleRadioProps {
  isDisabled: boolean;
}

const StyledRadio = styled.label<StyleRadioProps>`
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.isDisabled ? 0.4 : 1)};
  font-weight: 600;
  color: #000;
  font-size: 13px;

  @media screen and (min-width: 896px) {
    font-size: 16px;
  }
`;

function Radio(props: AriaRadioProps) {
  let { children } = props;
  let state = React.useContext(RadioContext);
  let ref = React.useRef(null);
  let { inputProps, isSelected, isDisabled } = useRadio(
    props,
    state as RadioGroupState,
    ref
  );
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <StyledRadio isDisabled={isDisabled}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <svg
        fill="currentColor"
        style={{ marginRight: 12 }}
        width={24}
        height={24}
        aria-hidden="true"
        viewBox="0 0 30 30"
      >
        <circle
          cx="15"
          cy="15"
          r="13"
          fill="none"
          stroke={isSelected ? '#4C3272' : '#807D85'}
          strokeWidth="2"
        />
        <circle cx="15" cy="15" r="8" fill={isSelected ? '#4C3272' : 'none'} />
        {isFocusVisible && <circle cx="15" cy="15" r="8" fill={'#4C3272'} />}
      </svg>
      {children}
    </StyledRadio>
  );
}

export { RadioGroup, Radio };
