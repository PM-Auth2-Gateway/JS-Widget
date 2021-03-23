class AuthAPI {
  static #url = 'https://net-api-hbyuu.ondigitalocean.app';

  static getAppList(appId) {
    return fetch(`${AuthAPI.#url}/Socials`, {
      headers: {
        'Content-Type': 'application/json',
        App_id: appId,
      },
    }).then((res) => res.json());
  }

  static getAuthLink({ appId, socialId }) {
    return fetch(`${AuthAPI.#url}/Socials/auth-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        App_id: appId,
      },
      body: JSON.stringify({ social_id: socialId }),
    }).then((res) => res.json());
  }
}

export default AuthAPI;
