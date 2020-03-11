/*
 * @flow
 */

import isArray from 'lodash/isArray';
import {
  Map,
  OrderedSet,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import {
  MOCK_PRINCIPAL,
  Principal,
  PrincipalBuilder,
  genRandomPrincipal,
} from './Principal';
import type { PrincipalObject } from './Principal';

import Logger from '../utils/Logger';
import { PermissionTypes } from '../constants/types';
import { isDefined } from '../utils/LangUtils';
import { isValidModel } from '../utils/ValidationUtils';
import { pickRandomValue } from '../utils/testing/MockUtils';
import type { PermissionType } from '../constants/types/PermissionTypes';

const LOG = new Logger('Ace');

type AceObject = {|
  principal :PrincipalObject;
  permissions :PermissionType[];
|};

class Ace {

  permissions :PermissionType[];
  principal :Principal;

  constructor(ace :{
    permissions :PermissionType[];
    principal :Principal;
  }) {

    this.principal = ace.principal;
    this.permissions = ace.permissions;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :AceObject {

    const aceObj :AceObject = {
      permissions: this.permissions,
      principal: this.principal.toObject(),
    };

    return aceObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

class AceBuilder {

  permissions :PermissionType[];
  principal :Principal;

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setPermissions(value.get('permissions'));
      this.setPrincipal(value.get('principal'));
    }
    else if (isDefined(value)) {
      this.setPermissions(value.permissions);
      this.setPrincipal(value.principal);
    }
  }

  setPermissions(permissions :$ReadOnlyArray<PermissionType>) :AceBuilder {

    if (!isDefined(permissions)) {
      return this;
    }

    if (!isArray(permissions) && !isCollection(permissions)) {
      throw new Error('invalid parameter: "permissions" must be an array');
    }

    const set = OrderedSet(permissions);
    if (set.every((permission) => PermissionTypes[permission])) {
      this.permissions = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "permissions" must be an array of PermissionTypes');
    }

    return this;
  }

  setPrincipal(principal :Principal) :AceBuilder {

    this.principal = (new PrincipalBuilder(principal)).build();
    return this;
  }

  build() :Ace {

    if (!this.permissions) {
      this.permissions = [];
    }

    if (!this.principal) {
      throw new Error('missing property: principal is a required property');
    }

    return new Ace({
      permissions: this.permissions,
      principal: this.principal,
    });
  }
}

const isValidAce = (value :any) :boolean => isValidModel(value, AceBuilder, LOG);

export {
  Ace,
  AceBuilder,
  isValidAce,
};

export type {
  AceObject,
};

/*
 *
 * testing
 *
 */

const MOCK_ACE = (new AceBuilder())
  .setPermissions([PermissionTypes.READ, PermissionTypes.WRITE])
  .setPrincipal(MOCK_PRINCIPAL)
  .build();

const MOCK_ACE_OBJECT = MOCK_ACE.toObject();

function genRandomAce() {
  return (new AceBuilder())
    .setPermissions([pickRandomValue(PermissionTypes)])
    .setPrincipal(genRandomPrincipal())
    .build();
}

export {
  MOCK_ACE,
  MOCK_ACE_OBJECT,
  genRandomAce,
};
