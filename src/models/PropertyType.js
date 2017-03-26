/*
 * @flow
 */

import Immutable from 'immutable';

import has from 'lodash/has';
import isUndefined from 'lodash/isUndefined';

import FullyQualifiedName from './FullyQualifiedName';

import Logger from '../utils/Logger';

import {
  isDefined,
  isEmptyArray,
  isEmptyString,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid,
  isValidFqnArray
} from '../utils/ValidationUtils';

const LOG = new Logger('PropertyType');

/**
 * @class PropertyType
 * @memberof loom-data
 */
export default class PropertyType {

  id :?UUID;
  type :FullyQualifiedName;
  title :string;
  description :string;
  datatype :string;
  schemas :FullyQualifiedName[];

  constructor(
      id :?UUID,
      type :FullyQualifiedName,
      title :string,
      description :string,
      datatype :string,
      schemas :FullyQualifiedName[]) {

    this.id = id;
    this.type = type;
    this.title = title;
    this.description = description;
    this.datatype = datatype;
    this.schemas = schemas;
  }
}

/**
 * @class PropertyTypeBuilder
 * @memberof loom-data
 */
export class PropertyTypeBuilder {

  id :?UUID;
  type :FullyQualifiedName;
  title :string;
  description :string;
  datatype :string;
  schemas :FullyQualifiedName[];

  setId(propertyTypeId :UUID) :PropertyTypeBuilder {

    if (!isValidUuid(propertyTypeId)) {
      throw new Error('invalid parameter: propertyTypeId must be a valid UUID');
    }

    this.id = propertyTypeId;
    return this;
  }

  setType(propertyTypeFqn :FullyQualifiedName) :PropertyTypeBuilder {

    if (!FullyQualifiedName.isValid(propertyTypeFqn)) {
      throw new Error('invalid parameter: propertyTypeFqn must be a valid FQN');
    }

    this.type = propertyTypeFqn;
    return this;
  }

  setTitle(title :string) :PropertyTypeBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setDescription(description :string) :PropertyTypeBuilder {

    if (isUndefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setDataType(datatype :string) :PropertyTypeBuilder {

    if (!isNonEmptyString(datatype)) {
      throw new Error('invalid parameter: datatype must be a non-empty string');
    }

    this.datatype = datatype;
    return this;
  }

  setSchemas(schemas :FullyQualifiedName[]) :PropertyTypeBuilder {

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

  build() :PropertyType {

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
      this.schemas = [];
    }

    return new PropertyType(
      this.id,
      this.type,
      this.title,
      this.description,
      this.datatype,
      this.schemas
    );
  }
}

export function isValid(propertyType :any) :boolean {

  if (!isDefined(propertyType)) {

    LOG.error('invalid parameter: propertyType must be defined', propertyType);
    return false;
  }

  try {

    const propertyTypeBuilder = new PropertyTypeBuilder();

    // required properties
    propertyTypeBuilder
      .setType(propertyType.type)
      .setTitle(propertyType.title)
      .setDataType(propertyType.datatype)
      .setSchemas(propertyType.schemas);

    // optional properties
    if (has(propertyType, 'id')) {
      propertyTypeBuilder.setId(propertyType.id);
    }

    if (has(propertyType, 'description')) {
      propertyTypeBuilder.setDescription(propertyType.description);
    }

    propertyTypeBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, propertyType);
    return false;
  }
}
