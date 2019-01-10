/*
 * @flow
 */

import { fromJS } from 'immutable';

import EntityType, { isValidEntityTypeArray } from './EntityType';
import FullyQualifiedName from './FullyQualifiedName';
import PropertyType, { isValidPropertyTypeArray } from './PropertyType';
import Logger from '../utils/Logger';
import { isDefined, isEmptyArray } from '../utils/LangUtils';

const LOG = new Logger('Schema');

/**
 * @class Schema
 * @memberof lattice
 */
export default class Schema {

  fqn :FullyQualifiedName;
  entityTypes :EntityType[];
  propertyTypes :PropertyType[];

  constructor(
    fqn :FullyQualifiedName,
    entityTypes :EntityType[],
    propertyTypes :PropertyType[]
  ) {

    this.fqn = fqn;
    this.entityTypes = entityTypes;
    this.propertyTypes = propertyTypes;
  }

  asImmutable() {

    const plainObj = {};

    // required properties
    plainObj.fqn = this.fqn;
    plainObj.entityTypes = this.entityTypes.map((entityType :EntityType) => entityType.asImmutable());
    plainObj.propertyTypes = this.propertyTypes.map((propertyType :PropertyType) => propertyType.toImmutable());

    return fromJS(plainObj);
  }
}

/**
 * @class SchemaBuilder
 * @memberof lattice
 */
export class SchemaBuilder {

  fqn :FullyQualifiedName;
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

    // TODO: Immutable.Set() to dedupe

    this.entityTypes = entityTypes;
    return this;
  }

  setPropertyTypes(propertyTypes :PropertyType[]) :SchemaBuilder {

    if (!isDefined(propertyTypes) || isEmptyArray(propertyTypes)) {
      return this;
    }

    if (!isValidPropertyTypeArray(propertyTypes)) {
      throw new Error('invalid parameter: propertyTypes must be a non-empty array of valid PropertyTypes');
    }

    // TODO: Immutable.Set() to dedupe

    this.propertyTypes = propertyTypes;
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
      this.propertyTypes
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
