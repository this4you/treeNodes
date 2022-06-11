import React, { useRef, useState, useEffect } from "react";

export const tree = NodeComponent => function ({ canvasConfig = { width: 1500, height: 800 }, initNodes = [] }) {
    const canvasRef = useRef(null);

    const [nodes, setNodes] = useState([]);
    const [activeNodeId, setActiveNodeId] = useState(null);

    useEffect(() => {
        drawLines();
    }, [nodes])

    useEffect(() => {
        const newArray = [...nodes];
        initNodes.forEach(n => {
            const nodeIndex = newArray.findIndex((i) => i.id == n.id);
            if (nodeIndex !== -1) {
                newArray[nodeIndex] = { ...newArray[nodeIndex], ...n };
            } else {
                newArray.push(n);
            }
        })
        setNodes(newArray);
    }, [initNodes])


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
        if (activeNodeId === id) return;
        setActiveNodeId(id);
    }

    const setRelatedNode = (id) => {
        if (activeNodeId) {
            setNodes(nodes.map(n => {
                if (n.id === activeNodeId && id !== activeNodeId) {
                    n.relatedNodeId = id;
                    setActiveNodeId(null);
                }
                return n;
            }));
        }
    }

    const onRelatedSelectHandler = (id) => {
        setRelatedNode(id);
    }

    const onCanvasClickHandler = () => {
        if (!activeNodeId) return;
        setRelatedNode(null);
        setActiveNodeId(null);
    }

    return (
        <>
            <div className="canvas-container" onClick={onCanvasClickHandler}>
                {nodes.map((n) =>
                    <NodeComponent
                        onRelatedSelect={() => onRelatedSelectHandler(n.id)}
                        onNodeSelect={() => onNodeSelectHandler(n.id)}
                        key={n.id}
                        isActive={n.id === activeNodeId}
                        setInputCord={setNodeCordinates(n.id)}
                        {...n}
                    />)
                }
                <canvas width={canvasConfig.width} height={canvasConfig.height} ref={canvasRef} />
            </div>
        </>
    )
}
