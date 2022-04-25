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
import {deleteVote} from "../services/vote-service";

describe('create a poll', () => {
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
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteUsersByUsername(t.username);
        deletePoll(Tid);
        deleteVote(Uid, Tid, Opt1id)
        deleteVote(Uid, Tid, Opt2id)
    })

    test('user can create a poll', async () => {
        const newTuit = await createPoll(Uid, {tuit, isPoll: true})
        Tid = newTuit._id;
        //get all poll
        const allPoll = await findAllPolls();
        //check if the poll exists in the database
        const res = allPoll.filter(p => p._id === Tid);
        expect(res.length).toBeGreaterThanOrEqual(1);
        expect(res[0].pollOptions).toStrictEqual([]);

        //create options for the poll
        const opt1 = await createPollOption(Uid, Tid, {
            optionText: options[0]
        })
        Opt1id = opt1._id;
        const opt2 = await createPollOption(Uid, Tid, {
            optionText: options[0]
        })
        Opt2id = opt2._id;

        const poll = await findPollById(Tid);
        expect(poll.pollOptions.length).toBeGreaterThanOrEqual(2);
        poll.pollOptions.map(
            c => {
                expect(options).toContain(c.optionText)
            }
        )
    });
});