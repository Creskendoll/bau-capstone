import React, { useState } from "react";
import "./style/App.css";
import GameContainer from "./components/GameContainer";
import GameMode from "./resources/GameEnum";

const App: React.FC = () => {
  // Store the game state in the root element so that we can change it from any child
  const [gameMode, setGameMode] = useState(GameMode.MENU);

  return (
    <div className="App">
        <div className="App-header">
          {/* Back button */}
          {/* Only show the back button when we're not displaying the menu */}
          {gameMode !== GameMode.MENU && (
            <button
              onClick={() => setGameMode(GameMode.MENU)}
              className="back-button"
            >
              BACK
            </button>
          )}
        </div>

        {/* Game Container */}
        <GameContainer
          gameMode={gameMode}
          onMenuBtnClick={gameMode => setGameMode(gameMode)}
        />
    </div>
  );
};

export default App;
