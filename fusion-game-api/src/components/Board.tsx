import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

interface BoardProps {
  rows: number;
  cols: number;
}

const Board: React.FC<BoardProps> = ({ rows, cols }) => {
  const initialCells = Array.from({ length: rows }, () => Array(cols).fill(null));

  // Colocamos el emoji de fuego en la celda (0,0) y la gota de agua en la celda (4,0)
  initialCells[0][0] = '🔥';
  initialCells[4][0] = '💧';

  const [cells, setCells] = useState(initialCells);
  const [message, setMessage] = useState('');
  const [hasReachedFinalLevelAqua, setHasReachedFinalLevelAqua] = useState(false);
  const [hasReachedFinalLevelFire, setHasReachedFinalLevelFire] = useState(false);

  // Función para generar una nube en una celda vacía aleatoria
  const generateCloud = () => {
    const emptyCells: { row: number, col: number }[] = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (cells[i][j] === null) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newCells = [...cells];
      newCells[randomCell.row][randomCell.col] = '☁️';
      setCells(newCells);
    }
  };

  // Función para generar un volcán en una celda vacía aleatoria
  const generateVolcano = () => {
    const emptyCells: { row: number, col: number }[] = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (cells[i][j] === null) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newCells = [...cells];
      newCells[randomCell.row][randomCell.col] = '🌋';
      setCells(newCells);
    }
  };

  const handleWaterDropClick = () => generateCloud();
  const handleFireClick = () => generateVolcano();

  const handleDragStart = (event: React.DragEvent, row: number, col: number) => {
    if (cells[row][col] === '🔥' || cells[row][col] === '💧') {
      event.preventDefault();
    } else {
      event.dataTransfer.setData('source', `${row},${col}`);
    }
  };

  const handleDragOver = (event: React.DragEvent) => event.preventDefault();

  const handleDrop = (event: React.DragEvent, row: number, col: number) => {
    event.preventDefault();
    const source = event.dataTransfer.getData('source');
    const [sourceRow, sourceCol] = source.split(',').map(Number);
    const newCells = [...cells];
  
    if (sourceRow === row && sourceCol === col) return; 

    if (cells[row][col] && cells[row][col] === cells[sourceRow][sourceCol]) {
      if (['💨', '👨🏻‍🚒'].includes(cells[row][col])) return;
  
      if (cells[row][col] === '☁️') newCells[row][col] = '❄️';
      else if (cells[row][col] === '❄️') newCells[row][col] = '🧊';
      else if (cells[row][col] === '🧊') newCells[row][col] = '💨';
      else if (cells[row][col] === '🌋') newCells[row][col] = '🚨';
      else if (cells[row][col] === '🚨') newCells[row][col] = '🚒';
      else if (cells[row][col] === '🚒') newCells[row][col] = '👨🏻‍🚒';
  
      // Solo eliminamos la celda de origen si no es la misma que la de destino
      if (row !== sourceRow || col !== sourceCol) {
        newCells[sourceRow][sourceCol] = null; // Borramos solo si la celda destino es diferente
      }
    }
  
    setCells(newCells); 

    if (newCells[row][col] === '👨🏻‍🚒' && !hasReachedFinalLevelFire) {
      setMessage("¡Has llegado al último nivel de fuego!");
      setHasReachedFinalLevelFire(true);
    }
    if (newCells[row][col] === '💨' && !hasReachedFinalLevelAqua) {
      setMessage("¡Has llegado al último nivel de agua!");
      setHasReachedFinalLevelAqua(true);
    }

    setCells(newCells);
  };

  return (
    <div>
      <div className="board" style={{ gridTemplateColumns: `repeat(${cols}, 100px)` }}>
        {cells.map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              content={cell}
              row={i}
              col={j}
              onClick={cell === '💧' ? handleWaterDropClick : cell === '🔥' ? handleFireClick : undefined}
              onDragStart={(e) => handleDragStart(e, i, j)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, i, j)}
              draggable={cell !== '🔥' && cell !== '💧'}
            />
          ))
        )}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Board;
