// Register User
import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//Login- Get User token

export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			//Save to localStorage

			const { token } = res.data;
			//Set token to localStorage

			localStorage.setItem('jwtToken', token);

			//Set token to Auth header

			setAuthToken(token);
			//Decode token to get user data

			const decoded = jwt_decode(token);

			//Set current user

			dispatch(setCurrentUser(decoded));
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

//Set Logged in User

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

//Log User out

export const logoutUser = () => dispatch => {
	localStorage.removeItem('jwtToken');
	//Remove Auth Header for future requests

	setAuthToken(false);

	//Set current user to { } which will set isAuthenticated to false

	dispatch(setCurrentUser({}));
};
