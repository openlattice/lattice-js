/*
 * @flow
 */

import Immutable from 'immutable';

import Logger from '../utils/Logger';
import PermissionTypes from '../constants/PermissionTypes';

import Principal, {
  isValid as isValidPrincipal
} from './Principal';

import {
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidPermissionArray
} from '../utils/ValidationUtils';

import type {
  Permission
} from '../constants/PermissionTypes';

const LOG = new Logger('Ace');

/**
 * @class Ace
 * @memberof loom-data
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
 * @memberof loom-data
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

    if (!isValidPermissionArray(permissions)) {
      throw new Error('invalid parameter: permissions must be a non-empty array of valid Permissions');
    }

    this.permissions = Immutable.Set().withMutations((set :Set<Permission>) => {
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
      throw new Error('missing property: permissions is a required property');
    }

    return new Ace(this.principal, this.permissions);
  }
}

export function isValid(ace :any) :boolean {

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
