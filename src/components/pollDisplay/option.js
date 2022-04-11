import React, {useState} from "react";

import './polldisplay-css.css'

/**
 * Option component in poll component
 * @param option option detail
 * @param selected if the option is selected
 * @param preSelected if the option is pre selected
 * @param onClick onclick listener
 * @param selectAll if any option is selected
 * @param optionNum the total number of vote in this poll
 * @return {JSX.Element} Option component
 */
const Option = ({option, selected, preSelected, onClick, selectAll, optionNum}) => {

    let className = "opt-1 "
    if (selected) {
        className += "selected "
        //+= 0.5 since this will be render twice.
        if (!preSelected) option.numVoted += 0.5
    } else {
        if (preSelected) option.numVoted -= 0.5
    }
    if (selectAll) className += "selectall "

    //get the percentage of the vote of the option
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
                          style={{visibility: selectAll? "visible" : "hidden"}}>
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