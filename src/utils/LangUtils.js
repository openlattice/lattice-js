/*
 * @flow
 */

import {
  isArray,
  isEmpty,
  isPlainObject,
  isString,
  trim
} from 'lodash';

export function isNonEmptyArray(value :any) :boolean {

  return isArray(value) && !isEmpty(value);
}

export function isNonEmptyObject(value :any) :boolean {

  return isPlainObject(value) && !isEmpty(value);
}

export function isNonEmptyString(value :any) :boolean {

  return isString(value) && !isEmpty(trim(value));
}
