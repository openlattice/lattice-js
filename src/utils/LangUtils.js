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

function isDefined(value :any) :boolean %checks {

  return !isNull(value) && !isUndefined(value);
}

function isEmptyArray(value :any) :boolean %checks {

  return isArray(value) && isEmpty(value);
}

function isEmptyObject(value :any) :boolean %checks {

  return isPlainObject(value) && isEmpty(value);
}

function isEmptyString(value :any) :boolean %checks {

  return isString(value) && isEmpty(value);
}

function isNonEmptyArray(value :any) :boolean %checks {

  return isArray(value) && !isEmpty(value);
}

function isNonEmptyObject(value :any) :boolean %checks {

  return isPlainObject(value) && !isEmpty(value);
}

function isNonEmptyString(value :any) :boolean %checks {

  return isString(value) && !isEmpty(trim(value));
}

function isNonEmptyStringArray(value :any) :boolean {

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

export {
  isDefined,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isNonEmptyArray,
  isNonEmptyObject,
  isNonEmptyString,
  isNonEmptyStringArray,
};
