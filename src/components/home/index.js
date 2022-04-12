import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import * as pollService from "../../services/poll-service"
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import "./home.css"
import Polls from "../polls";
import mockTuits from "./mockTuits.json"

const Home = () => {
  const location = useLocation();
  const {uid} = useParams();
  const [tuits, setTuits] = useState([]);
  const [tuit, setTuit] = useState('');

  //polls
  const [polls, setPolls] = useState({});
  //if the tuit uses the poll
  const [usePoll, setUsePoll] = useState('none')
  //notification of whether the user saved the poll
  const [savedNotice, setSavedNotice] =
      useState('Please save the Poll before Tuit')

  const userId = uid;
  const findTuits = () => {
    setTuits(mockTuits)
    // service.findAllTuits().then(tuits => {setTuits(tuits)});
  }
  useEffect(() => {
    let isMounted = true;
    findTuits()
    return () => {isMounted = false;}
  }, []);
  const createTuit = () => {
    let isPoll = usePoll !== 'none';
    console.log({tuit, isPoll, polls})
    // service.createTuit('my', {tuit})
    //     .then(findTuits)
  }


  //toggle to display the poll generator
  const togglePoll = () => {
    if(usePoll === 'none') {
      setUsePoll('block')
    } else {
      setUsePoll('none')
    }
  }

  return(
    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
        <div className="d-flex">
          <div className="p-2">
            <img className="ttr-width-50px rounded-circle"
                 src="../images/nasa-logo.jpg"/>
          </div>
          <div className="p-2 w-100">
            <textarea
                onChange={(e) =>
                    setTuit(e.target.value)}
              placeholder="What's happening?"
              className="w-100 border-0"></textarea>
            <div style={{display: usePoll}}>
              {/*Poll Feature*/}
              <Polls setPolls={setPolls} setSavedNotice={setSavedNotice}/>
              <span className={"notice"}>{savedNotice}</span>
            </div>
            <div className="row">
              <div className="col-10 ttr-font-size-150pc text-primary">
                <i className="fas fa-portrait me-3"></i>
                <i className="far fa-gif me-3"></i>
                <i className="far fa-bar-chart me-3"></i>
                <i className="far fa-face-smile me-3"></i>
                <i className="far fa-calendar me-3"></i>
                <i className="far fa-map-location me-3"></i>
                <i className="far fa-poll" onClick={() => togglePoll()}></i>
              </div>
              <div className="col-2">
                <a onClick={createTuit}
                   className={`btn btn-primary rounded-pill fa-pull-right
                                fw-bold ps-4 pe-4`}>
                  Tuit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tuits tuits={tuits}
             refreshTuits={findTuits}/>
    </div>
  );
};
export default Home;