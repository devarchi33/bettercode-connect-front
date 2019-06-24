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
}