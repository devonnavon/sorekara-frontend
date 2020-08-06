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
	const header = token();
	const response = await request(query, {}, header);
	if (response.errors) {
		console.log(response.errors);
		return [];
	}
	return response.data.events;
};

const create = async (eventFields) => {
	const query = `
        mutation(
            $title: String!
            $description: String
            $eventDate: Date
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
	const header = token();
	const response = await request(query, variables, header);
	return response.data.updateEvent;
};

const update = async (eventFields) => {
	const query = `
        mutation(
            $id: ID!
            $title: String
            $description: String
            $eventDate: Date
            $published: Boolean
            $password: String
            ) {
            updateEvent(
                id: $id
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
	const header = token();
	const response = await request(query, variables, header);
	return response.data.updateEvent;
};

export default { events, create, update };
