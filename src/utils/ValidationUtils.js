/*
 * @flow
 */

import validateUUID from 'uuid-validate';

import FullyQualifiedName from '../models/FullyQualifiedName';

import * as EntitySet from '../models/EntitySet';
import * as EntityType from '../models/EntityType';
import * as PropertyType from '../models/PropertyType';

import {
  isNonEmptyArray
} from './LangUtils';

function validateNonEmptyArray(list :any[], validatorFn :Function) :boolean {

  if (!isNonEmptyArray(list)) {
    return false;
  }

  for (let index = 0; index < list.length; index += 1) {
    if (!validatorFn(list[index])) {
      return false;
    }
  }

  return true;
}

export function isValidUuid(value :any) :boolean {

  return validateUUID(value);
}

export function isValidUuidArray(uuids :UUID[]) :boolean {

  return validateNonEmptyArray(uuids, (id :UUID) => {
    return isValidUuid(id);
  });
}

export function isValidFqnArray(fqns :FullyQualifiedName[]) :boolean {

  return validateNonEmptyArray(fqns, (fqn :FullyQualifiedName) => {
    return FullyQualifiedName.isValidFqn(fqn);
  });
}

export function isValidEntitySetArray(entitySets :EntitySet[]) :boolean {

  return validateNonEmptyArray(entitySets, (entitySet :EntitySet) => {
    return EntitySet.isValid(entitySet);
  });
}

export function isValidEntityTypeArray(entityTypes :EntityType[]) :boolean {

  return validateNonEmptyArray(entityTypes, (entityType :EntityType) => {
    return EntityType.isValid(entityType);
  });
}

export function isValidPropertyTypeArray(propertyTypes :PropertyType[]) :boolean {

  return validateNonEmptyArray(propertyTypes, (propertyType :PropertyType) => {
    return PropertyType.isValid(propertyType);
  });
}
