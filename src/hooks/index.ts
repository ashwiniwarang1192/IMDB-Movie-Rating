/* eslint-disable import/no-import-module-exports */
import { authorize, authorizeTokenExpiry } from './authorize';
import { authorizeTokenSetContext } from './vaultAuthorize';
import { cors } from './cors';

const hooks = {
  auth: [cors, authorize],
  cors: [cors],
};
export {
  hooks,
  authorizeTokenSetContext,
  authorizeTokenExpiry,
};
