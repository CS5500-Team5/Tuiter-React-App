/**
 * @file Service file to enable frontend to use the Polls resource
 */
import axios from "axios";

const BASE_URL =  process.env.REACT_APP_BASE_URL;

const USERS_API = `${BASE_URL}/api/users`;
const POLLS_API = `${BASE_URL}/api/polls`;

const api = axios.create({withCredentials: true});

/**
 * Retrieves all polls from the database
 */
export const findAllPolls = () =>
    api.get(POLLS_API)
        .then(response => response.data);

/**
 * Retrieves a poll from the database
 * @param {tid} Tuit Id for the poll
 */
export const findPollById = (tid) =>
    api.get(`${POLLS_API}/${tid}`)
        .then(response => response.data);

/**
 * Retrieves polls created by a user from the database
 * @param {uid} User Id of the user who created the polls
 */
export const findAllPollsByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/polls`)
        .then(response => response.data);

/**
 * Creates a new poll by a user in the database
 * @param {uid} User Id of the user who creates the poll
 * @param {poll} Content of the poll
 */
export const createPoll = (uid, poll) =>
    api.post(`${USERS_API}/${uid}/polls`, poll)
        .then(response => response.data);

/**
 * Creates a new poll options in the database
 * @param {uid} User Id of the user who creates the poll
 * @param {tid} Tuit Id for the poll
 * @param {option} Content of the poll option
 */
export const createPollOption = (uid, tid, option) =>
    api.post(`${USERS_API}/${uid}/polls/${tid}/option`, option)
        .then(response => response.data);

/**
 * Updates poll created by a user in the database
 * @param {uid} User Id of the user
 * @param {poll} Content of the poll
 */
export const updatePoll = (uid, poll) =>
    api.put(`${POLLS_API}/${uid}`, poll)
        .then(response => response.data);

/**
 * Deletes poll created by a user from the database
 * @param {tid} Tuit Id for the poll
 */
export const deletePoll = (tid) =>
    api.delete(`${POLLS_API}/${tid}`)
        .then(response => response.data);
