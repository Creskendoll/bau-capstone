import React, { useState, useEffect } from "react";
import "./style/App.css";
import GameContainer from "./components/GameContainer";
import GameMode from "./resources/GameEnum";
import ReportModel from "./misc/ReportModel";

// Hook
function useKeyPress(targetKey: string) {
  // State for keeping track of whether key is pressed

  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners

  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    window.addEventListener("keyup", upHandler);

    // Remove event listeners on cleanup

    return () => {
      window.removeEventListener("keydown", downHandler);

      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

const App = () => {
  // Store the game state in the root element so that we can change it from any child
  const [gameMode, setGameMode] = useState(GameMode.MENU);
  const [report, setReport] = useState<ReportModel>({
    matchGame: undefined,
    mathGame: undefined,
    memorizeGame: undefined
  });

  const [score, setScore] = useState(0);

  const _setScore = (f: (s: number) => number) => setScore(f(score));

  const _setReport = (isStart: boolean, gameMode: GameMode) => {
    const nowTimestamp = +new Date();
    if (gameMode === GameMode.MATH) {
      const newReport = isStart
        ? {
            mathGame: {
              startTime: nowTimestamp,
              endTime: undefined
            }
          }
        : {
            mathGame: {
              startTime: report.mathGame?.startTime,
              endTime: nowTimestamp
            }
          };
      console.log(newReport);

      setReport(Object.assign({}, report, newReport));
    } else if (gameMode === GameMode.CARDS) {
      const newReport = isStart
        ? {
            matchGame: {
              startTime: nowTimestamp,
              endTime: undefined
            }
          }
        : {
            matchGame: {
              startTime: report.matchGame?.startTime,
              endTime: nowTimestamp
            }
          };
      setReport(Object.assign({}, report, newReport));
    } else if (gameMode === GameMode.DOTS) {
      const newReport = isStart
        ? {
            memorizeGame: {
              startTime: nowTimestamp,
              endTime: undefined
            }
          }
        : {
            memorizeGame: {
              startTime: report.memorizeGame?.startTime,
              endTime: nowTimestamp
            }
          };
      setReport(Object.assign({}, report, newReport));
    }
  };

  const downloadPress = useKeyPress("d");
  // Function to download data to a file
  const download = (data, filename, type) => {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  useEffect(() => {
    if (downloadPress) {
      const now = new Date();
      download(
        JSON.stringify(report),
        now.toLocaleDateString("tr-TR") + "_report.json",
        "application/json"
      );
    }
  });

  const _onMenuBtnClick = (gameMode: GameMode) => {
    _setReport(true, gameMode);
    setGameMode(gameMode);
  };

  const _onBackClick = () => {
    _setReport(false, gameMode);
    setScore(0);
    setGameMode(GameMode.MENU);
  };

  return (
    <div className="App">
      <div className="App-header">
        {/* Back button */}
        {/* Only show the back button when we're not displaying the menu */}
        {gameMode !== GameMode.MENU && (
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div
              style={{
                display: "flex"
              }}
            >
              <button onClick={_onBackClick} className="back-button">
                BACK
              </button>
            </div>
            <div
              style={{
                display: "flex",
                position: "absolute",
                right: "5vw",
                alignSelf: "center"
              }}
            >
              <span style={{ alignSelf: "center", fontSize: "2em" }}>
                {score}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Game Container */}
      <GameContainer
        setScore={_setScore}
        gameMode={gameMode}
        onMenuBtnClick={_onMenuBtnClick}
      />
    </div>
  );
};

export default App;
