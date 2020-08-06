import axios from 'axios';
import bus from '../../bus';

export const request = async (query, variables, headers = {}) => {
	try {
		let response = await axios.post(
			process.env.API_URL,
			{ query, variables },
			{ headers }
		);
		if (response.data.errors) {
			return {
				errors: response.data.errors[0].message,
				status: response.status,
			};
		}
		return response.data;
	} catch (err) {
		console.log(err);
		if (err.response) {
			//we get back a 400 from the server
			// client received an error response
			if (err.response.data.errors[0].extensions.code === 'UNAUTHENTICATED') {
				//authentication error, token expired most likely
				bus.$emit('log-out');
				return { errors: err.response.data.errors[0].message };
			}
		} else if (err.request) {
			// client never received a response, or request never left
			console.log('No response/Request never left.');
			console.log(err.request);
		}
		return { errors: 'Bad request. Please try again.' };
	}
};

export const token = () => {
	const token = localStorage.getItem('token');
	return { 'x-token': token };
};
