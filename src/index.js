import { exec } from 'child-process-promise'
import { writeLanguages } from './languages';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config()

const GITHUB_LANGUAGES_CLIENT_REMOTE = `https://${process.env.GH_TOKEN}@github.com/jaebradley/github-languages-client`;

const execute = async () => {
  const branchName = 'update-languages';
  await exec(`git clone ${GITHUB_LANGUAGES_CLIENT_REMOTE}`);
  process.chdir('./github-languages-client');
  await exec('git remote rm origin');
  await exec(`git remote add origin https://${process.env.GH_TOKEN}@github.com/jaebradley/github-languages-client.git`)
  await exec(`git checkout -b ${branchName}`);
  await writeLanguages();
  try {
    const { stdout: hasDifferences } = await exec(`git diff --quiet src/languages.json`);
  } catch (e) {
    if (e.code === 1) {
      await exec('git add src/languages.json');
      await exec('git commit -m "updated languages"');
      await exec(`git push origin ${branchName}`);
    } else {
      throw e;
    }
  }
}

execute();

