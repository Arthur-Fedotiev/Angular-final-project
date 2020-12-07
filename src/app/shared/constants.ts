export default {
  AUTHENTICATION_KEY: 'superHeroProject:sessionIsActive',
  USERS: 'USERS',
  QUERIES: 'QUERIES',
  SELECTED_HEROES: 'SELECTED_HEROES',
  SIGNUP_SUCCESS: "Congradulations! You've successfully signed-up!",
  SIGNUP_EXISTED: 'You are already signed-up, welcome back!',
  SESSION_EXPIRED: 'Your session is out of date, please login back again!',
  LOGIN_SUCCESS: "Welcome back, lets's play a game!",
  LOGIN_WRONG_PASSWORD: 'Unfortunatelly, password is wrong. Please try again.',
  LOGIN_NO_USER:
    "Unfortunatelly, there is no user with provided e-mail. Please make sure you've enter correct data or sign-up first.",
  EMAIL_PATTERN:
    '([\\w]+.?){1,3}([\\w]+)?@(?!.{6,})([\\w]+\\.(us|com|co|net|org))',
  PASSWORD_PATTERN:
    '(?=[^\\W]*[\\W])(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9])[a-zA-Z0-9$ % . & ! -]{5,}',
  PASSWORD_ALERT: 'Password cannot contain parts of name or email',
  SPACE_CASE_PATTERN: /^[A-Z][a-z]*\s[A-Z][a-z]*$/m,
  KEBAB_CASE_PATTERN: /^[a-z]+-[a-z]+$/m,
  CAMEL_CASE_PATTERN: /^[a-z]+[A-Z][a-z]*$/m,
  FORBIDDEN_USERNAME_ALERT:
    'Username should consists of two words (more than 8 characters), kebab-case, camelCase, Space Case - allowed, without any special symbols or numbers',
};
