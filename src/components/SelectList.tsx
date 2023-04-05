import React from 'react';

type SelectListProps<ValueType extends string> = {
  options: {
    label: string,
    value: ValueType,
  }[],
  name: string,
  selected: ValueType[],
  multi: boolean,
  onChange?: (selected: ValueType[]) => void,
  max?: number
}

export function SelectList<ValueType extends string>(props: SelectListProps<ValueType>) {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      let newSelected: ValueType[];

      if (props.multi) {
        newSelected= [...props.selected];
        const valueIndex = newSelected.findIndex(value => value === event.target.value);

        if (valueIndex >= 0) {
          newSelected.splice(valueIndex, 1);
        } else if (!props.max || newSelected.length < props.max) {
          newSelected.push((event.target.value as ValueType));
        }
      } else {
        newSelected = [(event.target.value as ValueType)];
      }

      props.onChange(newSelected);
    }
  }

  return (
    <>
      {props.options.map(option => (
        <div className="field-row" key={`${props.name}_${option.value}`}>
          <input
            id={`${props.name}_${option.value}`}
            type={props.multi ? 'checkbox' : 'radio'}
            name={props.name}
            value={option.value}
            checked={props.selected.includes(option.value)}
            onChange={onChangeHandler}
          />
          <label htmlFor={`${props.name}_${option.value}`}>{option.label}</label>
        </div>
      ))}
    </>
  )
}