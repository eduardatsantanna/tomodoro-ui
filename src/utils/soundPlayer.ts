const playSound = (buttonType: string, toggle: boolean) => {
    let audio: HTMLAudioElement | null = null;
  
    switch (buttonType) {
      case 'reset':
        audio = new Audio('/sounds/cancel.wav');
        break;
      case 'start/stop':
        audio = toggle ? new Audio('/sounds/bigDeSelect.wav') : new Audio('/sounds/bigSelect.wav');
        break;
      case 'add-task':
        audio = new Audio('/sounds/mouseClick.wav');
        break;
      case 'delete-task':
        audio = new Audio('/sounds/cancel.wav');
        break;
      case 'task-completed':
        audio = toggle ? new Audio('/sounds/mouseClick.wav') : null;
        break;
      case 'pomodoro':
        audio = new Audio('/sounds/mouseClick.wav');
        break;
      case 'short_break':
        audio = new Audio('/sounds/mouseClick.wav');
        break;
      case 'long_break':
        audio = new Audio('/sounds/mouseClick.wav');
        break;
      default:
        return;
    }
  
    audio?.play();
  };
  
  export default playSound;
  