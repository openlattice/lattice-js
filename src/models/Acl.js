/*
 * @flow
 */

import has from 'lodash/has';
import { Map, fromJS } from 'immutable';

import Ace, { isValidAceArray } from './Ace';
import Logger from '../utils/Logger';
import { isDefined, isEmptyArray } from '../utils/LangUtils';
import { isValidUuidArray, validateNonEmptyArray } from '../utils/ValidationUtils';

import type { AceObject } from './Ace';

const LOG = new Logger('Acl');

type AclObject = {|
  aclKey :UUID[];
  aces :AceObject[];
|};

/**
 * @class Acl
 * @memberof lattice
 */
export default class Acl {

  aces :Ace[];
  aclKey :UUID[];

  constructor(aclKey :UUID[], aces :Ace[]) {

    this.aces = aces;
    this.aclKey = aclKey;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :AclObject {

    const aclObj :AclObject = {
      aces: this.aces.map((ace :Ace) => ace.toObject()),
      aclKey: this.aclKey,
    };

    return aclObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

/**
 * @class AclBuilder
 * @memberof lattice
 */
export class AclBuilder {

  aces :Ace[];
  aclKey :UUID[];

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

  build() {

    if (!this.aces) {
      this.aces = [];
    }

    if (!this.aclKey) {
      this.aclKey = [];
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
    LOG.error('invalid parameter: acl is missing required properties');
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
    LOG.error(`invalid Acl: ${e.message}`, acl);
    return false;
  }
}

export function isValidAclArray(values :any[]) :boolean {

  return validateNonEmptyArray(values, (value :any) => isValidAcl(value));
}

export type {
  AclObject,
};
