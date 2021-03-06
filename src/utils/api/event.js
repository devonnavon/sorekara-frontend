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

const event = async (id) => {
	const query = `
        query ($id: ID!) {
            event(id:$id){
                id
                title
                description
                eventDate
                published
                password
                eventCards {
                    id
                    sortOrder
                    cardItems {
                        id
                        type
                        url
                        text
                        layout {
                            id
                            screen
                            x
                            y
                            h
                            w
                            i:cardItemId
                        }
                    }
                }
            }
        }
    `;
	const header = token();
	const response = await request(query, { id }, header);
	if (response.errors) {
		console.log(response.errors);
		return {};
	}
	let event = response.data.event;
	// event.eventCards = event.eventCards.sort((a, b) => a.sortOrder > b.sortOrder);
	return event;
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
	return response.data.createEvent;
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

const deleteEvent = async (eventFields) => {
	const query = `
        mutation ($id:ID!) {
        deleteEvent(id:$id)
        }
    `;
	const variables = eventFields;
	const header = token();
	const response = await request(query, variables, header);
	return response.data.deleteEvent;
};

export default { events, event, create, update, deleteEvent };
