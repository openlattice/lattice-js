/*
 * @flow
 */

import Logger from '../utils/Logger';
import SecurableTypes from '../constants/SecurableTypes';

import {
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid
} from '../utils/ValidationUtils';

import type {
  SecurableType
} from '../constants/SecurableTypes';

const LOG = new Logger('AclKeyFragment');

/**
 * @class AclKeyFragment
 * @memberof loom-data
 */
export default class AclKeyFragment {

  type :SecurableType;
  id :UUID;

  constructor(type :SecurableType, id :UUID) {

    this.type = type;
    this.id = id;
  }
}

/**
 * @class AclKeyFragmentBuilder
 * @memberof loom-data
 */
export class AclKeyFragmentBuilder {

  type :SecurableType;
  id :UUID;

  setType(type :SecurableType) :AclKeyFragmentBuilder {

    if (!isNonEmptyString(type) && !SecurableTypes[type]) {
      throw new Error('invalid parameter: type must be a valid SecurableType string');
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
