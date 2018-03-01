/*
 * @flow
 */

import ActionTypes from '../constants/types/ActionTypes';
import Logger from '../utils/Logger';
import Acl, { isValid as isValidAcl } from './Acl';
import { isDefined, isNonEmptyString } from '../utils/LangUtils';

import type { Action } from '../constants/types/ActionTypes';

const LOG = new Logger('AclData');

/**
 * @class AclData
 * @memberof lattice
 */
export default class AclData {

  acl :Acl;
  action :Action;

  constructor(acl :Acl, action :Action) {

    this.acl = acl;
    this.action = action;
  }
}

/**
 * @class AclDataBuilder
 * @memberof lattice
 */
export class AclDataBuilder {

  acl :Acl;
  action :Action;

  setAcl(acl :Acl) :AclDataBuilder {

    if (!isValidAcl(acl)) {
      throw new Error('invalid parameter: acl must be a valid Acl');
    }

    this.acl = acl;
    return this;
  }

  setAction(action :Action) :AclDataBuilder {

    if (!isNonEmptyString(action) || !ActionTypes[action]) {
      throw new Error('invalid parameter: action must be a valid Action');
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

export function isValid(aclData :any) :boolean {

  if (!isDefined(aclData)) {

    LOG.error('invalid parameter: aclData must be defined', aclData);
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

    LOG.error(e, aclData);
    return false;
  }
}
