/*
 * @flow
 */

import PermissionTypes from '../constants/types/PermissionTypes';
import FullyQualifiedName from '../models/FullyQualifiedName';
import AccessCheck, { isValid as isValidAccessCheck } from '../models/AccessCheck';
import Ace, { isValid as isValidAce } from '../models/Ace';
import EntitySet, { isValid as isValidEntitySet } from '../models/EntitySet';
import EntityType, { isValid as isValidEntityType } from '../models/EntityType';
import Principal, { isValid as isValidPrincipal } from '../models/Principal';
import PropertyType, { isValid as isValidPropertyType } from '../models/PropertyType';
import Request, { isValid as isValidRequest } from '../models/Request';
import RequestStatus, { isValid as isValidRequestStatus } from '../models/RequestStatus';
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

export function isValidEntitySetArray(entitySets :EntitySet[]) :boolean {

  return validateNonEmptyArray(entitySets, (entitySet :EntitySet) => isValidEntitySet(entitySet));
}

export function isValidEntityTypeArray(entityTypes :EntityType[]) :boolean {

  return validateNonEmptyArray(entityTypes, (entityType :EntityType) => isValidEntityType(entityType));
}

export function isValidPropertyTypeArray(propertyTypes :PropertyType[]) :boolean {

  return validateNonEmptyArray(propertyTypes, (propertyType :PropertyType) => isValidPropertyType(propertyType));
}

export function isValidAceArray(aces :Ace[]) :boolean {

  return validateNonEmptyArray(aces, (ace :Ace) => isValidAce(ace));
}

export function isValidPermissionArray(permissions :Permission[]) :boolean {

  return validateNonEmptyArray(permissions, (permission :Permission) => (
    isNonEmptyString(permission) && PermissionTypes[permission]
  ));
}

export function isValidPrincipalArray(principals :Principal[]) :boolean {

  return validateNonEmptyArray(principals, (principal :Principal) => isValidPrincipal(principal));
}

export function isValidAccessCheckArray(accessChecks :AccessCheck[]) :boolean {

  return validateNonEmptyArray(accessChecks, (accessCheck :AccessCheck) => isValidAccessCheck(accessCheck));
}

export function isValidRequestArray(requests :Request[]) :boolean {

  return validateNonEmptyArray(requests, (request :Request) => isValidRequest(request));
}

export function isValidRequestStatusArray(statuses :RequestStatus[]) :boolean {

  return validateNonEmptyArray(statuses, (requestStatus :RequestStatus) => isValidRequestStatus(requestStatus));
}
