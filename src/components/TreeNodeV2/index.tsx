import React, { useRef, useEffect } from "react";
type NodeType = {
    id: number,
    cordinates: { x: number, y: number },
    relatedNodeId?: number,
};

const TreeNodeV2 = ({ onNodeSelect, onRelatedSelect, isActive, createdDate, array }) => {
    return (
        <div className="node-v-2">
            <div onMouseDownCapture={onNodeSelect} className="inputv2 node-pointv2">
                createdDate : {createdDate}
            </div>
            <div onMouseDownCapture={onRelatedSelect} className="output2 node-pointv2"></div>
        </div>
    );
}
export default TreeNodeV2;