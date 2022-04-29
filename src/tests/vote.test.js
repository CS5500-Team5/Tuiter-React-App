/**
 * @jest-environment node
 */
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {
    createPoll,
    createPollOption,
    deletePoll,
    findAllPolls,
    findPollById
} from "../services/poll-service";
import {
    createVote,
    deleteVote,
    findAllUsersThatVotedOnTuit,
    findVoteByUserOnTuit
} from "../services/vote-service";
import {findTuitById} from "../services/tuits-service";

describe('vote api test', () => {
    // sample user to insert
    const t = {
        username: 't',
        password: 't',
        email: 't@t.com'
    };
    const tuit = "test1 tuit";
    const options = [
        "option1", "option2"
    ]
    let Uid;
    let Tid;
    let Opt1id;
    let Opt2id;

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(t.username);
        // insert new user in the database
        const newUser = await createUser(t);
        Uid = newUser._id;
        const newTuit = await createPoll(Uid, {tuit, isPoll: true})
        Tid = newTuit._id;

        //create options for the poll
        await createPollOption(Uid, Tid, {
            optionText: options[0],
            tuit: Tid
        })
        await createPollOption(Uid, Tid, {
            optionText: options[1],
            tuit: Tid
        })
        const TU = await findTuitById(Tid);
        Opt1id = TU.pollOptions[0]._id;
        Opt2id = TU.pollOptions[1]._id;
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteUsersByUsername(t.username);
        deletePoll(Tid);
    })

    test('user can make a vote', async () => {
        let users = await findAllUsersThatVotedOnTuit(Tid);
        expect(users.length).toEqual(0);
        await createVote(Uid, Tid, Opt1id);
        let vote = await findVoteByUserOnTuit(Tid, Uid);
        expect(vote[0].votedOption._id).toEqual(Opt1id);
        users = await findAllUsersThatVotedOnTuit(Tid);
        expect(users.length).toEqual(1);
        await deleteVote(Uid, Tid, Opt1id);
        users = await findAllUsersThatVotedOnTuit(Tid);
        expect(users.length).toEqual(0);

    });
});