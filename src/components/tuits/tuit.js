import React, {useEffect, useState} from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";
import PollDisplay from "../pollDisplay";
import {useNavigate, Link} from "react-router-dom";
import * as voteService from "../../services/vote-service"
import {deletePoll} from "../../services/poll-service";
import { ReactSession } from 'react-client-session';

const Tuit = ({tuit, deleteTuit, likeTuit, dislikeTuit, refersh}) => {
    const navigate = useNavigate();
    const daysOld = (tuit) => {
        const now = new Date();
        const nowMillis = now.getTime();
        const posted = new Date(tuit.postedOn);
        const postedMillis = posted.getTime();
        const oldMillis = nowMillis - postedMillis;
        let old = 0.0;
        const secondsOld = oldMillis/1000.0;
        const minutesOld = secondsOld/60.0;
        const hoursOld = minutesOld/60.0;
        const daysOld = hoursOld/24.0;
        if(daysOld > 1) {
            old = Math.round(daysOld) + 'd';
        } else if(hoursOld > 1) {
            old = Math.round(hoursOld) + 'h';
        } else if(minutesOld > 1) {
            old = Math.round(minutesOld) + 'm';
        } else if(secondsOld > 1) {
            old = Math.round(secondsOld) + 's';
        }
        return old;
    }
    const [vote, setVote] = useState("");
    voteService.findVoteByUserOnTuit(tuit._id, "my")
        .then(v => setVote(v[0] === undefined ? "" : v[0].votedOption._id))

    const createVote = (uid, tid, poid) =>
        voteService.createVote(uid, tid, poid)
            .then(refersh);
    const deleteVote = (uid, tid, poid) =>
        voteService.deleteVote(uid, tid, poid)
            .then(refersh);
    const userId = ReactSession.get("UserId");

  return(
    // <li onClick={() => navigate(`/tuit/${tuit._id}`)}
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        {
          tuit.postedBy &&
          <img src={`../images/${tuit.postedBy.username}.jpg`}
               className="ttr-tuit-avatar-logo rounded-circle"/>
        }
      </div>
      <div className="w-100">
        {userId === tuit.postedBy._id &&
          <i onClick={() => {
              if (tuit.isPoll) deletePoll(tuit._id);
              deleteTuit(tuit._id);
          }} className="fas fa-remove fa-2x fa-pull-right"></i>
        }
          <Link to={`/tuit/${tuit._id}`}>
          <i className="float-end fas fa-circle-ellipsis me-1"></i>
          </Link>
        <h2
          className="fs-5">
          {tuit.postedBy && tuit.postedBy.username}
          @{tuit.postedBy && tuit.postedBy.username} -
            <span className="ms-1">{daysOld(tuit)}</span></h2>

          {/*if poll, add poll display as tuit context*/}
          {tuit.isPoll? <PollDisplay text={tuit.isPollOpen === true ? "Freeze" : "Unfreeze"}
                                     tuit={tuit}
                                     vote={vote}
                                     createVote={createVote}
                                     deleteVote={deleteVote}/> : tuit.tuit}

        {
          tuit.youtube &&
            <TuitVideo tuit={tuit}/>
        }
        {
          tuit.image &&
          <TuitImage tuit={tuit}/>
        }
        <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit = {dislikeTuit}/>
      </div>
    </li>
  );
}
export default Tuit;