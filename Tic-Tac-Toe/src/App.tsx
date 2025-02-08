import { useState } from 'react'
import Block from './components/Board'

interface GameState {
  winner: string | null;
  isDraw: boolean;
}

function App() {
  const [state, setState] = useState<Array<string | null>>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [gameState, setGameState] = useState<GameState>({ winner: null, isDraw: false });

  const checkWinningCombination = (squares: Array<string | null>): boolean => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return true;
      }
    }
    return false;
  };

  const checkDraw = (squares: Array<string | null>): boolean => {
    return squares.every(square => square !== null);
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
    setCurrentPlayer("X");
    setGameState({ winner: null, isDraw: false });
  };

  const handleBlockClick = (index: number) => {
    if (state[index] || gameState.winner || gameState.isDraw) {
      return;
    }

    const newState = [...state];
    newState[index] = currentPlayer;

    const hasWinner = checkWinningCombination(newState);
    const isDraw = !hasWinner && checkDraw(newState);

    if (hasWinner) {
      setGameState({ winner: currentPlayer, isDraw: false });
    } else if (isDraw) {
      setGameState({ winner: null, isDraw: true });
    }

    setState(newState);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>

      {(gameState.winner || gameState.isDraw) && (
        <div className="mb-4 text-xl font-bold">
          {gameState.winner ? `Player ${gameState.winner} wins!` : "It's a draw!"}
        </div>
      )}

      <div className="mb-6 flex flex-row items-center justify-center">
        <div className="row">
          <Block onClick={() => handleBlockClick(0)} value={state[0]} />
          <Block onClick={() => handleBlockClick(1)} value={state[1]} />
          <Block onClick={() => handleBlockClick(2)} value={state[2]} />
        </div>
        <div className="row">
          <Block onClick={() => handleBlockClick(3)} value={state[3]} />
          <Block onClick={() => handleBlockClick(4)} value={state[4]} />
          <Block onClick={() => handleBlockClick(5)} value={state[5]} />
        </div>
        <div className="row">
          <Block onClick={() => handleBlockClick(6)} value={state[6]} />
          <Block onClick={() => handleBlockClick(7)} value={state[7]} />
          <Block onClick={() => handleBlockClick(8)} value={state[8]} />
        </div>
      </div>

      <div className="mt-4">
        <button 
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleReset}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;