import React, { useRef, useEffect } from "react";
type NodeType = {
    id: number,
    cordinates: { x: number, y: number },
    relatedNodeId?: number,
};

const TreeNode = ({onNodeSelect, onRelatedSelect, isActive}) => {
    return (
        <div className="node">
            <div onMouseDownCapture={onNodeSelect} className={"input node-point " + (isActive ? "node-active" : "")} />
            <div onMouseDownCapture={onRelatedSelect} className="output node-point" />
        </div>
    );
}
export default TreeNode;