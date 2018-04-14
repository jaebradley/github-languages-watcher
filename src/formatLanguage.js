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

export default formatLanguage;
