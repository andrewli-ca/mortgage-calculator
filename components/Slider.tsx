import {
  SliderHandle,
  SliderInput,
  SliderMarker,
  SliderRange,
  SliderTrack,
} from '@reach/slider';
import '@reach/slider/styles.css';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const SliderWrapper = styled.div`
  label {
    color: #929ba4;
    font-size: 10px;

    @media screen and (min-width: 896px) {
      font-size: 12px;
    }
  }
`;

const StyledSliderInput = styled(SliderInput)`
  height: 4px !important;
`;

const StyledSliderRange = styled(SliderRange)`
  background: #216ad4;
`;

const StyledSliderTrack = styled(SliderTrack)`
  background: #d1d6e2;
`;

const StyledSliderMarker = styled(SliderMarker)`
  background: transparent;
`;

interface StyledSliderMarkerLabelProps {
  type: 'min' | 'max';
}

const StyledSliderMarkerLabel = styled.span<StyledSliderMarkerLabelProps>`
  position: absolute;
  top: 14px;
  left: ${(props) => (props.type === 'min' ? '0px' : 'auto')};
  right: ${(props) => (props.type === 'max' ? '0px' : 'auto')};
  color: #929ba4;
  font-size: 10px;
  user-select: none;

  @media screen and (min-width: 896px) {
    top: 20px;
    font-size: 12px;
  }
`;

const StyledSliderHandle = styled(SliderHandle)`
  background: #fff;
  border: 2px solid #a4c4de;
  width: 12px;
  height: 12px;
`;

interface DisplayValueProps {
  disabled: boolean;
}

const DisplayValue = styled.div<DisplayValueProps>`
  padding-top: 8px;
  padding-bottom: 8px;
  margin-left: 4px;
  font-weight: 500;
  color: #4b5563;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};

  @media screen and (min-width: 896px) {
    padding-top: 12px;
    padding-bottom: 16px;
  }

  .symbol {
    display: inline-block;
    font-size: 13px;
    line-height: 1.2;
    vertical-align: top;
    min-width: 12px;

    @media screen and (min-width: 896px) {
      font-size: 18px;
      line-height: 1.3;
      min-width: 16px;
    }
  }

  .value,
  .percentage {
    font-size: 21px;
    line-height: 1;

    @media screen and (min-width: 896px) {
      font-size: 32px;
    }
  }
`;

interface BaseSliderProps {
  value: number;
  onChange: any;
  onEventUp: any;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  disabled: boolean;
}

function BaseSlider({
  value,
  onChange,
  onEventUp,
  min,
  max,
  minLabel,
  maxLabel,
  disabled,
}: BaseSliderProps) {
  return (
    <StyledSliderInput
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      onPointerUp={() => onEventUp()}
      onKeyUp={() => onEventUp()}
      disabled={disabled}
    >
      <StyledSliderTrack>
        <StyledSliderMarker value={min}>
          <StyledSliderMarkerLabel type="min">
            {minLabel}
          </StyledSliderMarkerLabel>
        </StyledSliderMarker>
        <StyledSliderRange />
        <StyledSliderMarker value={max}>
          <StyledSliderMarkerLabel type="max">
            {maxLabel}
          </StyledSliderMarkerLabel>
        </StyledSliderMarker>
        <StyledSliderHandle />
      </StyledSliderTrack>
    </StyledSliderInput>
  );
}

function getPriceLabel(value: number) {
  if (value >= 1000000) {
    return `$${value / 1000000}M`;
  }

  // for values in the thousands
  return `$${value / 1000}K`;
}

function getPercentageLabel(value: number) {
  if (value > 0) {
    return `${value / 10}%`;
  }

  return `0`;
}

function formatValue(type: 'price' | 'percentage', value: number): string {
  if (type === 'price') {
    return new Intl.NumberFormat().format(value);
  } else if (type === 'percentage') {
    return (value / 10).toString();
  }

  return '';
}

interface SliderProps {
  type: 'price' | 'percentage';
  label: string;
  defaultValue: number;
  onChange: any;
  min: number;
  max: number;
  disabled: boolean;
}

function Slider({
  label,
  type,
  defaultValue,
  onChange,
  min,
  max,
  disabled,
}: SliderProps) {
  const [value, setValue] = useState(defaultValue);
  const [isEventUp, setIsEventUp] = useState(false);

  useEffect(() => {
    if (!isEventUp) {
      return;
    }

    onChange(value);
    setIsEventUp(false);
  }, [isEventUp, onChange, value]);

  const labels = useMemo(() => {
    if (type === 'price') {
      return {
        minLabel: getPriceLabel(min),
        maxLabel: getPriceLabel(max),
      };
    } else if (type === 'percentage') {
      return {
        minLabel: getPercentageLabel(min),
        maxLabel: getPercentageLabel(max),
      };
    }
  }, [max, min, type]);

  return (
    <SliderWrapper>
      <label>{label}</label>
      <DisplayValue disabled={disabled}>
        <span className="symbol">{type === 'price' ? '$' : ''}</span>
        <span className="value">{formatValue(type, value)}</span>
        {type === 'percentage' ? <span className="percentage">%</span> : null}
      </DisplayValue>
      <BaseSlider
        value={value}
        onChange={setValue}
        onEventUp={() => setIsEventUp(true)}
        min={min}
        max={max}
        minLabel={labels?.minLabel}
        maxLabel={labels?.maxLabel}
        disabled={disabled}
      />
    </SliderWrapper>
  );
}

export { Slider };
