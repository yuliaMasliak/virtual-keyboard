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
        ALL_KEYS[CODES[code]].classList.add('active');
        SCREEN.innerHTML += event.key;
      }
    }
  });
  document.addEventListener('keyup', () => {
    const ALL_KEYS = document.querySelectorAll('.keyboard__item');
    ALL_KEYS.forEach((el) => {
      el.classList.remove('active');
    });
  });
}
