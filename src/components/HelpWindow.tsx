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
      <br/>
      <p className="help-window__text">
        Made with 💩 by <a href="https://sedes.dev" target="_blank" rel="noreferrer">sedes.dev</a><br/>
        Ilość kawałków w bazie: {tracks.length}<br/>
        Playlista na <a href="https://open.spotify.com/playlist/4mTbaoYXTfqrAjn47j11GY?si=b3efe4f7cedc4cb4" target="_blank" rel="noreferrer">Spotify</a><br/>
        Retro styl <a href="https://jdan.github.io/98.css/" target="_blank" rel="noreferrer">98.css</a>
      </p>
    </Window>
  )
}