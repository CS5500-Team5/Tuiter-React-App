import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  {_id: "alice123", tuit: "alice's tuit", postedBy: "alice"}, 
  {_id: "bob123", tuit: "bob's tuit", postedBy: "bob"}, 
  {_id: "charlie123", tuit:"charlie's tuit", postedBy: "charlie"}
];

test('tuit list renders static tuit array', () => {
  // TODO: implement this
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS}/>
    </HashRouter>);
  const linkElement = screen.getByText(/alice/i);
  expect(linkElement).toBeInTheDocument();
});

//cannot run with jest.mock. test separately by commenting and skipping mock tests
test.skip('tuit list renders async', async () => {
  // TODO: implement this
  findAllTuits().then(response => {
  render(
    <HashRouter>
      <Tuits tuits={response}/>
    </HashRouter>);
  const linkElement = screen.getByText(/nasa/i);
  expect(linkElement).toBeInTheDocument();
  });
});

test('tuit list renders mocked', async () => {
  // TODO: implement this
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const allTuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits={allTuits}/>
    </HashRouter>);

  const thisTuit = screen.getByText(/alice/i);
  expect(thisTuit).toBeInTheDocument();
});
