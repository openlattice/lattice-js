/*
 * @flow
 */

import Ace from './Ace';
import Logger from '../utils/Logger';

import {
  isValidAceArray,
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('Acl');

/**
 * @class Acl
 * @memberof loom-data
 */
export default class Acl {

  aclKey :UUID[];
  aces :Ace[];

  constructor(aclKey :UUID[], aces :Ace[]) {

    this.aclKey = aclKey;
    this.aces = aces;
  }
}

/**
 * @class AclBuilder
 * @memberof loom-data
 */
export class AclBuilder {

  aclKey :UUID[];
  aces :Ace[];

  setAclKey(aclKey :UUID[]) :AclBuilder {

    if (!isValidUuidArray(aclKey)) {
      throw new Error('invalid parameter: aclKey must be a non-empty array of valid UUIDs');
    }

    this.aclKey = aclKey;
    return this;
  }

  setAces(aces :Ace[]) :AclBuilder {

    if (!isValidAceArray(aces)) {
      throw new Error('invalid parameter: aces must be a non-empty array of valid Aces');
    }

    this.aces = aces;
    return this;
  }

  build() {

    if (!this.aclKey) {
      throw new Error('missing property: aclKey is a required property');
    }

    if (!this.aces) {
      throw new Error('missing property: aces is a required property');
    }

    return new Acl(this.aclKey, this.aces);
  }
}

export function isValid(acl :any) :boolean {

  try {

    (new AclBuilder())
      .setAclKey(acl.aclKey)
      .setAces(acl.aces)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, acl);
    return false;
  }
}
