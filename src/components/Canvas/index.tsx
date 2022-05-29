import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import './Canvas.css';

const Canvas = props => {

  const canvasRef = useRef(null);

  const [inputCord, setInputCord] = useState({
    x: 600,
    y: 100
  });

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = "#bcdaff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.bezierCurveTo(60, 50, 150, 60, inputCord.x, inputCord.y);
    ctx.stroke();

    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 20, 10, 10);

  }, [inputCord])

  return (
    <div className="canvas-container">
      <Node setInputCord={setInputCord} />
      <canvas width="1000px" height="800px" ref={canvasRef} />
    </div>
  )
}


const Node: React.FC<{ setInputCord }> = React.memo(({ setInputCord }) => {
  console.log("NODE RENDER")
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPosition();
  }, [])

  const setPosition = () => {
    if (ref.current) {
      setInputCord({
        x: ref.current.offsetLeft + 52,
        y: ref.current.offsetTop
      })
      ref.current.ondragstart = () => {
        return false;
      }
    }
  }

  const onMouseDownHandler = (event) => {
    const node = event.target;
    node.style.left = event.pageX - node.offsetWidth / 2 + 'px';
    node.style.top = event.pageY - node.offsetHeight / 2 + 'px';
    setPosition();
    document.addEventListener('mousemove', onMouseDownHandler)
  }

  const onMouseUpHandler = () => {
    // setInputCord({
    //   x: ref.current.offsetLeft,
    //   y: ref.current.offsetTop
    // })
    document.removeEventListener('mousemove', onMouseDownHandler);
  }

  return (
    <div ref={ref} className="node" onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler}>
      <div className="input node-point" />
      <div className="output node-point" />
    </div>
  );
})

export default Canvas