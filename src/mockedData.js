const mockedAuthLink = {
  auth_uri: 'https://accounts.google.com/o/oauth2/v2/auth',
  redirect_uri:
    'https://net-api-hbyuu.ondigitalocean.app/WeatherForecast/test-close',
  response_type: 'code',
  client_id:
    '745438436013-3k3ljamgbn7bp1sogcvb6je8idtr4fcc.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/userinfo.email',
  state: 'session_id',
};

const userProfile = {
  id: '1',
  accessToken: 'accessToken-1',
  refreshToken: 'refreshToken-1',
  expiresIn: 'expires-1',
  firstName: 'first name',
  lastName: 'last name',
  email: 'email@email.com',
  isVerifiedEmail: 'isVerifiedTrue',
  photo: 'photo-url',
  locale: 'locale',
};

export { mockedAuthLink, userProfile };
