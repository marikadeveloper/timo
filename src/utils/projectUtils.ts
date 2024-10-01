import db from '../data/db';

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

const isProjectCodeDuplicate = async (code: string): Promise<boolean> => {
  const project = await db.projects.where({ code }).first();
  return project !== undefined;
};

const getRandomProjectColor = (theme: 'light' | 'dark') => {
  return PROJECTS_DEFAULT_COLORS[theme][
    Math.floor(Math.random() * PROJECTS_DEFAULT_COLORS[theme].length)
  ];
};

const isColorContrastSufficient = (hexcolor: string) => {
  // check if black text is readable on the background color
  const idealFont =
    parseInt(hexcolor.substring(1), 16) > 0xffffff / 2 ? 'black' : 'white';
  return idealFont === 'black';
};

export {
  PROJECTS_DEFAULT_COLORS,
  PROJECT_CODE_MAX_LENGTH,
  PROJECT_CODE_MIN_LENGTH,
  getRandomProjectColor,
  isColorContrastSufficient,
  isProjectCodeDuplicate,
  isProjectCodeValid,
};
