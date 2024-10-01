const PROJECT_CODE_MIN_LENGTH = 3;
const PROJECT_CODE_MAX_LENGTH = 5;
// only alphanumeric characters, length between 3 and 5 characters inclusive
const PROJECT_CODE_REGEX = /^[a-zA-Z0-9]{3,5}$/;
const PROJECTS_DEFAULT_COLORS = {
  dark: [
    '#393b42',
    '#5e2647',
    '#462b63',
    '#203a5f',
    '#2b555e',
    '#195049',
    '#365c20',
    '#68631e',
    '#604419',
  ],
  light: [
    '#ECEEF3',
    '#F5C8D7',
    '#EFD6FA',
    '#CFE3F7',
    '#D1F0EF',
    '#AFE7E0',
    '#D8F3B1',
    '#F5F2C4',
    '#EED4B0',
  ],
};

const isProjectCodeValid = (code: string): boolean => {
  return PROJECT_CODE_REGEX.test(code);
};

const generateProjectCode = (projectName: string): string => {
  return projectName
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, PROJECT_CODE_MIN_LENGTH);
};

const getRandomProjectColor = (theme: 'light' | 'dark') => {
  return PROJECTS_DEFAULT_COLORS[theme][
    Math.floor(Math.random() * PROJECTS_DEFAULT_COLORS[theme].length)
  ];
};

export {
  PROJECTS_DEFAULT_COLORS,
  PROJECT_CODE_MAX_LENGTH,
  PROJECT_CODE_MIN_LENGTH,
  generateProjectCode,
  getRandomProjectColor,
  isProjectCodeValid,
};
