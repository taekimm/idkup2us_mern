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
            radiusInMiles: 1,
        }
    }

    componentDidMount() {
        // Make request for coordinates a promise (async) b/c DidMount is Sync only!!
        let promise = this.props.getLocation();
        // once received
        promise.then( (val) => {
            this.setState({coords: {
                    lat: val.payload.coords.latitude,
                    long: val.payload.coords.longitude,
                }
            });
            console.log('log within promise', this.state);
        }, () => {
            // Error on promise received
            new Error('Promise not received');
        })

    }

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
