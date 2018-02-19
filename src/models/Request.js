/*
 * @flow
 */

import Immutable from 'immutable';
import has from 'lodash/has';
import isString from 'lodash/isString';

import Logger from '../utils/Logger';
import { isDefined, isEmptyArray, isEmptyString } from '../utils/LangUtils';
import { isValidPermissionArray, isValidUuidArray } from '../utils/ValidationUtils';

import type { Permission } from '../constants/types/PermissionTypes';

const LOG = new Logger('Request');

export default class Request {

  aclKey :UUID[];
  permissions :Permission[];
  reason :string;

  constructor(aclKey :UUID[], permissions :Permission[], reason :string) {

    this.aclKey = aclKey;
    this.permissions = permissions;
    this.reason = reason;
  }
}

export class RequestBuilder {

  aclKey :UUID[];
  permissions :Permission[];
  reason :string;

  setAclKey(aclKey :UUID[]) :RequestBuilder {

    if (!isValidUuidArray(aclKey)) {
      throw new Error('invalid parameter: aclKey must be a non-empty array of valid UUIDs');
    }

    this.aclKey = aclKey;
    return this;
  }

  setPermissions(permissions :Permission[]) :RequestBuilder {

    if (!isDefined(permissions) || isEmptyArray(permissions)) {
      return this;
    }

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

  setReason(reason :string) :RequestBuilder {

    if (!isDefined(reason) || isEmptyString(reason)) {
      return this;
    }

    if (!isString(reason)) {
      throw new Error('invalid parameter: reason must be a string');
    }

    this.reason = reason;
    return this;
  }

  build() :Request {

    if (!this.aclKey) {
      throw new Error('missing property: aclKey is a required property');
    }

    if (!this.permissions) {
      this.permissions = [];
    }

    return new Request(this.aclKey, this.permissions, this.reason);
  }
}

export function isValid(request :any) :boolean {

  if (!isDefined(request)) {

    LOG.error('invalid parameter: request must be defined', request);
    return false;
  }

  try {

    const requestBuilder = new RequestBuilder();

    // required properties
    requestBuilder
      .setAclKey(request.aclKey)
      .setPermissions(request.permissions);

    // optional properties
    if (has(request, 'reason')) {
      requestBuilder.setReason(request.reason);
    }

    requestBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, request);
    return false;
  }
}
