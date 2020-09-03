import { request, token } from './common';

const update = async (layouts) => {
	//layouts is an array with layouts
	const query = `
        mutation($layouts: [CardItemLayoutInput!]!) {
            updateCardItemLayout(layouts:$layouts) {
                id
            }
        }
    `;
	const header = token();
	const response = await request(query, { layouts }, header);
	if (response.errors) {
		console.log(response.errors);
		return [];
	}
	return response.data.updateCardItemLayout;
};

export default { update };
