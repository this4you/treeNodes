import React, { useEffect, useRef } from 'react';
import './Canvas.css';
import TreeNode from '../TreeNode';
import { leaf, tree } from '../../hocs';


const TreeNodeWrapped = leaf(TreeNode);
const NodesTreeWrapped = tree(TreeNodeWrapped);

const Canvas = props => {
  return (
    <div>
      <NodesTreeWrapped></NodesTreeWrapped>
    </div>
  )
}



export default Canvas


// const NodeWrapp = nodeWrapper(Node);