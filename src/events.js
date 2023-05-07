import {
  CODES,
  FUNC_KEYS,
  AUDIO_CLICK,
  CAPS_LOCK_id,
  Backquote,
  TEXTAREA_COLS,
} from './environments.js';
import { switchLanguage } from './pageElements.js';

function playClick() {
  AUDIO_CLICK.play();
}

let isCapsLocked = false;
export function keyDownEvent(event) {
  event.preventDefault();
  const SCREEN = document.querySelector('textarea');
  const ALL_KEYS = document.querySelectorAll('.keyboard__item');

  ALL_KEYS.forEach((el) => {
    if (!el.className.includes('reset') && el.id == CODES.indexOf(event.code)) {
      el.classList.add('active');
      playClick();
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
  } else if (CODES.indexOf(event.code) === Backquote) {
    addCharacter('`');
  } else if (event.code === 'Backspace') {
    backspaceCharacter();
  } else if (event.code === 'Delete') {
    deleteCharacter();
  } else if (event.code === 'Space') {
    addCharacter(' ');
  } else if (event.code === 'Tab') {
    addCharacter('    ');
  } else if (event.code === 'Enter') {
    addCharacter('&#13;');
  } else if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
    move(event.code);
  } else {
    for (let code of CODES) {
      if (event.code === code && !FUNC_KEYS.includes(code)) {
        ALL_KEYS.forEach((el) => {
          if (CODES.indexOf(code) > 12 && el.id == CODES.indexOf(code) && event.shiftKey) {
            addCharacter(el.innerHTML.toUpperCase());
          } else if (CODES.indexOf(code) > 12 && el.id == CODES.indexOf(code)) {
            if (!isCapsLocked) {
              addCharacter(el.innerHTML.toLowerCase());
            } else if (isCapsLocked) {
              addCharacter(el.innerHTML.toUpperCase());
            }
          } else if (
            CODES.indexOf(code) <= 12 &&
            el.id == CODES.indexOf(code) &&
            code !== 'Backquote'
          ) {
            if (event.shiftKey) {
              const ELEMS = document.getElementById(CODES.indexOf(code)).children;
              addCharacter(ELEMS[0].innerHTML);
            } else {
              const ELEMS = document.getElementById(CODES.indexOf(code)).children;
              addCharacter(ELEMS[1].innerHTML);
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
    const SCREEN = document.querySelector('textarea');
    playClick();
    event.preventDefault();
    SCREEN.focus();

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
          backspaceCharacter();
        } else if (event.target.innerHTML === 'DEL') {
          deleteCharacter();
        } else if (event.target.innerHTML === '') {
          addCharacter(' ');
        } else if (event.target.innerHTML === 'Tab') {
          addCharacter('    ');
        } else if (event.target.innerHTML === 'Enter') {
          addCharacter('\n');
        } else if (event.target.innerHTML === '⇒') {
          move('ArrowRight');
        } else if (event.target.innerHTML === '⇐') {
          move('ArrowLeft');
        } else if (!isFunctionalKey) {
          if (!isCapsLocked) {
            addCharacter(event.target.innerHTML.toLowerCase());
          } else {
            addCharacter(event.target.innerHTML.toUpperCase());
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
          addCharacter(event.target.parentElement.children[1].innerHTML);
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

function deleteCharacter() {
  const SCREEN = document.querySelector('textarea');
  const CURSOR_Index = SCREEN.selectionEnd;
  const ARR = SCREEN.innerHTML.split('');
  delete ARR[CURSOR_Index];
  SCREEN.innerHTML = ARR.join('');
  SCREEN.selectionStart = CURSOR_Index;
}
function backspaceCharacter() {
  const SCREEN = document.querySelector('textarea');
  const CURSOR_Index = SCREEN.selectionEnd;
  const ARR = SCREEN.innerHTML.split('');
  delete ARR[CURSOR_Index - 1];
  SCREEN.innerHTML = ARR.join('');
  SCREEN.selectionStart = CURSOR_Index - 1;
}
function addCharacter(character) {
  const SCREEN = document.querySelector('textarea');
  const CURSOR_Index = SCREEN.selectionEnd;
  const ARR = SCREEN.innerHTML.split('');
  ARR.splice(SCREEN.selectionEnd, 0, character);
  SCREEN.innerHTML = ARR.join('');
  SCREEN.selectionStart = CURSOR_Index + 1;
  SCREEN.scrollTop = SCREEN.scrollHeight;
}
function move(direction) {
  if (direction == 'ArrowLeft') {
    const SCREEN = document.querySelector('textarea');
    let CURSOR_Index = SCREEN.selectionStart;
    if (CURSOR_Index > 0) {
      SCREEN.selectionEnd = CURSOR_Index - 1;
    }
  } else if (direction == 'ArrowRight') {
    const SCREEN = document.querySelector('textarea');
    let CURSOR_Index = SCREEN.selectionEnd;
    SCREEN.selectionStart = CURSOR_Index + 1;
  }
}
