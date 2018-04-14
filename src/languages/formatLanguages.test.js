import camelize from 'camelize';

import formatLanguages from './formatLanguages';
import formatLanguage from './formatLanguage';

jest.mock('camelize');
jest.mock('./formatLanguage');

describe('#formatLanguages', () => {
  beforeEach(() => {
    formatLanguage.mockImplementation(val => val.name);
    camelize.mockImplementation(val => val);
  });

  afterEach(() => {
    formatLanguage.mockReset();
    camelize.mockReset();
  });

  it('should format languages', () => {
    const languages = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    };
    const expected = ['foo', 'bar', 'baz'];
    expect(formatLanguages(languages)).toEqual(expected);
  });
});
