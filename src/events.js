import { CODES, FUNC_KEYS } from './environments.js';
import { switchLanguage } from './pageElements.js';

export function keyDownEvent(event) {
  event.preventDefault();
  const SCREEN = document.querySelector('textarea');
  const ALL_KEYS = document.querySelectorAll('.keyboard__item');
  const KEY_CODE = event.code;
  ALL_KEYS.forEach((el) => {
    if (el.id == CODES.indexOf(event.code)) {
      el.classList.add('active');
    }
  });
  if (event.ctrlKey && event.shiftKey) {
    switchLanguage();
  } else if (event.code === 'Backspace') {
    SCREEN.innerHTML = SCREEN.innerHTML.slice(0, SCREEN.innerHTML.length - 1);
  } else if (event.code === 'Space') {
    SCREEN.innerHTML += ' ';
  } else if (event.code === 'Enter') {
    SCREEN.innerHTML += '\n';
  } else {
    for (let code of CODES) {
      if (KEY_CODE === code && !FUNC_KEYS.includes(code)) {
        ALL_KEYS.forEach((el) => {
          if (el.id == CODES.indexOf(code)) {
            SCREEN.innerHTML += el.innerHTML.toLowerCase();
          }
        });
      }
    }
  }
}
export function keyUpEvent() {
  const ALL_KEYS = document.querySelectorAll('.keyboard__item');
  ALL_KEYS.forEach((el) => {
    el.classList.remove('active');
  });
}

export function mouseEvents() {
  const SCREEN = document.querySelector('textarea');
  const KEYBOARD = document.querySelector('.kyeboard__block');

  const ARR_OF_FUNC_KEYS = ['Tab', 'Caps Lock', 'Shift', 'Ctrl', 'Win', 'Alt', 'DEL', 'Enter'];

  KEYBOARD.addEventListener('mousedown', (event) => {
    let isFunctionalKey = false;
    const EL = document.getElementById(event.target.id);
    try {
      EL.classList.add('active');
      ARR_OF_FUNC_KEYS.forEach((elem) => {
        elem == event.target.innerHTML ? (isFunctionalKey = true) : '';
      });
      if (event.target.innerHTML === 'Backspace') {
        SCREEN.innerHTML = SCREEN.innerHTML.slice(0, SCREEN.innerHTML.length - 1);
      } else if (event.target.innerHTML === '') {
        SCREEN.innerHTML += ' ';
      } else if (event.target.innerHTML === 'Enter') {
        SCREEN.innerHTML += '\n';
      } else if (!isFunctionalKey) {
        SCREEN.innerHTML += event.target.innerHTML.toLowerCase();
      }
    } catch (err) {
      console.log("Didn't hit the keyboard key");
    }
  });
  KEYBOARD.addEventListener('mouseup', () => {
    const ALL_KEYS = document.querySelectorAll('.keyboard__item');
    ALL_KEYS.forEach((el) => {
      el.classList.remove('active');
    });
  });
}
