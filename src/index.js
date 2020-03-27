import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import auth from "./auth";

const App = () => {
  const [run, runAgain] = useState({});
  useEffect(() => {
    auth();
  }, [run]);
  return (
    <>
      check console
      <button onClick={() => runAgain({})}>
        run again
      </button>
    </>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
