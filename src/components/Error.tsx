import React from "react";
import { Window } from './Window';
import './Error.scss';

type ErrorProps = {
  onClose?: () => void
}

export function Error(props: ErrorProps) {
  return (
    <Window
      title="ERROR"
      initialSize={{width: 300}}
      onClose={props.onClose}
      center=".window--main"
    >
      <div className="error">
        <p className="error__message">Błąd! Czy na pewno zaznaczyłeś/aś wszystkie wymagane opcje?</p>
        <button className="error__close" onClick={props.onClose}>Zamknij</button>
      </div>
    </Window>
  );
}