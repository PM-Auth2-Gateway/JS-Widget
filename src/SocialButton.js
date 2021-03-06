import AuthAPI from './AuthAPI';
import AuthPM from './AuthPM';
import emitter from './EventEmitter';

import './style.css';

class SocialButton extends HTMLElement {
  #socialId;

  #appId;

  static timerId;

  static modal;

  constructor({ id, name, appId, logo }) {
    super();

    this.#socialId = id;
    this.#appId = appId;

    this.#createBtn(name, logo);
  }

  connectedCallback() {
    this.addEventListener('click', this.#onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick);
  }

  #createBtn(name, logo) {
    const img = document.createElement('img');
    img.src = logo;
    img.alt = `${name} logo`;

    const span = document.createElement('span');
    span.textContent = `Sign in with ${name}`;

    this.append(img, span);

    this.classList.add('btn');
  }

  #onClick(event) {
    event.preventDefault();

    AuthAPI.getAuthLink({ appId: this.#appId, socialId: this.#socialId })
      .then((data) => SocialButton.#openModalWindow(data))
      .catch(() => {
        console.warn('Something went wrong, sorry');
      });
  }

  static #openModalWindow(urlConfig) {
    const url = SocialButton.#createUrl(urlConfig);

    if (!SocialButton.modal) {
      SocialButton.modal = window.open(
        url,
        'Authentication Modal',
        'width=972,height=660,modal=yes,alwaysRaised=yes'
      );

      SocialButton.#modalWindowChecker();
    } else {
      SocialButton.modal.location.href = url;
      SocialButton.modal.focus();
    }
  }

  static #createUrl(urlConfig) {
    AuthPM.sessionId = urlConfig.state;

    const url = new URL(urlConfig.auth_uri);
    Object.entries(urlConfig).forEach(([name, value]) => {
      if (name !== 'auth_uri') {
        url.searchParams.set(name, value);
      }
    });

    return url.toString();
  }

  static #modalWindowChecker() {
    let { timerId } = SocialButton;

    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }

    timerId = setInterval(() => {
      if (SocialButton.modal.closed) {
        SocialButton.modal = null;
        clearInterval(timerId);
        emitter.emit('loginEvent');
      }
    }, 1000);
  }
}

export default SocialButton;
