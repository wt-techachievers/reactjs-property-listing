import React, { Component } from 'react'
import { functionExpression } from '@babel/types';

class PointUsingSDk extends Component {

    componentDidMount(){
        window.mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbnRhbnNvbmkxIiwiYSI6ImNqdmMxOHh1MzFkeWk0NG15bWJlbDYwN2sifQ.MT1hxtqXFw4QAXZ8MyfzCQ';
        var map = new window.mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [72.759540, 21.136812],
            zoom: 16
        });
        let dataSource={};

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
                'circle-color': '#00e600',
                'circle-radius':5,
                'circle-stroke-width':5,
                'circle-stroke-color':'#000'
                }
            });
            map.addSource("test_dataset", {
                type: "vector",
                url: "mapbox://chintansoni1.cjvc66bop17sa2wo0b3iiadyg-2xr3r"
                });
            dataSource = map.getSource('test_dataset');
            console.log(dataSource._eventedParent._source);
            setTimeout(function(){
                console.log(map.isSourceLoaded('test_dataset'));
                let source = dataSource._eventedParent._source.bounds;
                console.log(dataSource._eventedParent._source.bounds);
                for(let index=0;index<source.length;index=index+2){
                    new window.mapboxgl.Marker()
                    .setLngLat([source[index],source[index+1]])
                    .addTo(map);
                }
                
            },500);
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