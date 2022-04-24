import {PollDisplay} from "../components/pollDisplay";
import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllPolls} from "../services/poll-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "u1", "xx"
];

const MOCKED_TUITS = [
  {_id: "u1", tuit: "fav singer?", postedBy: "u1", isPoll: true, isPollOpen: false}, 
  {_id: "xx", tuit: "fav music?", postedBy: "xx", isPoll: true, isPollOpen: false}
];

test('poll list renders static tuit array', () => {
  // TODO: implement this
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS}/>
    </HashRouter>);
  const linkElement = screen.getByText(/Closed/i);
  expect(linkElement).toBeInTheDocument();
});
