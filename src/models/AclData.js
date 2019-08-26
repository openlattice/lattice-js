/*
 * @flow
 */

import has from 'lodash/has';
import { Map, fromJS } from 'immutable';

import ActionTypes from '../constants/types/ActionTypes';
import Logger from '../utils/Logger';
import Acl, { isValidAcl } from './Acl';
import { isDefined, isNonEmptyString } from '../utils/LangUtils';
import { validateNonEmptyArray } from '../utils/ValidationUtils';

import type { AclObject } from './Acl';
import type { ActionType } from '../constants/types/ActionTypes';

const LOG = new Logger('AclData');

type AclDataObject = {|
  acl :AclObject;
  action :ActionType;
|};

/**
 * @class AclData
 * @memberof lattice
 */
export default class AclData {

  acl :Acl;
  action :ActionType;

  constructor(acl :Acl, action :ActionType) {

    this.acl = acl;
    this.action = action;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :AclDataObject {

    const aclDataObj :AclDataObject = {
      acl: this.acl.toObject(),
      action: this.action,
    };

    return aclDataObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

/**
 * @class AclDataBuilder
 * @memberof lattice
 */
export class AclDataBuilder {

  acl :Acl;
  action :ActionType;

  setAcl(acl :Acl) :AclDataBuilder {

    if (!isValidAcl(acl)) {
      throw new Error('invalid parameter: acl must be a valid Acl');
    }

    this.acl = acl;
    return this;
  }

  setAction(action :ActionType) :AclDataBuilder {

    if (!isNonEmptyString(action) || !ActionTypes[action]) {
      throw new Error('invalid parameter: action must be a valid ActionType');
    }

    this.action = action;
    return this;
  }

  build() {

    if (!this.acl) {
      throw new Error('missing property: acl is a required property');
    }

    if (!this.action) {
      throw new Error('missing property: action is a required property');
    }

    return new AclData(this.acl, this.action);
  }
}

export function isValidAclData(aclData :any) :boolean {

  if (!isDefined(aclData)) {
    LOG.error('invalid parameter: aclData must be defined', aclData);
    return false;
  }

  if (!has(aclData, 'acl') || !has(aclData, 'action')) {
    LOG.error('invalid parameter: aclData is missing required properties');
    return false;
  }

  try {

    (new AclDataBuilder())
      .setAcl(aclData.acl)
      .setAction(aclData.action)
      .build();

    return true;
  }
  catch (e) {
    LOG.error(`invalid AclData: ${e.message}`, aclData);
    return false;
  }
}

export function isValidAclDataArray(values :any[]) :boolean {

  return validateNonEmptyArray(values, (value :any) => isValidAclData(value));
}

export type {
  AclDataObject,
};
