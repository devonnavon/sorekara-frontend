import { request, token } from './common';

const create = async (variables) => {
	const query = `
        mutation($eventId: ID!, $sortOrder: Int!) {
            createEventCard(eventId: $eventId,  sortOrder: $sortOrder) {
                id
                sortOrder
                cardItems {
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
	return response.data.createEventCard;
};

const update = async (variables) => {
	const query = `
        mutation($id: ID!, $sortOrder: Int) {
            updateEventCard(id: $id,  sortOrder: $sortOrder) {
                id
                sortOrder
                cardItems {
                    id
                    type
                    url
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
	return response.data.updateEventCard;
};

const deleteEventCard = async (id) => {
	const query = `
            mutation($id: ID!) {
                deleteEventCard(id: $id)
            }
    `;
	const header = token();
	const response = await request(query, { id }, header);
	if (response.errors) {
		console.log(response.errors);
		return [];
	}
	return response.data.deleteEventCard;
};

export default { create, update, deleteEventCard };
