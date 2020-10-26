import React, { useState, useEffect, useRef } from 'react';
import TypeIt from 'typeit-react';
import { Jumbotron } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Form from './components/Form';

const lerpJokes = [
  '"Where we lerpin\' boys?"',
  '"Better to have lerped and lost..."',
  '"To lerp or not to lerp?"',
  '"To lerp where no man has lerped before."',
];

const App = () => {
  return (
    <div className="app">
      <div className="header">
        <h1>
          <TypeIt
            options={{
              strings: ['lerp.to'],
              startDelay: 0,
              speed: 50,
              breakLines: true,
              cursor: false,
              html: true,
            }}
          />
        </h1>
        <h4>
          <TypeIt
            options={{
              strings: [lerpJokes[Math.floor(Math.random() * lerpJokes.length)]],
              startDelay: 500,
              speed: 70,
              breakLines: false,
              cursor: true,
            }}
          />
        </h4>
      </div>
      <Form />
    </div>
  );
};

export default App;
