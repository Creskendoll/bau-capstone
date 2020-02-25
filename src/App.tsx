import React, { useState } from "react";
import "./style/App.css";
import GameContainer from "./components/GameContainer";
import GameMode from "./resources/GameEnum";

const App = () => {
  // Store the game state in the root element so that we can change it from any child
  const [gameMode, setGameMode] = useState(GameMode.MENU);

  const [score, setScore] = useState(0);

  const _setScore = (f: (s: number) => number) => setScore(f(score));

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
              <button
                onClick={() => {
                  setScore(0);
                  setGameMode(GameMode.MENU);
                }}
                className="back-button"
              >
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
        onMenuBtnClick={gameMode => setGameMode(gameMode)}
      />
    </div>
  );
};

export default App;
