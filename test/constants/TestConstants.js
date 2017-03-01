/* eslint-disable no-array-constructor, no-new-object, no-new-wrappers */
export const INVALID_PARAMS :any[] = [
  undefined,
  null,
  [],
  new Array(),
  {},
  new Object(),
  true,
  false,
  new Boolean(true),
  new Boolean(false),
  -1,
  0,
  1,
  '',
  ' ',
  /regex/
];
/* eslint-enable */

// "undefined" and "[]" can be allowed for properties that are collections
export const INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED :any[] = INVALID_PARAMS.slice(0);
INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.splice(3, 1); // remove "new Array()"
INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.splice(2, 1); // remove "[]"
INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.splice(0, 1); // remove "undefined"

export const INVALID_PARAMS_BOOLEANS_ALLOWED :any[] = INVALID_PARAMS.slice(0);
INVALID_PARAMS_BOOLEANS_ALLOWED.splice(9, 1); // remove "new Boolean(false)"
INVALID_PARAMS_BOOLEANS_ALLOWED.splice(8, 1); // remove "new Boolean(true)"
INVALID_PARAMS_BOOLEANS_ALLOWED.splice(7, 1); // remove "false"
INVALID_PARAMS_BOOLEANS_ALLOWED.splice(6, 1); // remove "true"
