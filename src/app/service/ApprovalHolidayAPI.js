import CONFIG from "../config";

export default class ApprovalHolidayAPI {
    static BASE_URL = CONFIG.apiUrl + "/approval-holiday";

    static createApprovalHoliday = (creatingApprovalHoliday) => {
        return fetch(ApprovalHolidayAPI.BASE_URL, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(creatingApprovalHoliday)})
            .then(response => response.json());
    };

    static findApprovalHoliday = (id) => {
        return fetch(ApprovalHolidayAPI.BASE_URL + `?id=${id}`)
            .then(response => response.json());
    }

    static approveHoliday = (id, isApprove, modifyBy) => {
        return fetch(ApprovalHolidayAPI.BASE_URL + `?id=${id}&isApprove=true&modifyBy=${modifyBy}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }})
            .then(response => response.json());
    }
}