import axios from 'axios';

const REGISTER_ENPOINT_URL = process.env.API_URL + 'register';
const LOGIN_ENPOINT_URL = process.env.API_URL + 'login';
const TREASURE_ENPOINT_URL = process.env.API_URL + 'treasure';

const registerUser = async (user) => {
    const postOptions = {
        method: 'POST',
        url: REGISTER_ENPOINT_URL,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
    };
    postOptions['data'] = new URLSearchParams(user)
    return await axios.request(postOptions)
}

const loginUser = async (user) => {
    const postOptions = {
        method: 'POST',
        url: LOGIN_ENPOINT_URL,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
    };
    postOptions['data'] = new URLSearchParams(user)
    return await axios.request(postOptions)
}

const retrieveTreasure = async (token) => {
    const getOptions = {
        method: 'GET',
        url: TREASURE_ENPOINT_URL,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    return await axios.request(getOptions)
}

export { registerUser, loginUser, retrieveTreasure }