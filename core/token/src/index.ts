import {globalAlwatr} from '@alwatr/logger';

export * from './hash.js';
export * from './token.js';
export * from './user.js';
export * from './type.js';

globalAlwatr.registeredList.push({
  name: '@alwatr/token',
  version: _ALWATR_VERSION_,
});
