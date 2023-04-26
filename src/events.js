export function keyboardEvents() {
  const ALL_KEYS = document.querySelectorAll('.keyboard__item');
  const SCREEN = document.querySelector('textarea');

  document.addEventListener('keydown', (event) => {
    const KEY_NAME = event.key;
    ALL_KEYS.forEach((el) => {
      if (el.innerHTML.toLocaleLowerCase() === KEY_NAME) {
        el.classList.add('active');
        SCREEN.innerHTML += event.key;
      }
      if (el.innerHTML === 'Backspace' && event.key === 'Backspace') {
        el.classList.add('active');
        SCREEN.innerHTML = SCREEN.innerHTML.slice(0, SCREEN.innerHTML.length - 1);
      }
    });
  });
  document.addEventListener('keyup', () => {
    ALL_KEYS.forEach((el) => {
      el.classList.remove('active');
    });
  });
}
