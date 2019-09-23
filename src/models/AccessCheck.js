/*
 * @flow
 */

import has from 'lodash/has';
import { Map, Set, fromJS } from 'immutable';

import Logger from '../utils/Logger';
import { PermissionTypes } from '../constants/types';
import { isDefined, isEmptyArray } from '../utils/LangUtils';
import { isValidTypeArray, isValidUuidArray, validateNonEmptyArray } from '../utils/ValidationUtils';

import type { PermissionType } from '../constants/types/PermissionTypes';

const LOG = new Logger('AccessCheck');

type AccessCheckObject = {|
  aclKey :UUID[];
  permissions :PermissionType[];
|};

/**
 * @class AccessCheck
 * @memberof lattice
 */
export default class AccessCheck {

  aclKey :UUID[];
  permissions :PermissionType[];

  constructor(aclKey :UUID[], permissions :PermissionType[]) {

    // required properties
    this.aclKey = aclKey;
    this.permissions = permissions;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :AccessCheckObject {

    // required properties
    const accessCheckObj :AccessCheckObject = {
      aclKey: this.aclKey,
      permissions: this.permissions,
    };

    return accessCheckObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

/**
 * @class AclBuilder
 * @memberof lattice
 */
export class AccessCheckBuilder {

  aclKey :UUID[];
  permissions :PermissionType[];

  setAclKey(aclKey :UUID[]) :AccessCheckBuilder {

    if (!isDefined(aclKey) || isEmptyArray(aclKey)) {
      return this;
    }

    if (!isValidUuidArray(aclKey)) {
      throw new Error('invalid parameter: aclKey must be an array of valid UUIDs');
    }

    this.aclKey = aclKey;
    return this;
  }

  setPermissions(permissions :PermissionType[]) :AccessCheckBuilder {

    if (!isDefined(permissions) || isEmptyArray(permissions)) {
      return this;
    }

    if (!isValidTypeArray(permissions, PermissionTypes)) {
      throw new Error('invalid parameter: permissions must be an array of valid PermissionTypes');
    }

    this.permissions = Set().withMutations((set :Set<PermissionType>) => {
      permissions.forEach((permission :PermissionType) => {
        set.add(permission);
      });
    }).toJS();

    return this;
  }

  build() {

    if (!this.aclKey) {
      this.aclKey = [];
    }

    if (!this.permissions) {
      this.permissions = [];
    }

    return new AccessCheck(this.aclKey, this.permissions);
  }
}

export function isValidAccessCheck(accessCheck :any) :boolean {

  if (!isDefined(accessCheck)) {
    LOG.error('invalid parameter: accessCheck must be defined', accessCheck);
    return false;
  }

  if (!has(accessCheck, 'aclKey') || !has(accessCheck, 'permissions')) {
    LOG.error('missing properties: accessCheck is missing required properties');
    return false;
  }

  try {

    (new AccessCheckBuilder())
      .setAclKey(accessCheck.aclKey)
      .setPermissions(accessCheck.permissions)
      .build();

    return true;
  }
  catch (e) {
    LOG.error(`invalid AccessCheck: ${e.message}`, accessCheck);
    return false;
  }
}

export function isValidAccessCheckArray(accessChecks :AccessCheck[]) :boolean {

  return validateNonEmptyArray(accessChecks, (accessCheck :AccessCheck) => isValidAccessCheck(accessCheck));
}

export type {
  AccessCheckObject,
};
