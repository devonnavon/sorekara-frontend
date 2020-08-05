import { request } from './common';

const signIn = async (login, password) => {
	const query = `
        mutation ($login: String!, $password: String!) {
            signIn(login: $login, password: $password) {
                token
            }
        }
    `;
	const variables = { login, password };
	return await request(query, variables);
};

const signUp = async (username, email, password) => {
	const query = `
        mutation ($username: String!, $email: String!, $password: String!) {
            signUp (username:$username, email:$email, password:$password) {
                token
            }
        }
    `;
	const variables = { username, email, password };
	return await request(query, variables);
};

export default { signIn, signUp };
