
export const REGISTER_ENPOINT_URL = process.env.API_URL + 'register';
export const LOGIN_ENPOINT_URL = process.env.API_URL + 'login';
export const TREASURE_ENPOINT_URL = process.env.API_URL + 'treasure';
export const DELETE_ENDPOINT_URL = process.env.API_URL + '/users/';

export const DYNAMO_TABLE_NAME = 'sst-user-app-Users';

export const LOGIN_POST_OPTIONS = {
    method: 'POST',
    url: LOGIN_ENPOINT_URL,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
};

export const REGISTER_POST_OPTIONS = {
    method: 'POST',
    url: REGISTER_ENPOINT_URL,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
};

export const USERS = {
    "registeredUser": {
        "email": "registered@frfr.com",
        "password": "P@ssword8",
    },
    "unregisteredUser": {
        "email": "unregisteredUser@frfr.com",
        "password": "P@ssword1",
    },
    "userToBeRegsistered": {
        "email": "userToBeRegsistered@frfr.com",
        "password": "cccc1@dede.com",
        "name": "add"
    }
};
