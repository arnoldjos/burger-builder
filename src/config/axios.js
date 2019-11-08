import axios from "axios";

const instance = axios.create({
    baseURL:
        "https://firestore.googleapis.com/v1/projects/burger-builder-fb26d/databases/(default)/documents/"
});

export default instance;
