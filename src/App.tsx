import React, { useState } from 'react';
import './App.css';
import DiceGenerator from './DiceGenerator';

const App: React.FC = () => {
  // The counter is just used to force a rerender
  const [showDice, setDice] = useState({ render: false, counter: 0 });

  return (
    <div>
<article className="mw7 center ph3 ph5-ns tc br2 pv5 bg-washed-green dark-green mb5 relative z-2">
  <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">
    Friendly Password Generator.
  </h1>
  <h2 className="fw2 f4 lh-copy mt0 mb3">
    Generate a password that meets most complexity requirements, whilst aiming to be memorable.
  </h2>
  <p className="fw1 f5 mt0 mb3">
    Use the below button to repeatedly generate suitable passwords..
  </p>
  <div>
    <a className="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
      href="#" onClick={ () => setDice(state => ( { render: true, counter: (state.counter)+1 })) } >
    { showDice.render
      ?
      <DiceGenerator />
      :
      "Click Here"
    }
    </a>
  </div>
</article>
    </div>
  );
}

export default App;
