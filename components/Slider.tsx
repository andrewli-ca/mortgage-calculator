import {
  SliderHandle,
  SliderInput,
  SliderMarker,
  SliderRange,
  SliderTrack,
} from '@reach/slider';
import '@reach/slider/styles.css';
import styled from 'styled-components';

const SliderWrapper = styled.div`
  label {
    color: #929ba4;
    font-size: 12px;
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
  top: 16px;
  left: ${(props) => (props.type === 'min' ? '0px' : 'auto')};
  right: ${(props) => (props.type === 'max' ? '0px' : 'auto')};
  color: #929ba4;
  font-size: 12px;
`;

const StyledSliderHandle = styled(SliderHandle)`
  background: #fff;
  border: 2px solid #a4c4de;
  width: 14px;
  height: 14px;
`;

const DisplayValue = styled.div`
  padding-top: 12px;
  padding-bottom: 16px;
  margin-left: 4px;
  font-weight: 500;
  color: #4b5563;

  .symbol {
    display: inline-block;
    font-size: 18px;
    line-height: 1.3;
    vertical-align: top;
    min-width: 16px;
  }

  .value,
  .percentage {
    font-size: 32px;
    line-height: 1;
  }
`;

interface BaseSliderProps {
  label: string;
  value?: number;
  displayValue: any;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
}

function BaseSlider({
  label,
  value,
  displayValue,
  min,
  max,
  minLabel,
  maxLabel,
}: BaseSliderProps) {
  return (
    <SliderWrapper>
      <label>{label}</label>
      {displayValue}
      <StyledSliderInput min={0} max={100}>
        <StyledSliderTrack>
          <StyledSliderMarker value={0}>
            <StyledSliderMarkerLabel type="min">
              {minLabel}
            </StyledSliderMarkerLabel>
          </StyledSliderMarker>
          <StyledSliderRange />
          <StyledSliderMarker value={100}>
            <StyledSliderMarkerLabel type="max">
              {maxLabel}
            </StyledSliderMarkerLabel>
          </StyledSliderMarker>
          <StyledSliderHandle />
        </StyledSliderTrack>
      </StyledSliderInput>
    </SliderWrapper>
  );
}

function getPriceLabel(value: number) {
  if (value >= 1000000) {
    return `${value / 1000000}M`;
  }

  // for values in the thousands
  return `${value / 1000}K`;
}

function getPercentageLabel(value: number) {
  if (value > 0) {
    return `${value / 100}%`;
  }

  return `0`;
}

interface SliderProps {
  type: 'price' | 'percentage';
  label: string;
  value: number;
  min: number;
  max: number;
}

function Slider({ label, type, value, min, max }: SliderProps) {
  let sliderOptions;

  if (type === 'price') {
    sliderOptions = {
      minLabel: getPriceLabel(min),
      maxLabel: getPriceLabel(max),
      formattedValue: new Intl.NumberFormat().format(value),
    };
  } else if (type === 'percentage') {
    sliderOptions = {
      minLabel: getPercentageLabel(min),
      maxLabel: getPercentageLabel(max),
      formattedValue: value / 100,
    };
  }

  return (
    <BaseSlider
      label={label}
      displayValue={
        <DisplayValue>
          <span className="symbol">{type === 'price' ? '$' : ''}</span>
          <span className="value">{sliderOptions?.formattedValue}</span>
          {type === 'percentage' ? <span className="percentage">%</span> : null}
        </DisplayValue>
      }
      min={min}
      max={max}
      minLabel={sliderOptions?.minLabel}
      maxLabel={sliderOptions?.maxLabel}
    />
  );
}

export { Slider };
