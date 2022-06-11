import { useRef, useEffect } from "react";


function getInputCordinates(node, classname) {
    return {
        x: node.offsetLeft + node.querySelector(`.${classname}`).offsetLeft + node.querySelector(`.${classname}`).offsetWidth / 2,
        y: node.querySelector(`.${classname}`).offsetTop + node.offsetTop
    }
}

export const leaf = NodeComponent => function ({ setInputCord, onNodeSelect, onRelatedSelect, isActive, ...rest }) {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const node = ref.current;
        node.onmousedown = function (event) {
            let shiftX = event.clientX - node.getBoundingClientRect().left;
            let shiftY = event.clientY - node.getBoundingClientRect().top;
            node.style.zIndex = '1000';

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                node.style.left = pageX - shiftX + 'px';
                node.style.top = pageY - shiftY + 'px';
                const inputCordinates = getInputCordinates(node, 'input');
                const outputCordinates = getInputCordinates(node, 'output');
                setInputCord(inputCordinates.x, inputCordinates.y, outputCordinates.x, outputCordinates.y);
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
        <div ref={ref} onClick={(e) => { e.stopPropagation(); }} className="absolute-node">
            <NodeComponent
                onNodeSelect={onNodeSelect}
                onRelatedSelect={onRelatedSelect}
                isActive={isActive}
                {...rest}
            />
        </div>
    );
}