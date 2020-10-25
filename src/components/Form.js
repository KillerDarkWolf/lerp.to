import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ReactDOM from 'react-dom';

const Form = () => {
  let [start, setStart] = useState('start');
  let [finish, setFinish] = useState('finish');
  let [toggleLerp, setToggle] = useState(true);

  const handleStart = (e) => {
    setStart(e.target.innerHTML);
  };

  const handleFinish = (e) => {
    setFinish(e.target.innerHTML);
  };

  const handleLerp = () => {
    axios
      .post('/url', {
        url: start,
        slug: finish,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log('useEffect Popped!');
    if (start !== 'start' && finish !== 'finish') {
      setToggle(false);
    }
  }, [start, finish]);

  return (
    <div className="functionForm animate__animated animate__fadeInDown">
      <h4>
        lerp(
        <span
          onInput={(e) => {
            handleStart(e);
          }}
          className="input"
          role="textbox"
          contentEditable
        >
          {start}{' '}
        </span>
        ,
        <span
          onInput={(e) => {
            handleFinish(e);
          }}
          className="input"
          role="textbox"
          contentEditable
        >
          {finish}{' '}
        </span>
        )
      </h4>
      <Button onClick={handleLerp} className="lerp" hidden={toggleLerp} variant="outline-dark">
        Lerp!
      </Button>
    </div>
  );
};

export default Form;
