import React from "react";

const Avatar = ({ onNodeSelect, onRelatedSelect, isActive, image }) => {
    return (
        <div className="avatar">
            <img className="input" onMouseDownCapture={onNodeSelect}
                src={`https://avatars.dicebear.com/api/avataaars/${image}.svg`} alt="something" />
            <div onMouseDownCapture={onRelatedSelect} className={"output " + (isActive ? "output-active" : "")}></div>
        </div>
    );
}
export default Avatar;