import React, { Component } from 'react'

class PointUsingSDk extends Component {
    filterInput = document.getElementById('feature-filter');
    listingEl = document.getElementById('feature-listing');
    popup = new window.mapboxgl.Popup({
            closeButton: false
    });

    renderListings(features,map) {
        // Clear any existing listings
        this.listingEl.innerHTML = '';
        if (features.length) {
        features.forEach(function(feature) {
        var prop = feature.properties;
        var item = document.createElement('a');
        item.href = prop.wikipedia;
        item.target = '_blank';
        item.textContent = prop.name + ' (' + prop.abbrev + ')';
        item.addEventListener('mouseover', function() {
            // Highlight corresponding feature on the map
            this.popup.setLngLat(feature.geometry.coordinates)
            .setText(feature.properties.name + ' (' + feature.properties.abbrev + ')')
            .addTo(map);
        });
        this.listingEl.appendChild(item);
        });
         
        // Show the filter input
        this.filterInput.parentNode.style.display = 'block';
        } else {
        var empty = document.createElement('p');
        empty.textContent = 'Drag the map to populate results';
        this.listingEl.appendChild(empty);
         
        // Hide the filter input
        this.filterInput.parentNode.style.display = 'none';
         
        // remove features filter
        map.setFilter('airport', ['has', 'abbrev']);
        }
    }
    normalize(string) {
        return string.trim().toLowerCase();
    }

    componentDidMount(){
        window.mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbnRhbnNvbmkxIiwiYSI6ImNqdmMxOHh1MzFkeWk0NG15bWJlbDYwN2sifQ.MT1hxtqXFw4QAXZ8MyfzCQ';
        var map = new window.mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [72.772955, 21.164358],
            zoom: 12
        });
        let dataSource={};
        const layerID = "real_estate";
        let dataFeatures = [];

        map.on('load', function () {
            
            map.addSource("map_test_dataset", {
                type: "vector",
                url: "mapbox://chintansoni1.cjvc66bop17sa2wo0b3iiadyg-2xr3r"
            });

            map.addLayer({
                'id': layerID,
                'type': 'circle',
                'source': 'map_test_dataset',
                'source-layer':"test_dataset",
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
            
            
            dataSource = map.getSource('map_test_dataset');
            //console.log(dataSource._eventedParent._source);
            // setTimeout(function(){
            //     console.log(map.isSourceLoaded('test_dataset'));
            //     let source = dataSource._eventedParent._source.bounds;
            //     console.log(dataSource._eventedParent._source.bounds);
            //     for(let index=0;index<source.length;index=index+2){
            //         new window.mapboxgl.Marker()
            //         .setLngLat([source[index],source[index+1]])
            //         .addTo(map);
            //     }
                
            // },500);
            // function onSourceLoad(res){
            //     if(dataSource._eventedParent._source.bounds){
                    
            //         let source = dataSource._eventedParent._source.bounds;
            //         for(let index=0;index<source.length;index=index+2){
            //             new window.mapboxgl.Marker()
            //             .setLngLat([source[index],source[index+1]])
            //             .setPopup(new window.mapboxgl.Popup({ offset: 25 })
            //                     .setText('Construction on the Washington Monument began in 1848.'))
            //             .addTo(map);
            //         }
            //         map.off('sourcedata',onSourceLoad);
            //     }
            // }
            // map.on('sourcedata', onSourceLoad);
            
            me.filterInput.addEventListener('keyup', function(e) {
                // If the input value matches a layerID set
                // it's visibility to 'visible' or else hide it.
                    var value = this.normalize(e.target.value.trim());
                    map.setLayoutProperty(layerID, 'visibility',
                                            layerID.indexOf(value) > -1 ? 'visible' : 'none');
            });
            
        });

        

        map.once('idle',function(){
            let dataSource = map.querySourceFeatures("map_test_dataset",{sourceLayer:"test_dataset"});
            console.log(dataSource);
            dataFeatures = dataSource;
            for(let index=0;index<dataSource.length;index++){
                new window.mapboxgl.Marker()
                .setLngLat(dataSource[index].geometry.coordinates)
                .setPopup(new window.mapboxgl.Popup({ offset: 25 })
                        .setText(dataSource[index]['properties']['description']))
                .addTo(map);
               // map.setFilter(layerID, ['in', 'title', dataSource[index]['properties']['title']]);
            }
            // function forwardGeocoder(query) {
            //     var matchingFeatures = [];
            //     for (var i = 0; i < dataSource.length; i++) {
            //     var feature = dataSource[i];
            //     // handle queries with different capitalization than the source data by calling toLowerCase()
            //     if (feature.properties.title.toLowerCase().search(query.toLowerCase()) !== -1) {
            //     // add a tree emoji as a prefix for custom data results
            //     // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
            //     feature['place_name'] = '🌲 ' + feature.properties.title;
            //     feature['center'] = feature.geometry.coordinates;
            //     feature['place_type'] = ['park'];
            //     matchingFeatures.push(feature);
            //     }
            //     }
            //     return matchingFeatures;
            // }

            // map.addControl(new window.MapboxGeocoder({
            //     accessToken: window.mapboxgl.accessToken,
            //     localGeocoder: forwardGeocoder,
            //     zoom: 14,
            //     placeholder: "Enter search e.g. Lincoln Park",
            //     mapboxgl: window.mapboxgl
            // }));
        });
        
        
    }

    render() {
        return (
            <div>
                <div id='map'></div>
                <div className='map-overlay'>
                    <fieldset>
                        <input id='feature-filter' type='text' placeholder='Filter results by name' />
                    </fieldset>
                <div id='feature-listing' className='listing'></div>
                </div>
            </div>
        )
    }
}

export default PointUsingSDk;