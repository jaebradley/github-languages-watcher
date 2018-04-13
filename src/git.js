import git from 'simple-git/promise';
import dotenv from 'dotenv';

const { GH_TOKEN } = dotenv.config()

const GITHUB_LANGUAGES_CLIENT_REMOTE = `https://${GH_TOKEN}@github.com/jaebradley/github-languages-client`;

const clone = async () => git().silent(false).clone(GITHUB_LANGUAGES_CLIENT_REMOTE);
const checkout = async (branchName) => git().checkoutLocalBranch(branchName);
const push = async (branchName) => git().push('origin', branchName);
const hasDifferences = async () => git().diff(['--exit-code', 'src/languages.json']);

export {
  clone,
  push,
  hasDifferences,
  checkout,
};
