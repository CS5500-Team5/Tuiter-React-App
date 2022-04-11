import React, {useState} from "react";

import './polldisplay-css.css'
import Option from "./option";

const PollDisplay = ({tuit}) => {

    const [selectedKey, setSelectedKey] = useState("")
    const [preKey, setPreKey] = useState("")

    const select = (key) => {
        if (key === "") {
            setSelectedKey(key);
            setPreKey("")
        }
        else {
            if (key === selectedKey) {
                setSelectedKey("");
                setPreKey(key)
            }
            else {
                setPreKey(selectedKey)
                setSelectedKey(key)
            }
        }
    }

    let optionNum = 0;
    tuit.pollOptions.map && tuit.pollOptions.map(
        opt => optionNum += opt.numVoted
    )

    return(
        <div className="wrapper">
            <header>{tuit.tuit} <br/></header>
            <div className="poll-area">
            {
                tuit.pollOptions.map && tuit.pollOptions.map(option =>
                    <input type={"checkbox"} name={"poll"} id={"opt-1"} key={option._id}/>)
            }
            {
                tuit.pollOptions.map && tuit.pollOptions.map(
                    option =>
                        <Option option={option} key={option._id}
                                selected={selectedKey === option._id}
                                preSelected={preKey === option._id}
                                selectAll={selectedKey !== ""}
                                optionNum={optionNum}
                                onClick={() => select(option._id)}/>
                )
            }
            </div>
        </div>
    );
};
export default PollDisplay;