import { CUSTOMER_TASKS, BASE_URL, CUSTOMER_TASK_STATUS, TASKS } from "../constants/constants";
import Axios from "axios";

export function complete(customerTaskId, image = null) {
    //TODO: add image
    console.log("image", image);

    const formData = new FormData();
    formData.append("data", JSON.stringify({
        status: CUSTOMER_TASK_STATUS.Complete,
    }));
    if (image) {
        formData.append("files.image", image);
    }
    return Axios
        .put(BASE_URL + CUSTOMER_TASKS + "/" + customerTaskId, formData);
}

export function start(taskId, userId) {
    return Axios
        .post(BASE_URL + CUSTOMER_TASKS, {
            taskid: ""+taskId,
            customerid: ""+userId,
            status: CUSTOMER_TASK_STATUS.Started,
        });
}

export function cancel(customerTaskId) {
    return Axios
        .delete(BASE_URL + CUSTOMER_TASKS + "/" + customerTaskId);
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
            return [];
        });/*
        .then(custTasks => {
            // get the tasks for each customertask
            const taskIds = custTasks.map(ct => "id_in=" + ct.taskid).join("&");
            return Axios.get(BASE_URL + TASKS + '?' + taskIds)
                .then(taskResp => taskResp.data)
                // then return the customertask with the tasks added to a 'task' property
                .then(tasks => custTasks.map(ct => {
                    ct.task = tasks.filter(task => ""+task.id === ct.taskid)[0];
                    return ct;
                }));
        })*/
}