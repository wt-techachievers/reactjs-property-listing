import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PointUsingSDk from './PointUsingSDk';
import PointWithoutSDk from './PointWithoutSDK';

function App() {
  return (
    <div>
      <h1>Welome to mapbox react sample</h1>
      
      <Router>
        <Link to="/map1">Select here to see map with SDK</Link>
        <Link to="/map2">Select here to see map without SDK</Link><br/>
        <Route path='/map1' component={PointUsingSDk}/>
        <Route path='/map2' component={PointWithoutSDk}/>
      </Router>
    </div>
  );
}

export default App;
