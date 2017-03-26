/*
 * @flow
 */

import Immutable from 'immutable';

import has from 'lodash/has';
import isUndefined from 'lodash/isUndefined';

import FullyQualifiedName from './FullyQualifiedName';

import SecurableTypes from '../constants/types/SecurableTypes';
import Logger from '../utils/Logger';

import {
  isDefined,
  isEmptyArray,
  isEmptyString,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidFqnArray,
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

import type {
  SecurableType
} from '../constants/types/SecurableTypes';

const LOG = new Logger('EntityType');

/**
 * @class EntityType
 * @memberof loom-data
 */
export default class EntityType {

  id :?UUID;
  type :FullyQualifiedName;
  title :string;
  description :string;
  schemas :FullyQualifiedName[];
  key :UUID[];
  properties :UUID[];
  baseType :?UUID;
  category :SecurableType;

  constructor(
      id :?UUID,
      type :FullyQualifiedName,
      title :string,
      description :string,
      schemas :FullyQualifiedName[],
      key :UUID[],
      properties :UUID[],
      baseType :?UUID,
      category :SecurableType) {

    this.id = id;
    this.type = type;
    this.title = title;
    this.description = description;
    this.schemas = schemas;
    this.key = key;
    this.properties = properties;
    this.baseType = baseType;
    this.category = category;
  }
}

/**
 * @class EntityTypeBuilder
 * @memberof loom-data
 */
export class EntityTypeBuilder {

  id :?UUID;
  type :FullyQualifiedName;
  title :string;
  description :string;
  schemas :FullyQualifiedName[];
  key :UUID[];
  properties :UUID[];
  baseType :?UUID;
  category :SecurableType;

  setId(entityTypeId :UUID) :EntityTypeBuilder {

    if (!isValidUuid(entityTypeId)) {
      throw new Error('invalid parameter: entityTypeId must be a valid UUID');
    }

    this.id = entityTypeId;
    return this;
  }

  setType(entityTypeFqn :FullyQualifiedName) :EntityTypeBuilder {

    if (!FullyQualifiedName.isValid(entityTypeFqn)) {
      throw new Error('invalid parameter: entityTypeFqn must be a valid FQN');
    }

    this.type = entityTypeFqn;
    return this;
  }

  setTitle(title :string) :EntityTypeBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setDescription(description :string) :EntityTypeBuilder {

    if (isUndefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setSchemas(schemas :FullyQualifiedName[]) :EntityTypeBuilder {

    if (isUndefined(schemas) || isEmptyArray(schemas)) {
      return this;
    }

    if (!isValidFqnArray(schemas)) {
      throw new Error('invalid parameter: schemas must be a non-empty array of valid FQNs');
    }

    this.schemas = Immutable.Set().withMutations((set :Set<FullyQualifiedName>) => {
      schemas.forEach((schemaFqn :FullyQualifiedName) => {
        set.add(schemaFqn);
      });
    }).toJS();

    return this;
  }

  setKey(key :UUID[]) :EntityTypeBuilder {

    if (isUndefined(key) || isEmptyArray(key)) {
      return this;
    }

    if (!isValidUuidArray(key)) {
      throw new Error('invalid parameter: key must be a non-empty array of valid UUIDs');
    }

    this.key = Immutable.Set().withMutations((set :Set<UUID>) => {
      key.forEach((keyId :UUID) => {
        set.add(keyId);
      });
    }).toJS();

    return this;
  }

  setPropertyTypes(propertyTypes :UUID[]) :EntityTypeBuilder {

    if (isUndefined(propertyTypes) || isEmptyArray(propertyTypes)) {
      return this;
    }

    if (!isValidUuidArray(propertyTypes)) {
      throw new Error('invalid parameter: propertyTypes must be a non-empty array of valid UUIDs');
    }

    this.properties = Immutable.Set().withMutations((set :Set<UUID>) => {
      propertyTypes.forEach((propertyTypeId :UUID) => {
        set.add(propertyTypeId);
      });
    }).toJS();

    return this;
  }

  setBaseType(baseType :UUID) :EntityTypeBuilder {

    if (isUndefined(baseType)) {
      return this;
    }

    if (!isValidUuid(baseType)) {
      throw new Error('invalid parameter: baseType must be a valid UUID');
    }

    this.baseType = baseType;
    return this;
  }

  setCategory(category :SecurableType) :EntityTypeBuilder {

    if (isUndefined(category) || isEmptyString(category)) {
      return this;
    }

    if (!isNonEmptyString(category) || !SecurableTypes[category]) {
      throw new Error('invalid parameter: category must be a valid SecurableType');
    }

    this.category = category;
    return this;
  }

  build() :EntityType {

    if (!this.type) {
      throw new Error('missing property: type is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }

    if (!this.schemas) {
      this.schemas = [];
    }

    if (!this.key) {
      this.key = [];
    }

    if (!this.properties) {
      this.properties = [];
    }

    return new EntityType(
      this.id,
      this.type,
      this.title,
      this.description,
      this.schemas,
      this.key,
      this.properties,
      this.baseType,
      this.category
    );
  }
}

export function isValid(entityType :any) :boolean {

  if (!isDefined(entityType)) {

    LOG.error('invalid parameter: entityType must be defined', entityType);
    return false;
  }

  try {

    const entityTypeBuilder = new EntityTypeBuilder();

    // required properties
    entityTypeBuilder
      .setType(entityType.type)
      .setTitle(entityType.title)
      .setSchemas(entityType.schemas)
      .setKey(entityType.key)
      .setPropertyTypes(entityType.properties);

    // optional properties
    if (has(entityType, 'id')) {
      entityTypeBuilder.setId(entityType.id);
    }

    if (has(entityType, 'description')) {
      entityTypeBuilder.setDescription(entityType.description);
    }

    if (has(entityType, 'baseType')) {
      entityTypeBuilder.setBaseType(entityType.baseType);
    }

    if (has(entityType, 'category')) {
      entityTypeBuilder.setCategory(entityType.category);
    }

    entityTypeBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, entityType);
    return false;
  }
}
