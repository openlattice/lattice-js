/*
 * @flow
 */

import has from 'lodash/has';

import Ace, { isValidAceArray } from './Ace';
import Logger from '../utils/Logger';
import { isDefined, isEmptyArray } from '../utils/LangUtils';
import { isValidUuidArray } from '../utils/ValidationUtils';

const LOG = new Logger('Acl');

/**
 * @class Acl
 * @memberof lattice
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
 * @memberof lattice
 */
export class AclBuilder {

  aclKey :UUID[];
  aces :Ace[];

  setAclKey(aclKey :UUID[]) :AclBuilder {

    if (!isDefined(aclKey) || isEmptyArray(aclKey)) {
      return this;
    }

    if (!isValidUuidArray(aclKey)) {
      throw new Error('invalid parameter: aclKey must be a non-empty array of valid UUIDs');
    }

    this.aclKey = aclKey;
    return this;
  }

  setAces(aces :Ace[]) :AclBuilder {

    if (!isDefined(aces) || isEmptyArray(aces)) {
      return this;
    }

    if (!isValidAceArray(aces)) {
      throw new Error('invalid parameter: aces must be a non-empty array of valid Aces');
    }

    this.aces = aces;
    return this;
  }

  build() {

    if (!this.aclKey) {
      this.aclKey = [];
    }

    if (!this.aces) {
      this.aces = [];
    }

    return new Acl(this.aclKey, this.aces);
  }
}

export function isValidAcl(acl :any) :boolean {

  if (!isDefined(acl)) {

    LOG.error('invalid parameter: acl must be defined', acl);
    return false;
  }

  if (!has(acl, 'aclKey') || !has(acl, 'aces')) {

    LOG.error('missing properties: acl is missing required properties');
    return false;
  }

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
