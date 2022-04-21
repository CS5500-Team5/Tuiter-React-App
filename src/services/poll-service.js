import axios from "axios";
//import {url} from "./url";

const BASE_URL =  process.env.REACT_APP_BASE_URL;

const USERS_API = `${BASE_URL}/api/users`;
const POLLS_API = `${BASE_URL}/api/polls`;

const api = axios.create({withCredentials: true});

export const findAllPolls = () =>
    api.get(POLLS_API)
        .then(response => response.data);

export const findPollById = (tid) =>
    api.get(`${POLLS_API}/${tid}`)
        .then(response => response.data);

export const findAllPollsByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/polls`)
        .then(response => response.data);

export const createPoll = (uid, poll) =>
    api.post(`${USERS_API}/${uid}/polls`, poll)
        .then(response => response.data);

export const createPollOption = (uid, tid, option) =>
    api.post(`${USERS_API}/${uid}/polls/${tid}/option`, option)
        .then(response => response.data);

export const updatePoll = (uid, poll) =>
    api.put(`${POLLS_API}/${uid}`, poll)
        .then(response => response.data);

export const deletePoll = (tid) =>
    api.delete(`${POLLS_API}/${tid}`)
        .then(response => response.data);