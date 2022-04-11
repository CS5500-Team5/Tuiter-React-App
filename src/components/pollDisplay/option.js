import React, {useState} from "react";

import './polldisplay-css.css'

const Option = ({option, selected, onClick}) => {

    return (
        <label htmlFor={"opt-1"}
               className={selected?"opt-1 selected selectall" : "opt-1"} onClick={onClick}>
            <div className={"row"}>
                <div className={"column"}>
                    <span className={"circle"}></span>
                    <span className={"text"}>{option.optionText}</span>
                    <span className={"voteNumber"}
                          style={{visibility: selected? "visible" : "hidden"}}>
                        {option.numVoted}
                    </span>
                </div>
                <span className={"percent"}></span>
            </div>
            <div className={"progress"} id={"pstyle1"}></div>
        </label>
    )
}

export default Option;