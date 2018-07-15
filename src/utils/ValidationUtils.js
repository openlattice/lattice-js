/*
 * @flow
 */

import PermissionTypes from '../constants/types/PermissionTypes';
import FullyQualifiedName from '../models/FullyQualifiedName';
import { isNonEmptyArray, isNonEmptyString } from './LangUtils';

import type { Permission } from '../constants/types/PermissionTypes';

/*
 * https://github.com/mixer/uuid-validate
 * https://github.com/chriso/validator.js
 *
 * this regular expression comes from isUUID() from the validator.js library. isUUID() defaults to checking "all"
 * versions, but that means we lose validation against a specific version. for example, the regular expression returns
 * true for '00000000-0000-0000-0000-000000000000', but this UUID is technically not valid.
 */
const BASE_UUID_PATTERN :RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;

export function validateNonEmptyArray(value :any[], validatorFn :Function) :boolean {

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

export function isValidUuid(value :any) :boolean {

  return BASE_UUID_PATTERN.test(value);
}

export function isValidUuidArray(uuids :UUID[]) :boolean {

  return validateNonEmptyArray(uuids, (id :UUID) => isValidUuid(id));
}

export function isValidFqnArray(fqns :FullyQualifiedName[]) :boolean {

  return validateNonEmptyArray(fqns, (fqn :FullyQualifiedName) => FullyQualifiedName.isValid(fqn));
}

export function isValidPermissionArray(permissions :Permission[]) :boolean {

  return validateNonEmptyArray(permissions, (permission :Permission) => (
    isNonEmptyString(permission) && PermissionTypes[permission]
  ));
}
