/*
 * @flow
 */

import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';

import Logger from './Logger';
import { isNonEmptyArray, isNonEmptyObject } from './LangUtils';

type ValidatorFn = (value :any) => boolean;

/*
 * https://github.com/mixer/uuid-validate
 * https://github.com/chriso/validator.js
 *
 * this regular expression comes from isUUID() from the validator.js library. isUUID() defaults to checking "all"
 * versions, but that means we lose validation against a specific version. for example, the regular expression returns
 * true for '00000000-0000-0000-0000-000000000000', but this UUID is technically not valid.
 */
const BASE_UUID_PATTERN :RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

export function validateNonEmptyArray(value :$ReadOnlyArray<any>, validatorFn :ValidatorFn) :boolean {

  if (!isNonEmptyArray(value)) {
    return false;
  }

  for (let index = 0; index < value.length; index += 1) {
    if (!validatorFn(value[index])) {
      return false;
    }
  }

  return true;
}

export function isValidUUID(value :any) :boolean %checks {

  return isString(value) && BASE_UUID_PATTERN.test(value);
}

export function isValidUUIDArray(value :any) :boolean %checks {

  return value && validateNonEmptyArray(value, (id :any) => isValidUUID(id));
}

export function isValidMultimap(value :any, validatorFn :ValidatorFn) :boolean {

  if (!isNonEmptyObject(value)) {
    return false;
  }

  const keys :any[] = Object.keys(value);

  // validate all keys are valid according to the validator function
  for (let index1 = 0; index1 < keys.length; index1 += 1) {
    if (!validatorFn(keys[index1])) {
      return false;
    }
  }

  // validate all values are arrays
  for (let index2 = 0; index2 < keys.length; index2 += 1) {
    if (!isArray(value[keys[index2]])) {
      return false;
    }
  }

  return true;
}

export function isValidOrEmptyMultimap(value :any, validatorFn :ValidatorFn) :boolean {

  if (!isPlainObject(value)) {
    return false;
  }

  const keys :any[] = Object.keys(value);

  // validate all keys are valid according to the validator function
  for (let index1 = 0; index1 < keys.length; index1 += 1) {
    if (!validatorFn(keys[index1])) {
      return false;
    }
  }

  // validate all values are arrays
  for (let index2 = 0; index2 < keys.length; index2 += 1) {
    if (!isArray(value[keys[index2]])) {
      return false;
    }
  }

  return true;
}

export function isValidMultimapArray(values :$ReadOnlyArray<any>, validatorFn :ValidatorFn) :boolean %checks {

  return validateNonEmptyArray(values, (value :any) => isValidMultimap(value, validatorFn));
}

function isValidModel(value :any, ModelBuilder :any, LOG :Logger) :boolean {

  if (value === null || value === undefined) {
    LOG.error('invalid parameter: "value" is not defined');
    return false;
  }

  try {
    (new ModelBuilder(value)).build();
    return true;
  }
  catch (e) {
    LOG.error(e.message, value);
    return false;
  }
}

export {
  isValidModel,
};
