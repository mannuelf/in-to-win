import { BASE_URL, USERS } from "../constants/constants";
import Axios from "axios";

export function setPoints(userId, points) {
    return Axios
        .put(BASE_URL + USERS + "/" + userId, {
            points: points,
        });
}
