import { request, token } from './common';

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
	const headers = token();
	return await request(query, {}, headers);
};

const create = async (eventFields) => {
	const query = `
        mutation(
            $title: String!
            $description: String
            $eventDate: DateTime
            $published: Boolean
            $password: String
            ) {
            createEvent(
                title: $title
                description: $description
                eventDate: $eventDate
                published: $published
                password: $password
            ) {
                id
                title
                description
                eventDate
                published
                password
            }
        }

    `;
	const variables = eventFields;
	return await request(query, variables, header);
};

export default { events, create };
