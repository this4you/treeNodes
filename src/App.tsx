import React, { useEffect, useRef } from 'react';
import { TreeNode} from './components';
import './App.css';
import { AvatarsContainer, NodesContainer } from './containers';


const App = () => {
  return (
    <div className="wrapp">
      {/* <AvatarsContainer/> */}
      <NodesContainer/>
    </div>

  )
}

export default App;