/*
 * @flow
 */

import { Map, Set, fromJS } from 'immutable';

import GrantTypes from '../constants/types/GrantTypes';
import Logger from '../utils/Logger';
import {
  isDefined,
  isEmptyArray,
  isEmptyString,
  isNonEmptyString,
  isNonEmptyStringArray,
} from '../utils/LangUtils';
import { validateNonEmptyArray } from '../utils/ValidationUtils';

import type { GrantType } from '../constants/types/GrantTypes';

const LOG = new Logger('Grant');

type GrantObject = {|
  attribute :string;
  grantType :GrantType;
  mappings :string[];
|};

export default class Grant {
  attribute :string;
  grantType :GrantType;
  mappings :string[];

  constructor(attribute :string, grantType :GrantType, mappings :string[]) {

    this.attribute = attribute;
    this.grantType = grantType;
    this.mappings = mappings;
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

export class GrantBuilder {

  attribute :string;
  grantType :GrantType;
  mappings :string[];

  setAttribute(attribute :string) :GrantBuilder {

    if (!isDefined(attribute) || isEmptyString(attribute)) {
      return this;
    }

    if (!isNonEmptyString(attribute)) {
      throw new Error('invalid parameter: attribute must be a string');
    }

    this.attribute = attribute;
    return this;
  }

  setGrantType(grantType :GrantType) :GrantBuilder {

    if (!Object.values(GrantTypes).includes(grantType)) {
      throw new Error('invalid parameter: grantType must be a valid GrantType');
    }

    this.grantType = grantType;
    return this;
  }

  setMappings(mappings :$ReadOnlyArray<string>) :GrantBuilder {

    if (!isDefined(mappings) || isEmptyArray(mappings)) {
      return this;
    }

    if (!isNonEmptyStringArray(mappings)) {
      throw new Error('invalid parameter: mappings must be a non-empty array of strings');
    }

    this.mappings = Set().withMutations((set :Set<string>) => {
      mappings.forEach((mapping :string) => {
        set.add(mapping);
      });
    }).toJS();

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

    return new Grant(this.attribute, this.grantType, this.mappings);
  }
}

export function isValidGrant(grant :any) :boolean {

  if (!isDefined(grant)) {

    LOG.error('invalid parameter: grant must be defined', grant);
    return false;
  }

  try {

    (new GrantBuilder())
      .setAttribute(grant.attribute)
      .setGrantType(grant.grantType)
      .setMappings(grant.mappings)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, grant);
    return false;
  }
}

export function isValidGrantArray(grant :$ReadOnlyArray<any>) :boolean {

  return validateNonEmptyArray(grant, isValidGrant);
}

export type {
  GrantObject,
};
