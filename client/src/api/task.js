import { CUSTOMER_TASKS, BASE_URL, CUSTOMER_TASK_STATUS, TASKS } from "../constants/constants";
import Axios from "axios";

export function complete(taskId, userId, image = null) {
    //TODO: add image
    console.log("image", image);

    const formData = new FormData();
    formData.append("data", JSON.stringify({
        taskid: "" + taskId,
        customerid: "" + userId,
        status: CUSTOMER_TASK_STATUS.Complete,
    }));
    if (image) {
        formData.append("files.image", image);
    }
    return Axios
        .post(BASE_URL + CUSTOMER_TASKS, formData);
}

export function start(taskId, userId) {
    return Axios
        .post(BASE_URL + CUSTOMER_TASKS, {
            taskid: ""+taskId,
            customerid: ""+userId,
            status: CUSTOMER_TASK_STATUS.Started,
        });
}

export function getAll() {
    return Axios.get(BASE_URL + TASKS)
        .then(taskResp => taskResp.data);
}

export function getByUser(userId) {
    const url = BASE_URL + CUSTOMER_TASKS + `?customerid=${encodeURIComponent(userId)}`;
    return getUserTasksByUrl(url);
}

export function getCompletedByUser(userId) {
    const url = BASE_URL + CUSTOMER_TASKS +
        `?status=${CUSTOMER_TASK_STATUS.Complete}&customerid=${encodeURIComponent(userId)}`;
    return getUserTasksByUrl(url);
}

export function getStartedByUser(userId) {
    const url = BASE_URL + CUSTOMER_TASKS +
        `?status=${CUSTOMER_TASK_STATUS.Started}&customerid=${encodeURIComponent(userId)}`;
    return getUserTasksByUrl(url);
}

/*
 Helpers
*/

function getUserTasksByUrl(url) {
    return Axios.get(url)
        .then(resp => {
            if (resp.data && resp.data.length) {
                return resp.data;
            }
            return Promise.reject("No customertasks found.");
        })
        .then(custTasks => {
            const taskIds = custTasks.map(ct => "id_in=" + ct.taskid).join("&");
            return Axios.get(BASE_URL + TASKS + '?' + taskIds);
        })
        .then(taskResp => taskResp.data)
}