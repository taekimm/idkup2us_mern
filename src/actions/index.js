import axios from 'axios';

export const GET_LOCATION = 'GET_LOCATION';
export const GET_YELP = 'GET_YELP';
export const GET_TEST = 'GET_TEST';

export function getLocation(position) {
    const geolocation = navigator.geolocation;

    let location = new Promise((resolve, reject) => {
        if(!geolocation) {
            reject (new Error('Not Supported'));
        }

        geolocation.getCurrentPosition( (position) => {
            resolve(position);
        }, () => {
            reject (new Error('Permission denied'));
        });
    });

    return {
        type: GET_LOCATION,
        payload: location
    }
};

export function test() {
    const request = axios.get('/api/test');

    return {
        type: GET_TEST,
        payload: request
    }
}

export function getYelp(searchTerms) {
    const request = axios.post('/api/yelpAPICall')
        .then( () => callback());

    return {
        type: GET_YELP,
        payload: request
    }
}