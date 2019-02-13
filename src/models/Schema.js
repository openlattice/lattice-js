/*
 * @flow
 */

import { Map, Set, fromJS } from 'immutable';

import EntityType, { EntityTypeBuilder, isValidEntityTypeArray } from './EntityType';
import FullyQualifiedName from './FullyQualifiedName';
import PropertyType, { PropertyTypeBuilder, isValidPropertyTypeArray } from './PropertyType';
import Logger from '../utils/Logger';
import { isDefined, isEmptyArray } from '../utils/LangUtils';
import type { EntityTypeObject } from './EntityType';
import type { FQN, FQNObject } from './FullyQualifiedName';
import type { PropertyTypeObject } from './PropertyType';

const LOG = new Logger('Schema');

type SchemaObject = {|
  entityTypes :EntityTypeObject[];
  fqn :FQNObject;
  propertyTypes :PropertyTypeObject[];
|};

/**
 * @class Schema
 * @memberof lattice
 */
export default class Schema {

  entityTypes :EntityType[];
  fqn :FQN;
  propertyTypes :PropertyType[];

  constructor(
    fqn :FQN,
    entityTypes :EntityType[],
    propertyTypes :PropertyType[]
  ) {

    this.fqn = fqn;
    this.entityTypes = entityTypes;
    this.propertyTypes = propertyTypes;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :SchemaObject {

    // required properties
    const schemaObj :SchemaObject = {
      entityTypes: this.entityTypes.map((entityType :EntityType) => entityType.toObject()),
      fqn: this.fqn.toObject(),
      propertyTypes: this.propertyTypes.map((propertyType :PropertyType) => propertyType.toObject()),
    };

    return schemaObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

/**
 * @class SchemaBuilder
 * @memberof lattice
 */
export class SchemaBuilder {

  fqn :FQN;
  entityTypes :EntityType[];
  propertyTypes :PropertyType[];

  setFullyQualifiedName(fqn :FullyQualifiedName) :SchemaBuilder {

    if (!FullyQualifiedName.isValid(fqn)) {
      throw new Error('invalid parameter: fqn must be a valid FQN');
    }

    this.fqn = new FullyQualifiedName(fqn);
    return this;
  }

  setEntityTypes(entityTypes :EntityType[]) :SchemaBuilder {

    if (!isDefined(entityTypes) || isEmptyArray(entityTypes)) {
      return this;
    }

    if (!isValidEntityTypeArray(entityTypes)) {
      throw new Error('invalid parameter: entityTypes must be a non-empty array of valid EntityTypes');
    }

    this.entityTypes = Set().withMutations((set :Set<EntityType>) => {
      entityTypes.forEach((entityType :EntityType) => {
        set.add(
          new EntityTypeBuilder()
            .setBaseType(entityType.baseType)
            .setCategory(entityType.category)
            .setDescription(entityType.description)
            .setId(entityType.id)
            .setKey(entityType.key)
            .setPropertyTypes(entityType.properties)
            .setSchemas(entityType.schemas)
            .setTitle(entityType.title)
            .setType(entityType.type)
            .build()
        );
      });
    }).toJS();

    return this;
  }

  setPropertyTypes(propertyTypes :PropertyType[]) :SchemaBuilder {

    if (!isDefined(propertyTypes) || isEmptyArray(propertyTypes)) {
      return this;
    }

    if (!isValidPropertyTypeArray(propertyTypes)) {
      throw new Error('invalid parameter: propertyTypes must be a non-empty array of valid PropertyTypes');
    }

    this.propertyTypes = Set().withMutations((set :Set<PropertyType>) => {
      propertyTypes.forEach((propertyType :PropertyType) => {
        set.add(
          new PropertyTypeBuilder()
            .setAnalyzer(propertyType.analyzer)
            .setDataType(propertyType.datatype)
            .setDescription(propertyType.description)
            .setId(propertyType.id)
            .setPii(propertyType.piiField)
            .setSchemas(propertyType.schemas)
            .setTitle(propertyType.title)
            .setType(propertyType.type)
            .build()
        );
      });
    }).toJS();

    return this;
  }

  build() :Schema {

    if (!this.fqn) {
      throw new Error('missing property: fqn is a required property');
    }

    if (!this.entityTypes) {
      this.entityTypes = [];
    }

    if (!this.propertyTypes) {
      this.propertyTypes = [];
    }

    return new Schema(
      this.fqn,
      this.entityTypes,
      this.propertyTypes,
    );
  }
}

export function isValidSchema(schema :any) :boolean {

  if (!isDefined(schema)) {

    LOG.error('invalid parameter: schema must be defined', schema);
    return false;
  }

  try {

    (new SchemaBuilder())
      .setFullyQualifiedName(schema.fqn)
      .setEntityTypes(schema.entityTypes)
      .setPropertyTypes(schema.propertyTypes)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, schema);
    return false;
  }
}
