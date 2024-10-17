import React from 'react';

const Square = ({ value, onClick }) => {
  let backgroundColor;

 
  if (value === 'X') {
    backgroundColor = '#f92b2b'; 
  } else if (value === 'O') {
    backgroundColor = '#2b5df9'; 
  } else {
    backgroundColor = 'white'; 
  }

  return (
    <div 
      className="square" 
      onClick={onClick}
      style={{
        width: '40px',
        height: '40px',
        border: '1px solid black',
        display: 'inline-block',
        backgroundColor: backgroundColor, 
        cursor: 'pointer',
      }}
    />
  );
};

export default Square;