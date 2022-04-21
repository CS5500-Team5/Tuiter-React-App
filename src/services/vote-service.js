import axios from "axios";
//import {url} from "./url";

const BASE_URL =  process.env.REACT_APP_BASE_URL;

const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;
const VOTES_API = `${BASE_URL}/api/votes`;

const api = axios.create({
                             withCredentials: true
                         });

export const findAllUsersThatVotedOnTuit = (tid) =>
    api.get(`${VOTES_API}/${tid}`)
        .then(response => response.data);

export const findVoteByUserOnTuit = (tid, uid) =>
    api.get(`${VOTES_API}/${tid}/users/${uid}`)
        .then(response => response.data);

export const createVote = (uid, tid, poid) =>
    api.post(`${USERS_API}/${uid}/votes/${tid}/${poid}`)
        .then(response => response.data);

export const updateVote = (vid, tuit) =>
    api.post(`${VOTES_API}/${vid}`, tuit)
        .then(response => response.data);

export const deleteVote = (uid, tid, poid) =>
    api.delete(`${VOTES_API}/${uid}/${tid}/${poid}`)
        .then(response => response.data);