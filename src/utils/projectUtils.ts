const PROJECT_CODE_MIN_LENGTH = 3;
const PROJECT_CODE_MAX_LENGTH = 10;
// only alphanumeric characters, length between 3 and 10 characters inclusive
const PROJECT_CODE_REGEX = /^[a-zA-Z0-9]{3,10}$/;
const PROJECTS_DEFAULT_COLORS = [
  '#393b42',
  '#5e2647',
  '#462b63',
  '#203a5f',
  '#2b555e',
  '#195049',
  '#365c20',
  '#68631e',
  '#604419',
];

const isProjectCodeValid = (code: string): boolean => {
  return PROJECT_CODE_REGEX.test(code);
};

const generateProjectCode = (projectName: string): string => {
  return projectName
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, PROJECT_CODE_MIN_LENGTH);
};

export {
  PROJECTS_DEFAULT_COLORS,
  PROJECT_CODE_MAX_LENGTH,
  PROJECT_CODE_MIN_LENGTH,
  generateProjectCode,
  isProjectCodeValid,
};
