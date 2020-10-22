import React from 'react';

import Square from './Square';


const Board = ({squares, winningRow, callback}) => {
  return (
    <div style={style}>
      {squares.map((value, index) =>
        <Square
          key={index}
          value={value}
          index={index}
          winningRow={winningRow}
          callback={() => callback(index)}
        />)}
    </div>
  )
}


const style = {
  border: '5px solid darkblue',
  borderRadius: '10px',
  width: '500px',
  height: '500px',
  margin: '0 auto',
  display: 'grid',
  gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)'
}


export default Board;
