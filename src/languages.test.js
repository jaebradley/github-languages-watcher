import { formatLanguage } from './languages';

describe('languages', () => {
  const name = 'NAME';
  const aliases = ['alias1', 'alias2', 'alias3'];
  const aceMode = 'aceMode';
  const wrap = 'wrap';
  const searchable = 'searchable';
  const tmScope = 'tmScope';

  const languageWithAliases = {
    aliases,
    aceMode,
    wrap,
    searchable,
    tmScope,
  };

  describe('formatLanguage', () => {
    it('should push alias and no other defaults', () => {
      const expectedAliases = ['alias1', 'alias2', 'alias3', 'name'];
      const expected = {
        aliases: expectedAliases,
        name,
        aceMode,
        wrap,
        searchable,
        tmScope,
      };
      expect(formatLanguage({ name, language: languageWithAliases })).toEqual(expected);
    });

    it('should create aliases of single alias and defaults', () => {
      const expected = {
        name,
        aliases: ['name'],
        aceMode: 'text',
        wrap: 'false',
        searchable: 'true',
        tmScope: 'none',
      };
      expect(formatLanguage({ name, language: {} })).toEqual(expected);
    });
  });
});
