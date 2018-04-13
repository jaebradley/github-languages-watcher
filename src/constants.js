import dotenv from 'dotenv';

dotenv.config();

const { GH_TOKEN } = process.env;
const GIT_BRANCH_NAME_PREFIX = 'update-languages';
const GITHUB_LANGUAGES_CLIENT_REPOSITORY_NAME = 'jaebradley/github-languages-client';
const GITHUB_LANGUAGES_CLIENT_CLONE_URL = `https://${GH_TOKEN}@github.com/${GITHUB_LANGUAGES_CLIENT_REPOSITORY_NAME}`;
const GITHUB_LANGUAGES_CLIENT_REMOTE_URL = `${GITHUB_LANGUAGES_CLIENT_CLONE_URL}.git`;
const CANONICAL_GITHUB_LANGUAGE_FILE_URL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';
const LANGUAGES_JSON_FILE_LOCATION = 'src/languages.json';
const COMMIT_MESSAGE = 'fix(languages): update GitHub languages JSON file';
const PR_TITLE = 'Update Languages File';
const PR_BODY = `Update languages at ${LANGUAGES_JSON_FILE_LOCATION}`;
const AUTHOR = 'jaebradley <jae.b.bradley@gmail.com>';

export {
  GH_TOKEN,
  GIT_BRANCH_NAME_PREFIX,
  GITHUB_LANGUAGES_CLIENT_REPOSITORY_NAME,
  GITHUB_LANGUAGES_CLIENT_CLONE_URL,
  GITHUB_LANGUAGES_CLIENT_REMOTE_URL,
  CANONICAL_GITHUB_LANGUAGE_FILE_URL,
  LANGUAGES_JSON_FILE_LOCATION,
  COMMIT_MESSAGE,
  PR_TITLE,
  PR_BODY,
  AUTHOR,
};
