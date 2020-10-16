import React from 'react';


const Square = ({value, callback}) => (
  <button style={style} onClick={callback}>
    {value}
  </button>
);


const style = {
  background: 'lightblue',
  border: '5px solid darkblue',
  fontSize: '50px',
  fontWeight: 'pointer',
  cursor: 'pointer',
  outline: 'none'
}


export default Square;
