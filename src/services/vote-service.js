/**
 * @file Service file to enable frontend to use the Votes resource
 */
import axios from "axios";

const BASE_URL =  process.env.REACT_APP_BASE_URL;

const TUITS_API = `${BASE_URL}/api/tuits`;
const USERS_API = `${BASE_URL}/api/users`;
const VOTES_API = `${BASE_URL}/api/votes`;

const api = axios.create({
    withCredentials: true
});

/**
 * Retrieves all votes on a poll from the database
 * @param {tid} Tuit Id for the poll
 */
export const findAllUsersThatVotedOnTuit = (tid) =>
    api.get(`${VOTES_API}/${tid}`)
        .then(response => response.data);

/**
 * Retrieves votes casted by a user on polls from the database
 * @param {tid} Tuit Id for the poll
 * @param {uid} User Id of the user who voted on the given poll
 */
export const findVoteByUserOnTuit = (tid, uid) =>
    api.get(`${VOTES_API}/${tid}/users/${uid}`)
        .then(response => response.data);

/**
 * Creates a new vote by a user on a poll in the database
 * @param {tid} Tuit Id for the poll
 * @param {uid} User Id of the user who created the given poll
 * @param {poid} Vote Id of the vote casted by the user on given poll
 */
export const createVote = (uid, tid, poid) =>
    api.post(`${USERS_API}/${uid}/votes/${tid}/${poid}`)
        .then(response => response.data);

/**
 * Updates vote casted by a user on a poll in the database
 * @param {vid} Tuit Id for the poll
 * @param {tuit} Content for the poll
 */
export const updateVote = (vid, tuit) =>
    api.post(`${VOTES_API}/${vid}`, tuit)
        .then(response => response.data);


/**
 * Deletes vote casted by a user on a poll from the database
 * @param {tid} Tuit Id for the poll
 * @param {uid} User Id of the user who created the given poll
 * @param {poid} Vote Id of the vote casted by the user on given poll
 */
export const deleteVote = (uid, tid, poid) =>
    api.delete(`${VOTES_API}/${uid}/${tid}/${poid}`)
        .then(response => response.data);
