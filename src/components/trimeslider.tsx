import React from 'react';
import { Range } from 'react-range';

interface TrimSliderProps {
  duration: number;
  onTrimChange: (start: number, end: number) => void;
}

const TrimSlider: React.FC<TrimSliderProps> = ({ duration, onTrimChange }) => {
  const [values, setValues] = React.useState([0, duration]);

  const handleChange = (newValues: number[]) => {
    setValues(newValues);
    onTrimChange(newValues[0], newValues[1]);
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <Range
        step={0.1}
        min={0}
        max={duration}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div {...props} style={{ ...props.style, height: '6px', background: '#ddd' }}>
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} style={{ ...props.style, height: '24px', width: '24px', background: '#999' }} />
        )}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Start: {values[0].toFixed(1)}s</span>
        <span>End: {values[1].toFixed(1)}s</span>
      </div>
    </div>
  );
};

export default TrimSlider;
