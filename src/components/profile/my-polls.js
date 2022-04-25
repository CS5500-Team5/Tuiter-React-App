import {useEffect, useState} from "react";
import * as service from "../../services/poll-service";
import Tuits from "../tuits";

const Polls = () => {
    const [polls, setPolls] = useState([]);
    const findMyPolls = () =>
        service.findAllPollsByUser("my")
            .then(polls => setPolls(polls));
    useEffect(findMyPolls, []);
    return(
        <Tuits tuits={polls}
               refreshTuits={findMyPolls}/>
    );
};

export default Polls;