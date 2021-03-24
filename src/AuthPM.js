import AuthAPI from './AuthAPI';

class AuthPM {
  #appId;

  #target;

  constructor(appId, target) {
    this.#appId = appId;

    this.#setTarget(target);

    this.#target && this.#getAppList();
  }

  #setTarget(target) {
    if (AuthPM.#isDomElement(target)) {
      this.#target = target;
      return;
    }

    const possibleTarget = document.querySelector(target);

    if (AuthPM.#isDomElement(possibleTarget)) {
      this.#target = possibleTarget;
    } else {
      console.warn('Can not find target, check configuration');
    }
  }

  #getAppList() {
    AuthAPI.getAppList(this.#appId)
      .then(({ socials }) => this.#renderSocials(socials))
      .catch(() => {
        console.warn(`Can not find application settings`);
      });
  }

  #renderSocials(socials) {
    socials.forEach(({ id, name }) => {
      const btn = this.#renderButton({ id, name });

      this.#target.appendChild(btn);
    });
  }

  #renderButton({ id, name }) {
    const clickHandler = (event) => {
      event.preventDefault();

      AuthAPI.getAuthLink({ appId: this.#appId, socialId: id })
        .then((data) => AuthPM.#openLoginWindow(data))
        .catch(() => {
          console.warn('Something went wrong, sorry');
        });
    };

    // TODO add button stylization
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = name;
    btn.addEventListener('click', clickHandler);

    return btn;
  }

  static #openLoginWindow(urlConfig) {
    console.log(urlConfig);
  }

  static #isDomElement(obj) {
    return obj instanceof Element;
  }
}

export default AuthPM;
