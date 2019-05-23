import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initializeMap, setDataFeatures, setDraw } from '../action/index';
import axios from 'axios';

import {MDBBtn, MDBNavLink} from 'mdbreact';

class PointWithoutSDK extends Component {

  modifyClass = (element)=>{
      let activeElement = element[0];
      activeElement.classList.remove("active");
      for( let element of activeElement.parentElement.children){
          if(element.innerText === "Map without SDk"){
              element.className += ' active';
              return;
          }
      }    
  }

  activeSidebar = ()=>{
      let sidebar = document.getElementsByClassName("sidebar-fixed")[0];
      sidebar.querySelector("ul").style = "block";
  }

  componentDidMount(){
    let navbar = document.getElementsByClassName("nav-item active");
    this.modifyClass(navbar);
    const self = this;

    window.mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbnRhbnNvbmkxIiwiYSI6ImNqdmMxOHh1MzFkeWk0NG15bWJlbDYwN2sifQ.MT1hxtqXFw4QAXZ8MyfzCQ';
    this.map = new window.mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/chintansoni1/cjvc6gn0o00221fnyrrjymjst',
        center: [72.759540, 21.136812],
        zoom: 1
    });

    self.map.once('idle',function(){
        self.activeSidebar();
        let features = [];
        axios.get("https://api.mapbox.com/datasets/v1/chintansoni1/cjvc66bop17sa2wo0b3iiadyg/features?access_token=pk.eyJ1IjoiY2hpbnRhbnNvbmkxIiwiYSI6ImNqdmMxOHh1MzFkeWk0NG15bWJlbDYwN2sifQ.MT1hxtqXFw4QAXZ8MyfzCQ").then((result)=>{
            features = result.data.features;
            if (features) {
                self.props.setDataFeatures({data_features:features});
            }
        })
        
        if(Object.entries(self.props.map).length === 0 && self.props.map.constructor === Object){
            self.props.initializeMap({map:self.map});
        }
    });
  }

  componentWillUnmount(){
      this.props.initializeMap({map:{}});
      this.props.setDraw({draw:undefined});
  }

  render() {
    return (
      <div>
        <div id='map'></div>
        <MDBNavLink id="filter_btn"  className="btn btn-primary filter-btn" to="/popup_table">Filter</MDBNavLink>
      </div>
    )
  }
}

PointWithoutSDK.propTypes = {
  map: PropTypes.object.isRequired,
  initializeMap: PropTypes.func.isRequired,
  setDataFeatures: PropTypes.func.isRequired,
  setDraw: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  map: state.map,
  data_features: state.data_features,
  draw: state.draw
});

export default connect(
  mapStateToProps,
  { initializeMap, setDataFeatures, setDraw }
)(PointWithoutSDK);
