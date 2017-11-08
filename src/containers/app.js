import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLocation } from '../actions/index';
import GoogleMap from '../components/google_map';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // current location coords
            coords: {
                lat: 0,
                long: 0
            },
            // search params
            radiusInMiles: 5,

            // // google map stuff
            // googleMapsCircle: '',
            // googleMap: '',
        }
    }

    componentDidMount() {
        // Make request for coordinates a promise (async) b/c DidMount is Sync only!!
        let promise = this.props.getLocation();
        // once received
        promise.then( (val) => {
            // this.setState({
            //     lat: val.payload.coords.latitude,
            //     long: val.payload.coords.longitude
            // });
            this.setState(prevState => ({
                coords: {
                    lat: val.payload.coords.latitude,
                    long: val.payload.coords.longitude,
                }
            }));
            // this.generateMap(this.state.coords);
            console.log('log within promise', this.state);
        }, () => {
            // Error on promise received
            new Error('Promise not received');
        })

    }

    // generateMap(coords) {
    //     // Map options variable for creation of google maps
    //     const mapOptions = {
    //         zoom: 15,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };

    //     // Map variable for actual google maps
    //     const map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

    //     // saving map variable to state to reference later
    //     this.setState({googleMap: map})

    //     // google maps LatLng obj for marker
    //     const positionForMarker = new google.maps.LatLng(coords.lat, coords.long);

    //     // google maps marker obj for curr location
    //     const marker = new google.maps.Marker({
    //         map: map,
    //         position: positionForMarker
    //     });

    //     // Setting map center
    //     map.setCenter(positionForMarker);

    //     // create circle showing search mile radius
    //     const circle = new google.maps.Circle({
    //         map: map,
    //         radius: this.state.radiusInMiles * 1609.34,
    //         fillColor: '#AA0000'
    //     });

    //     // saving circle to state, so it can be changed later
    //     this.setState({
    //         googleMapsCircle: circle
    //     })

    //     // bind circle variable to curr location
    //     circle.bindTo('center', marker, 'position');
        
    //     // change map bounds to fit circle
    //     map.fitBounds(circle.getBounds());
    // }

    render() {
        return (
            <div>
                {/* <div id='googleMap' style={{height: 300 + 'px'}}/> */}
                <GoogleMap coords={this.state.coords} radiusInMiles={this.state.radiusInMiles} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        location: state.location
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { getLocation }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(App);
