import React, { useState, useRef, useEffect, useCallback } from 'react';

const scores = {
  '✊': 1,
  '✋': 0,
  '✌': -1,
};

const RPS = () => {
  const [computer, setComputer] = useState('✊');
  const [user, setUser] = useState('🤘');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const interval = useRef(null);

  const changeHand = useCallback(() => {
    if (computer === '✊') {
      setComputer('✋');
    } else if (computer === '✋') {
      setComputer('✌');
    } else if (computer === '✌') {
      setComputer('✊');
    }
  }, [computer]);

  const onClickBtn = (user) => () => {
    setUser(user);
    setBtnDisabled(true);
    clearInterval(interval.current);
    const diff = scores[user] - scores[computer];
    if (diff === 0) {
      setResult('draw');
    } else if ([-1, 2].includes(diff)) {
      setResult('win');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('lose');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
      setBtnDisabled(false);
    }, 1000);
  };

  useEffect(() => {
    interval.current = setInterval(changeHand, 100);
    return () => {
      clearInterval(interval.current);
    };
  }, [changeHand]);

  return (
    <div>
      <div>{computer}</div>
      <div>{result}</div>
      <div>{user}</div>
      <div>
        <button disabled={btnDisabled} onClick={onClickBtn('✊')}>
          Rock
        </button>
        ...
      </div>
      <div>Score: {score}</div>
    </div>
  );
};

export default RPS;