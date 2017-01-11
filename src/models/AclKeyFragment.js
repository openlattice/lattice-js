/*
 * @flow
 */

import Logger from '../utils/Logger';
import SecurableObjectTypes from '../constants/SecurableObjectTypes';

import {
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid
} from '../utils/ValidationUtils';

import type {
  SecurableObjectType
} from '../constants/SecurableObjectTypes';

const LOG = new Logger('AclKeyFragment');

/**
 * @class AclKeyFragment
 * @memberof loom-data
 */
export default class AclKeyFragment {

  type :SecurableObjectType;
  id :UUID;

  constructor(type :SecurableObjectType, id :UUID) {

    this.type = type;
    this.id = id;
  }
}

/**
 * @class AclKeyFragmentBuilder
 * @memberof loom-data
 */
export class AclKeyFragmentBuilder {

  type :SecurableObjectType;
  id :UUID;

  setType(type :SecurableObjectType) :AclKeyFragmentBuilder {

    if (!isNonEmptyString(type) && !SecurableObjectTypes[type]) {
      throw new Error('invalid parameter: type must be a valid SecurableObjectType string');
    }

    this.type = type;
    return this;
  }

  setId(id :UUID) :AclKeyFragmentBuilder {

    if (!isValidUuid(id)) {
      throw new Error('invalid parameter: type must be a valid UUID');
    }

    this.id = id;
    return this;
  }

  build() {

    if (!this.type) {
      throw new Error('missing property: type is a required property');
    }

    if (!this.id) {
      throw new Error('missing property: id is a required property');
    }

    return new AclKeyFragment(this.type, this.id);
  }
}

export function isValid(aclKey :any) :boolean {

  try {

    (new AclKeyFragmentBuilder())
      .setType(aclKey.type)
      .setId(aclKey.id)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, aclKey);
    return false;
  }
}
