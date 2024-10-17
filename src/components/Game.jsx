// src/components/Game.js
import React, { useState, useEffect } from 'react';
import Board from './Board';

const Game = () => {
  const createEmptyBoard = () => Array(10).fill(null).map(() => Array(10).fill(null));




  const generateShips = () => {
    const shipLengths = [5, 4, 3, 3, 2];
    const ships = [];

    for (let length of shipLengths) {
      let placed = false;

      while (!placed) {
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const startRow = Math.floor(Math.random() * (orientation === 'horizontal' ? 10 : 10 - length));
        const startCol = Math.floor(Math.random() * (orientation === 'vertical' ? 10 : 10 - length));

        const newShipPositions = [];

        for (let i = 0; i < length; i++) {
          const row = orientation === 'horizontal' ? startRow : startRow + i;
          const col = orientation === 'vertical' ? startCol : startCol + i;
          newShipPositions.push([row, col]);
        }

        const isConflict = ships.some(ship =>
          ship.positions.some(([r, c]) =>
            newShipPositions.some(([newR, newC]) => r === newR && c === newC)
          )
        );

        if (!isConflict) {
          ships.push({ positions: newShipPositions, hitCount: 0, length });
          placed = true;
        }
      }
    }

    return ships;
  };


  const [playerBoard, setPlayerBoard] = useState(createEmptyBoard());
  const [computerBoard, setComputerBoard] = useState(createEmptyBoard());
  const [playerShips, setPlayerShips] = useState(generateShips());
  const [computerShips, setComputerShips] = useState(generateShips());

  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Turnos
  const [gameOver, setGameOver] = useState(false);


  const checkGameOver = (ships) => {
    return ships.every(ship => ship.hitCount === ship.length);
  };


  const handlePlayerAttack = (row, col) => {
    if (computerBoard[row][col] !== null || gameOver) {
      return; 
    }

    let hit = false;
    const newBoard = [...computerBoard];
    const newShips = [...computerShips];

  
    newShips.forEach(ship => {
      ship.positions.forEach(([shipRow, shipCol]) => {
        if (shipRow === row && shipCol === col) {
          hit = true;
          ship.hitCount += 1;
        }
      });
    });


    newBoard[row][col] = hit ? 'X' : 'O';
    setComputerBoard(newBoard);
    setComputerShips(newShips);


    if (checkGameOver(newShips)) {
      setGameOver(true);
      alert('¡You Win!');
    } else {
      setIsPlayerTurn(false);
    }
  };


  const computerAttack = () => {
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (playerBoard[row][col] !== null);

    let hit = false;
    const newBoard = [...playerBoard];
    const newShips = [...playerShips];

    newShips.forEach(ship => {
      ship.positions.forEach(([shipRow, shipCol]) => {
        if (shipRow === row && shipCol === col) {
          hit = true;
          ship.hitCount += 1;
        }
      });
    });

    newBoard[row][col] = hit ? 'X' : 'O';
    setPlayerBoard(newBoard);
    setPlayerShips(newShips);

    if (checkGameOver(newShips)) {
      setGameOver(true);
      alert('¡ You Lose ! ):');
    } else {
      setIsPlayerTurn(true);
    }
  };


  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      setTimeout(() => computerAttack(), 1000);
    }
  }, [isPlayerTurn, gameOver]);

  return (
    <div>
      <div className='d-flex justify-content-center'>
        <h1 className=' '>Battleship</h1>
      </div>
      <div>
        <h3 className='ms-5'> Instructions</h3>
        <h6 className='ms-5 '>1- There are 5 Ships with 5, 4, 3, 3, 2 Squares length each. </h6>
        <h6 className='ms-5'>1- Click on the Computer Board to Hit a Ship. </h6>
        <h6 className='ms-5'>1- Red Square means you Hit a ship. </h6>
        <h6 className='ms-5'>1- Blue Square means you miss the hit. </h6>
        <h6 className='ms-5 mb-2'>1- Sink all the Ships before the computer sinks yours. </h6>

      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <h2>Player Board</h2>
          <Board board={playerBoard} handleClick={() => { }} />
        </div>
        <div>
          <h2>Computer Board</h2>
          <Board board={computerBoard} handleClick={isPlayerTurn ? handlePlayerAttack : () => { }} />
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        {gameOver && <h2>¡Game Over!</h2>}
      </div>
    </div>
  );
};

export default Game;
