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
import { isValidUUID, validateNonEmptyArray } from '../utils/ValidationUtils';
import { genRandomUUID, pickRandomValue } from '../utils/testing/MockUtils';
import type { PermissionType } from '../constants/types/PermissionTypes';

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

  setPermissions(permissions :$ReadOnlyArray<PermissionType>) :AccessCheckBuilder {

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

function isValidAccessCheck(value :any) :boolean {

  if (!isDefined(value)) {
    LOG.error('invalid parameter: "value" is not defined');
    return false;
  }

  try {
    (new AccessCheckBuilder(value)).build();
    return true;
  }
  catch (e) {
    LOG.error(e.message, value);
    return false;
  }
}

function isValidAccessCheckArray(values :$ReadOnlyArray<any>) :boolean {

  return validateNonEmptyArray(values, isValidAccessCheck);
}

export {
  AccessCheck,
  AccessCheckBuilder,
  isValidAccessCheck,
  isValidAccessCheckArray,
};

export type {
  AccessCheckObject,
};

/*
 *
 * for testing
 *
 */

const MOCK_ACCESS_CHECK = (new AccessCheckBuilder())
  .setAclKey(['69682f1e-6039-44da-8342-522395b43738', '5e4a579a-ad72-4902-991c-027d80dcd590'])
  .setPermissions([PermissionTypes.READ, PermissionTypes.WRITE])
  .build();

const MOCK_ACCESS_CHECK_OBJECT = MOCK_ACCESS_CHECK.toObject();

function genRandomAccessCheck() {
  return (new AccessCheckBuilder())
    .setAclKey([genRandomUUID(), genRandomUUID()])
    .setPermissions([pickRandomValue(PermissionTypes)])
    .build();
}

export {
  MOCK_ACCESS_CHECK,
  MOCK_ACCESS_CHECK_OBJECT,
  genRandomAccessCheck,
};
