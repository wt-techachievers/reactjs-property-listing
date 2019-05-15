import React, { Component } from 'react';
import './App.css';

import Routes from './Routes';
import SideBar from './layout/SideBar';
import Navbar from './layout/Navbar';
import './index.css';

class App extends Component {
  state={
    map:{}
  }

  stateHandler = (mapObj) =>{
    console.log(mapObj);
    this.setState({map: mapObj});
  }

  render(){
      return (
          <div className="flexible-content">
                <Navbar />
                <SideBar mapStateHandler={this.stateHandler} map={this.state.map} />
                <main id="content" className="p-2">
                  <Routes mapStateHandler={this.stateHandler} map={this.state.map}/>
                </main>
          </div>
      );
  }
}

export default App;
