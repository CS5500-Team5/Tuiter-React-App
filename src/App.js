import React from "react";
import logo from './logo.svg';
import './styles.css';
// import Navigation from "./components/navigation";
// import Tuits from "./components/tuits";
// import WhatsHappening from "./components/whats-happening/whats-happening";
// import Bookmarks from "./components/bookmarks/bookmarks";
import Tuiter from "./components/tuiter";
import { ReactSession } from 'react-client-session';

function App() {
  ReactSession.setStoreType("sessionStorage");
  return (
    <Tuiter/>
  );
}

export default App;
