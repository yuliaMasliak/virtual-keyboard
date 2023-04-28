import { ADD_APP_HEADING, ADD_KEYBOARD } from './pageElements.js';
import styles from '../style.css' assert { type: 'css' };

window.addEventListener('load', () => {
  document.body.append(ADD_APP_HEADING());
  ADD_KEYBOARD();
});
