export const GET_LOCATION = 'GET_LOCATION';

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