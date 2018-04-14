import { exec } from 'child-process-promise';
import {
  GIT_BRANCH_NAME_PREFIX,
  GITHUB_LANGUAGES_CLIENT_CLONE_URL,
  GITHUB_LANGUAGES_CLIENT_REMOTE_URL,
  LANGUAGES_JSON_FILE_LOCATION,
  COMMIT_MESSAGE,
  USERNAME,
  EMAIL_ADDRESS,
} from './constants';

const generateBranchName = () => `${GIT_BRANCH_NAME_PREFIX}-${Date.now().valueOf()}`;

const setupClonedClientRepository = async () => {
  await exec(`git clone ${GITHUB_LANGUAGES_CLIENT_CLONE_URL}`);

  process.chdir('./github-languages-client');

  await exec(`git config user.name "${USERNAME}"`);
  await exec(`git config user.email "${EMAIL_ADDRESS}"`);
  await exec('git remote rm origin');
  await exec(`git remote add origin ${GITHUB_LANGUAGES_CLIENT_REMOTE_URL}`);
};

const createBranch = async branchName => exec(`git checkout -b ${branchName}`);

const pushChanges = async (branchName) => {
  await exec(`git add ${LANGUAGES_JSON_FILE_LOCATION}`);
  await exec(`git commit -m "${COMMIT_MESSAGE}"`);
  await exec(`git push origin ${branchName}`);
};

const diffLanguagesFile = async () => exec(`git diff --quiet ${LANGUAGES_JSON_FILE_LOCATION}`);

export {
  generateBranchName,
  setupClonedClientRepository,
  createBranch,
  pushChanges,
  diffLanguagesFile,
};
