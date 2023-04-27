import { ADD_APP_HEADING, ADD_KEYBOARD } from './pageElements.js';
import { keyboardEvents, mouseEvents } from './events.js';
window.addEventListener('load', () => {
  document.body.append(ADD_APP_HEADING());
  ADD_KEYBOARD();
  keyboardEvents();
  mouseEvents();
});
