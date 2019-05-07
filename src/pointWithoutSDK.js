import React, { Component } from 'react'

class PointWithoutSDK extends Component {

  componentDidMount(){
    window.mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbnRhbnNvbmkxIiwiYSI6ImNqdmMxOHh1MzFkeWk0NG15bWJlbDYwN2sifQ.MT1hxtqXFw4QAXZ8MyfzCQ';
    new window.mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/chintansoni1/cjvc6gn0o00221fnyrrjymjst',
        center: [72.759540, 21.136812],
        zoom: 1
    });


  }

  render() {
    return (
        <div id='map'></div>
    )
  }
}

export default PointWithoutSDK;
