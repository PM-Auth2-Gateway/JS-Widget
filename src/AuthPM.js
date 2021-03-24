import AuthAPI from './AuthAPI';
import SocialButton from './SocialButton';
import emitter from './EventEmitter';
import { userProfile } from './mockedData';

class AuthPM {
  #appId;

  #target;

  constructor(appId, target, callback) {
    this.#appId = appId;

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

  // maybe should be use instance prop in future
  // eslint-disable-next-line class-methods-use-this
  getUserInfo(callback) {
    // TODO request to get user info
    callback(userProfile);
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
