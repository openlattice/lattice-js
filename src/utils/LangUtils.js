/*
 * @flow
 */

import validateUUID from 'uuid-validate';

import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import trim from 'lodash/trim';

export function isNonEmptyArray(value :any) :boolean {

  return isArray(value) && !isEmpty(value);
}

export function isNonEmptyObject(value :any) :boolean {

  return isPlainObject(value) && !isEmpty(value);
}

export function isNonEmptyString(value :any) :boolean {

  return isString(value) && !isEmpty(trim(value));
}

export function isValidUUID(value :any) :boolean {

  return validateUUID(value);
}
