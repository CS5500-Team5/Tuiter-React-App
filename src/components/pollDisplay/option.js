import React, {useState} from "react";

import './polldisplay-css.css'

/**
 * Option component in poll component
 * @param option option detail
 * @param vote vote id, "" if did not vote
 * @param tid tuit id
 * @param optionNum total number of votes
 * @param isPollOpen if the poll is open or frozen
 * @param createVote create vote function
 * @param deleteVote delete vote function
 * @return {JSX.Element} poll display component
 */
const Option = ({option, vote, tid, optionNum, isPollOpen, createVote, deleteVote}) => {

    let className = "opt-1 ";
    //show progress bar if the user vote for this option
    if (vote === option._id) className += "selected ";
    if (vote !== "") className += "selectall ";

    const choose = () => {
        //do nothing if poll is closed
        if(!isPollOpen) {
            return;
        }
        //if want to unvote
        if (option._id === vote) {
            deleteVote("my", tid, option._id)
        } else if (vote === "") {
            //if did not vote before
            createVote("my", tid, option._id)
        } else {
            //if change vote
            createVote("my", tid, option._id)
                .then(deleteVote("my", tid, vote))
        }
        // window.location.reload()
    }

    //get the percentage of the vote of the option
    let percent = optionNum === 0 ? 0 : (option.numVoted / optionNum) * 100

    return (
        <label htmlFor={"opt-1"}
               className={className}
               onClick={choose}>
            <div className={"row"}>
                <div className={"column"}>
                    <span className={"circle"}></span>
                    <span className={"text"}>{option.optionText}</span>
                    <span className={"voteNumber"}
                          style={{visibility: vote !== ""? "visible" : "hidden"}}>
                        {option.numVoted}
                    </span>
                </div>
                <span className={"percent"}></span>
            </div>
            <div className={"progress"}
                 id={"pstyle1"}
                 style={{width: percent + "%", background: "rgba(208,10,10,0.53)"}}></div>
        </label>
    )
}

export default Option;