import { render, screen, fireEvent, act } from '@testing-library/react';
import Timer from '../../src/components/Timer';
import playSound from '../../src/utils/soundPlayer';
import '@testing-library/jest-dom';

Object.defineProperty(globalThis, 'Notification', {
    value: {
      permission: 'granted',
      requestPermission: jest.fn().mockResolvedValue('granted'),
    },
    writable: true,
  });  

jest.mock('../../src/utils/soundPlayer', () => jest.fn());

describe('Timer Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders timer component correctly', () => {
    render(<Timer />);
    
    expect(screen.getByText('Pomodoro')).toBeInTheDocument();
    expect(screen.getByText('Short Break')).toBeInTheDocument();
    expect(screen.getByText('Long Break')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  test('starts and pauses the timer', () => {
    render(<Timer />);
    
    const startButton = screen.getByText('Start');
    
    fireEvent.click(startButton);
    expect(startButton).toHaveTextContent('Pause');
    
    fireEvent.click(startButton);
    expect(startButton).toHaveTextContent('Start');
  });

  test('counts down when started', () => {
    render(<Timer />);
    
    fireEvent.click(screen.getByText('Start'));
  
    act(() => {
      jest.advanceTimersByTime(3000);
    });
  
    expect(screen.getByText(/24:57/)).toBeInTheDocument();
  });
  

  test('resets timer when reset button is clicked', () => {
    render(<Timer />);
    
    fireEvent.click(screen.getByText('Start'));
  
    act(() => {
      jest.advanceTimersByTime(5000);
    });
  
    fireEvent.click(screen.getByText('Reset'));
  
    expect(screen.getByText(/25:00/)).toBeInTheDocument();
  });
  

  test('switches mode when clicking mode buttons', () => {
    render(<Timer />);

    fireEvent.click(screen.getByText('Short Break'));
    expect(screen.getByText('05:00')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Long Break'));
    expect(screen.getByText('15:00')).toBeInTheDocument();
  });

  test('plays sound when timer starts, stops, or resets', () => {
    render(<Timer />);

    fireEvent.click(screen.getByText('Start'));
    expect(playSound).toHaveBeenCalledWith('start/stop', false);

    fireEvent.click(screen.getByText('Pause'));
    expect(playSound).toHaveBeenCalledWith('start/stop', true);

    fireEvent.click(screen.getByText('Reset'));
    expect(playSound).toHaveBeenCalledWith('reset', false);
  });
});
