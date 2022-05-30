import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './Canvas.css';
import { Node } from '../index';

type NodeType = {
  id: number,
  isActive: boolean,
  cordinates: { x: number, y: number },
  inputNodeId?: number,
  outputNodeId?: number
};

const Canvas = props => {

  const canvasRef = useRef(null);
  
  const [nodes, setNodes] = useState([]);

  const onAddNodeHandler = () => {
    setNodes([...nodes, {
      id: Number(new Date()),
      isActive: false,
      cordinates: {
        x: 0,
        y: 0
      }
    }]);
  }

  const setNodeCordinates = useCallback((nodeId: number, x, y) => {
    console.log(nodes.length);
    const newArray = nodes.map(n => {
      if (n.id === nodeId) {
        return {
          ...n, cordinates: {
            x: x,
            y: y
          }
        }
      }
      return n;
    });
    setNodes([...newArray])
  }, [nodes])


  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = "#bcdaff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(({ cordinates }) => {
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.bezierCurveTo(60, 50, 150, 60, cordinates.x, cordinates.y);
      ctx.stroke();
    })
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 20, 10, 10);

  }, [nodes])

  return (
    <>
      <button onClick={onAddNodeHandler}>AddNewNode</button>
      <div className="canvas-container">
        {nodes.map((n) => <Node key={n.id} id={n.id} setInputCord={setNodeCordinates} />)}
        <canvas width="1000px" height="800px" ref={canvasRef} />
      </div>
    </>
  )
}




export default Canvas