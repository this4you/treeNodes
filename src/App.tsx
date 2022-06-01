import React, { useEffect, useRef } from 'react';
import { TreeNode, TreeNodeV2 } from './components';
import './App.css';
import { leaf, tree } from './hocs';


const TreeNodeWrapped = leaf(TreeNodeV2);
const NodesTreeWrapped = tree(TreeNodeWrapped);
const canvasConfig = {
  width: 1900,
  height: 900
};




function App() {
  const [nodes, setNodes] = React.useState([]);
  const onAddNodeHandler = () => {
    setNodes([...nodes, {
      id: Number(new Date())
    }]);
  }

  return (
    <div className="wrapp">
      <button onClick={onAddNodeHandler}>AddNewNode</button>
      <NodesTreeWrapped initNodes={nodes} canvasConfig={canvasConfig}></NodesTreeWrapped>
    </div>
  )
}
export default App;