import fs from 'fs-extra';

import writeLanguagesFile from './writeLanguagesFile';
import { LANGUAGES_JSON_FILE_LOCATION } from './constants';

describe('#writeLanguagesFile', () => {
  const languages = 'languages';
  let fsSpy;

  beforeEach(() => {
    fsSpy = jest.spyOn(fs, 'writeJsonSync').mockImplementation(() => 'foobar');
  });

  afterEach(() => {
    fsSpy.mockRestore();
  });

  it('should write files', () => {
    expect(writeLanguagesFile(languages)).toEqual('foobar');
    expect(fsSpy).toHaveBeenCalledTimes(1);
    expect(fsSpy).toHaveBeenCalledWith(LANGUAGES_JSON_FILE_LOCATION, languages, { spaces: 2 });
  });
});
