import React, { useEffect, useRef } from 'react';
import './Canvas.css';
import { nodeWrapper} from '../nodeWrapper/index';
import {nodesTreeWrapper} from '../nodesTreeWrapper/index'
import TreeNode from '../TreeNode';


const TreeNodeWrapped = nodeWrapper(TreeNode);
const NodesTreeWrapped = nodesTreeWrapper(TreeNodeWrapped);

const Canvas = props => {
  return (
    <div>
      <NodesTreeWrapped></NodesTreeWrapped>
    </div>
  )
}



export default Canvas


// const NodeWrapp = nodeWrapper(Node);