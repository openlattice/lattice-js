/*
 * @flow
 */

import Ace from './Ace';
import AclKeyFragment from './AclKeyFragment';
import Logger from '../utils/Logger';

import {
  isValidAceArray,
  isValidAclKey
} from '../utils/ValidationUtils';

const LOG = new Logger('Acl');

/**
 * @class Acl
 * @memberof loom-data
 */
export default class Acl {

  aclKey :AclKeyFragment[];
  aces :Ace[];

  constructor(aclKey :AclKeyFragment[], aces :Ace[]) {

    this.aclKey = aclKey;
    this.aces = aces;
  }
}

/**
 * @class AclBuilder
 * @memberof loom-data
 */
export class AclBuilder {

  aclKey :AclKeyFragment[];
  aces :Ace[];

  setAclKey(aclKey :AclKeyFragment[]) :AclBuilder {

    if (!isValidAclKey(aclKey)) {
      throw new Error('invalid parameter: aclKey must be a non-empty array of valid AclKeyFragments');
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
