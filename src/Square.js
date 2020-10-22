import React from 'react';


const Square = ({value, index, winningRow, callback}) => (
  <button style={styleFn(index, winningRow)} onClick={callback}>
    {value}
  </button>
);


const styleFn = (index, winningRow) => ({
  background: 'lightblue',
  border: `5px solid ${winningRow && winningRow.includes(index) ? 'red' : 'darkblue'}`,
  fontSize: '50px',
  fontWeight: 'pointer',
  cursor: 'pointer',
  outline: 'none',
});


export default Square;
