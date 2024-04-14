import React from "react";
import "./App.css";
import Routers from "./routers/routers.route";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Routers />
      <ToastContainer />
    </div>
  );
}

export default App;
