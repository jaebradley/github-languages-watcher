import createPR from './createPR';
import fetchLanguages from './languages/fetchLanguages';
import writeLanguagesFile from './languages/writeLanguagesFile';
import formatLanguages from './languages/formatLanguages';
import * as git from './git';
import script from './script';

jest.mock('./createPR');
jest.mock('./languages/fetchLanguages');
jest.mock('./languages/writeLanguagesFile');
jest.mock('./languages/formatLanguages');

describe('#execute', () => {
  const branchName = 'branchName';
  const languages = 'languages';
  let generateBranchNameSpy;
  let setupClonedClientRepositorySpy;
  let createBranchSpy;
  let diffLanguagesFileSpy;
  let pushChangesSpy;

  beforeEach(() => {
    fetchLanguages.mockImplementation(async () => languages);
    createPR.mockImplementation(async () => {});
    writeLanguagesFile.mockImplementation(() => {});
    formatLanguages.mockImplementation(val => val);
    generateBranchNameSpy = jest.spyOn(git, 'generateBranchName').mockImplementation(() => branchName);
    setupClonedClientRepositorySpy = jest.spyOn(git, 'setupClonedClientRepository').mockImplementation(async () => {});
    createBranchSpy = jest.spyOn(git, 'createBranch').mockImplementation(async val => val);
    diffLanguagesFileSpy = jest.spyOn(git, 'diffLanguagesFile').mockImplementation(async () => {});
    pushChangesSpy = jest.spyOn(git, 'pushChanges').mockImplementation(async val => val);
  });

  afterEach(() => {
    fetchLanguages.mockReset();
    createPR.mockReset();
    writeLanguagesFile.mockReset();
    formatLanguages.mockReset();
    generateBranchNameSpy.mockReset();
    setupClonedClientRepositorySpy.mockReset();
    createBranchSpy.mockReset();
    diffLanguagesFileSpy.mockReset();
    pushChangesSpy.mockReset();
  });

  describe('no differences', () => {
    it('should not push changes if no differences', async () => {
      await script();

      expect(generateBranchNameSpy).toHaveBeenCalledTimes(1);
      expect(setupClonedClientRepositorySpy).toHaveBeenCalledTimes(1);
      expect(createBranchSpy).toHaveBeenCalledTimes(1);
      expect(createBranchSpy).toHaveBeenCalledWith(branchName);
      expect(fetchLanguages).toHaveBeenCalledTimes(1);
      expect(formatLanguages).toHaveBeenCalledTimes(1);
      expect(formatLanguages).toHaveBeenCalledWith(languages);
      expect(writeLanguagesFile).toHaveBeenCalledTimes(1);
      expect(writeLanguagesFile).toHaveBeenCalledWith(languages);
      expect(diffLanguagesFileSpy).toHaveBeenCalledTimes(1);
      expect(pushChangesSpy).not.toHaveBeenCalled();
      expect(createPR).not.toHaveBeenCalled();
    });
  });

  describe('differences', () => {
    class CustomError extends Error {
      constructor(code, ...params) {
        super(params);

        this.code = code;
      }
    }

    describe('error code of 1', () => {
      beforeEach(() => {
        diffLanguagesFileSpy = jest.spyOn(git, 'diffLanguagesFile').mockImplementation(() => { throw new CustomError(1); });
      });

      it('should push changes if it finds a difference', async () => {
        await script();

        expect(generateBranchNameSpy).toHaveBeenCalledTimes(1);
        expect(setupClonedClientRepositorySpy).toHaveBeenCalledTimes(1);
        expect(createBranchSpy).toHaveBeenCalledTimes(1);
        expect(createBranchSpy).toHaveBeenCalledWith(branchName);
        expect(fetchLanguages).toHaveBeenCalledTimes(1);
        expect(formatLanguages).toHaveBeenCalledTimes(1);
        expect(formatLanguages).toHaveBeenCalledWith(languages);
        expect(writeLanguagesFile).toHaveBeenCalledTimes(1);
        expect(writeLanguagesFile).toHaveBeenCalledWith(languages);
        expect(diffLanguagesFileSpy).toHaveBeenCalledTimes(1);
        expect(pushChangesSpy).toHaveBeenCalled();
        expect(pushChangesSpy).toHaveBeenCalledTimes(1);
        expect(createPR).toHaveBeenCalled();
        expect(createPR).toHaveBeenCalledTimes(1);
      });
    });

    describe('error code of not 1', () => {
      beforeEach(() => {
        diffLanguagesFileSpy = jest.spyOn(git, 'diffLanguagesFile').mockImplementation(() => { throw new CustomError('not 1'); });
      });

      it('should push changes if it finds a difference', async () => {
        try {
          await script();
        } catch (e) {
          expect(e.code).toEqual('not 1');
        }

        expect(generateBranchNameSpy).toHaveBeenCalledTimes(1);
        expect(setupClonedClientRepositorySpy).toHaveBeenCalledTimes(1);
        expect(createBranchSpy).toHaveBeenCalledTimes(1);
        expect(createBranchSpy).toHaveBeenCalledWith(branchName);
        expect(fetchLanguages).toHaveBeenCalledTimes(1);
        expect(formatLanguages).toHaveBeenCalledTimes(1);
        expect(formatLanguages).toHaveBeenCalledWith(languages);
        expect(writeLanguagesFile).toHaveBeenCalledTimes(1);
        expect(writeLanguagesFile).toHaveBeenCalledWith(languages);
        expect(diffLanguagesFileSpy).toHaveBeenCalledTimes(1);
        expect(pushChangesSpy).not.toHaveBeenCalled();
        expect(createPR).not.toHaveBeenCalled();
      });
    });
  });
});
