import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DiceGenerator from './DiceGenerator';

const App: React.FC = () => {
  const [showDice, setDice] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Secure Password Generator
        </p>
    { showDice ?
      <DiceGenerator />
      :
      <button onClick={ () => setDice(true) }>"this is a button"</button>
    }
      </header>
    </div>
  );
}

export default App;
