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
    switch (typeof target) {
      case 'object': {
        if (AuthPM.#isDomElementExist(target)) {
          this.#target = target;
        }
        break;
      }
      case 'string': {
        const possibleTarget = document.querySelector(target);
        if (AuthPM.#isDomElementExist(possibleTarget)) {
          this.#target = possibleTarget;
        }
        break;
      }
      default: {
        console.warn('Invalid type of target, check configuration');
        return;
      }
    }

    if (!this.#target) {
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

  static #isDomElementExist(obj) {
    return obj instanceof Element && document.body.contains(obj);
  }
}

export default AuthPM;
