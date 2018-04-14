import createPR from './createPR';
import fetchLanguages from './fetchLanguages';
import writeLanguagesFile from './writeLanguagesFile';
import formatLanguages from './formatLanguages';
import {
  generateBranchName,
  setupClonedClientRepository,
  createBranch,
  pushChanges,
  diffLanguagesFile,
} from './git';

const execute = async () => {
  const branchName = generateBranchName();
  console.log('Generated branch name ', branchName);
  await setupClonedClientRepository();
  console.log('Setup cloned client repository');
  await createBranch(branchName);
  console.log('Created branch');
  const languages = await fetchLanguages();
  console.log('Fetched languages');
  writeLanguagesFile(formatLanguages(languages));
  console.log('Wrote languages file');
  try {
    await diffLanguagesFile();
    console.log('No difference in language file');
  } catch (e) {
    // error code of 1 indicates that there ARE differences in the language file
    if (e.code === 1) {
      console.log('Difference in language file');
      await pushChanges(branchName);
      console.log('Pushed changes');
      await createPR(branchName);
      console.log('Created PR');
    } else {
      throw e;
    }
  }
};

execute();
