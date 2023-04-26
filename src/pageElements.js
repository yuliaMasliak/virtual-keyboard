import { KEYS_ENG, KEYS_RUS } from './environments.js';

export const ADD_APP_HEADING = () => {
  const TITLE = document.createElement('h1');
  TITLE.innerHTML = 'RSS Virtual Keyboard';
  const SUB_TITLE = document.createElement('div');
  SUB_TITLE.innerHTML = 'Created on Windows OS <br> To switch between ENG / RUS press CTRL + SHIFT';
  const HEADER = document.createElement('header');
  const TEXTAREA_BLOCK = document.createElement('div');
  TEXTAREA_BLOCK.classList.add('textarea-block');
  const TEXTAREA = document.createElement('textarea');
  TEXTAREA_BLOCK.append(TEXTAREA);
  const KEYBOARD_CONTAINER = document.createElement('div');
  KEYBOARD_CONTAINER.classList.add('keyboard-container');
  HEADER.append(TITLE, SUB_TITLE, TEXTAREA_BLOCK, KEYBOARD_CONTAINER);
  return HEADER;
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
}
let language = 'ENG';

export function switchLanguage() {
  if (language === 'ENG') {
    language = 'RUS';
    renderKeyboard(KEYS_RUS);
  } else {
    renderKeyboard(KEYS_ENG);
    language = 'ENG';
  }
  return language;
}
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.shiftKey) {
    switchLanguage();
  }
});
export const ADD_KEYBOARD = () => {
  renderKeyboard(KEYS_ENG);
};
