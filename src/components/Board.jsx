import React from 'react';
import Square from './Square';

const Board = ({ board, handleClick }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 40px)', gridGap: '1px' }}>
      {board.map((row, rowIndex) => 
        row.map((square, colIndex) => 
          <Square 
            key={`${rowIndex}-${colIndex}`} 
            value={square} 
            onClick={() => handleClick(rowIndex, colIndex)} 
          />
        )
      )}
    </div>
  );
};

export default Board;
