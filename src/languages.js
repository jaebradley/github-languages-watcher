import axios from 'axios';
import yaml from 'yamljs';
import camelize from 'camelize';
import fs from 'fs-extra';

import { CANONICAL_GITHUB_LANGUAGE_FILE_URL, LANGUAGES_JSON_FILE_LOCATION } from './constants';

const fetchLanguages = async () => {
  const response = await axios.get(CANONICAL_GITHUB_LANGUAGE_FILE_URL);
  const { data } = response;
  return yaml.parse(data);
};

const formatLanguages = (languages) => {
  const formattedLanguages = [];

  const camelizedLanguages = camelize(languages);

  Object.keys(camelizedLanguages).forEach((name) => {
    const language = camelizedLanguages[name];

    language.name = name;

    if (!language.aliases) {
      language.aliases = [name.toLowerCase()];
    } else {
      language.aliases.push(name.toLowerCase());
    }

    if (!language.aceMode) {
      language.aceMode = 'text';
    }

    if (!language.wrap) {
      language.wrap = 'false';
    }

    if (!language.searchable) {
      language.searchable = 'true';
    }

    if (!language.tmScope) {
      language.tmScope = 'none';
    }

    formattedLanguages.push(language);
  });

  return formattedLanguages;
};

const output = languages => fs.writeJsonSync(LANGUAGES_JSON_FILE_LOCATION, languages, { spaces: 2 });

const writeLanguages = async () => {
  const languages = await fetchLanguages();
  const formattedLanguages = formatLanguages(languages);
  output(formattedLanguages);
};

export {
  fetchLanguages,
  formatLanguages,
  writeLanguages,
};
