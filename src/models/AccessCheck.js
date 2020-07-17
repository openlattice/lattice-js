/*
 * @flow
 */

import isArray from 'lodash/isArray';
import {
  Map,
  OrderedSet,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import Logger from '../utils/Logger';
import { PermissionTypes } from '../constants/types';
import { isDefined } from '../utils/LangUtils';
import { isValidModel, isValidUUID } from '../utils/ValidationUtils';
import type { PermissionType } from '../constants/types/PermissionTypes';
import type { UUID } from '../types';

const LOG = new Logger('AccessCheck');

type AccessCheckObject = {|
  aclKey :UUID[];
  permissions :PermissionType[];
|};

class AccessCheck {

  aclKey :UUID[];
  permissions :PermissionType[];

  constructor(accessCheck :{
    aclKey :UUID[];
    permissions :PermissionType[];
  }) {

    this.aclKey = accessCheck.aclKey;
    this.permissions = accessCheck.permissions;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :AccessCheckObject {

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

class AccessCheckBuilder {

  aclKey :UUID[];
  permissions :PermissionType[];

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setAclKey(value.get('aclKey'));
      this.setPermissions(value.get('permissions'));
    }
    else if (isDefined(value)) {
      this.setAclKey(value.aclKey);
      this.setPermissions(value.permissions);
    }
  }

  setAclKey(aclKey :$ReadOnlyArray<UUID>) :AccessCheckBuilder {

    if (!isArray(aclKey) && !isCollection(aclKey)) {
      throw new Error('invalid parameter: "aclKey" must be an array');
    }

    const set = OrderedSet(aclKey);
    if (!set.isEmpty() && set.every(isValidUUID)) {
      this.aclKey = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "aclKey" must be a non-empty array of UUIDs');
    }

    return this;
  }

  setPermissions(permissions :?$ReadOnlyArray<PermissionType>) :AccessCheckBuilder {

    if (!isDefined(permissions)) {
      return this;
    }

    if (!isArray(permissions) && !isCollection(permissions)) {
      throw new Error('invalid parameter: "permissions" must be an array');
    }

    const set = OrderedSet(permissions);
    if (set.every((permission) => PermissionTypes[permission])) {
      this.permissions = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "permissions" must be an array of PermissionTypes');
    }

    return this;
  }

  build() {

    if (!this.aclKey) {
      throw new Error('missing property: "aclKey" is a required property');
    }

    if (!this.permissions) {
      this.permissions = [];
    }

    return new AccessCheck({
      aclKey: this.aclKey,
      permissions: this.permissions,
    });
  }
}

const isValidAccessCheck = (value :any) :boolean => isValidModel(value, AccessCheckBuilder, LOG);

export {
  AccessCheck,
  AccessCheckBuilder,
  isValidAccessCheck,
};

export type {
  AccessCheckObject,
};
