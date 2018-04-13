import { exec } from 'child-process-promise'
import { writeLanguages } from './languages';
import createPr from './createPR';
import {
  generateBranchName,
  setupClonedClientRepository,
  createBranch,
  pushChanges,
  diffLanguagesFile,
} from './git';

const execute = async () => {
  const branchName = generateBranchName();
  await setupClonedClientRepository();
  await writeLanguages();
  try {
    await diffLanguagesFile();
  } catch (e) {
    // error code of 1 indicates that there ARE differences in the language file
    if (e.code === 1) {
      await pushChanges();
      await createPR();
    } else {
      throw e;
    }
  }
}

execute();

