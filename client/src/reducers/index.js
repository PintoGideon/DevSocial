import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
	auth: authReducer, //this.props.auth
	errors: errorsReducer
});
