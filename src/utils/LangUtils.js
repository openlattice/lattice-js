/*
 * @flow
 */

import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import trim from 'lodash/trim';

export function isDefined(value :any) :boolean {

  return !isNull(value) && !isUndefined(value);
}

export function isEmptyArray(value :any) :boolean {

  return isArray(value) && isEmpty(value);
}

export function isEmptyObject(value :any) :boolean {

  return isPlainObject(value) && isEmpty(value);
}

export function isEmptyString(value :any) :boolean {

  return isString(value) && isEmpty(value);
}

export function isNonEmptyArray(value :any) :boolean {

  return isArray(value) && !isEmpty(value);
}

export function isNonEmptyObject(value :any) :boolean {

  return isPlainObject(value) && !isEmpty(value);
}

export function isNonEmptyString(value :any) :boolean {

  return isString(value) && !isEmpty(trim(value));
}

export function isNonEmptyStringArray(value :string[]) {

  if (!isNonEmptyArray(value)) {
    return false;
  }

  for (let index = 0; index < value.length; index += 1) {
    if (!isNonEmptyString(value[index])) {
      return false;
    }
  }

  return true;
}
