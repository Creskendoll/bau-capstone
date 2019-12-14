import React, { useState } from "react";
import "./style/App.css";
import GameContainer from "./components/GameContainer";
import GameMode from "./resources/GameEnum";

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState(GameMode.MENU);

  return (
    <div className="App">
      <header className="App-header">
        {gameMode !== GameMode.MENU && (
          <button
            onClick={() => setGameMode(GameMode.MENU)}
            className="back-button"
          >
            BACK
          </button>
        )}
      </header>
      <body className="App-body">
        <GameContainer
          gameMode={gameMode}
          onMenuBtnClick={gameMode => setGameMode(gameMode)}
        />
      </body>
    </div>
  );
};

export default App;
