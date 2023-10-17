import * as debug from 'debug';

const Debug = {
  // eslint-disable-next-line no-console
  log: console.log.bind('custom:log'), // debug('custom:log'),
  error: debug('custom:error'),
};
export default Debug;
