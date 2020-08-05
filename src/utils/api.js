import axios from 'axios';

const signIn = async (variables) => {
	try {
		let response = await axios.post(process.env.API_URL, {
			query: `
                mutation ($login: String!, $password: String!) {
                    signIn(login: $login, password: $password) {
                    token
                    }
                }
                `,
			variables,
		});
		if (response.data.errors) {
			return { errors: response.data.errors[0].message };
		} else {
			const token = response.data.data.signIn.token;
			return { token };
		}
	} catch (err) {
		return { errors };
	}
};
// signUp(username: String!, email: String!, password: String!): Token!
const signUp = async (variables) => {
	try {
		let response = await axios.post(process.env.API_URL, {
			query: `
                mutation ($username: String!, $email: String!, $password: String!) {
                    signIn(login: $login, password: $password) {
                    token
                    }
                }
                `,
			variables,
		});
		if (response.data.errors) {
			return { errors: response.data.errors[0].message };
		} else {
			// bus.$emit("login-success", response.data.data.signIn.token);
			const token = response.data.data.signIn.token;
			return { token };
		}
	} catch (err) {
		console.log('hey');
		console.log(err);
	}
};

export default { signIn, signUp };
