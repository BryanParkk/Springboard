import React from 'react';
import './App.css';
import Counter from './Counter';
import Timer from './Timer';
import ProfileViewer from './ProfileViewer';
import ProfileViewerWithSearch from './ProfileViewerWithSearch';

function App() {

  return (
    <>
      <Counter />
      {/* <Timer /> */}
      {/* <ProfileViewer /> */}
      <ProfileViewerWithSearch />
    </>
  )
}

export default App;
