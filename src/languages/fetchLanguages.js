import axios from 'axios';
import yaml from 'yamljs';

import { CANONICAL_GITHUB_LANGUAGE_FILE_URL } from '../constants';

const fetchLanguages = async () => {
  const response = await axios.get(CANONICAL_GITHUB_LANGUAGE_FILE_URL);
  const { data } = response;
  return yaml.parse(data);
};

export default fetchLanguages;
