import { request, token } from './common';

const create = async (variables) => {
	const query = `
        mutation($eventId: ID!, $size: String!, $sortOrder: Int!) {
            createEventCard(eventId: $eventId, size: $size, sortOrder: $sortOrder) {
                id
                size
                sortOrder
                cardMedia {
                    id
                }
            }
        }
    `;
	const header = token();
	const response = await request(query, variables, header);
	if (response.errors) {
		console.log(response.errors);
		return [];
	}
	return response.data.events;
};

import { request, token } from './common';

const update = async (variables) => {
	const query = `
        mutation($id: ID!, $size: String, $sortOrder: Int) {
            updateEventCard(id: $id, size: $size, sortOrder: $sortOrder) {
                id
                size
                sortOrder
                cardMedia {
                    id
                    type
                    url
                    sortOrder
                    text
                }
            }
        }

    `;
	const header = token();
	const response = await request(query, variables, header);
	if (response.errors) {
		console.log(response.errors);
		return [];
	}
	return response.data.events;
};

const deleteEventCard = async (variables) => {
	const query = `
            mutation($id: ID!) {
                deleteEventCard(id: $id)
            }
    `;
	const header = token();
	const response = await request(query, variables, header);
	if (response.errors) {
		console.log(response.errors);
		return [];
	}
	return response.data.events;
};
