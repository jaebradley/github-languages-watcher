import axios from 'axios';
import yaml from 'yamljs';

import fetchLanguages from './fetchLanguages';
import { CANONICAL_GITHUB_LANGUAGE_FILE_URL } from './constants';

describe('#fetchLanguages', () => {
  const data = 'data';
  const response = { data };
  const parsedYaml = 'parsedYaml';

  let axiosSpy;
  let yamlSpy;

  beforeEach(() => {
    axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => response);
    yamlSpy = jest.spyOn(yaml, 'parse').mockImplementation(() => parsedYaml);
  });

  afterEach(() => {
    axiosSpy.mockRestore();
    yamlSpy.mockRestore();
  });

  it('should fetch languages', async () => {
    const languages = await fetchLanguages();
    expect(languages).toEqual(parsedYaml);
    expect(axiosSpy).toHaveBeenCalledTimes(1);
    expect(yamlSpy).toHaveBeenCalledTimes(1);
    expect(axiosSpy).toHaveBeenCalledWith(CANONICAL_GITHUB_LANGUAGE_FILE_URL);
    expect(yamlSpy).toHaveBeenCalledWith(data);
  });
});
