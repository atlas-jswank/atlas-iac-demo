import { useEffect, useState } from "react";
import "./App.css";
import Board from "./Board/Board";
import BoardCell from "./Board/BoardCell";
import BoardRow from "./Board/BoardRow";
import { Token, TokenBlue } from "./Board/Token";

function checkRows(g) {
  if (g[0][0] === g[0][1] && g[0][0] === g[0][2] && g[0][0] !== "_") {
    return [
      ["F", "F", "F"],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ];
  }
  if (g[1][0] === g[1][1] && g[1][0] === g[1][2] && g[1][0] !== "_") {
    return [
      [undefined, undefined, undefined],
      ["F", "F", "F"],
      [undefined, undefined, undefined],
    ];
  }
  if (g[2][0] === g[2][1] && g[2][0] === g[2][2] && g[2][0] !== "_") {
    return [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      ["F", "F", "F"],
    ];
  }
}

function checkColumns(g) {
  if (g[0][0] === g[1][0] && g[0][0] === g[2][0] && g[0][0] !== "_") {
    return [
      ["F", undefined, undefined],
      ["F", undefined, undefined],
      ["F", undefined, undefined],
    ];
  }
  if (g[0][1] === g[1][1] && g[0][1] === g[2][1] && g[0][1] !== "_") {
    return [
      [undefined, "F", undefined],
      [undefined, "F", undefined],
      [undefined, "F", undefined],
    ];
  }
  if (g[0][2] === g[1][2] && g[0][2] === g[2][2] && g[0][2] !== "_") {
    return [
      [undefined, undefined, "F"],
      [undefined, undefined, "F"],
      [undefined, undefined, "F"],
    ];
  }
}

function checkDiagonals(game) {
  if (
    game[0][0] === game[1][1] &&
    game[0][0] === game[2][2] &&
    game[0][0] !== "_"
  ) {
    return [
      ["F", undefined, undefined],
      [undefined, "F", undefined],
      [undefined, undefined, "F"],
    ];
  }
  if (
    game[0][2] === game[1][1] &&
    game[0][2] === game[2][0] &&
    game[0][2] !== "_"
  ) {
    return [
      [undefined, undefined, "F"],
      [undefined, "F", undefined],
      ["F", undefined, undefined],
    ];
  }
}

function checkGameOver(g) {
  for (let i = 0; i < g.length; i++) {
    for (let k = 0; k < g[i].length; k++) {
      if (g[i][k] === "_") {
        return false;
      }
    }
  }
  return true;
}

function App() {
  const [gameState, setGameState] = useState([
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  function onClick(r, c) {
    if (gameState[r][c] !== "_") {
      return;
    }
    setGameState((current) => {
      const copy = JSON.parse(JSON.stringify(current));
      copy[r][c] = currentPlayer;
      return copy;
    });
    setCurrentPlayer((current) => (current === "X" ? "O" : "X"));
  }

  const answer =
    checkRows(gameState) ||
    checkColumns(gameState) ||
    checkDiagonals(gameState);

  const gameOver = checkGameOver(gameState);

  return (
    <div>
      <h1>Hello Evan</h1>
      <Board>
        {gameState.map((row, r) => (
          <BoardRow key={r + row.join("")}>
            {row.map((cell, c) => (
              <BoardCell
                key={c + cell + gameOver}
                onClick={gameOver || !!answer ? () => {} : () => onClick(r, c)}
                state={
                  answer && answer[r][c] == "F"
                    ? "filled"
                    : gameOver
                    ? "end"
                    : ""
                }
              >
                {cell === "X" && <Token />}
                {cell === "O" && <TokenBlue />}
                {cell === "_" && " "}
              </BoardCell>
            ))}
          </BoardRow>
        ))}
      </Board>
    </div>
  );
}

export default App;
