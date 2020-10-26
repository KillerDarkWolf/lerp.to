import React, { useState, useEffect, useRef } from 'react';
import TypeIt from 'typeit-react';
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
        <h1 className="head1">
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
        <h4 className="head2">
          <TypeIt
            style={{ fontSize: '3.5vw' }}
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
