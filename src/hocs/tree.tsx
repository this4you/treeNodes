import React, { useRef, useState, useEffect } from "react";

export const tree = NodeComponent => function() {
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
    drawLines();
  }, [nodes])

  const drawLines = () => {
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
  }

  const onNodeSelectHandler = (id) => {
    if (activeNode === id) return;
    setActiveNode(id);
  }

  const setRelatedNode = (id) => {
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

  const onRelatedSelectHandler = (id) => {
    setRelatedNode(id);
  }

  const onCanvasClickHandler = () => {
    if (!activeNode) return;
    setRelatedNode(null);
    setActiveNode(null);
  }

  return (
    <>
      <button onClick={onAddNodeHandler}>AddNewNode</button>
      <div className="canvas-container" onClick={onCanvasClickHandler}>
        {/* {nodes.map((n) => <NodeWrappComponent onRelatedSelect={() => onRelatedSelectHandler(n.id)} onNodeSelect={() => onNodeSelectHandler(n.id)} key={n.id} isActive={n.id === activeNode} setInputCord={setNodeCordinates(n.id)} />)} */}
        {nodes.map((n) =>
          <NodeComponent onRelatedSelect={() => onRelatedSelectHandler(n.id)}
            onNodeSelect={() => onNodeSelectHandler(n.id)}
            key={n.id} isActive={n.id === activeNode}
            setInputCord={setNodeCordinates(n.id)} />)
        }
        <canvas width="1000px" height="800px" ref={canvasRef} />
      </div>
    </>
  )
}
