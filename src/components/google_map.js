import React, { Component } from 'react';

class GoogleMap extends Component {
    componentWillReceiveProps(nextProps) {
        this.generateMap(nextProps.coords, nextProps.radiusInMiles);
    }

    generateMap(coords, radius) {
        // Map options variable for creation of google maps
        const mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        // Map variable for actual google maps
        const map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

        // // saving map variable to state to reference later
        // this.setState({ googleMap: map })

        // google maps LatLng obj for marker
        const positionForMarker = new google.maps.LatLng(coords.lat, coords.long);

        // google maps marker obj for curr location
        const marker = new google.maps.Marker({
            map: map,
            position: positionForMarker
        });

        // Setting map center
        map.setCenter(positionForMarker);

        // create circle showing search mile radius
        const circle = new google.maps.Circle({
            map: map,
            radius: radius * 1609.34,
            fillColor: '#AA0000'
        });

        // // saving circle to state, so it can be changed later
        // this.setState({
        //     googleMapsCircle: circle
        // })

        // bind circle variable to curr location
        circle.bindTo('center', marker, 'position');

        // change map bounds to fit circle
        map.fitBounds(circle.getBounds());
    }

    render() {
        return <div id="googleMap" style={{ height: 300 + 'px' }}/>;
    }
}

export default GoogleMap;