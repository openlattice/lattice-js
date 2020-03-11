/*
 * @flow
 */

import isArray from 'lodash/isArray';
import {
  Map,
  Set,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import GrantTypes from '../constants/types/GrantTypes';
import Logger from '../utils/Logger';
import { isDefined, isEmptyString, isNonEmptyString } from '../utils/LangUtils';
import { isValidModel } from '../utils/ValidationUtils';
import { genRandomString, pickRandomValue } from '../utils/testing/MockUtils';
import type { GrantType } from '../constants/types/GrantTypes';

const LOG = new Logger('Grant');

type GrantObject = {|
  attribute :string;
  grantType :GrantType;
  mappings :string[];
|};

class Grant {

  attribute :string;
  grantType :GrantType;
  mappings :string[];

  constructor(grant :{
    attribute :string;
    grantType :GrantType;
    mappings :string[];
  }) {

    this.attribute = grant.attribute;
    this.grantType = grant.grantType;
    this.mappings = grant.mappings;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :GrantObject {

    const grantObj :GrantObject = {
      attribute: this.attribute,
      grantType: this.grantType,
      mappings: this.mappings,
    };

    return grantObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

class GrantBuilder {

  attribute :string;
  grantType :GrantType;
  mappings :string[];

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setAttribute(value.get('attribute'));
      this.setGrantType(value.get('grantType'));
      this.setMappings(value.get('mappings'));
    }
    else if (isDefined(value)) {
      this.setAttribute(value.attribute);
      this.setGrantType(value.grantType);
      this.setMappings(value.mappings);
    }
  }

  setAttribute(attribute :?string) :GrantBuilder {

    if (!isDefined(attribute) || isEmptyString(attribute)) {
      return this;
    }

    if (!isNonEmptyString(attribute)) {
      throw new Error('invalid parameter: "attribute" must be a string');
    }

    this.attribute = attribute;
    return this;
  }

  setGrantType(grantType :GrantType) :GrantBuilder {

    if (!Object.values(GrantTypes).includes(grantType)) {
      throw new Error('invalid parameter: "grantType" must be a valid GrantType');
    }

    this.grantType = grantType;
    return this;
  }

  setMappings(mappings :?$ReadOnlyArray<string>) :GrantBuilder {

    if (!isDefined(mappings)) {
      return this;
    }

    if (!isArray(mappings) && !isCollection(mappings)) {
      throw new Error('invalid parameter: "mappings" must be an array');
    }

    const set = Set(mappings);
    if (set.every(isNonEmptyString)) {
      this.mappings = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "mappings" must be a non-empty array of non-empty strings');
    }

    return this;
  }

  build() :Grant {

    if (!this.attribute) {
      this.attribute = '';
    }

    if (!this.grantType) {
      throw new Error('missing property: grantType is a required property');
    }

    if (!this.mappings) {
      this.mappings = [];
    }

    return new Grant({
      attribute: this.attribute,
      grantType: this.grantType,
      mappings: this.mappings,
    });
  }
}

const isValidGrant = (value :any) :boolean => isValidModel(value, GrantBuilder, LOG);

export {
  Grant,
  GrantBuilder,
  isValidGrant,
};

export type {
  GrantObject,
};

/*
 *
 * testing
 *
 */

const MOCK_GRANT = (new GrantBuilder())
  .setAttribute('attribute')
  .setGrantType(GrantTypes.MANUAL)
  .setMappings(['MAPPING_1', 'MAPPING_2'])
  .build();

const MOCK_GRANT_OBJECT = MOCK_GRANT.toObject();

function genRandomGrant() {
  return (new GrantBuilder())
    .setAttribute(genRandomString())
    .setGrantType(pickRandomValue(GrantTypes))
    .setMappings([genRandomString()])
    .build();
}

export {
  MOCK_GRANT,
  MOCK_GRANT_OBJECT,
  genRandomGrant,
};
