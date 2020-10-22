import React, { useState } from 'react';

import Board from './Board';
import { calculateWinner, calculateRowAndCol } from './helperFunctions';


const initialHistory = [{ playerLocation: null,  playingField: Array(9).fill(null)}]


const App = () => {
  const [history, setHistory] = useState(initialHistory);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascending, setAscending] = useState(true)

  const [winner, winningRow] = calculateWinner(history[stepNumber].playingField);
  const draw = !winner && stepNumber === 9;
  const status = () => {
    if (winner) return 'Winner ' + winner;
    if (draw) return 'It\'s a draw!';
    const player = xIsNext ? 'X' : 'O'
    return 'Next player: ' + player;
  }

  const handleClick = squareIndex => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = history[stepNumber];
    const currentCopy = { ...current, playingField: [...current.playingField] };
    if (currentCopy.playingField[squareIndex] || winner) return;
    currentCopy.playingField[squareIndex] = xIsNext ? 'X' : 'O';
    currentCopy.playerLocation = squareIndex;
    setHistory([...timeInHistory, currentCopy]);
    setStepNumber(timeInHistory.length);
    setXIsNext(!xIsNext);
  }

  const toggleAscending = () => setAscending(!ascending);

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const renderMoves = () => history.map((current, move) => {
      let destination;
      if (move) {
        const [row, col] = calculateRowAndCol(current.playerLocation);
        destination = `Go to move ${move} (row: ${row}, col: ${col})`;
      } else {
        destination = 'Go to start';
      }

      return (
        <li key={move}>
          <button
            style={{ fontWeight: move === stepNumber && 'bold' }}
            onClick={() => jumpTo(move)}
          >
            {destination}
          </button>
        </li>
      )
    })
  
  return (
    <>
      <Board
        squares={history[stepNumber].playingField}
        winningRow={winningRow}
        callback={handleClick}
      />
      <div style={style}>
        <div>{status()}</div>
        <button onClick={toggleAscending}>
          {ascending ? 'Sort in descending order' : 'Sort in ascending order'}
        </button>
        {ascending ? renderMoves() : renderMoves().reverse()}
      </div>
    </>
  );
}


const style = {
  width: '210px',
  margin: '20px auto'
}


export default App;
