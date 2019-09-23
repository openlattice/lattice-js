/*
 * @flow
 */

import has from 'lodash/has';
import isString from 'lodash/isString';
import { Set } from 'immutable';

import Logger from '../utils/Logger';
import { PermissionTypes } from '../constants/types';
import { isDefined, isEmptyArray, isEmptyString } from '../utils/LangUtils';
import { isValidTypeArray, isValidUUIDArray, validateNonEmptyArray } from '../utils/ValidationUtils';

import type { PermissionType } from '../constants/types/PermissionTypes';

const LOG = new Logger('Request');

export default class Request {

  aclKey :UUID[];
  permissions :PermissionType[];
  reason :string;

  constructor(aclKey :UUID[], permissions :PermissionType[], reason :string) {

    this.aclKey = aclKey;
    this.permissions = permissions;
    this.reason = reason;
  }
}

export class RequestBuilder {

  aclKey :UUID[];
  permissions :PermissionType[];
  reason :string;

  setAclKey(aclKey :UUID[]) :RequestBuilder {

    if (!isValidUUIDArray(aclKey)) {
      throw new Error('invalid parameter: aclKey must be a non-empty array of valid UUIDs');
    }

    this.aclKey = aclKey;
    return this;
  }

  setPermissions(permissions :PermissionType[]) :RequestBuilder {

    if (!isDefined(permissions) || isEmptyArray(permissions)) {
      return this;
    }

    if (!isValidTypeArray(permissions, PermissionTypes)) {
      throw new Error('invalid parameter: permissions must be a non-empty array of valid PermissionTypes');
    }

    this.permissions = Set().withMutations((set :Set<PermissionType>) => {
      permissions.forEach((permission :PermissionType) => {
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

export function isValidRequest(request :any) :boolean {

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

export function isValidRequestArray(requests :Request[]) :boolean {

  return validateNonEmptyArray(requests, (request :Request) => isValidRequest(request));
}
