import React, { useState, useEffect, useRef } from 'react';
import TypeIt from 'typeit-react';
import { Jumbotron } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Form from './components/Form';

const lerpJokes = [
  "Where we lerpin' boys?",
  'Better to have lerped and lost...',
  'To lerp or not to lerp?',
  'To lerp where no man has lerped before.',
];

const App = () => {
  let typer = useRef();

  useEffect(() => {
    console.log(typer, 'typer loading...,');
  }, [typer]);

  return (
    <div className="app">
      <div className="header">
        <h1 className="app animate__animated animate__fadeInDown">
          <TypeIt
            options={{
              strings: ['lerp.to', lerpJokes[Math.floor(Math.random() * lerpJokes.length)]],
              startDelay: 1000,
              speed: 50,
              breakLines: true,
              cursor: true,
              html: true,
            }}
          />
        </h1>
      </div>
      <Form />
    </div>
  );
};

export default App;
