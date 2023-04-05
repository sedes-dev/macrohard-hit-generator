import React from "react";
import packageJson from '../../package.json';
import { Window } from "./Window";
import { tracks } from "../data/tracks";
import './HelpWindow.scss';

type HelpWindowProps = {
  onClose: () => void
}

export function HelpWindow(props: HelpWindowProps) {
  return (
    <Window title="Info" initialSize={{width: 300}} onClose={props.onClose} center=".window--main">
      <p><strong>Macrohard Hit Generator v{packageJson.version}</strong></p>
      <hr className="help-window__divider"/>
      <p>Ilość kawałków w bazie: {tracks.length}</p>
      <p>Made with 💩 by <a href="https://sedes.dev" target="_blank" rel="noreferrer">sedes.dev</a></p>
    </Window>
  )
}