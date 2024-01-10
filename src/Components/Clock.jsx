import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faPause,
  faPlay,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";

function Clock() {
  const [Minutes, SetMinutes] = useState(25);
  const [Seconds, SetSeconds] = useState("00");
  const [BreakLength, SetBreakLength] = useState(5);
  const [StudyLength, SetStudyLength] = useState(25);
  const [SessionState, SetSessionState] = useState("study");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalIdRef = useRef(null);

  const HandleClick = (type, direction) => {
    if (type === "break") {
      if (direction === "up") {
        SetBreakLength((prevLength) => prevLength + 1);
      } else if (BreakLength > 0) {
        SetBreakLength((prevLength) => prevLength - 1);
      }
    } else if (type === "study") {
      if (direction === "up") {
        SetStudyLength((prevLength) => {
          SetMinutes(prevLength + 1);
          return prevLength + 1;
        });
      } else if (StudyLength > 0) {
        SetStudyLength((prevLength) => {
          SetMinutes(prevLength - 1);
          return prevLength - 1;
        });
      }
    }
  };

  const HandleMouseDown = (type, direction) => {
    if (!intervalIdRef.current) {
      intervalIdRef.current = setInterval(() => {
        HandleClick(type, direction);
      }, 100); // Adjust the interval as needed
    }
  };

  const ClearInterval = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  const HandleMouseUp = () => ClearInterval();
  const HandleMouseLeave = () => ClearInterval();

  const HandleTouchStart = (type, direction) => {
    HandleMouseDown(type, direction); // Reuse the mouse down logic
  };

  const HandleTouchEnd = () => {
    HandleMouseUp(); // Reuse the mouse up logic
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
          onMouseDown={() => HandleMouseDown("break", "up")}
          onMouseUp={HandleMouseUp}
          onMouseLeave={HandleMouseLeave}
          onTouchStart={() => HandleTouchStart("break", "up")}
          onTouchEnd={HandleTouchEnd}
          className="d-inline-block"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <h2 className="d-inline-block m-3">
          <div className="h2-container">{BreakLength} </div>
        </h2>
        <button
          onClick={() => HandleClick("break", null)}
          onMouseDown={() => HandleMouseDown("break", null)}
          onMouseUp={HandleMouseUp}
          onMouseLeave={HandleMouseLeave}
          onTouchStart={() => HandleTouchStart("break", null)}
          onTouchEnd={HandleTouchEnd}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
      <div className="d-inline-block m-3">
        <h4>Study Length</h4>
        <button
          onClick={() => HandleClick("study", "up")}
          onMouseDown={() => HandleMouseDown("study", "up")}
          onMouseUp={HandleMouseUp}
          onMouseLeave={HandleMouseLeave}
          onTouchStart={() => HandleTouchStart("study", "up")}
          onTouchEnd={HandleTouchEnd}
          className="d-inline-block"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <h2 className="d-inline-block m-3">
          <div className="h2-container">{StudyLength}</div>
        </h2>
        <button
          onClick={() => HandleClick("study", null)}
          onMouseDown={() => HandleMouseDown("study", null)}
          onMouseUp={HandleMouseUp}
          onMouseLeave={HandleMouseLeave}
          onTouchStart={() => HandleTouchStart("study", null)}
          onTouchEnd={HandleTouchEnd}
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
