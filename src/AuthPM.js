class AuthPM {
  static #url = 'https://net-api-hbyuu.ondigitalocean.app';

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
    }
  }

  #getAppList() {
    fetch(`${AuthPM.#url}/Socials`, {
      headers: {
        'Content-Type': 'application/json',
        App_id: this.#appId,
      },
    })
      .then((res) => res.json())
      .then(({ socials }) => this.#renderSocials(socials));
  }

  #renderSocials(socials) {
    socials.forEach(({ id, name }) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = name;
      btn.addEventListener('click', () => {
        fetch(`${AuthPM.#url}/Socials/auth-link`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            App_id: this.#appId,
          },
          body: JSON.stringify({ social_id: id }),
        })
          .then((res) => res.json())
          .then((data) => AuthPM.#openLoginWindow(data));
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
