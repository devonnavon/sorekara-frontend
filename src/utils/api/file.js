import { request, token } from './common';
import axios from 'axios';

//upload hits our graphql api to get a url from s3
//it then hits this url to upload the file directly to s3
const upload = async (file, filename) => {
	const query = `
        mutation($filename: String!, $filetype: String!) {
            signS3(filename:$filename, filetype:$filetype) {
                signedRequest,
                url
            }
        }
    `;

	const variables = { filename, filetype: file.type };
	const header = token();
	const response = await request(query, variables, header);
	if (response.errors) {
		console.log(response.errors);
		return {};
	}
	const { signedRequest, url } = response.data.signS3;
	ß;
	const options = { headers: { 'Content-Type': file.type } };
	await axios.put(signedRequest, file, options);

	return url;
};

export default { upload };
