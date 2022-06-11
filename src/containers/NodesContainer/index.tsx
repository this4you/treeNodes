import React from 'react';
import { TreeNode } from '../../components';
import { leaf, tree } from '../../hocs';


const TreeNodeLeaf = leaf(TreeNode);
const NodesTree = tree(TreeNodeLeaf);

const canvasConfig = {
    width: 1900,
    height: 900
};





const Nodes = () => {
    const [nodes, setNodes] = React.useState([]);
    const onAddNodeHandler = () => {
        setNodes([...nodes, {
            id: Number(new Date()),
            createdDate: new Date().toString(),
        }]);
    }

    return (
        <div className="wrapp">
            <button onClick={onAddNodeHandler}>AddNewNode</button>
            <NodesTree initNodes={nodes} canvasConfig={canvasConfig}></NodesTree>
        </div>
    )
}
export default Nodes;