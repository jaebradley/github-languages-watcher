import axios from 'axios';
import yaml from 'yamljs';
import camelize from 'camelize';
import fs from 'fs-extra';

import {
  CANONICAL_GITHUB_LANGUAGE_FILE_URL,
  LANGUAGES_JSON_FILE_LOCATION,
} from './constants';

const fetchLanguages = async () => {
  const response = await axios.get(CANONICAL_GITHUB_LANGUAGE_FILE_URL);
  const { data } = response;
  return yaml.parse(data);
};

const formatLanguage = ({ name, language }) => {
  const formattedLanguage = language;

  formattedLanguage.name = name;

  const alias = name.toLowerCase();

  if (formattedLanguage.aliases) {
    formattedLanguage.aliases.push(alias);
  } else {
    formattedLanguage.aliases = [alias];
  }

  if (!formattedLanguage.aceMode) {
    formattedLanguage.aceMode = 'text';
  }

  if (!formattedLanguage.wrap) {
    formattedLanguage.wrap = 'false';
  }

  if (!formattedLanguage.searchable) {
    formattedLanguage.searchable = 'true';
  }

  if (!formattedLanguage.tmScope) {
    formattedLanguage.tmScope = 'none';
  }

  return formattedLanguage;
};

const formatLanguages = (languages) => {
  const camelizedLanguages = camelize(languages);

  return Object.keys(camelizedLanguages)
    .map(name => formatLanguage({ name, language: camelizedLanguages[name] }));
};

const output = languages => fs.writeJsonSync(
  LANGUAGES_JSON_FILE_LOCATION,
  languages,
  { spaces: 2 },
);

const writeLanguages = async () => {
  const languages = await fetchLanguages();
  output(formatLanguages(languages));
};

export {
  fetchLanguages,
  formatLanguage,
  formatLanguages,
  writeLanguages,
};
