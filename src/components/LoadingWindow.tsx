import React, { useEffect, useState } from "react";
import './LoadingWindow.scss';
import { Window } from "./Window";
import { ProgressBar } from "./ProgressBar";

type LoadingWindowProps = {
  onCompleted?: () => void
}

export function LoadingWindow(props: LoadingWindowProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimeout = setTimeout(() => {
      setProgress(progress + 3);

      if (progress >= 100) {
        clearTimeout(progressTimeout)
        if (props.onCompleted) props.onCompleted();
      }
    }, 100);

    return () => clearTimeout(progressTimeout)
  })

  return (
    <Window title="Generowanie" initialSize={{width: 300}} center=".window--main">
      <p className="loading-window__text">Czekaj, trwa generowanie...</p>
      <ProgressBar progress={progress}></ProgressBar>
    </Window>
  )
}