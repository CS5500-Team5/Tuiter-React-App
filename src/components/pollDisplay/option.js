import React, {useState} from "react";

import './polldisplay-css.css'

const Option = ({option, selected, onClick, selectAll, optionNum}) => {

    let className = "opt-1 "
    if (selected) className += "selected "
    if (selectAll) className += "selectall "
    let percent = (option.numVoted / optionNum) * 100 + "%"

    return (
        <label htmlFor={"opt-1"}
               className={className}
               onClick={onClick}>
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
            <div className={"progress"}
                 id={"pstyle1"}
                 style={{width: percent, background: "rgba(208,10,10,0.53)"}}></div>
        </label>
    )
}

export default Option;