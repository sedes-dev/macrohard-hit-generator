import React, {useRef, useState, useEffect} from "react";
import './ProgressBar.scss';

type ProgressBarProps = {
  progress: number
}

export function ProgressBar(props: ProgressBarProps) {
  const progress = props.progress < 0 ? 0 : (props.progress > 100 ? 100 : props.progress);
  const [barsCount, setBarsCount] = useState(0);
  const mainEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainEl.current) {
      const progressBarWidth = mainEl.current.getBoundingClientRect().width;
      const totalCount = Math.ceil((progressBarWidth - 6) / 12);
      setBarsCount(Math.floor(totalCount * (progress / 100)));
    }
  }, [progress])

  return (
    <div className="progress-bar" ref={mainEl}>
      {Array.from({length: barsCount}, (_: any, index) => (
        <div className="progress-bar__bar" key={index}></div>
      ))}
    </div>
  )
}