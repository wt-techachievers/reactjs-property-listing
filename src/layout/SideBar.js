import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { CircleMode, DirectMode, SimpleSelectMode } from 'mapbox-gl-draw-circle';

class Sidebar extends Component {
    state={
        draw: {}
    }
    updateArea = (e) => {
        var data = this.state.draw.getAll();
        var answer = document.getElementById('calculated-area');
        if (data.features.length > 0) {
            var area = window.turf.area(data);
            let inside_circle = window.turf.inside(window.turf.point(this.state.dataFeatures[0].geometry.coordinates),data.features[0]);
            // restrict to area to 2 decimal points
            var rounded_area = Math.round(area*100)/100;
            answer.innerHTML = '<p><strong>' + rounded_area +','+inside_circle+ '</strong></p><p>square meters</p>';
        } else {
            answer.innerHTML = '';
            if (e.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
        }
    }

    drawFilterCircle = () =>{
        // let draw = new window.MapboxDraw({
        //     displayControlsDefault: false,
        //     defaultMode: "draw_circle",
        //     userProperties: true,
        //     modes: {
        //       ...window.MapboxDraw.modes,
        //       draw_circle: CircleMode,
        //       direct_select: DirectMode,
        //       simple_select: SimpleSelectMode
        //     }
        // });
        var draw = new window.MapboxDraw({
            displayControlsDefault: false,
            controls: {
            polygon: true,
            trash: true
            }
        });
        this.props.map.addControl(draw);
        // this.state.draw.add();
        this.props.map.on('draw.create', this.updateArea);
        this.props.map.on('draw.delete', this.updateArea);
        this.props.map.on('draw.update', this.updateArea);
        //this.props.mapStateHandler(map);
    }

  render() {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" />
            </a>
            <MDBListGroup className="list-group-flush">
                <MDBListGroupItem>
                    <MDBIcon icon="chart-pie" className="mr-3"/>
                    Dashboard
                </MDBListGroupItem>
                <MDBListGroupItem onClick={this.drawFilterCircle}>
                    <MDBIcon icon="crosshairs" className="mr-3" />
                    Radius Filter
                </MDBListGroupItem>
                <MDBListGroupItem>
                    <MDBIcon icon="vector-square" className="mr-3"/>
                    Polygon Filter
                </MDBListGroupItem>
            </MDBListGroup>
        </div>
    )
  }
}
export default Sidebar;
