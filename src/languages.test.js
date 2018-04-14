import {
  formatLanguage,
  formatLanguages,
} from './languages';

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

  describe('#formatLanguage', () => {
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

  describe('#formatLanguages', () => {
    it('should format languages', () => {
      const expected = [
        {
          aceMode: 'aceMode',
          aliases: [
            'alias1',
            'alias2',
            'alias3',
            'foo',
            'bar',
          ],
          name: 'foo',
          searchable: 'searchable',
          tmScope: 'tmScope',
          wrap: 'wrap',
        },
        {
          aceMode: 'aceMode',
          aliases: [
            'alias1',
            'alias2',
            'alias3',
            'foo',
            'bar',
          ],
          name: 'bar',
          searchable: 'searchable',
          tmScope: 'tmScope',
          wrap: 'wrap',
        },
        {
          aceMode: 'text',
          aliases: ['baz'],
          name: 'baz',
          searchable: 'true',
          tmScope: 'none',
          wrap: 'false',
        },
      ];
      expect(formatLanguages()).toEqual(expected);
    });
  });
});
