import { KEYS_ENG, KEYS_UA } from './environments.js';
import { mouseEvents, keyDownEvent, keyUpEvent } from './events.js';

export const ADD_APP_HEADING = () => {
  const TITLE = document.createElement('h1');
  TITLE.innerHTML = 'RSS Virtual Keyboard';
  const SUB_TITLE = document.createElement('div');
  SUB_TITLE.classList.add('sub-title');
  SUB_TITLE.innerHTML = 'Created on Windows OS <br> To switch between ENG / RUS press CTRL + SHIFT';
  const MAIN = document.createElement('main');
  const TEXTAREA_BLOCK = document.createElement('div');
  TEXTAREA_BLOCK.classList.add('textarea-block');
  const TEXTAREA = document.createElement('textarea');
  TEXTAREA_BLOCK.append(TEXTAREA);
  const KEYBOARD_CONTAINER = document.createElement('div');
  KEYBOARD_CONTAINER.classList.add('keyboard-container');
  MAIN.append(TITLE, SUB_TITLE, TEXTAREA_BLOCK, KEYBOARD_CONTAINER);
  return MAIN;
};

export function renderKeyboard(lang) {
  const CONTAINER = document.querySelector('.keyboard-container');
  CONTAINER.innerHTML = '';
  const KEYBOARD_BLOCK = document.createElement('div');

  KEYBOARD_BLOCK.classList.add('kyeboard__block');
  lang.forEach((key, i) => {
    const KEY_ITEM = document.createElement('div');

    if (key === 'Backspace') {
      KEY_ITEM.classList.add('backspace');
      KEY_ITEM.classList.add('dark');
    }
    if (key === 'Tab') {
      KEY_ITEM.classList.add('tab');
      KEY_ITEM.classList.add('dark');
    }
    if (key === 'Caps Lock') {
      KEY_ITEM.classList.add('caps-lock');
      KEY_ITEM.classList.add('dark');
    }
    if (key === 'Enter') {
      KEY_ITEM.classList.add('enter');
      KEY_ITEM.classList.add('dark');
    }
    if (key === 'Shift') {
      KEY_ITEM.classList.add('shift');
      KEY_ITEM.classList.add('dark');
    }
    if (key === 'Ctrl') {
      KEY_ITEM.classList.add('ctrl');
      KEY_ITEM.classList.add('dark');
    }
    if (key === '') {
      KEY_ITEM.classList.add('spacebar');
      KEY_ITEM.classList.add('dark');
    }
    if (
      key === 'Win' ||
      key === 'Alt' ||
      key === 'DEL' ||
      key === '&#8656;' ||
      key === '&#8659;' ||
      key === '&#8658;' ||
      key === '&#8657;' ||
      i === 0
    ) {
      KEY_ITEM.classList.add('dark');
    }
    KEY_ITEM.classList.add('keyboard__item');
    KEY_ITEM.id = i;
    KEY_ITEM.innerHTML = key;
    if (Array.isArray(key)) {
      const ARR = key[0].split('');
      const PARTS = document.createElement('div');
      ARR.forEach((character) => {
        const PART = document.createElement('div');
        PART.classList.add('keyboard__item');
        PART.classList.add('keyboard__item-reset');
        PART.innerHTML = character;
        PARTS.append(PART);
      });
      KEY_ITEM.classList.add('keyboard__item-flex');
      KEY_ITEM.innerHTML = PARTS.innerHTML;
    }
    KEYBOARD_BLOCK.append(KEY_ITEM);
  });

  CONTAINER.append(KEYBOARD_BLOCK);
  document.onkeydown = keyDownEvent;
  document.onkeyup = keyUpEvent;
  mouseEvents();
}

export function switchLanguage() {
  if (localStorage.getItem('lang') == 'ENG') {
    localStorage.setItem('lang', 'UA');
    ADD_KEYBOARD();
  } else {
    localStorage.setItem('lang', 'ENG');
    ADD_KEYBOARD();
  }
}

export const ADD_KEYBOARD = () => {
  localStorage.getItem('lang') == 'UA' ? renderKeyboard(KEYS_UA) : renderKeyboard(KEYS_ENG);
};
