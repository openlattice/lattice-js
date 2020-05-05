/*
 * @flow
 */

import isArray from 'lodash/isArray';
import {
  List,
  Map,
  OrderedSet,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import {
  ACE_MOCK,
  Ace,
  AceBuilder,
  genRandomAce,
} from './Ace';
import type { AceObject } from './Ace';

import Logger from '../utils/Logger';
import { isDefined } from '../utils/LangUtils';
import { isValidModel, isValidUUID } from '../utils/ValidationUtils';
import { genRandomUUID } from '../utils/testing/MockUtils';

const LOG = new Logger('Acl');

type AclObject = {|
  aclKey :UUID[];
  aces :AceObject[];
|};

class Acl {

  aces :Ace[];
  aclKey :UUID[];

  constructor(acl :{
    aces :Ace[];
    aclKey :UUID[];
  }) {

    this.aces = acl.aces;
    this.aclKey = acl.aclKey;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :AclObject {

    const aclObj :AclObject = {
      aces: this.aces.map((ace) => ace.toObject()),
      aclKey: this.aclKey,
    };

    return aclObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

class AclBuilder {

  aces :Ace[];
  aclKey :UUID[];

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setAces(value.get('aces'));
      this.setAclKey(value.get('aclKey'));
    }
    else if (isDefined(value)) {
      this.setAces(value.aces);
      this.setAclKey(value.aclKey);
    }
  }

  setAces(aces :$ReadOnlyArray<Ace>) :AclBuilder {

    if (!isDefined(aces)) {
      return this;
    }

    if (!isArray(aces) && !isCollection(aces)) {
      throw new Error('invalid parameter: "aces" must be an array');
    }

    try {
      this.aces = List(aces).map((ace) => (new AceBuilder(ace)).build()).toJS();
    }
    catch (e) {
      throw new Error('invalid parameter: "aces" must be an array of Aces');
    }

    return this;
  }

  setAclKey(aclKey :$ReadOnlyArray<UUID>) :AclBuilder {

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

  build() {

    if (!this.aces) {
      this.aces = [];
    }

    if (!this.aclKey) {
      throw new Error('missing property: "aclKey" is a required property');
    }

    return new Acl({
      aces: this.aces,
      aclKey: this.aclKey,
    });
  }
}

const isValidAcl = (value :any) :boolean => isValidModel(value, AclBuilder, LOG);

export {
  Acl,
  AclBuilder,
  isValidAcl,
};

export type {
  AclObject,
};

/*
 *
 * for testing
 *
 */

const ACL_MOCK = (new AclBuilder())
  .setAces([ACE_MOCK])
  .setAclKey(['fae6af98-2675-45bd-9a5b-1619a87235a8', 'ae9e1cc3-ba0d-4532-9860-e5e7eaf36e83'])
  .build();

function genRandomAcl() {
  return (new AclBuilder())
    .setAces([genRandomAce(), genRandomAce()])
    .setAclKey([genRandomUUID(), genRandomUUID()])
    .build();
}

export {
  ACL_MOCK,
  genRandomAcl,
};
