import React, { useRef, useEffect } from "react";

const Avatar = ({ onNodeSelect, onRelatedSelect, isActive, image }) => {
    return (
        <div className="avatar">
            <img onMouseDownCapture={onNodeSelect}
                src={`https://avatars.dicebear.com/api/avataaars/${image}.svg`} alt="photo" />
            <div onMouseDownCapture={onRelatedSelect} className={"avatar-output " + (isActive ? "output-active" : "")}></div>
        </div>
    );
}
export default Avatar;