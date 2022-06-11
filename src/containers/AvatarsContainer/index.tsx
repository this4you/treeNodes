import React, { useEffect, useRef } from 'react';
import { Avatar } from '../../components';
import { leaf, tree } from '../../hocs';


const AvatarNode = leaf(Avatar);
const AvatarTree = tree(AvatarNode);
const canvasConfig = {
  width: 1900,
  height: 900
};




const Avatars = () => {
  const [nodes, setNodes] = React.useState([]);

  const onAddNodeHandler = () => {
    setNodes([...nodes, {
      id: Number(new Date()),
      createdDate: new Date().toString(),
      image: nodes.length
    }]);
  }

  return (
    <div className="wrapp">
      <button onClick={onAddNodeHandler}>AddNewNode</button>
      <AvatarTree initNodes={nodes} canvasConfig={canvasConfig} />
    </div>
  )
}
export default Avatars;