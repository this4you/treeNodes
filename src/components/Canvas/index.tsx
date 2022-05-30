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
    const ball = ref.current;
    ball.onmousedown = function (event) {
      let shiftX = event.clientX - ball.getBoundingClientRect().left;
      let shiftY = event.clientY - ball.getBoundingClientRect().top;
      ball.style.zIndex = '1000';

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        ball.style.left = pageX - shiftX + 'px';
        ball.style.top = pageY - shiftY + 'px';
        setPosition();
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      ball.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
      };
    }
    ball.ondragstart = function () {
      return false;
    };
  }, []);

  const setPosition = () => {
    if (ref.current) {
      setInputCord({
        x: ref.current.offsetLeft + 52,
        y: ref.current.offsetTop
      })
    }
  }


  return (
    <div ref={ref} className="node">
      <div className="input node-point" />
      <div className="output node-point" />
    </div>
  );
})

export default Canvas