import React, { useState } from 'react';

import Board from './Board';
import { calculateWinner } from './helperFunctions';


const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(history[stepNumber]);

  const handleClick = squareIndex => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = history[stepNumber];
    const squares = [...current];
    if (squares[squareIndex] || winner) return;
    squares[squareIndex] = xIsNext ? 'X' : 'O';
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const renderMoves = () => history.map((_, move) => {
      const destination = move ? `Go to move ${move}` : 'Go to start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      )
    })
  
  return (
    <>
      <Board squares={history[stepNumber]} callback={handleClick} />
      <div style={style}>
        {winner ? 'Winner ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O')}
        {renderMoves()}
      </div>
    </>
  );
}


const style = {
  width: '200px',
  margin: '20px auto'
}


export default App;
