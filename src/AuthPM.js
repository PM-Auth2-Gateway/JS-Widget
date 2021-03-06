import AuthAPI from './AuthAPI';
import SocialButton from './SocialButton';
import emitter from './EventEmitter';

class AuthPM {
  #appId;

  #target;

  #customization = {};

  static sessionId;

  constructor({ appId, target, callback, customization }) {
    this.#appId = appId;

    customization && (this.#customization = customization);

    this.#init(target, callback);
  }

  #init(target, callback) {
    const isTargetSet = this.#setTarget(target);

    if (!isTargetSet) {
      return;
    }

    if (typeof callback === 'function') {
      this.#getAppList();
      this.getUserInfo = this.getUserInfo.bind(this, callback);

      emitter.subscribe('loginEvent', this.getUserInfo);
    } else {
      console.warn('Callback is not a function');
    }
  }

  getUserInfo(callback) {
    if (!AuthPM.sessionId) {
      return;
    }

    AuthAPI.getUserProfile({ appId: this.#appId, sessionId: AuthPM.sessionId })
      .then((data) => {
        callback(data, null);
      })
      .catch((error) => {
        error.json().then((res) => {
          switch (res.errorCode) {
            case 10:
            case 14:
              callback(null, res);
              break;
            default:
              console.warn(res.error);
          }
        });
      })
      .finally(() => {
        AuthPM.sessionId = null;
      });
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
        return false;
      }
    }

    if (!this.#target) {
      console.warn('Can not find target, check configuration');
    }

    return !!this.#target;
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

    const socialsContainer = this.#createSocialsContainer();

    socials.forEach(({ id, name, logoPath }) => {
      const btn = new SocialButton({
        id,
        name,
        appId: this.#appId,
        logo: logoPath,
      });
      socialsContainer.appendChild(btn);
    });

    this.#target.appendChild(socialsContainer);
  }

  #createSocialsContainer() {
    const container = document.createElement('div');
    container.classList.add('socials-container');

    if (this.#customization.direction) {
      container.style.flexDirection = this.#customization.direction;
    }

    return container;
  }

  static #isDomElementExist(obj) {
    return obj instanceof Element && document.body.contains(obj);
  }
}

export default AuthPM;
