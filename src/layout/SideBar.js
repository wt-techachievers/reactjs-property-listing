import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { CircleMode, DirectMode, SimpleSelectMode } from 'mapbox-gl-draw-circle';

class Sidebar extends Component {
    state={
        draw: undefined
    }
    updateArea = (e) => {
        var data = this.state.draw.getAll();
        var answer = document.getElementById('calculated-area');
        if (data.features.length > 0) {
            var area = window.turf.area(data);
            let inside_circle = window.turf.inside(window.turf.point(this.props.data_features[0].geometry.coordinates),data.features[0]);
            // restrict to area to 2 decimal points
            var rounded_area = Math.round(area*100)/100;
            answer.innerHTML = '<p><strong>' + rounded_area +','+inside_circle+ '</strong></p><p>square meters</p>';
        } else {
            answer.innerHTML = '';
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
              ...window.MapboxDraw.modes,
              draw_circle: CircleMode,
              direct_select: DirectMode,
              simple_select: SimpleSelectMode
            }
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
            }
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
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" src="https://cdn4.iconfinder.com/data/icons/property-real-estate/128/4-512.png"/>
            </a>
            <MDBListGroup className="list-group-flush">
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
const mapStateToProps = (state) => ({
    map: state.map,
    data_features: state.data_features
});
 
export default connect(
    mapStateToProps,
    {  }
)(Sidebar);
