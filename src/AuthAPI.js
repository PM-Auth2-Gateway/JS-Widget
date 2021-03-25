class AuthAPI {
  static #url = 'https://net-api-hbyuu.ondigitalocean.app';

  static getAppList(appId) {
    return fetch(`${AuthAPI.#url}/Socials`, {
      headers: {
        'Content-Type': 'application/json',
        App_id: appId,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
  }

  static getAuthLink({ appId, socialId }) {
    return fetch(`${AuthAPI.#url}/Socials/auth-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        App_id: appId,
      },
      body: JSON.stringify({ social_id: socialId, device: 'browser' }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
  }

  static getUserProfile({ appId, sessionId }) {
    return fetch(`${AuthAPI.#url}/Profile/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        App_id: appId,
      },
      body: JSON.stringify({ session_id: sessionId }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
  }
}

export default AuthAPI;
