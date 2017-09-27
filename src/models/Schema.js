/*
 * @flow
 */

import EntityType from './EntityType';
import FullyQualifiedName from './FullyQualifiedName';
import PropertyType from './PropertyType';
import Logger from '../utils/Logger';

import {
  isDefined
} from '../utils/LangUtils';

import {
  isValidEntityTypeArray,
  isValidPropertyTypeArray
} from '../utils/ValidationUtils';

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

    this.fqn = fqn;
    return this;
  }

  setEntityTypes(entityTypes :EntityType[]) :SchemaBuilder {

    if (!isValidEntityTypeArray(entityTypes)) {
      throw new Error('invalid parameter: entityTypes must be a non-empty array of valid EntityTypes');
    }

    this.entityTypes = entityTypes;
    return this;
  }

  setPropertyTypes(propertyTypes :PropertyType[]) :SchemaBuilder {

    if (!isValidPropertyTypeArray(propertyTypes)) {
      throw new Error('invalid parameter: propertyTypes must be a non-empty array of valid PropertyTypes');
    }

    this.propertyTypes = propertyTypes;
    return this;
  }

  build() :Schema {

    if (!this.fqn) {
      throw new Error('missing property: fqn is a required property');
    }

    if (!this.entityTypes) {
      throw new Error('missing property: entityTypes is a required property');
    }

    if (!this.propertyTypes) {
      throw new Error('missing property: propertyTypes is a required property');
    }

    return new Schema(
      this.fqn,
      this.entityTypes,
      this.propertyTypes
    );
  }
}

export function isValid(schema :any) :boolean {

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
