import React, {useState} from "react";

import './polldisplay-css.css'

const Option = ({option, selected, onClick, selectAll}) => {

    let className = "opt-1 "
    if (selected) className += "selected "
    if (selectAll) className += "selectall "

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
            <div className={"progress"} id={"pstyle1"}></div>
        </label>
    )
}

export default Option;