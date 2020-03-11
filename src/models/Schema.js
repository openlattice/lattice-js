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

import FQN from './FQN';
import {
  MOCK_ENTITY_TYPE,
  EntityType,
  EntityTypeBuilder,
  genRandomEntityType,
} from './EntityType';
import {
  MOCK_PROPERTY_TYPE,
  PropertyType,
  PropertyTypeBuilder,
  genRandomPropertyType,
} from './PropertyType';
import type { EntityTypeObject } from './EntityType';
import type { FQNObject } from './FQN';
import type { PropertyTypeObject } from './PropertyType';

import Logger from '../utils/Logger';
import { isDefined } from '../utils/LangUtils';
import { isValidModel } from '../utils/ValidationUtils';
import { genRandomString } from '../utils/testing/MockUtils';

const LOG = new Logger('Schema');

type SchemaObject = {|
  entityTypes :EntityTypeObject[];
  fqn :FQNObject;
  propertyTypes :PropertyTypeObject[];
|};

class Schema {

  entityTypes :EntityType[];
  fqn :FQN;
  propertyTypes :PropertyType[];

  constructor(schema :{
    entityTypes :EntityType[];
    fqn :FQN;
    propertyTypes :PropertyType[];
  }) {

    this.entityTypes = schema.entityTypes;
    this.fqn = schema.fqn;
    this.propertyTypes = schema.propertyTypes;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :SchemaObject {

    // required properties
    const schemaObj :SchemaObject = {
      entityTypes: this.entityTypes.map((entityType) => entityType.toObject()),
      fqn: this.fqn.toObject(),
      propertyTypes: this.propertyTypes.map((propertyType) => propertyType.toObject()),
    };

    return schemaObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

class SchemaBuilder {

  entityTypes :EntityType[];
  fqn :FQN;
  propertyTypes :PropertyType[];

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setEntityTypes(value.get('entityTypes'));
      this.setFQN(value.get('fqn'));
      this.setPropertyTypes(value.get('propertyTypes'));
    }
    else if (isDefined(value)) {
      this.setEntityTypes(value.entityTypes);
      this.setFQN(value.fqn);
      this.setPropertyTypes(value.propertyTypes);
    }
  }

  setEntityTypes(entityTypes :$ReadOnlyArray<EntityType | EntityTypeObject>) :SchemaBuilder {

    if (!isDefined(entityTypes)) {
      return this;
    }

    if (!isArray(entityTypes) && !isCollection(entityTypes)) {
      throw new Error('invalid parameter: "entityTypes" must be an array');
    }

    try {
      this.entityTypes = Set(entityTypes).map(
        (entityType) => (new EntityTypeBuilder(entityType)).build()
      ).toJS();
    }
    catch (e) {
      throw new Error('invalid parameter: "entityTypes" must be an array of EntityTypes');
    }

    return this;
  }

  setFQN(fqn :FQN) :SchemaBuilder {

    this.fqn = FQN.of(fqn);
    return this;
  }

  setPropertyTypes(propertyTypes :$ReadOnlyArray<PropertyType | PropertyTypeObject>) :SchemaBuilder {

    if (!isDefined(propertyTypes)) {
      return this;
    }

    if (!isArray(propertyTypes) && !isCollection(propertyTypes)) {
      throw new Error('invalid parameter: "propertyTypes" must be an array');
    }

    try {
      this.propertyTypes = Set(propertyTypes).map(
        (propertyType) => (new PropertyTypeBuilder(propertyType)).build()
      ).toJS();
    }
    catch (e) {
      throw new Error('invalid parameter: "propertyTypes" must be an array of PropertyTypes');
    }

    return this;
  }

  build() :Schema {

    if (!this.fqn) {
      throw new Error('missing property: "fqn" is a required property');
    }

    if (!this.entityTypes) {
      this.entityTypes = [];
    }

    if (!this.propertyTypes) {
      this.propertyTypes = [];
    }

    return new Schema({
      entityTypes: this.entityTypes,
      fqn: this.fqn,
      propertyTypes: this.propertyTypes,
    });
  }
}

const isValidSchema = (value :any) :boolean => isValidModel(value, SchemaBuilder, LOG);

export {
  Schema,
  SchemaBuilder,
  isValidSchema,
};

export type {
  SchemaObject,
};

/*
 *
 * testing
 *
 */

const MOCK_SCHEMA = (new SchemaBuilder())
  .setEntityTypes([MOCK_ENTITY_TYPE])
  .setFQN(FQN.of('mock.schema'))
  .setPropertyTypes([MOCK_PROPERTY_TYPE])
  .build();

const MOCK_SCHEMA_OBJECT = MOCK_SCHEMA.toObject();

function genRandomSchema() {
  return (new SchemaBuilder())
    .setEntityTypes([genRandomEntityType()])
    .setFQN(FQN.of(genRandomString(), genRandomString()))
    .setPropertyTypes([genRandomPropertyType(), genRandomPropertyType()])
    .build();
}

export {
  MOCK_SCHEMA,
  MOCK_SCHEMA_OBJECT,
  genRandomSchema,
};
