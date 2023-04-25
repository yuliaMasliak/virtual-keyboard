import { KEYS_ENG } from './environments.js';

export const ADD_APP_HEADING = () => {
  const TITLE = document.createElement('h3');
  TITLE.innerHTML = 'Virtual Keyboard';
  const SUB_TITLE = document.createElement('div');
  SUB_TITLE.innerHTML = 'Created on Windows OS';
  const HEADER = document.createElement('header');
  const TEXTAREA_BLOCK = document.createElement('div');
  TEXTAREA_BLOCK.classList.add('textarea-block');
  const TEXTAREA = document.createElement('textarea');
  TEXTAREA_BLOCK.append(TEXTAREA);
  HEADER.append(TITLE, SUB_TITLE, TEXTAREA_BLOCK);
  return HEADER;
};

export const ADD_KEYBOARD_ENG = () => {
  const KEYBOARD_BLOCK = document.createElement('div');
  KEYBOARD_BLOCK.classList.add('kyeboard__block');
  KEYS_ENG.forEach((key) => {
    const KEY_ITEM = document.createElement('div');
    if (key === 'Backspace') {
      KEY_ITEM.classList.add('backspace');
    }
    if (key === 'Tab') {
      KEY_ITEM.classList.add('tab');
    }
    if (key === 'Caps Lock') {
      KEY_ITEM.classList.add('caps-lock');
    }
    if (key === 'Enter') {
      KEY_ITEM.classList.add('enter');
    }
    KEY_ITEM.classList.add('keyboard__item');
    KEY_ITEM.innerHTML = key;
    KEYBOARD_BLOCK.append(KEY_ITEM);
  });
  return KEYBOARD_BLOCK;
};
