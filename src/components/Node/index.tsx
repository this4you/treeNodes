import React, { useRef, useEffect } from "react";

const Node: React.FC<{ setInputCord, setIsActive, isActive }> = ({ setInputCord, setIsActive, isActive}) => {
    
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // setPosition();
        const node = ref.current;
        node.onmousedown = function (event) {
            let shiftX = event.clientX - node.getBoundingClientRect().left;
            let shiftY = event.clientY - node.getBoundingClientRect().top;
            node.style.zIndex = '1000';

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                node.style.left = pageX - shiftX + 'px';
                node.style.top = pageY - shiftY + 'px';
                setInputCord(ref.current.offsetLeft + 52, ref.current.offsetTop)
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            node.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                node.onmouseup = null;
            };
        }
        node.ondragstart = function () {
            return false;
        };
    }, [setInputCord]);


    return (
        <div ref={ref} onMouseDownCapture={setIsActive} className="node">
            <div className={"input node-point " + (isActive ? "node-active" : "")} />
            <div className="output node-point" />
        </div>
    );
}

export default Node;