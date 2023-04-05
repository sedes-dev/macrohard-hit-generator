import React, { useState } from "react";
import './LevelSlider.scss';

type LevelSliderProps<ValueType extends number> = {
  name: string,
  minLabel: string,
  maxLabel: string,
  minValue: number,
  maxValue: number,
  selected: ValueType,
  onChange?: (value: ValueType) => void 
}

export function LevelSlider<ValueType extends number>(props: LevelSliderProps<ValueType>) {
  const [value, setValue] = useState(`${props.selected}`);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== value) {
      setValue(event.target.value)
      if (props.onChange) {
        props.onChange(Number(event.target.value) as ValueType);
      }
    }
  }

  return (
    <div className="level-slider">
      <div className="level-slider__labels">
        <label>{props.minLabel}</label>
        <label>{props.maxLabel}</label>
      </div>
      <div className="level-slider__field-row field-row">
        <input
          id={props.name} name={props.name}
          type="range"
          min={props.minValue}
          max={props.maxValue}
          value={value}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  )
}