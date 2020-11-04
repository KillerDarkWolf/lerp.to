import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ReactDOM from 'react-dom';

const Form = () => {
  let [start, setStart] = useState('start');
  let [finish, setFinish] = useState('finish');
  let [toggleLerp, setToggle] = useState(true);
  let [toggleDone, setDone] = useState(false);
  let [genUrl, setGenUrl] = useState('');

  const handleStart = (e) => {
    setStart(e.target.innerHTML);
  };

  const handleFinish = (e) => {
    setFinish(e.target.innerHTML);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(genUrl).then(() => {
      console.log('copied!');
    });
  };

  const handleLerp = () => {
    axios
      .post('/url', {
        url: start,
        slug: finish,
      })
      .then(function (response) {
        console.log(response);
        setGenUrl(`https://lerp.to/${response.data.slug}`);
        setDone(true);
      })
      .catch(function (error) {
        console.log(res);
        alert(error.message);
      });
  };

  useEffect(() => {
    if (start !== 'start' && finish !== 'finish') {
      setToggle(false);
    }
  }, [start, finish]);

  return (
    <div className="functionForm animate__animated animate__fadeInDown animate__delay-3s">
      {toggleDone ? (
        <div className="head2">
          <button
            style={{ border: 'none', backgroundColor: 'white' }}
            onClick={(e) => handleCopy()}
          >
            📋
          </button>
          Here is your link!
          <br />
          <a className="toCopy" href={genUrl}>
            {genUrl}
          </a>
        </div>
      ) : (
        <div>
          <h4 className="head2">
            lerp(
            <span
              onInput={(e) => {
                handleStart(e);
              }}
              className="input"
              role="textbox"
              contentEditable
            >
              start
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
              finish
            </span>
            )
          </h4>
          <p>
            Lerping is as easy as defining your start (URL Ex<b> :</b> https://youtube.com), and
            your finish (Shortend alias Ex<b> :</b> yt)
          </p>
          <p>
            Ex : lerp(<b>https://youtube.com</b>, <b>yt</b>) = lerp.to/yt
          </p>
          <button onClick={handleLerp} className="lerp" hidden={toggleLerp} variant="outline-dark">
            Lerp!
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
