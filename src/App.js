import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import './App.css';

const App = () => {
  useEffect(() => {
    alanBtn({
      key: `${process.env.REACT_APP_ALAN_API_KEY}`,
      onCommand: ({ command }) => {
        if(command === 'testCommand') {
          alert('This code was executed')
        }
      }
    })
  }, [])

  return (
    <div>
      <h1>Alan AI News App</h1>
    </div>
  );
}

export default App;
