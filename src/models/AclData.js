/*
 * @flow
 */

import { Map, fromJS, isImmutable } from 'immutable';

import {
  MOCK_ACL,
  Acl,
  AclBuilder,
  genRandomAcl,
} from './Acl';
import type { AclObject } from './Acl';

import ActionTypes from '../constants/types/ActionTypes';
import Logger from '../utils/Logger';
import { isDefined } from '../utils/LangUtils';
import { isValidModel } from '../utils/ValidationUtils';
import { pickRandomValue } from '../utils/testing/MockUtils';
import type { ActionType } from '../constants/types/ActionTypes';

const LOG = new Logger('AclData');

type AclDataObject = {|
  acl :AclObject;
  action :ActionType;
|};

class AclData {

  acl :Acl;
  action :ActionType;

  constructor(aclData :{
    acl :Acl;
    action :ActionType;
  }) {

    this.acl = aclData.acl;
    this.action = aclData.action;
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

class AclDataBuilder {

  acl :Acl;
  action :ActionType;

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setAcl(value.get('acl'));
      this.setAction(value.get('action'));
    }
    else if (isDefined(value)) {
      this.setAcl(value.acl);
      this.setAction(value.action);
    }
  }

  setAcl(acl :Acl) :AclDataBuilder {

    this.acl = (new AclBuilder(acl)).build();
    return this;
  }

  setAction(action :ActionType) :AclDataBuilder {

    if (!ActionTypes[action]) {
      throw new Error('invalid parameter: "action" must be a valid ActionType');
    }

    this.action = action;
    return this;
  }

  build() {

    if (!this.acl) {
      throw new Error('missing property: "acl" is a required property');
    }

    if (!this.action) {
      throw new Error('missing property: "action" is a required property');
    }

    return new AclData({
      acl: this.acl,
      action: this.action,
    });
  }
}

const isValidAclData = (value :any) :boolean => isValidModel(value, AclDataBuilder, LOG);

export {
  AclData,
  AclDataBuilder,
  isValidAclData,
};

export type {
  AclDataObject,
};

/*
 *
 * testing
 *
 */

const MOCK_ACL_DATA = (new AclDataBuilder())
  .setAcl(MOCK_ACL)
  .setAction(ActionTypes.ADD)
  .build();

const MOCK_ACL_DATA_OBJECT = MOCK_ACL_DATA.toObject();

function genRandomAclData() {
  return (new AclDataBuilder())
    .setAcl(genRandomAcl())
    .setAction(pickRandomValue(ActionTypes))
    .build();
}

export {
  MOCK_ACL_DATA,
  MOCK_ACL_DATA_OBJECT,
  genRandomAclData,
};
