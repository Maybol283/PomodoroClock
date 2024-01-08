import "./App.css";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function App() {
  const [Timer, SetTimer] = useState("25:00");
  const [BreakLength, SetBreakLength] = useState(5);
  const [StudyLength, SetStudyLength] = useState(25);

  return (
    <>
      <h1>Pomodoro Clock</h1>
      <h2>{Timer}</h2>
      <div className="d-inline-block m-3">
        <h4>Break Length</h4>
        <button className="d-inline-block">
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <h2 className="d-inline-block m-3">{BreakLength}</h2>
        <button className="d-inline-block">
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
      <div className="d-inline-block m-3">
        <h4>Study Length</h4>
        <button className="d-inline-block">
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <h2 className="d-inline-block m-3">{StudyLength}</h2>
        <button className="d-inline-block">
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
      <div></div>
    </>
  );
}

export default App;
