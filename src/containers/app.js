import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLocation } from '../actions/index';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

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
            // map variables
            radiusInMiles: 1,

            // search variables
            search: {
                radius: 0,
                lat: 0,
                long: 0,
                categories: '',
                limit: 20,
                price: '',
                priceArray: ['$', '$$']
            }
        }

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(prices) {
        // this.setState({
        //     priceArray: prices
        // });
        this.setState({
            search: Object.assign(
                {},
                this.state.search,
                { priceArray: prices}
            )
        })
        console.log(this.state.search.priceArray);
    }

    handleSearchChange(searchVars) {
        let newSearch = {
            radius: searchVars.radius,
            lat: this.state.coords.lat,
            long: this.state.coords.long,
            categories: searchVars.categories,
            price: ''
        }

        if (searchVars.priceArray.length > 0 ) {
            let priceString = '';
            for(let i = 0; i < searchVars.priceArray.length; i++) {
                priceString += ',' + searchVars.priceArray[i];
            }
            newSearch.price = priceString;
        }

        this.setState({
            search: newSearch
        });
        
    }

    handleClick() {
        console.log(this.state);
    }

    componentDidMount() {
        // Make request for coordinates a promise (async) b/c DidMount is Sync only!!
        let promise = this.props.getLocation();
        // once received
        promise.then( (val) => {
            this.setState({
                coords: {
                    lat: val.payload.coords.latitude,
                    long: val.payload.coords.longitude,
                },
            });
            this.setState({
                search: Object.assign(
                    {},
                    this.state.search,
                    { radius: this.state.radiusInMiles * 1609.34},
                    {lat: val.payload.coords.latitude}, 
                    {long: val.payload.coords.longitude}
                )
            })
            console.log('log within promise', this.state);
        }, () => {
            // Error on promise received
            new Error('Promise not received');
        })

        console.log('console log in componentDidMount() ', this.state)
    }

    render() {
        return (
            <div>
                <GoogleMap coords={this.state.coords} radiusInMiles={this.state.radiusInMiles} />
                <div>
                    <form onSubmit={this.handleFormSubmit}>
                        <input
                            name='radius'
                            type='number'
                        />
                        <input
                            name='limit'
                            type='number'
                        />
                        <input
                            name='categories'
                            type='text'
                        />
                        <CheckboxGroup
                            name='prices'
                            value={this.state.search.priceArray}
                            onChange={this.handleCheckboxChange}>
                            <label><Checkbox value='$' />$</label>
                            <label><Checkbox value='$$' />$$</label>
                            <label><Checkbox value='$$$' />$$$</label>
                            <label><Checkbox value='$$$$' />$$$$</label>
                        </CheckboxGroup>
                        <button
                            type='submit'
                        >
                            Search!
                    </button>
                    </form>
                </div>
                <button onClick={this.handleClick}>Console Log</button>
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
