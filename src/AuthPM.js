class AuthPM {
  #appId;

  #target;

  constructor(appId, target) {
    this.#appId = appId;

    this.#setTarget(target);
    this.#getAppList();
  }

  #setTarget(target) {
    if (AuthPM.#isDomElement(target)) {
      this.#target = target;
      return;
    }

    const possibleTarget = document.querySelector(target);

    if (AuthPM.#isDomElement(possibleTarget)) {
      this.#target = possibleTarget;
    }
  }

  #getAppList() {
    console.log(this.#appId);
  }

  static #isDomElement(obj) {
    return obj instanceof Element;
  }
}

export default AuthPM;
