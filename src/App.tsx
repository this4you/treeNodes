import React, { useEffect, useRef } from 'react';
import { TreeNode } from './components';
import './App.css';
import { leaf, tree } from './hocs';


const TreeNodeWrapped = leaf(TreeNode);
const NodesTreeWrapped = tree(TreeNodeWrapped);

function App() {
  return (
    <div className="wrapp">
        <NodesTreeWrapped></NodesTreeWrapped>
    </div>
  )
}
export default App;