import AuthAPI from './AuthAPI';

import './style.css';

class SocialButton extends HTMLElement {
  #socialId;

  #appId;

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

  #styleComponent() {
    this.style.display = 'block';
    this.style.maxWidth = '150px';
    this.style.color = '#3c4146';
    this.style.backgroundColor = '#fff';
    this.style.padding = '10px';
    this.style.borderRadius = '3px';
    this.style.border = '1px solid #d6d9dc';
    this.style.fontSize = '13px';
    this.style.margin = '4px';
  }

  static #openModalWindow(urlConfig) {
    console.log(urlConfig);
  }
}

export default SocialButton;
