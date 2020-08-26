import { request, token } from './common';

const create = async (variables) => {
	const query = `
        mutation(
            $eventCardId: ID!,
            $type: String!,
            $options: String,
            $url: String,
            $text: String,
            $sortOrder: Int!
            ) 
            {
                createCardMedia(
                    eventCardId: $eventCardId
                    type: $type
                    options: $options
                    url: $url
                    text: $text
                    sortOrder: $sortOrder
                ) {
                    id
                    type
                    options
                    url
                    text
                    sortOrder
                }
            }
    `;
	const header = token();
	const response = await request(query, variables, header);
	if (response.errors) {
		console.log(response.errors);
		return [];
	}
	return response.data.createCardMedia;
};

const update = async (variables) => {
	const query = `
        mutation(
            $id: ID!
            $type: String
            $options: String
            $url: String
            $text: String
            $sortOrder: Int
            ) 
            {
                updateCardMedia(
                    id: $id
                    type: $type
                    options: $options
                    url: $url
                    text: $text
                    sortOrder: $sortOrder
                ) {
                    id
                    type
                    url
                    text
                    sortOrder
                }
            }


    `;
	const header = token();
	const response = await request(query, variables, header);
	if (response.errors) {
		console.log(response.errors);
		return [];
	}
	return response.data.updateCardMedia;
};

const deleteCardMedia = async (id) => {
	const query = `
            mutation($id: ID!) {
                deleteCardMedia(id: $id)
            }
    `;
	const header = token();
	const response = await request(query, { id }, header);
	if (response.errors) {
		console.log(response.errors);
		return [];
	}
	return response.data.deleteCardMedia;
};

export default { create, update, deleteCardMedia };
