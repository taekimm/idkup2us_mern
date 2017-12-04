import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LocationReducer from './reducers_location';

const rootReducer = combineReducers({
    form: formReducer,
    location: LocationReducer
});

export default rootReducer;