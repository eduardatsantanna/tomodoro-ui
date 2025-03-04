import React, { useState, useEffect } from 'react';
import playSound from '../utils/soundPlayer';

const Timer: React.FC = () => {
  const POMODORO_TIME = 25 * 60;
  const SHORT_BREAK_TIME = 5 * 60;
  const LONG_BREAK_TIME = 15 * 60;

  const [time, setTime] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'pomodoro' | 'short_break' | 'long_break'>('pomodoro');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const toggleTimer = () => {
    playSound('start/stop', isRunning); // Play start/stop sound
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    playSound('reset', isRunning); // Play reset sound
    setIsRunning(false);
    setTime(getModeTime(mode));
  };

  const handleModeChange = (selectedMode: 'pomodoro' | 'short_break' | 'long_break') => {
    playSound(selectedMode, false);
    setIsRunning(false);
    setMode(selectedMode);
    setTime(getModeTime(selectedMode));
  };

  const getModeTime = (mode: string) => {
    switch (mode) {
      case 'short_break':
        return SHORT_BREAK_TIME;
      case 'long_break':
        return LONG_BREAK_TIME;
      default:
        return POMODORO_TIME;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', fontSize: '2.2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <button
          className={`button timer-button ${mode === 'pomodoro' ? 'active' : ''}`}
          onClick={() => handleModeChange('pomodoro')}
        >
          Pomodoro
        </button>
        <button
          className={`button timer-button ${mode === 'short_break' ? 'active' : ''}`}
          onClick={() => handleModeChange('short_break')}
        >
          Short Break
        </button>
        <button
          className={`button timer-button ${mode === 'long_break' ? 'active' : ''}`}
          onClick={() => handleModeChange('long_break')}
        >
          Long Break
        </button>
      </div>

      <h2>{formatTime(time)}</h2>

      <button className="button start-button" onClick={toggleTimer} style={{ marginRight: '1rem' }}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button className="button reset-button" onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
