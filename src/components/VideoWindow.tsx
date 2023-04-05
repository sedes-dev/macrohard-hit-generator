import React from "react"
import { Window } from "./Window";
import './VideoWindow.scss';

type VideoWindowProps = {
  ytId: string,
  title: string,
  onVideoWindowClose?: () => void
}

export function VideoWindow(props: VideoWindowProps) {
  const onCloseClickHandler = () => {
    if (props.onVideoWindowClose) {
      props.onVideoWindowClose();
    }
  }

  return (
    <Window
      initialSize={{width: 566}}
      title={props.title}
      onClose={onCloseClickHandler}
      noSpacing={true}
      center=".window--main"
    >
      <div className="video-window">
        <iframe
          className="video-window__iframe"
          width="560"
          height="315"
          title={props.title}
          src={`https://www.youtube-nocookie.com/embed/${props.ytId}?autoplay=1&showinfo=0&controls=0`}
          allow="autoplay"
        >
        </iframe>
        <div className="video-window__overlay"></div>
      </div>
    </Window>
  )
}