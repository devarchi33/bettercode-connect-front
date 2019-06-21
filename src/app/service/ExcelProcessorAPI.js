import CONFIG from '../config';

export default class ExcelProcessorAPI {
    static BASE_URL = CONFIG.apiUrl + "/excel-processor";

    static getWorkBankAccountRecords = (id) => {
        return fetch(ExcelProcessorAPI.BASE_URL + `/${id}`)
            .then(response => response.json());
    };
}