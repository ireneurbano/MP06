import React from 'react';
import Board from './components/Board';
import './App.css'; // Importamos el CSS

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Juego de Fusión de Elementos</h1>
      <Board rows={5} cols={5} />
    </div>
  );
};

export default App;
