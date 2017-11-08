import { combineReducers } from 'redux';
import LocationReducer from './reducers_location';

const rootReducer = combineReducers({
    location: LocationReducer
});

export default rootReducer;