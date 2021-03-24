import AuthAPI from './AuthAPI';
import SocialButton from './SocialButton';

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
    customElements.define('social-btn', SocialButton);

    socials.forEach(({ id, name }) => {
      const btn = new SocialButton({ id, name, appId: this.#appId });
      this.#target.appendChild(btn);
    });
  }

  static #isDomElementExist(obj) {
    return obj instanceof Element && document.body.contains(obj);
  }
}

export default AuthPM;
