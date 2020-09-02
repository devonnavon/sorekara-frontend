import { request, token } from './common';

const create = async (variables) => {
	const query = `
        mutation(
            $eventCardId: ID!,
            $type: String,
            $url: String,
            $text: String,
            $layouts: [layoutInput!]!,
        ) 
            {
            createCardItem(
                eventCardId: $eventCardId
                type: $type
                url: $url
                text: $text
                layouts:$layouts
            ) 
                {
                id
                layout {
                    screen
                    x
                    y
                    h
                    w
                    i:cardItemId
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
	return response.data.createCardItem;
};

const update = async (variables) => {
	const query = `
        mutation(
            $id: ID!
            $type: String
            $url: String
            $text: String
            ) 
            {
                updateCardItem(
                    id: $id
                    type: $type
                    url: $url
                    text: $text
                ) {
                    id
                    type
                    url
                    text
                }
            }
        )

    `;
	const header = token();
	const response = await request(query, variables, header);
	if (response.errors) {
		console.log(response.errors);
		return [];
	}
	return response.data.updateCardItem;
};

const deleteCardItem = async (id) => {
	const query = `
            mutation($id: ID!) {
                deleteCardItem(id: $id)
            }
    `;
	const header = token();
	const response = await request(query, { id }, header);
	if (response.errors) {
		console.log(response.errors);
		return [];
	}
	return response.data.deleteCardItem;
};

export default { create, update, deleteCardItem };
