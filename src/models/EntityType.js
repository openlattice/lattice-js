/*
 * @flow
 */

import Immutable from 'immutable';

import FullyQualifiedName from './FullyQualifiedName';

import Logger from '../utils/Logger';

import {
  isNotDefined,
  isNonEmptyArray,
  isNonEmptyString,
  isValidUUID
} from '../utils/LangUtils';

const LOG = new Logger('EntityType');

/**
 * @class EntityType
 * @memberof loom-data
 */
export default class EntityType {

  id :?UUID;
  type :FullyQualifiedName;
  title :string;
  description :?string;
  schemas :Set<FullyQualifiedName>;
  key :Set<UUID>;
  properties :Set<UUID>;

  constructor(
      id :?UUID,
      type :FullyQualifiedName,
      title :string,
      description :?string,
      schemas :Set<FullyQualifiedName>,
      key :Set<UUID>,
      properties :Set<UUID>) {

    this.id = id;
    this.type = type;
    this.title = title;
    this.description = description;
    this.schemas = schemas;
    this.key = key;
    this.properties = properties;
  }
}

/**
 * @class EntityTypeBuilder
 * @memberof loom-data
 * @private
 */
export class EntityTypeBuilder {

  id :?UUID;
  type :FullyQualifiedName;
  title :string;
  description :?string;
  schemas :Set<FullyQualifiedName>;
  key :Set<UUID>;
  properties :Set<UUID>;

  setId(entityTypeId :UUID) :EntityTypeBuilder {

    if (!isValidUUID(entityTypeId)) {
      throw new Error('invalid parameter: entityTypeId must be a valid UUID');
    }

    this.id = entityTypeId;
    return this;
  }

  setType(entityTypeFqn :FullyQualifiedName) :EntityTypeBuilder {

    if (!FullyQualifiedName.isValidFqn(entityTypeFqn.getFullyQualifiedName())) {
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

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setSchemas(schemas :FullyQualifiedName[]) :EntityTypeBuilder {

    if (!isNonEmptyArray(schemas)) {
      throw new Error('invalid parameter: schemas must be a non-empty array');
    }

    let errorMessage = '';
    const allValid = schemas.reduce((valid, shemaFqn, index) => {
      if (!valid) {
        return false;
      }
      if (!FullyQualifiedName.isValidFqn(shemaFqn.getFullyQualifiedName())) {
        errorMessage = `invalid parameter: schemas[${index}] must be a valid FQN`;
        return false;
      }
      return valid;
    }, true);

    if (!allValid) {
      throw new Error(errorMessage);
    }

    this.schemas = Immutable.Set().withMutations((set :Set<FullyQualifiedName>) => {
      schemas.forEach((schemaFqn :FullyQualifiedName) => {
        set.add(schemaFqn);
      });
    });

    return this;
  }

  setKey(key :UUID[]) :EntityTypeBuilder {

    if (!isNonEmptyArray(key)) {
      throw new Error('invalid parameter: key must be a non-empty array');
    }

    let errorMessage = '';
    const allValid = key.reduce((valid, keyId, index) => {
      if (!valid) {
        return false;
      }
      if (!isValidUUID(keyId)) {
        errorMessage = `invalid parameter: key[${index}] must be a valid UUID`;
        return false;
      }
      return valid;
    }, true);

    if (!allValid) {
      throw new Error(errorMessage);
    }

    this.key = Immutable.Set().withMutations((set :Set<UUID>) => {
      key.forEach((keyId :UUID) => {
        set.add(keyId);
      });
    });

    return this;
  }

  setPropertyTypes(propertyTypes :UUID[]) :EntityTypeBuilder {

    if (!isNonEmptyArray(propertyTypes)) {
      throw new Error('invalid parameter: propertyTypes must be a non-empty array');
    }

    let errorMessage = '';
    const allValid = propertyTypes.reduce((valid, propertyTypeId, index) => {
      if (!valid) {
        return false;
      }
      if (!isValidUUID(propertyTypeId)) {
        errorMessage = `invalid parameter: propertyTypes[${index}] must be a valid UUID`;
        return false;
      }
      return valid;
    }, true);

    if (!allValid) {
      throw new Error(errorMessage);
    }

    this.properties = Immutable.Set().withMutations((set :Set<UUID>) => {
      propertyTypes.forEach((propertyTypeId :UUID) => {
        set.add(propertyTypeId);
      });
    });

    return this;
  }

  build() :EntityType {

    if (!this.type) {
      throw new Error('missing property: type is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }

    if (!this.datatype) {
      throw new Error('missing property: datatype is a required property');
    }

    if (!this.schemas) {
      throw new Error('missing property: schemas is a required property');
    }

    if (!this.key) {
      throw new Error('missing property: key is a required property');
    }

    if (!this.properties) {
      throw new Error('missing property: properties is a required property');
    }

    return new EntityType(
      this.id,
      this.type,
      this.title,
      this.description,
      this.schemas,
      this.key,
      this.properties
    );
  }
}

export function isValid(entityType :any) :boolean {

  if (isNotDefined(entityType)) {

    LOG.error('invalid parameter: entityType must be defined', entityType);
    return false;
  }

  try {

    (new EntityTypeBuilder())
      .setId(entityType.id)
      .setType(entityType.type)
      .setTitle(entityType.title)
      .setDescription(entityType.description)
      .setSchemas(entityType.schemas)
      .setKey(entityType.key)
      .setPropertyTypes(entityType.properties)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, entityType);
    return false;
  }
}
