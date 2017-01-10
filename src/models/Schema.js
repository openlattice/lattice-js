/*
 * @flow
 */

import Immutable from 'immutable';

import FullyQualifiedName from './FullyQualifiedName';

import Logger from '../utils/Logger';

import * as EntityType from './EntityType';
import * as PropertyType from './PropertyType';

import {
  isNotDefined,
  isNonEmptyArray
} from '../utils/LangUtils';

const LOG = new Logger('Schema');

/**
 * @class Schema
 * @memberof loom-data
 */
export default class Schema {

  fqn :FullyQualifiedName;
  entityTypes :EntityType[];
  propertyTypes :PropertyType[];

  constructor(
      fqn :FullyQualifiedName,
      entityTypes :EntityType[],
      propertyTypes :PropertyType[]) {

    this.fqn = fqn;
    this.entityTypes = entityTypes;
    this.propertyTypes = propertyTypes;
  }
}

/**
 * @class SchemaBuilder
 * @memberof loom-data
 */
export class SchemaBuilder {

  fqn :FullyQualifiedName;
  entityTypes :List<EntityType>;
  propertyTypes :List<PropertyType>;

  setFullyQualifiedName(fqn :FullyQualifiedName) :SchemaBuilder {

    if (!FullyQualifiedName.isValidFqn(fqn.getFullyQualifiedName())) {
      throw new Error('invalid parameter: fqn must be a valid FQN');
    }

    this.fqn = fqn;
    return this;
  }

  setEntityTypes(entityTypes :EntityType[]) :SchemaBuilder {

    if (!isNonEmptyArray(entityTypes)) {
      throw new Error('invalid parameter: entityTypes must be a non-empty array');
    }

    let errorMessage = '';
    const allValid = entityTypes.reduce((valid, entityType, index) => {
      if (!valid) {
        return false;
      }
      if (!EntityType.isValid(entityType)) {
        errorMessage = `invalid parameter: entityTypes[${index}] must be a valid EntityType`;
        return false;
      }
      return valid;
    }, true);

    if (!allValid) {
      throw new Error(errorMessage);
    }

    this.entityTypes = Immutable.List().withMutations((list :List<EntityType>) => {
      entityTypes.forEach((entityType :EntityType) => {
        list.push(entityType);
      });
    });

    return this;
  }

  setPropertyTypes(propertyTypes :PropertyType[]) :SchemaBuilder {

    if (!isNonEmptyArray(propertyTypes)) {
      throw new Error('invalid parameter: propertyTypes must be a non-empty array');
    }

    let errorMessage = '';
    const allValid = propertyTypes.reduce((valid, propertyType, index) => {
      if (!valid) {
        return false;
      }
      if (!PropertyType.isValid(propertyType)) {
        errorMessage = `invalid parameter: propertyTypes[${index}] must be a valid PropertyType`;
        return false;
      }
      return valid;
    }, true);

    if (!allValid) {
      throw new Error(errorMessage);
    }

    this.propertyTypes = Immutable.List().withMutations((list :List<PropertyType>) => {
      propertyTypes.forEach((propertyType :PropertyType) => {
        list.push(propertyType);
      });
    });

    return this;
  }

  build() :Schema {

    return new Schema(
      this.fqn,
      this.entityTypes,
      this.propertyTypes
    );
  }
}

export function isValid(schema :any) :boolean {

  if (isNotDefined(schema)) {

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
