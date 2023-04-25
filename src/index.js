import { ADD_APP_HEADING, ADD_KEYBOARD_ENG } from './pageElements.js';

const FRAGMENT = new DocumentFragment();
FRAGMENT.append(ADD_APP_HEADING(), ADD_KEYBOARD_ENG());
document.body.append(FRAGMENT);
