import { request, token } from './common';

const headers = token();

const events = async () => {
	const query = `
        query {
            events{
                id
                title
                description
                eventDate
                published
                password
            }
        }
    `;
	return await request(query, {}, headers);
};

const create = async () => {
	const query = `
    
    `;
	// const variables =
};

export default { events };
