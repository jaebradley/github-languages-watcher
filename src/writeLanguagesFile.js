import fs from 'fs-extra';

import { LANGUAGES_JSON_FILE_LOCATION } from './constants';

const writeLanguagesFile = languages => fs.writeJsonSync(
  LANGUAGES_JSON_FILE_LOCATION,
  languages,
  { spaces: 2 },
);

export default writeLanguagesFile;
