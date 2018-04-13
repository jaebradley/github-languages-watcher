import github from 'octonode';

import {
  PR_TITLE,
  PR_BODY,
  GITHUB_LANGUAGES_CLIENT_REPOSITORY_NAME,
  GH_TOKEN,
} from './constants';

const createPR = (branchName) => {
  const client = github.client(GH_TOKEN);
  client.repo(GITHUB_LANGUAGES_CLIENT_REPOSITORY_NAME).pr({
    title: PR_TITLE,
    body: PR_BODY,
    head: branchName,
    base: 'master',
    // eslint-disable-next-line no-unused-vars
  }, (err, data, headers) => {
    if (err) {
      throw err;
    }

    const {
      number,
      html_url: url,
      state,
      title,
    } = data;
    console.log(`PR #${number} (${title}) at ${url} is now ${state}`);
  });
};

export default createPR;
