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
    AuthAPI.getAppList(this.#appId).then(({ socials }) =>
      this.#renderSocials(socials)
    );
  }

  #renderSocials(socials) {
    socials.forEach(({ id, name }) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = name;
      btn.addEventListener('click', () => {
        AuthAPI.getAuthLink({ appId: this.#appId, socialId: id }).then((data) =>
          AuthPM.#openLoginWindow(data)
        );
      });

      this.#target.appendChild(btn);
    });
  }

  static #openLoginWindow(urlConfig) {
    console.log(urlConfig);
  }

  static #isDomElement(obj) {
    return obj instanceof Element;
  }
}

export default AuthPM;
