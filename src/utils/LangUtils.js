/*
 * @flow
 */

import {
  isArray,
  isEmpty,
  isString,
  trim
} from 'lodash';

export function isNonEmptyArray(value :any) :boolean {

  return isArray(value) && !isEmpty(value);
}

export function isNonEmptyString(value :any) :boolean {

  return isString(value) && !isEmpty(trim(value));
}
