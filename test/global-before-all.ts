// eslint-disable-next-line @typescript-eslint/no-var-requires
require('tsconfig-paths').register();

import ensureOperationIsSafe from 'test/helpers/ensure-operation-is-safe';
import initApp from 'test/helpers/init-app';

export default async function() {
  await ensureOperationIsSafe();

  global.testApp = await initApp();
}