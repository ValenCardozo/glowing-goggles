import { useState } from 'react';

import CreateContainer from './objects/CreateContainer';
import EditContainer from './objects/EditContainer';

import './App.css';


function App() {
  return (
    <>
      <CreateContainer />
      <EditContainer />
    </>
  );
}

export default App;