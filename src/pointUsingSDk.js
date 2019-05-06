import React, { Component } from 'react'

class PointUsingSDk extends Component {

    componentDidMount(){
        window.mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbnRhbnNvbmkxIiwiYSI6ImNqdmMxOHh1MzFkeWk0NG15bWJlbDYwN2sifQ.MT1hxtqXFw4QAXZ8MyfzCQ';
        var map = new window.mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11'
        });


        map.on('load', function () {
        
            map.addLayer({
                'id': 'population',
                'type': 'circle',
                'source': {
                type: 'vector',
                url: 'mapbox://chintansoni1.cjvc66bop17sa2wo0b3iiadyg-2xr3r'
                },
                'source-layer': 'test_dataset',
                'paint': {
                    // make circles larger as the user zooms from z12 to z22
                    'circle-radius': {
                    'base': 1.75,
                    'stops': [[12, 2], [22, 180]]
                },
                // color circles by ethnicity, using a match expression
                // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                'circle-color': '#3bb2d0'
                }
            });
        });
        var height = document.body.clientHeight;
        var width = document.body.clientWidth;
        document.getElementById('map').style.height = height -20;
        document.getElementById('map').style.width = width;
    }

    render() {
        return (
            <div id='map'></div>
        )
    }
}

export default PointUsingSDk;