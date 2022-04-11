import React, {useState} from "react";

import './polldisplay-css.css'
import Option from "./option";

/**
 * The component of displaying the poll inside a tuit
 * @param tuit tuit
 * @return {JSX.Element} poll component
 */
const PollDisplay = ({tuit}) => {

    //the _id of the selected option
    const [selectedKey, setSelectedKey] = useState("")
    //the _id of previous selected option
    const [preKey, setPreKey] = useState("")

    //keep track of selected key and preSelected key
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

    //get all vote number
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