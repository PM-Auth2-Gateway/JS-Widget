import AuthAPI from './AuthAPI';
import { mockedAuthLink } from './mockedData';

import './style.css';

class SocialButton extends HTMLElement {
  #socialId;

  #appId;

  static timerId;

  constructor({ id, name, appId }) {
    super();

    this.#socialId = id;
    this.#appId = appId;

    this.innerHTML = `Sign in with ${name}`;

    this.classList.add('btn');
  }

  connectedCallback() {
    this.addEventListener('click', this.#onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick);
  }

  #onClick(event) {
    event.preventDefault();

    AuthAPI.getAuthLink({ appId: this.#appId, socialId: this.#socialId })
      .then((data) => SocialButton.#openModalWindow(data))
      .catch(() => {
        console.warn('Something went wrong, sorry');
      });
  }

  // eslint-disable-next-line no-unused-vars
  static #openModalWindow(urlConfig) {
    let { timerId } = SocialButton;

    // TODO swap to urlConfig when backend will be done
    const url = SocialButton.#createUrl(mockedAuthLink);

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
        // TODO request to get user info
        console.log('request');
      }
    }, 1000);
  }

  static #createUrl(urlConfig) {
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
