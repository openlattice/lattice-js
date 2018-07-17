/*
 * @flow
 */

import { Set } from 'immutable';

import Logger from '../utils/Logger';
import Principal, { isValidPrincipal } from './Principal';
import { isDefined, isEmptyArray } from '../utils/LangUtils';
import { isValidPermissionArray, validateNonEmptyArray } from '../utils/ValidationUtils';

import type { Permission } from '../constants/types/PermissionTypes';

const LOG = new Logger('Ace');

/**
 * @class Ace
 * @memberof lattice
 */
export default class Ace {

  principal :Principal;
  permissions :Permission[];

  constructor(principal :Principal, permissions :Permission[]) {

    this.principal = principal;
    this.permissions = permissions;
  }
}

/**
 * @class AceBuilder
 * @memberof lattice
 */
export class AceBuilder {

  principal :Principal;
  permissions :Permission[];

  setPrincipal(principal :Principal) :AceBuilder {

    if (!isValidPrincipal(principal)) {
      throw new Error('invalid parameter: principal must be a valid Principal');
    }

    this.principal = principal;
    return this;
  }

  setPermissions(permissions :Permission[]) :AceBuilder {

    if (!isDefined(permissions) || isEmptyArray(permissions)) {
      return this;
    }

    if (!isValidPermissionArray(permissions)) {
      throw new Error('invalid parameter: permissions must be a non-empty array of valid Permissions');
    }

    this.permissions = Set().withMutations((set :Set<Permission>) => {
      permissions.forEach((permission :Permission) => {
        set.add(permission);
      });
    }).toJS();

    return this;
  }

  build() :Ace {

    if (!this.principal) {
      throw new Error('missing property: principal is a required property');
    }

    if (!this.permissions) {
      this.permissions = [];
    }

    return new Ace(this.principal, this.permissions);
  }
}

export function isValidAce(ace :any) :boolean {

  if (!isDefined(ace)) {

    LOG.error('invalid parameter: ace must be defined', ace);
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

    LOG.error(e, ace);
    return false;
  }
}

export function isValidAceArray(aces :Ace[]) :boolean {

  return validateNonEmptyArray(aces, (ace :Ace) => isValidAce(ace));
}
