import React, {useState} from "react";

import './polldisplay-css.css'
import Option from "./option";
import * as pollService from "../../services/poll-service"
import { ReactSession } from 'react-client-session';

/**
 * The component of displaying the poll inside a tuit
 * @param tuit tuit
 * @return {JSX.Element} poll component
 */
const PollDisplay = ({text, tuit, vote, createVote, deleteVote}) => {
    //get all vote number
    let optionNum = 0;
    tuit.pollOptions.map && tuit.pollOptions.map(opt => optionNum += opt.numVoted)
    const [open, setOpen] = useState(tuit.isPollOpen)
    const [buttonText, setButtonText] = useState(text)

    const userId = ReactSession.get("Username");
    //console.log(userId)
    //console.log(tuit.postedBy.username)

    const toggleFreeze = async () => {
        let flag = false;
        await pollService.findAllPollsByUser("my")
            .then(tuits => {
                tuits.map(
                    t => {
                        if (t._id === tuit._id) {
                            flag = true
                        }
                    }
                )
            })
        if (flag) {
            tuit.isPollOpen = !tuit.isPollOpen;
            if(!tuit.isPollOpen){
                setButtonText("Unfreeze")
            } else {
                setButtonText("Freeze")
            }
            setOpen(!open)
            await pollService.updatePoll(tuit._id, tuit)
                .then(p => console.log(p));
            alert(tuit.isPollOpen ? "poll open" : "poll frozen");
            return
        }
        alert("you can only freeze your poll");
    }

    return(
        <div className="wrapper">
            <header>{tuit.tuit}
            {userId === tuit.postedBy.username ?
                (<button className={"poll-freeze-btn"} onClick={() => toggleFreeze()}>
                    {buttonText}
                </button>) :
                (
                    <div className={"poll-freeze-btn"}>
                        {text === "Unfreeze" ? "Closed" : "Active"}
                    </div>
                )
            }
                <br/></header>
            <div className="poll-area">
            {
                tuit.pollOptions.map && tuit.pollOptions.map(option =>
                    <input type={"checkbox"} name={"poll"} id={"opt-1"} key={option._id}/>)
            }
            {
                tuit.pollOptions.map && tuit.pollOptions.map(
                    option =>
                        <Option option={option} key={option._id}
                                vote={vote}
                                tid={tuit._id}
                                optionNum={optionNum}
                                isPollOpen={open}
                                createVote={createVote} deleteVote={deleteVote}/>
                )
            }
            </div>
        </div>
    );
};
export default PollDisplay;