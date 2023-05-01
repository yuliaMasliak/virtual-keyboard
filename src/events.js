import { CODES, FUNC_KEYS, AUDIO_CLICK, CAPS_LOCK_id } from './environments.js';
import { switchLanguage } from './pageElements.js';

function playClick() {
  AUDIO_CLICK.play();
}
let isCapsLocked = false;
export function keyDownEvent(event) {
  event.preventDefault();
  const SCREEN = document.querySelector('textarea');
  const ALL_KEYS = document.querySelectorAll('.keyboard__item');
  playClick();
  const KEY_CODE = event.code;

  ALL_KEYS.forEach((el) => {
    if (el.id == CODES.indexOf(event.code)) {
      el.classList.add('active');
    }
  });
  if (event.ctrlKey && event.shiftKey) {
    switchLanguage();
  } else if (event.code === 'CapsLock') {
    const CAPSLOCK = document.getElementById(CAPS_LOCK_id);
    isCapsLocked = !isCapsLocked;
    if (isCapsLocked) {
      CAPSLOCK.classList.add('capslocked');
    } else {
      CAPSLOCK.classList.remove('capslocked');
    }
  } else if (CODES.indexOf(event.code) === 0) {
    SCREEN.innerHTML += '`';
  } else if (event.code === 'Backspace') {
    SCREEN.innerHTML = SCREEN.innerHTML.slice(0, SCREEN.innerHTML.length - 1);
  } else if (event.code === 'Delete') {
    const CURSOR_Index = SCREEN.selectionEnd;
    const ARR = SCREEN.innerHTML.split('');
    delete ARR[CURSOR_Index];
    SCREEN.innerHTML = ARR.join('');
    SCREEN.selectionStart = CURSOR_Index;
  } else if (event.code === 'Space') {
    SCREEN.innerHTML += ' ';
  } else if (event.code === 'Tab') {
    SCREEN.innerHTML += '    ';
  } else if (event.code === 'Enter') {
    SCREEN.innerHTML += '\n';
  } else {
    for (let code of CODES) {
      if (KEY_CODE === code && !FUNC_KEYS.includes(code)) {
        ALL_KEYS.forEach((el) => {
          if (CODES.indexOf(code) > 12 && el.id == CODES.indexOf(code) && event.shiftKey) {
            SCREEN.innerHTML += el.innerHTML.toUpperCase();
          } else if (CODES.indexOf(code) > 12 && el.id == CODES.indexOf(code)) {
            if (!isCapsLocked) {
              SCREEN.innerHTML += el.innerHTML.toLowerCase();
            } else if (isCapsLocked) {
              SCREEN.innerHTML += el.innerHTML.toUpperCase();
            }
          } else if (
            CODES.indexOf(code) <= 12 &&
            el.id == CODES.indexOf(code) &&
            code !== 'Backquote'
          ) {
            if (event.shiftKey) {
              const ELEMS = document.getElementById(CODES.indexOf(code)).children;
              SCREEN.innerHTML += ELEMS[0].innerHTML;
            } else {
              const ELEMS = document.getElementById(CODES.indexOf(code)).children;
              SCREEN.innerHTML += ELEMS[1].innerHTML;
            }
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
    playClick();
    let isFunctionalKey = false;
    const EL = document.getElementById(event.target.id);

    if (event.target.id === CAPS_LOCK_id) {
      const CAPSLOCK = document.getElementById(CAPS_LOCK_id);
      isCapsLocked = !isCapsLocked;
      if (isCapsLocked) {
        CAPSLOCK.classList.add('capslocked');
      } else {
        CAPSLOCK.classList.remove('capslocked');
      }
    }
    if (+event.target.id > 12) {
      try {
        EL.classList.add('active');
        ARR_OF_FUNC_KEYS.forEach((elem) => {
          elem == event.target.innerHTML ? (isFunctionalKey = true) : '';
        });
        if (event.target.innerHTML === 'Backspace') {
          SCREEN.innerHTML = SCREEN.innerHTML.slice(0, SCREEN.innerHTML.length - 1);
        } else if (event.target.innerHTML === 'DEL') {
          const CURSOR_Index = SCREEN.selectionEnd;
          const ARR = SCREEN.innerHTML.split('');
          delete ARR[CURSOR_Index];
          SCREEN.innerHTML = ARR.join('');
          SCREEN.selectionStart = CURSOR_Index;
        } else if (event.target.innerHTML === '') {
          SCREEN.innerHTML += ' ';
        } else if (event.target.innerHTML === 'Tab') {
          SCREEN.innerHTML += '    ';
        } else if (event.target.innerHTML === 'Enter') {
          SCREEN.innerHTML += '\n';
        } else if (!isFunctionalKey) {
          if (!isCapsLocked) {
            SCREEN.innerHTML += event.target.innerHTML.toLowerCase();
          } else {
            SCREEN.innerHTML += event.target.innerHTML.toUpperCase();
          }
        }
      } catch (err) {
        console.log("Didn't hit the keyboard key");
      }
    } else {
      const PARENT_IDS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      PARENT_IDS.forEach((el) => {
        if (event.target.parentElement.id == el) {
          event.target.parentElement.classList.add('active');
          SCREEN.innerHTML += event.target.parentElement.children[1].innerHTML;
        }
      });
    }
  });
  KEYBOARD.addEventListener('mouseup', () => {
    const ALL_KEYS = document.querySelectorAll('.keyboard__item');
    ALL_KEYS.forEach((el) => {
      el.classList.remove('active');
    });
  });
}
