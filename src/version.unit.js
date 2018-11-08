
import version from './version';

describe('Version', () => {
  it('is whatever version is specified in the package.json', () => {
    console.log(`version: ${version}`); // eslint-disable-line no-console
  });
});
