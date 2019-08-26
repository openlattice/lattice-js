/*
 * @flow
 */

import has from 'lodash/has';
import { Map, Set, fromJS } from 'immutable';

import Logger from '../utils/Logger';
import Principal, { isValidPrincipal } from './Principal';
import { isDefined, isEmptyArray } from '../utils/LangUtils';
import { isValidPermissionArray, validateNonEmptyArray } from '../utils/ValidationUtils';

import type { PrincipalObject } from './Principal';
import type { PermissionType } from '../constants/types/PermissionTypes';

const LOG = new Logger('Ace');

type AceObject = {|
  principal :PrincipalObject;
  permissions :PermissionType[];
|};


/**
 * @class Ace
 * @memberof lattice
 */
export default class Ace {

  permissions :PermissionType[];
  principal :Principal;

  constructor(principal :Principal, permissions :PermissionType[]) {

    this.principal = principal;
    this.permissions = permissions;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :AceObject {

    const aceObj :AceObject = {
      permissions: this.permissions,
      principal: this.principal.toObject(),
    };

    return aceObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

/**
 * @class AceBuilder
 * @memberof lattice
 */
export class AceBuilder {

  permissions :PermissionType[];
  principal :Principal;

  setPermissions(permissions :PermissionType[]) :AceBuilder {

    if (!isDefined(permissions) || isEmptyArray(permissions)) {
      return this;
    }

    if (!isValidPermissionArray(permissions)) {
      throw new Error('invalid parameter: permissions must be a non-empty array of valid Permissions');
    }

    this.permissions = Set().withMutations((set :Set<PermissionType>) => {
      permissions.forEach((permission :PermissionType) => {
        set.add(permission);
      });
    }).toJS();

    return this;
  }

  setPrincipal(principal :Principal) :AceBuilder {

    if (!isValidPrincipal(principal)) {
      throw new Error('invalid parameter: principal must be a valid Principal');
    }

    this.principal = principal;
    return this;
  }

  build() :Ace {

    if (!this.permissions) {
      this.permissions = [];
    }

    if (!this.principal) {
      throw new Error('missing property: principal is a required property');
    }

    return new Ace(this.principal, this.permissions);
  }
}

export function isValidAce(ace :any) :boolean {

  if (!isDefined(ace)) {
    LOG.error('invalid parameter: ace must be defined', ace);
    return false;
  }

  if (!has(ace, 'permissions') || !has(ace, 'principal')) {
    LOG.error('invalid parameter: ace is missing required properties');
    return false;
  }

  try {

    (new AceBuilder())
      .setPrincipal(ace.principal)
      .setPermissions(ace.permissions)
      .build();

    return true;
  }
  catch (e) {
    LOG.error(`invalid Ace: ${e.message}`, ace);
    return false;
  }
}

export function isValidAceArray(values :any[]) :boolean {

  return validateNonEmptyArray(values, (value :any) => isValidAce(value));
}

export type {
  AceObject,
};
