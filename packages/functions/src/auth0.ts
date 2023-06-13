const axios = require("axios").default;

const auth0Params: any = {
    grant_type: 'client_credentials',
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_AUDIENCE
}

const options = {
    method: 'POST',
    url: process.env.AUTH0_URL,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams(auth0Params)
};

export const generateAccessToken = async (): Promise<string> => {
    const responseBody: string = await axios.request(options).then(function (response: any) {
        return response.data.access_token;
    }).catch(function (error: any) {
        throw error;
    });
    return responseBody
}