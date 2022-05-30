import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './Canvas.css';
import { Node } from '../index';

type NodeType = {
  id: number,
  cordinates: { x: number, y: number },
  relatedNodeId?: number,
  outputNodeId?: number
};

const Canvas = props => {

  const canvasRef = useRef(null);

  const [nodes, setNodes] = useState([]);
  const [activeNode, setActiveNode] = useState(null);

  const onAddNodeHandler = () => {
    setNodes([...nodes, {
      id: Number(new Date()),
      cordinates: {
        x: 0,
        y: 0
      }
    }]);
  }

  const setNodeCordinates = (nodeId: number) => {
    return (x, y) => {
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
      setNodes(newArray)
    }
  }


  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = "#bcdaff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(({ cordinates, relatedNodeId }) => {
      if (relatedNodeId) {
        const relatedNode = nodes.find(n => n.id === relatedNodeId);
        const relX = relatedNode.cordinates.x;
        const relY = relatedNode.cordinates.y + 120;
        ctx.beginPath();
        ctx.moveTo(relX, relY);
        ctx.bezierCurveTo(relX, relY, relX, relY, cordinates.x, cordinates.y);
        ctx.stroke();
      }
    })
  }, [nodes])

  const onNodeSelectHandler = (id) => {
    if (activeNode === id) return;
    setActiveNode(id);
  }

  const onRelatedSelectHandler = (id) => {
    if (activeNode) {
      setNodes(nodes.map(n => {
        if (n.id === activeNode) {
          n.relatedNodeId = id;
          setActiveNode(null);
        }
        return n;
      }));
    }
  }

  const onCanvasClickHandler = () => {
    if (!activeNode) return;
    setNodes(nodes.map(n => {
      if (n.id === activeNode) {
        n.relatedNodeId = null;
        setActiveNode(null);
      }
      return n;
    }));
    setActiveNode(null);
  }

  return (
    <>
      <button onClick={onAddNodeHandler}>AddNewNode</button>
      <div className="canvas-container" onClick={onCanvasClickHandler}>
        {nodes.map((n) => <Node onRelatedSelect={() => onRelatedSelectHandler(n.id)} onNodeSelect={() => onNodeSelectHandler(n.id)} key={n.id} isActive={n.id === activeNode} setInputCord={setNodeCordinates(n.id)} />)}
        <canvas width="1000px" height="800px" ref={canvasRef} />
      </div>
    </>
  )
}




export default Canvas