import CONFIG from "../config";

export default class BankAccountAPI {
    static BASE_URL = CONFIG.apiUrl + "/bank-account";

    static createBankAccountRecords = (bankAccountRecords) => {
        return fetch(
            BankAccountAPI.BASE_URL + "?tenantCode=bettercode",
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(bankAccountRecords)
            })
            .then(response => response.json());
    }
}