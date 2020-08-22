import React from "react";
import "./App.css";
import Speech from 'react-speech';


function App() {
  const hearNumber = () => {
    console.log("hear it ");
    
  };

  return (
    <div className="App">
      <p>Number Recognizer</p>
      <button onClick={() => hearNumber()}>Hear Number</button>
      <Speech  voice="Google UK English Female"
  text="9 2 4 6 3 9 7 2 6 3" />
      <input type="text" name="name" placeholder="what was the number?" />
    </div>
  );
}


const numbers = ["9246397263", "91276433343", "9276438763", "9284329736", "1298739363", "9834372964738"]

export default App;
