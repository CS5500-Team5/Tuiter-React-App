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
    //The initial state should be the option the user chosen
    const [selectedKey, setSelectedKey] = useState("opt11")
    //the _id of previous selected option
    //The initial state is ""
    const [preKey, setPreKey] = useState("")
    //if the poll is frozen, it should be pass from the tuit
    const [freeze, setFreeze] = useState(!tuit.isPollOpen)

    //keep track of selected key and preSelected key
    const select = (key) => {
        if (freeze) {
            return;
        }
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

    //toggle freeze the poll
    const toggleFreeze = () => {
        if (freeze) {
            setSelectedKey("opt11")
            setPreKey("opt11")
        } else {
            setSelectedKey("PlaceHolding_For_Frozen_Poll")
            setPreKey("PlaceHolding_For_Frozen_Poll")
        }
        setFreeze(!freeze)
    }

    //get all vote number
    let optionNum = 0;
    tuit.pollOptions.map && tuit.pollOptions.map(
        opt => optionNum += opt.numVoted
    )

    return(
        <div className="wrapper">
            <header>{tuit.tuit}
                <button className={"poll-freeze-btn"} onClick={() => toggleFreeze()}>
                    freeze
                </button>
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