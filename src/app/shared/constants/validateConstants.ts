export default {
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
