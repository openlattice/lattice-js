/*
 * @flow
 */

import Immutable from 'immutable';

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

  aclKey :List<AclKeyFragment>;
  aces :List<Ace>;

  constructor(aclKey :List<AclKeyFragment>, aces :List<Ace>) {

    this.aclKey = aclKey;
    this.aces = aces;
  }
}

/**
 * @class AclBuilder
 * @memberof loom-data
 */
export class AclBuilder {

  aclKey :List<AclKeyFragment>;
  aces :List<Ace>;

  setAclKey(aclKey :AclKeyFragment[]) :AclBuilder {

    if (!isValidAclKey(aclKey)) {
      throw new Error('invalid parameter: aclKey must be a non-empty array of valid AclKeyFragments');
    }

    this.aclKey = Immutable.List().withMutations((list :List<AclKeyFragment>) => {
      aclKey.forEach((frag :AclKeyFragment) => {
        list.push(frag);
      });
    });

    return this;
  }

  setAces(aces :Ace[]) :AclBuilder {

    if (!isValidAceArray(aces)) {
      throw new Error('invalid parameter: aces must be a non-empty array of valid Aces');
    }

    this.aces = Immutable.List().withMutations((list :List<Ace>) => {
      aces.forEach((ace :Ace) => {
        list.push(ace);
      });
    });

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
