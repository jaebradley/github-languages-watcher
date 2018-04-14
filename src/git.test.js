import childProcessPromise from 'child-process-promise';
import {
  GIT_BRANCH_NAME_PREFIX,
  GITHUB_LANGUAGES_CLIENT_CLONE_URL,
  GITHUB_LANGUAGES_CLIENT_REMOTE_URL,
  LANGUAGES_JSON_FILE_LOCATION,
  COMMIT_MESSAGE,
  USERNAME,
  EMAIL_ADDRESS,
} from './constants';

import {
  generateBranchName,
  setupClonedClientRepository,
  createBranch,
  pushChanges,
  diffLanguagesFile,
} from './git';

describe('git', () => {
  let execSpy;

  beforeEach(() => {
    execSpy = jest.spyOn(childProcessPromise, 'exec').mockImplementation(() => {});
  });

  afterEach(() => {
    execSpy.mockRestore();
  });

  describe('#pushChanges', () => {
    const branchName = 'branchName';

    it('should push changes', async () => {
      await pushChanges(branchName);
      expect(execSpy).toHaveBeenCalledTimes(3);
      expect(execSpy).toHaveBeenCalledWith(`git add ${LANGUAGES_JSON_FILE_LOCATION}`);
      expect(execSpy).toHaveBeenCalledWith(`git commit -m "${COMMIT_MESSAGE}"`);
      expect(execSpy).toHaveBeenCalledWith(`git push origin ${branchName}`);
    });
  });

  describe('#diffLanguagesFile', () => {
    it('should diff language files', async () => {
      await diffLanguagesFile();
      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledWith(`git diff --quiet ${LANGUAGES_JSON_FILE_LOCATION}`);
    });
  });

  describe('#createBranch', () => {
    const branchName = 'branchName';

    it('should create branch', async () => {
      await createBranch(branchName);
      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledWith(`git checkout -b ${branchName}`);
    });
  });

  describe('#generateBranchName', () => {
    const now = Date.now();

    beforeEach(() => {
      Date.now = jest.genMockFunction().mockReturnValue(now);
    });

    afterEach(() => {
      Date.now.mockRestore();
    });

    it('should generate branch name', () => {
      expect(generateBranchName()).toEqual(`${GIT_BRANCH_NAME_PREFIX}-${now.valueOf()}`);
    });
  });

  describe('#setupClonedClientRepository', () => {
    let processSpy;

    beforeEach(() => {
      processSpy = jest.spyOn(process, 'chdir').mockImplementation(() => {});
    });

    afterEach(() => {
      processSpy.mockRestore();
    });

    it('should setup', async () => {
      await setupClonedClientRepository();
      expect(execSpy).toHaveBeenCalledTimes(5);
      expect(processSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledWith(`git clone ${GITHUB_LANGUAGES_CLIENT_CLONE_URL}`);
      expect(processSpy).toHaveBeenCalledWith('./github-languages-client');
      expect(execSpy).toHaveBeenCalledWith(`git config user.name "${USERNAME}"`);
      expect(execSpy).toHaveBeenCalledWith(`git config user.email "${EMAIL_ADDRESS}"`);
      expect(execSpy).toHaveBeenCalledWith('git remote rm origin');
      expect(execSpy).toHaveBeenCalledWith(`git remote add origin ${GITHUB_LANGUAGES_CLIENT_REMOTE_URL}`);
    });
  });
});
