import AuthAPI from './AuthAPI';
import AuthPM from './AuthPM';
import emitter from './EventEmitter';

import icons from './mockedData';

import './style.css';

class SocialButton extends HTMLElement {
  #socialId;

  #appId;

  static timerId;

  constructor({ id, name, appId }) {
    super();

    this.#socialId = id;
    this.#appId = appId;

    this.#createBtn(name);
  }

  connectedCallback() {
    this.addEventListener('click', this.#onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick);
  }

  #createBtn(name) {
    const img = document.createElement('img');
    img.src = icons[name];
    img.alt = `${icons[name]} logo`;

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
    let { timerId } = SocialButton;

    const url = SocialButton.#createUrl(urlConfig);

    const loginModal = window.open(
      url,
      'Authentication Modal',
      'width=972,height=660,modal=yes,alwaysRaised=yes'
    );

    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }

    timerId = setInterval(() => {
      if (loginModal.closed) {
        clearInterval(timerId);
        emitter.emit('loginEvent');
      }
    }, 1000);
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
}

export default SocialButton;
