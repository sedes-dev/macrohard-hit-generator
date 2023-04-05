import React, {PropsWithChildren, useState, useEffect, useRef} from 'react';
import './Window.scss';

type WindowProps = {
  title: string
  initialSize: {
    width?: number,
    height?: number
  },
  onClose?: () => void,
  onHelp?: () => void,
  center?: boolean | string,
  noSpacing?: boolean,
  icon?: string,
  isMain?: boolean,
  mixClass?: string,
};

export function Window(props: PropsWithChildren<WindowProps>) {
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);
  const [windowPos, setWindowPos] = useState<[number, number]>([0, 0])
  const mainEl = useRef<HTMLDivElement>(null);

  const onMouseDownHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePos([event.clientX, event.clientY]);
    setMouseDown(true);
  }

  const onMouseUpHandler = () => {
    setMouseDown(false);
  }

  useEffect(() => {
    if (props.center) {
      let centerTo: Element | undefined;

      if (typeof props.center === 'string') {
        const candidate = document.querySelector(props.center);

        if (candidate) {
          centerTo = candidate;
        }
      } else {
        centerTo = document.body;
      }

      if (centerTo && mainEl.current) {
        const targetRect = centerTo.getBoundingClientRect();
        const ownRect =  mainEl.current.getBoundingClientRect();

        setWindowPos(() => [
          targetRect.left + window.scrollX + (targetRect.width / 2) - (ownRect.width / 2),
          targetRect.top + window.scrollY + (targetRect.height / 2) - (ownRect.height / 2)
        ])
      }
    }
  }, [props.center])

  useEffect(() => {
    const onMouseMoveHandler = (event: MouseEvent) => {
      if (mouseDown) {
        setWindowPos([windowPos[0] + (event.clientX - mousePos[0]), windowPos[1] + (event.clientY - mousePos[1])]);
        setMousePos([event.clientX, event.clientY])
      }
    }

    window.addEventListener('mousemove', onMouseMoveHandler);

    return () => {
      window.removeEventListener('mousemove', onMouseMoveHandler);
    }
  })

  const style = {
    left: `${windowPos[0]}px`,
    top: `${windowPos[1]}px`,
    ...(props.initialSize?.width ? { width: `${props.initialSize.width}px` } : {}),
    ...(props.initialSize?.height ? { hidth: `${props.initialSize.height}px` } : {})
  };

  const onCloseClickHandler = () => {
    if (props.onClose) props.onClose();
  }

  const onHelpClickHandler = () => {
    if (props.onHelp) props.onHelp();
  }

  return (
    <div className={`window${props.isMain ? ' window--main' : ''}`} style={style} ref={mainEl}>
      <div className="title-bar" onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler}>
        <div className="title-bar-text">
          {props.icon && (
            <img className="window__icon" src={props.icon} alt="Macrohard Hit Wizard"/>
          )}
          <span>{props.title}</span>
        </div>
        <div className="title-bar-controls">
          {props.onHelp && (
            <button aria-label="Help" onClick={onHelpClickHandler}></button>
          )}
          {props.onClose && (
            <button aria-label="Close" onClick={onCloseClickHandler}></button>
          )}
        </div>
      </div>
      <div className={`window-body${props.noSpacing ? ` window-body-no-spacing` : ''}`}>
        { props.children }
      </div>
    </div>
  );
}