/* eslint-disable no-array-constructor, no-new-object */
export const INVALID_PARAMS = [
  undefined,
  null,
  [],
  new Array(),
  {},
  new Object(),
  true,
  false,
  -1,
  0,
  1,
  '',
  ' ',
  /regex/
];
/* eslint-enable */

// "undefined" and "[]" can be allowed for properties that are collections
export const INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED = INVALID_PARAMS.slice(0);
INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.splice(3, 1); // remove "new Array()"
INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.splice(2, 1); // remove "[]"
INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.splice(0, 1); // remove "undefined"
