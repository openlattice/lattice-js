/*
 * @flow
 */

import { Map, fromJS, isImmutable } from 'immutable';

import Logger from '../utils/Logger';
import PrincipalTypes from '../constants/types/PrincipalTypes';
import { isDefined, isNonEmptyString } from '../utils/LangUtils';
import { isValidModel } from '../utils/ValidationUtils';
import { genRandomUUID, pickRandomValue } from '../utils/testing/MockUtils';
import type { PrincipalType } from '../constants/types/PrincipalTypes';

const LOG = new Logger('Principal');

type PrincipalObject = {|
  id :string;
  type :PrincipalType;
|};

class Principal {

  id :string;
  type :PrincipalType;

  constructor(principal :{
    id :string;
    type :PrincipalType;
  }) {

    this.id = principal.id;
    this.type = principal.type;
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

class PrincipalBuilder {

  id :string;
  type :PrincipalType;

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setId(value.get('id'));
      this.setType(value.get('type'));
    }
    else if (isDefined(value)) {
      this.setId(value.id);
      this.setType(value.type);
    }
  }

  setId(id :string) :PrincipalBuilder {

    if (!isNonEmptyString(id)) {
      throw new Error('invalid parameter: "id" must be a non-empty string');
    }

    this.id = id;
    return this;
  }

  setType(type :PrincipalType) :PrincipalBuilder {

    if (!PrincipalTypes[type]) {
      throw new Error('invalid parameter: "type" must be a valid PrincipalType');
    }

    this.type = type;
    return this;
  }

  build() :Principal {

    if (!this.id) {
      throw new Error('missing property: "id" is a required property');
    }

    if (!this.type) {
      throw new Error('missing property: "type" is a required property');
    }

    return new Principal({
      id: this.id,
      type: this.type,
    });
  }
}

const isValidPrincipal = (value :any) :boolean => isValidModel(value, PrincipalBuilder, LOG);

export {
  Principal,
  PrincipalBuilder,
  isValidPrincipal,
};

export type {
  PrincipalObject
};

/*
 *
 * testing
 *
 */

const PRINCIPAL_MOCK = (new PrincipalBuilder())
  .setId('MockPrincipalId')
  .setType(PrincipalTypes.USER)
  .build();

function genRandomPrincipal(type :?PrincipalType) :Principal {
  return (new PrincipalBuilder())
    .setId(genRandomUUID())
    .setType(type || pickRandomValue(PrincipalTypes))
    .build();
}

export {
  PRINCIPAL_MOCK,
  genRandomPrincipal,
};
