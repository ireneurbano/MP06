import React from 'react';

interface CellProps {
  content: string | null;
  row: number;
  col: number;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  draggable?: boolean;
}

const Cell: React.FC<CellProps> = ({ content, onClick, onDragStart, onDragOver, onDrop, draggable }) => {
  return (
    <div
      className="cell"
      onClick={onClick}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable={draggable}
    >
      {content}
    </div>
  );
};

export default Cell;
