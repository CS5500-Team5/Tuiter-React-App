
/**
* @jest-environment node
*/
import {
    createPoll,
    createPollOption,
    //deleteUsersByUsername, 
    findPollById,
    deletePoll,
    updatePoll
  } from "../services/poll-service";
  import {
    createTuit,
    deleteTuitByText, findAllTuits,
    findTuitById
  } from "../services/tuits-service";
  import {
    createVote,
    deleteVote
  } from "../services/vote-service";
  
  describe('createPoll', () => {
    // sample user to insert
    const poll = {
        tuit: 'music',
        isPoll: true,
        postedOn: '2022-03-03'
    };
  
    // setup test before running test
    beforeAll(() => {
      // remove any/all users to make sure we create it in the test
      return deleteTuitByText(poll.tuit);
    })
  
    // clean up after test runs
    afterAll(() => {
      // remove any data we created
      return deleteTuitByText(poll.tuit);
    })
  
    test('can create poll with REST API', async () => {
        let tuitId = null;
        const newTuit = await createPoll('61fda0d7196a9717b85f4476', poll);
        const otext = {
            optionText: "Jazz",
            tuit: newTuit._id
        }
        const pollText = await createPollOption('61fda0d7196a9717b85f4476', newTuit._id, otext);
        const pollWithOption = await findPollById(newTuit._id);
        //const allTuits = await findAllTuits();
        //const users = await findAllUsers();
        //console.info(allTuits)
        // there should be a minimum number of users
        //expect(allTuits.length).toBeGreaterThanOrEqual(1);
        expect(newTuit.tuit).toEqual(poll.tuit);
        expect(pollWithOption.pollOptions.length).toEqual(1);
        //expect(new Date(newTuit.postedOn)).toEqual(new Date(testTuit.postedOn));
        //expect(newTuit.postedBy).toEqual('61fda0d7196a9717b85f4476');
        //expect('1').toEqual('1');
    });
});

    describe('frozenPoll', () => {
        // TODO: implement this
          // sample user to delete
          const poll = {
            tuit: 'music',
            isPoll: true,
            isPollOpen: false,
            postedOn: '2022-03-03'
        };
    
      // setup the tests before verification
      beforeAll(() => {
        // insert the sample user we then try to remove
        return deleteTuitByText(poll.tuit);
      });
    
      // clean up after test runs
      afterAll(() => {
        // remove any data we created
        return deleteTuitByText(poll.tuit);
      })
    
      test('check if poll and voting is frozen using REST API', async () => {
        // delete a user by their username. Assumes user already exists
        const cpoll = await createPoll('61fda0d7196a9717b85f4476', poll);
        const otext = {
            optionText: "Jazz",
            tuit: cpoll._id
        }
        const pollText = await createPollOption('61fda0d7196a9717b85f4476', cpoll._id, otext);
        // verify we deleted at least one user by their username
        expect(cpoll.isPollOpen).toBe(false);
        createVote('61fda0d7196a9717b85f4476', cpoll._id, pollText._id).then((r) => expect(r.status).toBe(400));
      });
    
      });
      
  