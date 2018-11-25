/* eslint-disable no-array-constructor, no-new-object, no-new-wrappers, no-multi-spaces */
const INVALID_PARAMS = [
  undefined,          // 0
  null,               // 1
  [],                 // 2
  new Array(),        // 3
  {},                 // 4
  new Object(),       // 5
  true,               // 6
  false,              // 7
  new Boolean(true),  // 8
  new Boolean(false), // 9
  -1,                 // 10
  0,                  // 11
  1,                  // 12
  '',                 // 13
  ' ',                // 14
  new String(),       // 15
  /regex/             // 16
];
/* eslint-enable */

const INVALID_PARAMS_BOOLEANS_ALLOWED = INVALID_PARAMS.slice(0);
INVALID_PARAMS_BOOLEANS_ALLOWED.splice(9, 1); // remove "new Boolean(false)"
INVALID_PARAMS_BOOLEANS_ALLOWED.splice(8, 1); // remove "new Boolean(true)"
INVALID_PARAMS_BOOLEANS_ALLOWED.splice(7, 1); // remove "false"
INVALID_PARAMS_BOOLEANS_ALLOWED.splice(6, 1); // remove "true"

const INVALID_PARAMS_EMPTY_ARRAY_ALLOWED = INVALID_PARAMS.slice(0);
INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.splice(3, 1); // remove "new Array()"
INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.splice(2, 1); // remove "[]"
INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.splice(1, 1); // remove "null"
INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.splice(0, 1); // remove "undefined"

const INVALID_PARAMS_EMPTY_OBJECT_ALLOWED = INVALID_PARAMS.slice(0);
INVALID_PARAMS_EMPTY_OBJECT_ALLOWED.splice(5, 1); // remove "new Object()"
INVALID_PARAMS_EMPTY_OBJECT_ALLOWED.splice(4, 1); // remove "{}"
INVALID_PARAMS_EMPTY_OBJECT_ALLOWED.splice(1, 1); // remove "null"
INVALID_PARAMS_EMPTY_OBJECT_ALLOWED.splice(0, 1); // remove "undefined"

const INVALID_PARAMS_EMPTY_STRING_ALLOWED = INVALID_PARAMS.slice(0);
INVALID_PARAMS_EMPTY_STRING_ALLOWED.splice(15, 1); // remove "new String()"
INVALID_PARAMS_EMPTY_STRING_ALLOWED.splice(14, 1); // remove "' '"
INVALID_PARAMS_EMPTY_STRING_ALLOWED.splice(13, 1); // remove "''"
INVALID_PARAMS_EMPTY_STRING_ALLOWED.splice(1, 1); // remove "null"
INVALID_PARAMS_EMPTY_STRING_ALLOWED.splice(0, 1); // remove "undefined"

const INVALID_PARAMS_NOT_DEFINED_ALLOWED = INVALID_PARAMS.slice(0);
INVALID_PARAMS_NOT_DEFINED_ALLOWED.splice(1, 1); // remove "null"
INVALID_PARAMS_NOT_DEFINED_ALLOWED.splice(0, 1); // remove "undefined"

// SS = special string, for cases where strings have to be of a specific format/value, such as UUIDs and Enums
const INVALID_PARAMS_SS = INVALID_PARAMS.slice(0);
INVALID_PARAMS_SS.push('invalid_special_string_value');

const INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED = INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.slice(0);
INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.push('invalid_special_string_value');

const INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED = INVALID_PARAMS_EMPTY_STRING_ALLOWED.slice(0);
INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.push('invalid_special_string_value');

export {
  INVALID_PARAMS,
  INVALID_PARAMS_BOOLEANS_ALLOWED,
  INVALID_PARAMS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_EMPTY_OBJECT_ALLOWED,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_PARAMS_NOT_DEFINED_ALLOWED,
  INVALID_PARAMS_SS,
  INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED
};
