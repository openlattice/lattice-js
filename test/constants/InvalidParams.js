/* eslint-disable no-array-constructor, no-new-object, no-new-wrappers */
const INVALID_PARAMS :any[] = [
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
  new String(),
  /regex/
];
/* eslint-enable */

/*
 * generic invalid parameters
 */

const INVALID_PARAMS_EMPTY_ARRAY_ALLOWED :any[] = INVALID_PARAMS.slice(0);
INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.splice(3, 1); // remove "new Array()"
INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.splice(2, 1); // remove "[]"

const INVALID_PARAMS_EMPTY_STRING_ALLOWED :any[] = INVALID_PARAMS.slice(0);
INVALID_PARAMS_EMPTY_STRING_ALLOWED.splice(15, 1); // remove "new String()"
INVALID_PARAMS_EMPTY_STRING_ALLOWED.splice(14, 1); // remove "' '"
INVALID_PARAMS_EMPTY_STRING_ALLOWED.splice(13, 1); // remove "''"

const INVALID_ENUM_VALUES :any[] = INVALID_PARAMS.slice(0);
INVALID_ENUM_VALUES.push('invalid_enum_value_string'); // hoping that Enum values are never equal to this string

const INVALID_UUIDS :any[] = INVALID_PARAMS.slice(0);
INVALID_UUIDS.push('invalid_uuid_string');

/*
 * data model specific invalid parameters
 */

// we'll allow "baseType" to be set to the empty string, and ignore "undefined"
const INVALID_BASE_TYPES :any[] = INVALID_PARAMS_EMPTY_STRING_ALLOWED.slice(0);
INVALID_BASE_TYPES.splice(0, 1); // remove "undefined"

// we'll allow "category" to be set to the empty string, and ignore "undefined"
const INVALID_CATEGORIES :any[] = INVALID_ENUM_VALUES.slice(0);
INVALID_CATEGORIES.splice(15, 1); // remove "new String()"
INVALID_CATEGORIES.splice(14, 1); // remove "' '"
INVALID_CATEGORIES.splice(13, 1); // remove "''"
INVALID_CATEGORIES.splice(0, 1); // remove "undefined"

// we'll allow "description" to be set to the empty string, and ignore "undefined"
const INVALID_DESCRIPTIONS :any[] = INVALID_PARAMS_EMPTY_STRING_ALLOWED.slice(0);
INVALID_DESCRIPTIONS.splice(0, 1); // remove "undefined"

// we'll allow "roles" to be set to the empty array, and ignore "undefined"
const INVALID_EMAILS :any[] = INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.slice(0);
INVALID_EMAILS.splice(0, 1); // remove "undefined"

// we'll allow "key" to be set to the empty array, and ignore "undefined"
const INVALID_KEYS :any[] = INVALID_UUIDS.slice(0);
INVALID_KEYS.splice(3, 1); // remove "new Array()"
INVALID_KEYS.splice(2, 1); // remove "[]"
INVALID_KEYS.splice(0, 1); // remove "undefined"

// we'll allow "members" to be set to the empty array, and ignore "undefined"
const INVALID_MEMBERS :any[] = INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.slice(0);
INVALID_MEMBERS.splice(0, 1); // remove "undefined"

// we'll allow "properties" to be set to the empty array, and ignore "undefined"
const INVALID_PROPERTIES :any[] = INVALID_UUIDS.slice(0);
INVALID_PROPERTIES.splice(3, 1); // remove "new Array()"
INVALID_PROPERTIES.splice(2, 1); // remove "[]"
INVALID_PROPERTIES.splice(0, 1); // remove "undefined"

// we'll allow "roles" to be set to the empty array, and ignore "undefined"
const INVALID_ROLES :any[] = INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.slice(0);
INVALID_ROLES.splice(0, 1); // remove "undefined"

// we'll allow "schemas" to be set to the empty array, and ignore "undefined"
const INVALID_SCHEMAS :any[] = INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.slice(0);
INVALID_SCHEMAS.splice(0, 1); // remove "undefined"

export {
  INVALID_BASE_TYPES,
  INVALID_CATEGORIES,
  INVALID_DESCRIPTIONS,
  INVALID_EMAILS,
  INVALID_ENUM_VALUES,
  INVALID_KEYS,
  INVALID_MEMBERS,
  INVALID_PARAMS,
  INVALID_PROPERTIES,
  INVALID_ROLES,
  INVALID_SCHEMAS,
  INVALID_UUIDS
};
