import React, { Component } from 'react';
import './App.css';

import Routes from './Routes';
import SideBar from './layout/SideBar';
import Navbar from './layout/Navbar';
import './index.css';

class App extends Component {
  render(){
    return (
        <div className="flexible-content">
              <Navbar />
              <SideBar />
              <main id="content" className="p-2">
                
                  {/* <Link to="/map1">Select here to see map with SDK</Link>
                  <Link to="/map2">Select here to see map without SDK</Link><br/> */}
                  <Routes/>
              </main>
        </div>
    );
  }
}

export default App;
