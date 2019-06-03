import CONFIG from '../config';

export default class AccountAPI {
    static BASE_URL = CONFIG.apiUrl;

    static getAccountData = (id) => {
        return fetch(AccountAPI.BASE_URL + `/${id}`)
            .then(response => response.json());
    }
}