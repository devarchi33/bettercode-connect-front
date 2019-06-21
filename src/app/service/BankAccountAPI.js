import React from 'react';
import { message } from 'antd';
import CONFIG from "../config";

export default class BankAccountAPI {
    static BASE_URL = CONFIG.apiUrl + "/bank-account";

    static createBankAccountRecords = (accountNo, year, quater, bankAccountRecords) => {
        return fetch(
            BankAccountAPI.BASE_URL + `?tenantCode=bettercode&accountNo=${accountNo.split(":")[1].trim()}&year=${year}&quater=${quater}&createdBy=${'li.dongxun'}`,
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(bankAccountRecords)
            })
            .then(response => {
                console.log("RESPONSE: ", response);
                if(response['status'] === 201) {
                    message.success(`save successfully`);
                } else {
                    message.error(`save failed`);
                }
                return response.json()
            });
    }

    static searchBankAccountRecords = (accountNo, year, quater) => {
        return fetch(BankAccountAPI.BASE_URL + `?tenantCode=bettercode&accountNo=${accountNo}&year=${year}&quater=${quater}`)
            .then(response => response.json());
    }
}