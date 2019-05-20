import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { CircleMode, DirectMode, SimpleSelectMode } from 'mapbox-gl-draw-circle';
import { setFilteredFeatures } from '../action/index';
import PropTypes from 'prop-types';

class Sidebar extends Component {
    state={
        draw: undefined
    }
    updateArea = (e) => {
        
        var data = this.state.draw.getAll();
        //var answer = document.getElementById('calculated-area');
        if (data.features.length > 0) {
            var area = window.turf.area(data);
            let features_inside_circle = [];
            for(let feature of this.props.data_features){
                let inside_circle = window.turf.inside(window.turf.point(feature.geometry.coordinates),data.features[0]);
                if(inside_circle){
                    features_inside_circle.push(feature.properties);
                }
            }
            this.props.setFilteredFeatures({filtered_features:features_inside_circle});
            // restrict to area to 2 decimal points
            //var rounded_area = Math.round(area*100)/100;
            //answer.innerHTML = '<p><strong>Points inside circle- ' +features_inside_circle+ '</strong>';
        } else {
            //answer.innerHTML = '';
            if (e.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
        }
    }

    modifyClass = (event)=>{
        let activeElement = event.parentElement.querySelector('.active');
        if(activeElement){
            activeElement.classList.remove("active");
        }
        event.className += ' active';
    }
    
    drawFilterCircle = (e) =>{
        this.modifyClass(e.currentTarget);
        if(this.state.draw){
            this.props.map.removeControl(this.state.draw);
        }
        this.state.draw = new window.MapboxDraw({
            displayControlsDefault: false,
            defaultMode: "draw_circle",
            userProperties: true,
            controls: {
                trash: true
            },
            modes: {
              draw_circle: CircleMode,
              direct_select: DirectMode,
              simple_select: SimpleSelectMode
            },
            styles: [
                // ACTIVE (being drawn)
                // line stroke
                // {
                //     "id": "gl-draw-line",
                //     "type": "line",
                //     "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
                //     "layout": {
                //       "line-cap": "round",
                //       "line-join": "round"
                //     },
                //     "paint": {
                //       "line-color": "#D20C0C",
                //       "line-dasharray": [0.2, 2],
                //       "line-width": 2
                //     }
                // },
                // polygon fill
                {
                  "id": "gl-draw-polygon-fill",
                  "type": "fill",
                  "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
                  "paint": {
                    "fill-color": "#D20C0C",
                    "fill-outline-color": "#D20C0C",
                    "fill-opacity": 0.1
                  }
                },
                // polygon outline stroke
                // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
                {
                  "id": "gl-draw-polygon-stroke-active",
                  "type": "line",
                  "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
                  "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                  },
                  "paint": {
                    "line-color": "#D20C0C",
                    "line-width": 1
                  }
                },
                // vertex point halos
                {
                  "id": "gl-draw-polygon-and-line-vertex-halo-active",
                  "type": "circle",
                  "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                  "paint": {
                    "circle-radius": 5,
                    "circle-color": "#000"
                  }
                },
                // vertex points
                {
                  "id": "gl-draw-polygon-and-line-vertex-active",
                  "type": "circle",
                  "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                  "paint": {
                    "circle-radius": 3,
                    "circle-color": "#D20C0C",
                  }
                },
            
                // INACTIVE (static, already drawn)
                // line stroke
                // {
                //     "id": "gl-draw-line-static",
                //     "type": "line",
                //     "filter": ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
                //     "layout": {
                //       "line-cap": "round",
                //       "line-join": "round"
                //     },
                //     "paint": {
                //       "line-color": "#000",
                //       "line-width": 3
                //     }
                // },
                // polygon fill
                // {
                //   "id": "gl-draw-polygon-fill-static",
                //   "type": "fill",
                //   "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
                //   "paint": {
                //     "fill-color": "#000",
                //     "fill-outline-color": "#000",
                //     "fill-opacity": 0.1
                //   }
                // },
                // polygon outline
                // {
                //   "id": "gl-draw-polygon-stroke-static",
                //   "type": "line",
                //   "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
                //   "layout": {
                //     "line-cap": "round",
                //     "line-join": "round"
                //   },
                //   "paint": {
                //     "line-color": "#000",
                //     "line-width": 3
                //   }
                // }
              ]
        });

        
        this.props.map.addControl(this.state.draw);
        //this.state.draw.changeMode('draw_circle', { initialRadiusInKm: 5 });
        //this.state.draw.add(this.props.data_features[0]);
        this.props.map.on('draw.create', this.updateArea);
        this.props.map.on('draw.delete', this.updateArea);
        this.props.map.on('draw.update', this.updateArea);
    }

    drawFilterPolygon = (e) =>{
        this.modifyClass(e.currentTarget);
        if(this.state.draw){
            this.props.map.removeControl(this.state.draw);
        }
        this.state.draw = new window.MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            },
            styles: [
                // ACTIVE (being drawn)
                // line stroke
                // {
                //     "id": "gl-draw-line",
                //     "type": "line",
                //     "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
                //     "layout": {
                //       "line-cap": "round",
                //       "line-join": "round"
                //     },
                //     "paint": {
                //       "line-color": "#D20C0C",
                //       "line-dasharray": [0.2, 2],
                //       "line-width": 2
                //     }
                // },
                // polygon fill
                {
                  "id": "gl-draw-polygon-fill",
                  "type": "fill",
                  "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
                  "paint": {
                    "fill-color": "#D20C0C",
                    "fill-outline-color": "#D20C0C",
                    "fill-opacity": 0.1
                  }
                },
                // polygon outline stroke
                // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
                {
                  "id": "gl-draw-polygon-stroke-active",
                  "type": "line",
                  "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
                  "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                  },
                  "paint": {
                    "line-color": "#D20C0C",
                    "line-dasharray": [0.2, 2],
                    "line-width": 1
                  }
                },
                // vertex point halos
                {
                  "id": "gl-draw-polygon-and-line-vertex-halo-active",
                  "type": "circle",
                  "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                  "paint": {
                    "circle-radius": 5,
                    "circle-color": "#000"
                  }
                },
                // vertex points
                {
                  "id": "gl-draw-polygon-and-line-vertex-active",
                  "type": "circle",
                  "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                  "paint": {
                    "circle-radius": 3,
                    "circle-color": "#D20C0C",
                  }
                },
            
                // INACTIVE (static, already drawn)
                // line stroke
                // {
                //     "id": "gl-draw-line-static",
                //     "type": "line",
                //     "filter": ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
                //     "layout": {
                //       "line-cap": "round",
                //       "line-join": "round"
                //     },
                //     "paint": {
                //       "line-color": "#000",
                //       "line-width": 3
                //     }
                // },
                // polygon fill
                // {
                //   "id": "gl-draw-polygon-fill-static",
                //   "type": "fill",
                //   "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
                //   "paint": {
                //     "fill-color": "#000",
                //     "fill-outline-color": "#000",
                //     "fill-opacity": 0.1
                //   }
                // },
                // polygon outline
                // {
                //   "id": "gl-draw-polygon-stroke-static",
                //   "type": "line",
                //   "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
                //   "layout": {
                //     "line-cap": "round",
                //     "line-join": "round"
                //   },
                //   "paint": {
                //     "line-color": "#000",
                //     "line-width": 3
                //   }
                // }
              ]
        });
        this.props.map.addControl(this.state.draw);
        //this.state.draw.changeMode('draw_circle', { initialRadiusInKm: 5 });
        //this.state.draw.add(this.props.data_features[0]);
        this.props.map.on('draw.create', this.updateArea);
        this.props.map.on('draw.delete', this.updateArea);
        this.props.map.on('draw.update', this.updateArea);
    }

  render() {
    return (
        <div className="sidebar-fixed position-fixed"  >
            <a href="/" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" src="https://cdn4.iconfinder.com/data/icons/property-real-estate/128/4-512.png"/>
            </a>
            <MDBListGroup className="list-group-flush" style={{display:"none"}}>
                <MDBListGroupItem onClick={this.drawFilterCircle}>
                    <MDBIcon icon="crosshairs" className="mr-3" />
                    Radius Filter
                </MDBListGroupItem>
                <MDBListGroupItem onClick={this.drawFilterPolygon}>
                    <MDBIcon icon="vector-square" className="mr-3"/>
                    Polygon Filter
                </MDBListGroupItem>
            </MDBListGroup>
        </div>
    )
  }
}

Sidebar.propTypes = {
  setFilteredFeatures: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    map: state.map,
    data_features: state.data_features
});
 
export default connect(
    mapStateToProps,
    { setFilteredFeatures }
)(Sidebar);
