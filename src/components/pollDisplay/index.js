import React, {useState} from "react";

import './polldisplay-css.css'
import {Link} from "react-router-dom";
import TuitStats from "../tuits/tuit-stats";
import TuitVideo from "../tuits/tuit-video";
import TuitImage from "../tuits/tuit-image";
import Tuit from "../tuits/tuit";
import Option from "./option";

const PollDisplay = ({tuit}) => {

    return(
        <div className="wrapper">
            <header>{tuit.tuit} <br/></header>
            <div className="poll-area">
            {
                tuit.pollOptions.map && tuit.pollOptions.map(option =>
                    <input type={"checkbox"} name={"poll"} id={"opt-1"}/>)
            }
            {
                tuit.pollOptions.map && tuit.pollOptions.map(
                    option =>
                        <Option option={option}/>
                )
            }
            </div>
        </div>
    );
};
export default PollDisplay;