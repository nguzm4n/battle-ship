import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <div 
      className="square" 
      onClick={onClick}
      style={{
        width: '40px',
        height: '40px',
        border: '1px solid black',
        display: 'inline-block',
        backgroundColor: value === 'X' ? 'red' : value === 'O' ? 'blue' : 'white',
        textAlign: 'center',
        lineHeight: '40px',
      }}
    >
      {value}
    </div>
  );
};

export default Square;
