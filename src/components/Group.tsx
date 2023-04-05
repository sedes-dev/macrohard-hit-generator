import React, {PropsWithChildren} from 'react';
import './Group.scss';

type GroupProps = {
  outerTitle?: string,
  innerTitle?: string
};

export function Group(props: PropsWithChildren<GroupProps>) {
  return (
    <fieldset className="group">
      {props.outerTitle && (
        <legend className="group__legend">{props.outerTitle}</legend>
      )}
      {props.innerTitle && (
        <div className="field-row">{props.innerTitle}</div>
      )}
      {
        props.children
      }
    </fieldset>
  )
}