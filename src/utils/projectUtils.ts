export const PROJECT_CODE_MIN_LENGTH = 3;
export const PROJECT_CODE_MAX_LENGTH = 10;
export const PROJECT_CODE_REGEX = /^[a-zA-Z0-9]{3,10}$/;
export const PROJECTS_DEFAULT_COLORS = [
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

export const isProjectCodeValid = (code: string): boolean => {
  return PROJECT_CODE_REGEX.test(code);
};

export const generateProjectCode = (projectName: string): string => {
  return projectName
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, PROJECT_CODE_MIN_LENGTH);
};
