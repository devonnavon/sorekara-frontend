import axios from 'axios';

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
		return { errors: 'Failed to fetch. Please try again.' };
	}
};

export const token = () => {
	const token = localStorage.getItem('token');
	return { 'x-token': token };
};
