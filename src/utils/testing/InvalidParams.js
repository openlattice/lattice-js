/* eslint-disable no-array-constructor, no-new-object, no-new-wrappers, no-multi-spaces */
const INVALID_PARAMS = [
  undefined,                      // 0
  null,                           // 1
  [],                             // 2
  new Array(),                    // 3
  {},                             // 4
  new Object(),                   // 5
  true,                           // 6
  false,                          // 7
  new Boolean(true),              // 8
  new Boolean(false),             // 9
  -1,                             // 10
  0,                              // 11
  1,                              // 12
  '',                             // 13
  ' ',                            // 14
  new String(),                   // 15
  /regex/,                        // 16
  'invalid_special_string_value', // 17
];
/* eslint-enable */

const INVALID_PARAMS_OPTIONAL = INVALID_PARAMS.slice(0);
INVALID_PARAMS_OPTIONAL.splice(1, 1); // remove "null"
INVALID_PARAMS_OPTIONAL.splice(0, 1); // remove "undefined"

const INVALID_PARAMS_OPTIONAL_ARRAY = INVALID_PARAMS.slice(0);
INVALID_PARAMS_OPTIONAL_ARRAY.splice(3, 1); // remove "new Array()"
INVALID_PARAMS_OPTIONAL_ARRAY.splice(2, 1); // remove "[]"
INVALID_PARAMS_OPTIONAL_ARRAY.splice(1, 1); // remove "null"
INVALID_PARAMS_OPTIONAL_ARRAY.splice(0, 1); // remove "undefined"

// TODO: this should probably not exist
const INVALID_PARAMS_OPTIONAL_ARRAY_OF_STRINGS = INVALID_PARAMS.slice(0);
INVALID_PARAMS_OPTIONAL_ARRAY_OF_STRINGS.splice(17, 1); // remove "'invalid_special_string_value'"
INVALID_PARAMS_OPTIONAL_ARRAY_OF_STRINGS.splice(3, 1); // remove "new Array()"
INVALID_PARAMS_OPTIONAL_ARRAY_OF_STRINGS.splice(2, 1); // remove "[]"
INVALID_PARAMS_OPTIONAL_ARRAY_OF_STRINGS.splice(1, 1); // remove "null"
INVALID_PARAMS_OPTIONAL_ARRAY_OF_STRINGS.splice(0, 1); // remove "undefined"

const INVALID_PARAMS_OPTIONAL_BOOLEAN = INVALID_PARAMS.slice(0);
INVALID_PARAMS_OPTIONAL_BOOLEAN.splice(9, 1); // remove "new Boolean(false)"
INVALID_PARAMS_OPTIONAL_BOOLEAN.splice(8, 1); // remove "new Boolean(true)"
INVALID_PARAMS_OPTIONAL_BOOLEAN.splice(7, 1); // remove "false"
INVALID_PARAMS_OPTIONAL_BOOLEAN.splice(6, 1); // remove "true"
INVALID_PARAMS_OPTIONAL_BOOLEAN.splice(1, 1); // remove "null"
INVALID_PARAMS_OPTIONAL_BOOLEAN.splice(0, 1); // remove "undefined"

const INVALID_PARAMS_OPTIONAL_NUMBER = INVALID_PARAMS.slice(0);
INVALID_PARAMS_OPTIONAL_NUMBER.splice(12, 1); // remove "1"
INVALID_PARAMS_OPTIONAL_NUMBER.splice(11, 1); // remove "0"
INVALID_PARAMS_OPTIONAL_NUMBER.splice(10, 1); // remove "-1"
INVALID_PARAMS_OPTIONAL_NUMBER.splice(1, 1); // remove "null"
INVALID_PARAMS_OPTIONAL_NUMBER.splice(0, 1); // remove "undefined"

const INVALID_PARAMS_OPTIONAL_OBJECT = INVALID_PARAMS.slice(0);
INVALID_PARAMS_OPTIONAL_OBJECT.splice(5, 1); // remove "new Object()"
INVALID_PARAMS_OPTIONAL_OBJECT.splice(4, 1); // remove "{}"
INVALID_PARAMS_OPTIONAL_OBJECT.splice(1, 1); // remove "null"
INVALID_PARAMS_OPTIONAL_OBJECT.splice(0, 1); // remove "undefined"

const INVALID_PARAMS_OPTIONAL_STRING = INVALID_PARAMS.slice(0);
INVALID_PARAMS_OPTIONAL_STRING.splice(17, 1); // remove "'invalid_special_string_value'"
INVALID_PARAMS_OPTIONAL_STRING.splice(15, 1); // remove "new String()"
INVALID_PARAMS_OPTIONAL_STRING.splice(14, 1); // remove "' '"
INVALID_PARAMS_OPTIONAL_STRING.splice(13, 1); // remove "''"
INVALID_PARAMS_OPTIONAL_STRING.splice(1, 1); // remove "null"
INVALID_PARAMS_OPTIONAL_STRING.splice(0, 1); // remove "undefined"

const INVALID_PARAMS_OPTIONAL_SPECIAL_STRING = INVALID_PARAMS.slice(0);
INVALID_PARAMS_OPTIONAL_SPECIAL_STRING.splice(15, 1); // remove "new String()"
INVALID_PARAMS_OPTIONAL_SPECIAL_STRING.splice(14, 1); // remove "' '"
INVALID_PARAMS_OPTIONAL_SPECIAL_STRING.splice(13, 1); // remove "''"
INVALID_PARAMS_OPTIONAL_SPECIAL_STRING.splice(1, 1); // remove "null"
INVALID_PARAMS_OPTIONAL_SPECIAL_STRING.splice(0, 1); // remove "undefined"

const INVALID_PARAMS_REQUIRED_BOOLEAN = INVALID_PARAMS.slice(0);
INVALID_PARAMS_REQUIRED_BOOLEAN.splice(9, 1); // remove "new Boolean(false)"
INVALID_PARAMS_REQUIRED_BOOLEAN.splice(8, 1); // remove "new Boolean(true)"
INVALID_PARAMS_REQUIRED_BOOLEAN.splice(7, 1); // remove "false"
INVALID_PARAMS_REQUIRED_BOOLEAN.splice(6, 1); // remove "true"

const INVALID_PARAMS_REQUIRED_NUMBER = INVALID_PARAMS.slice(0);
INVALID_PARAMS_REQUIRED_NUMBER.splice(12, 1); // remove "1"
INVALID_PARAMS_REQUIRED_NUMBER.splice(11, 1); // remove "0"
INVALID_PARAMS_REQUIRED_NUMBER.splice(10, 1); // remove "-1"

const INVALID_PARAMS_REQUIRED_STRING = INVALID_PARAMS.slice(0);
INVALID_PARAMS_REQUIRED_STRING.splice(17, 1); // remove "'invalid_special_string_value'"

export {
  INVALID_PARAMS,
  INVALID_PARAMS_OPTIONAL,
  INVALID_PARAMS_OPTIONAL_ARRAY,
  INVALID_PARAMS_OPTIONAL_ARRAY_OF_STRINGS,
  INVALID_PARAMS_OPTIONAL_BOOLEAN,
  INVALID_PARAMS_OPTIONAL_NUMBER,
  INVALID_PARAMS_OPTIONAL_OBJECT,
  INVALID_PARAMS_OPTIONAL_SPECIAL_STRING,
  INVALID_PARAMS_OPTIONAL_STRING,
  INVALID_PARAMS_REQUIRED_BOOLEAN,
  INVALID_PARAMS_REQUIRED_NUMBER,
  INVALID_PARAMS_REQUIRED_STRING,
};
