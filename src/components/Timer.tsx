import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTime(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', margin: '0rem 0' }}>
      <h2>{formatTime(time)}</h2>
      <button className="button start-button" onClick={toggleTimer} style={{ marginRight: '1rem' }}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button className="button reset-button" onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
