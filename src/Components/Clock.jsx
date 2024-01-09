import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faPause,
  faPlay,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Clock() {
  const [Minutes, SetMinutes] = useState(25);
  const [Seconds, SetSeconds] = useState("00");
  const [BreakLength, SetBreakLength] = useState(5);
  const [StudyLength, SetStudyLength] = useState(25);
  const [SessionState, SetSessionState] = useState("study");
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const HandleClick = (type, direction) => {
    if (type === "break") {
      if (direction === "up") {
        SetBreakLength(BreakLength + 1);
      } else {
        SetBreakLength(BreakLength - 1);
      }
    } else if (type === "study") {
      if (direction === "up") {
        SetStudyLength(StudyLength + 1);
        SetMinutes(StudyLength + 1);
      } else {
        SetStudyLength(StudyLength - 1);
        SetMinutes(StudyLength - 1);
      }
    }
  };

  const DecrementTimer = () => {
    if (parseInt(Seconds) > 0) {
      SetSeconds((prevSeconds) =>
        (parseInt(prevSeconds) - 1).toString().padStart(2, "0")
      );
    } else if (Minutes > 0) {
      SetMinutes((prevMinutes) => prevMinutes - 1);
      SetSeconds("59");
    } else {
      switchSession();
    }
  };

  const switchSession = () => {
    if (SessionState === "study") {
      SetSessionState("break");
      SetMinutes(BreakLength);
      SetSeconds("00");
    } else {
      SetSessionState("study");
      SetMinutes(StudyLength);
      SetSeconds("00");
    }
  };

  useEffect(() => {
    let timerId;
    if (isTimerRunning) {
      timerId = setInterval(() => {
        DecrementTimer();
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [Minutes, Seconds, isTimerRunning]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    SetMinutes(StudyLength);
    SetSeconds("00");
    setIsTimerRunning(false);
    SetSessionState("study");
  };

  return (
    <div className="clock">
      <h1>Pomodoro Clock</h1>

      <h2>
        {`${Minutes.toString().padStart(2, "0")}:${Seconds.padStart(2, "0")}`}
      </h2>

      <div className="d-inline-block m-3">
        <h4>Break Length</h4>
        <button
          onClick={() => HandleClick("break", "up")}
          className="d-inline-block"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <h2 className="d-inline-block m-3">
          <div className="h2-container">{BreakLength} </div>
        </h2>
        <button
          onClick={() => HandleClick("break", null)}
          className="d-inline-block"
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
      <div className="d-inline-block m-3">
        <h4>Study Length</h4>
        <button
          onClick={() => HandleClick("study", "up")}
          className="d-inline-block"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <h2 className="d-inline-block m-3">
          <div className="h2-container">{StudyLength}</div>
        </h2>
        <button
          onClick={() => HandleClick("study", null)}
          className="d-inline-block"
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
      <div>
        <button onClick={startTimer}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button onClick={pauseTimer}>
          <FontAwesomeIcon icon={faPause} />
        </button>
        <button onClick={resetTimer}>
          <FontAwesomeIcon icon={faRefresh} />
        </button>
      </div>
    </div>
  );
}

export default Clock;
