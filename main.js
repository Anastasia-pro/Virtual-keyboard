import {KEYS} from './keys.js';
import Keyboard from './virtual-keyboard-body-actions.js';
window.onload = () => {
    

    //create textarea
    const textarea = document.createElement('textarea');
    textarea.classList.add('textarea-key');
    document.body.append(textarea);

    //create keyboard container
    const keyContainer = document.createElement('div');
    keyContainer.classList.add('key-container');
    document.body.append(keyContainer);

    //create keyboard
    const keyboard = new Keyboard(KEYS, keyContainer);

    // Add comment, how to use app and how it was made
    const baseText = document.createElement('p');
    baseText.innerHTML = '<strong>Сменить раскладку: left Ctrl + left Shift</strong>.';
    document.body.append(baseText);
// What's happening if mouse button'is pressed or released
const pressMouseButton = (event) => {
    if (event.target.tagName === 'BUTTON') {
      keyboard.changeState(event.target.dataset.keyCode, event.type);
      textarea.value = keyboard.type(event.target, textarea.value);
    }
  };

  const releaseMouseButton = (event) => {
    const code = (event.target.dataset.keyCode) ? event.target.dataset.keyCode : '';
    keyboard.changeState(code, event.type);
  };

  // Catch if mouse button's pressed or released
  keyContainer.addEventListener('mousedown', pressMouseButton);
  document.addEventListener('click', releaseMouseButton);

  // What's happening if computer buttons're pressed or released
  const pressComputerKey = (event) => {
    event.preventDefault();
    const virtualKey = keyboard.view.querySelector(`[data-key-code="${event.code}"]`);

    if (virtualKey) {
      keyboard.changeState(event.code, event.type);
      if (event.type === 'keydown') textarea.value = keyboard.type(virtualKey, textarea.value);
    }
  };


  // Focus on textarea
  textarea.focus();
  textarea.addEventListener('blur', () => textarea.focus());
  
  // Catch if computer buttons're pressed or released
  document.addEventListener('keydown', pressComputerKey);
  document.addEventListener('keyup', pressComputerKey);

  // Inactivate all buttons (except CapsLock), when focus got out of page and returned back
  window.addEventListener('blur', () => {
    if (keyboard.pressed.includes('CapsLock')) keyboard.pressed = ['CapsLock'];
    else keyboard.pressed = [];
    keyboard.activateKeys();
  });
};

