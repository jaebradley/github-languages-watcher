const aliases = ['alias1', 'alias2', 'alias3'];
const aceMode = 'aceMode';
const wrap = 'wrap';
const searchable = 'searchable';
const tmScope = 'tmScope';

const camelize = () => (
  {
    foo: {
      aliases,
      aceMode,
      wrap,
      searchable,
      tmScope,
    },
    bar: {
      aliases,
      aceMode,
      wrap,
      searchable,
      tmScope,
    },
    baz: {},
  }
);

export default camelize;
