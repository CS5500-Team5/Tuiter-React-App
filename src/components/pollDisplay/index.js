import React, {useState} from "react";

import './polldisplay-css.css'
import {Link} from "react-router-dom";
import TuitStats from "../tuits/tuit-stats";
import TuitVideo from "../tuits/tuit-video";
import TuitImage from "../tuits/tuit-image";
import Tuit from "../tuits/tuit";
import Option from "./option";

const PollDisplay = ({tuit}) => {

    const [selectedKey, setSelectedKey] = useState("")

    const select = (key) => {
        if (key === "") setSelectedKey(key)
        else {
            if (key === selectedKey) setSelectedKey("")
            else setSelectedKey(key)
        }
    }

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
                                onClick={() => select(option._id)}/>
                )
            }
            </div>
        </div>
    );
};
export default PollDisplay;