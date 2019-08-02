/*
 * @flow
 */

import { Map, fromJS } from 'immutable';

import Logger from '../utils/Logger';
import PrincipalTypes from '../constants/types/PrincipalTypes';
import { isDefined, isNonEmptyString } from '../utils/LangUtils';
import { validateNonEmptyArray } from '../utils/ValidationUtils';

import type { PrincipalType } from '../constants/types/PrincipalTypes';

const LOG = new Logger('Principal');

type PrincipalObject = {|
  id :string;
  type :PrincipalType;
|};

/**
 * @class Principal
 * @memberof lattice
 */
export default class Principal {

  id :string;
  type :PrincipalType;

  constructor(id :string, type :PrincipalType) {

    this.type = type;
    this.id = id;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :PrincipalObject {

    const principalObj :PrincipalObject = {
      id: this.id,
      type: this.type,
    };

    return principalObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

/**
 * @class PrincipalBuilder
 * @memberof lattice
 */
export class PrincipalBuilder {

  id :string;
  type :PrincipalType;

  setId(id :string) :PrincipalBuilder {

    if (!isNonEmptyString(id)) {
      throw new Error('invalid parameter: type must be a non-empty string');
    }

    this.id = id;
    return this;
  }

  setType(type :PrincipalType) :PrincipalBuilder {

    if (!isNonEmptyString(type) || !PrincipalTypes[type]) {
      throw new Error('invalid parameter: type must be a non-empty string');
    }

    this.type = type;
    return this;
  }

  build() :Principal {

    if (!this.id) {
      throw new Error('missing property: id is a required property');
    }

    if (!this.type) {
      throw new Error('missing property: type is a required property');
    }

    return new Principal(this.id, this.type);
  }
}

export function isValidPrincipal(principal :any) :boolean {

  if (!isDefined(principal)) {

    LOG.error('invalid parameter: principal must be defined', principal);
    return false;
  }

  try {

    (new PrincipalBuilder())
      .setId(principal.id)
      .setType(principal.type)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, principal);
    return false;
  }
}

export function isValidPrincipalArray(principals :Principal[]) :boolean {

  return validateNonEmptyArray(principals, (principal :Principal) => isValidPrincipal(principal));
}

export type {
  PrincipalObject
};
