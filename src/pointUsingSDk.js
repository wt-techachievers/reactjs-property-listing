import React, { Component } from 'react'

class PointUsingSDk extends Component {
    state={
        popup: new window.mapboxgl.Popup({
            closeButton: false
        }),
        dataFeatures: [],
        markers:[]
    }



    renderListings = (features) => {
        // Clear any existing listings
        this.listingEl.innerHTML = '';
        if (features.length) {
            let self = this;
            features.forEach(function(feature) {
                var prop = feature.properties;
                var item = document.createElement('a');
                item.target = '_blank';
                item.textContent = prop.title;
                item.addEventListener('mouseover', function() {
                    // Highlight corresponding feature on the map
                    self.state.popup.setLngLat(feature.geometry.coordinates)
                    .setText(feature.properties.title)
                    .addTo(self.map);
                });
                self.listingEl.appendChild(item);
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
        this.map.setFilter('real_estate', ['has', 'title']);
        }
    }
    normalize = (string) => {
        return string.trim().toLowerCase();
    }

    searchLocation = (e)=>{
        var value = this.normalize(e.target.value.trim());
        const self =this;
        //this.map.setLayoutProperty("real_estate", 'visibility', "real_estate".indexOf(value) > -1 ? 'visible' : 'none');
        let filtered = this.state.dataFeatures.filter(function(feature) {
            var name = self.normalize(feature.properties.title);
            let result = name.indexOf(value) > -1;
            let marker_action={marker_obj:undefined,add:true};
            for(let marker of self.state.markers){
                if(name && marker._lngLat.lat===feature.geometry.coordinates[1] && 
                    marker._lngLat.lng===feature.geometry.coordinates[0]){
                        if(!result){
                            marker.remove();
                        }else{
                            marker_action.marker_obj = marker;
                        }
                    marker_action.add = false;
                    break;
                }
            }
            if(marker_action.add){
                new window.mapboxgl.Marker()
                        .setLngLat(feature.geometry.coordinates)
                        .setPopup(new window.mapboxgl.Popup({ offset: 25 })
                        .setText(feature.properties.description))
                        .addTo(self.map);
            }
            return name.indexOf(value) > -1 ;
        });
        
        // Populate the sidebar with filtered results
        this.renderListings(filtered);
        if(filtered){
            // Set the filter to populate features into the layer.
            this.map.setFilter('real_estate', ['match', ['get', 'title'], filtered.map(function(feature) {
                return feature.properties.title;
            }), true, false]);
        }
    }

    componentDidMount(){
        const self = this;
        let dataSource={};
        const layerID = "real_estate";

        window.mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbnRhbnNvbmkxIiwiYSI6ImNqdmMxOHh1MzFkeWk0NG15bWJlbDYwN2sifQ.MT1hxtqXFw4QAXZ8MyfzCQ';
        self.map = new window.mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [72.772955, 21.164358],
            zoom: 12
        });

        self.map.on('load', function () {
            
            self.map.addSource("map_test_dataset", {
                type: "vector",
                url: "mapbox://chintansoni1.cjvc66bop17sa2wo0b3iiadyg-2xr3r"
            });

            self.map.addLayer({
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
            
            self.map.on('moveend', function() {
                var features = self.map.queryRenderedFeatures({layers:[layerID]});
                 
                if (features) {
                // Populate features for the listing overlay.
                self.renderListings(features);
                 
                // Clear the input container
                self.filterInput.value = '';
                 
                // Store the current features in sn `airports` variable to
                // later use for filtering on `keyup`.
                self.dataFeatures = features;
                }
            });

            dataSource = self.map.getSource('map_test_dataset');
            self.filterInput = document.getElementById('feature-filter');
            self.listingEl = document.getElementById('feature-listing');
            self.renderListings([]);
        });

        

        self.map.once('idle',function(){
            let dataSource = self.map.querySourceFeatures("map_test_dataset",{sourceLayer:"test_dataset"});
            self.state.dataFeatures = dataSource;
            for(let index=0;index<dataSource.length;index++){
                self.state.markers.push(new window.mapboxgl.Marker()
                .setLngLat(dataSource[index].geometry.coordinates)
                .setPopup(new window.mapboxgl.Popup({ offset: 25 })
                        .setText(dataSource[index]['properties']['description']))
                .addTo(self.map));
               // map.setFilter(layerID, ['in', 'title', dataSource[index]['properties']['title']]);
            }
        });
        
        
    }

    render() {
        return (
            <div>
                <div id='map'></div>
                <div className='map-overlay'>
                    <fieldset>
                        <input id='feature-filter' onKeyUp={this.searchLocation} type='text' placeholder='Filter results by name' />
                    </fieldset>
                <div id='feature-listing' className='listing'></div>
                </div>
            </div>
        )
    }
}

export default PointUsingSDk;