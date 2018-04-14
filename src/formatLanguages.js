import camelize from 'camelize';

import formatLanguage from './formatLanguage';

const formatLanguages = (languages) => {
  const camelizedLanguages = camelize(languages);

  return Object.keys(camelizedLanguages)
    .map(name => formatLanguage({ name, language: camelizedLanguages[name] }));
};

export default formatLanguages;
