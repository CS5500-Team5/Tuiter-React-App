import {
  createTuit,
  deleteTuitByText, findAllTuits,
  findTuitById
} from "../services/tuits-service";

describe('createTuitByUser', () => {
  
    // TODO: implement this
    const testTuit = {
      tuit: 'Testing',
      postedOn: '2022-03-03'
    };

    // setup test before running test
    
    beforeAll(() => {
      // remove any/all users to make sure we create it in the test
      return deleteTuitByText(testTuit.tuit);
    });
  
    // clean up after test runs
    afterAll(() => {
      // remove any data we created
      return deleteTuitByText(testTuit.tuit);
    });
    


    test('can create tuit with REST API', async () => {
        const newTuit = await createTuit('61fda0d7196a9717b85f4476', testTuit);
        //const allTuits = await findAllTuits();
        //const users = await findAllUsers();
        //console.info(allTuits)
        // there should be a minimum number of users
        //expect(allTuits.length).toBeGreaterThanOrEqual(1);
        expect(newTuit.tuit).toEqual(testTuit.tuit);
        //expect(new Date(newTuit.postedOn)).toEqual(new Date(testTuit.postedOn));
        expect(newTuit.postedBy).toEqual('61fda0d7196a9717b85f4476');
        //expect('1').toEqual('1');
    });
  });
  
  
  describe('can delete tuit wtih REST API', () => {
    // TODO: implement this
      // sample user to delete
  const sampleTuit = {
    tuit: 'TestToDelete'
  };

  // setup the tests before verification
  beforeAll(() => {
    // insert the sample user we then try to remove
    return createTuit('61fda0d7196a9717b85f4476', sampleTuit);
  });

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteTuitByText(sampleTuit.tuit);
  })

  test('can delete tuit wtih REST API', async () => {
    // delete a user by their username. Assumes user already exists
    const status = await deleteTuitByText(sampleTuit.tuit);
    console.info(status);
    // verify we deleted at least one user by their username
    //expect(status.deletedCount).toBeGreaterThanOrEqual(0);
  });

  });
  
  describe('can retrieve a tuit by their primary key with REST API', () => {
    // TODO: implement this
    // sample user we want to retrieve
  const sampleTuit = {
    tuit: 'RetrieveTuitById'
  };

  // setup before running test
  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteTuitByText(sampleTuit.tuit)
  });

  // clean up after ourselves
  afterAll(() => {
    // remove any data we inserted
    return deleteTuitByText(sampleTuit.tuit);
  });

  test('can retrieve user from REST API by primary key', async () => {
    // insert the user in the database
    const newUser = await createTuit('61fda0d7196a9717b85f4476', sampleTuit);

    // verify new user matches the parameter user
    expect(newUser.tuit).toEqual(sampleTuit.tuit);
    expect(newUser.postedBy).toEqual('61fda0d7196a9717b85f4476');

    // retrieve the user from the database by its primary key
    const existingUser = await findTuitById(newUser._id);

    // verify retrieved user matches parameter user
    expect(existingUser.tuit).toEqual(sampleTuit.tuit);
    expect(existingUser.postedBy).toEqual('61fda0d7196a9717b85f4476');
  });
  });
  

  describe('findAllTuits', () => {
    // TODO: implement this
    
    const ourTuits = [
      "Testing"
    ];

    test('can retrieve all tuits with REST API', async () => {
      // retrieve all the users
      const tuits = await findAllTuits();
  
  
      // compare the actual users in database with the ones we sent
      expect(tuits.length).toBeGreaterThanOrEqual(1);
    });
  
  });