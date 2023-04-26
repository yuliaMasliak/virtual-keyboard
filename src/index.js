import { ADD_APP_HEADING, ADD_KEYBOARD } from './pageElements.js';
import { keyboardEvents } from './events.js';
window.addEventListener('load', () => {
  document.body.append(ADD_APP_HEADING());
  ADD_KEYBOARD();
  keyboardEvents();
});
