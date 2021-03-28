import AuthAPI from '../src/AuthAPI';

describe('AuthAPI block tests', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should get AppList', async () => {
    const responseBody = [
      {
        name: 'google',
      },
      {
        name: 'facebook',
      },
    ];

    fetch.mockResponseOnce(JSON.stringify(responseBody));

    const response = await AuthAPI.getAppList(1);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://net-api-hbyuu.ondigitalocean.app/Socials`,
      {
        headers: {
          'Content-Type': 'application/json',
          App_id: 1,
        },
      }
    );
    expect(response).toEqual(responseBody);
  });

  it('should get AuthLink', async () => {
    const responseBody = {
      url: 'google.com',
      scope: 'email',
    };

    const requestParams = {
      appId: 2,
      socialId: '1',
    };

    fetch.mockResponseOnce(JSON.stringify(responseBody));

    const response = await AuthAPI.getAuthLink(requestParams);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://net-api-hbyuu.ondigitalocean.app/Socials/auth-link`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          App_id: requestParams.appId,
        },
        body: JSON.stringify({
          social_id: requestParams.socialId,
          device: 'browser',
        }),
      }
    );
    expect(response).toEqual(responseBody);
  });

  it('should get UserProfile', async () => {
    const responseBody = {
      id: '123',
      firstName: 'test',
      lastName: 'test',
    };

    const requestParams = {
      appId: 2,
      sessionId: 'asd-asd-asd',
    };

    fetch.mockResponseOnce(JSON.stringify(responseBody));

    const response = await AuthAPI.getUserProfile(requestParams);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://net-api-hbyuu.ondigitalocean.app/Profile/info`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          App_id: requestParams.appId,
        },
        body: JSON.stringify({ session_id: requestParams.sessionId }),
      }
    );
    expect(response).toEqual(responseBody);
  });
});
