import { CODES } from './environments.js';

export function keyboardEvents() {
  const SCREEN = document.querySelector('textarea');

  document.addEventListener('keydown', (event) => {
    const ALL_KEYS = document.querySelectorAll('.keyboard__item');
    const KEY_CODE = event.code;
    for (let code in CODES) {
      if (event.code === 'Backspace' && code === 'Backspace') {
        ALL_KEYS[CODES[code]].classList.add('active');
        SCREEN.innerHTML = SCREEN.innerHTML.slice(0, SCREEN.innerHTML.length - 1);
      } else if (KEY_CODE === code) {
        ALL_KEYS.forEach((el) => {
          if (el.id == CODES[code]) {
            el.classList.add('active');
            SCREEN.innerHTML += el.innerHTML.toLowerCase();
          }
        });
      }
    }
  });
}

document.addEventListener('keyup', () => {
  const ALL_KEYS = document.querySelectorAll('.keyboard__item');
  ALL_KEYS.forEach((el) => {
    el.classList.remove('active');
  });
});

export function mouseEvents() {
  const SCREEN = document.querySelector('textarea');
  const KEYBOARD = document.querySelector('.kyeboard__block');
  KEYBOARD.addEventListener('mousedown', (event) => {
    console.log(event.target);
    console.log(KEYBOARD);
    const EL = document.getElementById(event.target.id);
    EL.classList.add('active');
    if (event.target.innerHTML === 'Backspace') {
      SCREEN.innerHTML = SCREEN.innerHTML.slice(0, SCREEN.innerHTML.length - 1);
    } else {
      SCREEN.innerHTML += event.target.innerHTML.toLowerCase();
    }
  });
  KEYBOARD.addEventListener('mouseup', () => {
    const ALL_KEYS = document.querySelectorAll('.keyboard__item');
    ALL_KEYS.forEach((el) => {
      el.classList.remove('active');
    });
  });
}
