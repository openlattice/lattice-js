/*
 * @flow
 */

import Immutable from 'immutable';

import FullyQualifiedName from './FullyQualifiedName';

import {
  isNonEmptyArray,
  isNonEmptyString,
  isValidUUID
} from '../utils/LangUtils';

/**
 * @class PropertyType
 * @memberof loom-data
 * @private
 */
class PropertyType {

  id :?UUID;
  type :FullyQualifiedName;
  title :string;
  description :?string;
  datatype :string;
  schemas :Set<FullyQualifiedName>;

  constructor(
      id :?UUID,
      type :FullyQualifiedName,
      title :string,
      description :?string,
      datatype :string,
      schemas :Set<FullyQualifiedName>) {

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
export default class PropertyTypeBuilder {

  id :?UUID;
  type :FullyQualifiedName;
  title :string;
  description :?string;
  datatype :string;
  schemas :Set<FullyQualifiedName>;

  setId(propertyTypeId :UUID) :PropertyTypeBuilder {

    if (!isValidUUID(propertyTypeId)) {
      throw new Error('invalid parameter: propertyTypeId must be a valid UUID');
    }

    this.id = propertyTypeId;
    return this;
  }

  setType(propertyTypeFqn :FullyQualifiedName) :PropertyTypeBuilder {

    if (!FullyQualifiedName.isValidFqn(propertyTypeFqn.getFullyQualifiedName())) {
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

    if (!isNonEmptyArray(schemas)) {
      throw new Error('invalid parameter: schemas must be a non-empty array');
    }

    let errorMessage = '';
    const allValid = schemas.reduce((isValid, shemaFqn, index) => {
      if (!isValid) {
        return false;
      }
      if (!FullyQualifiedName.isValidFqn(shemaFqn.getFullyQualifiedName())) {
        errorMessage = `invalid parameter: schemas[${index}] must be a valid FQN`;
        return false;
      }
      return isValid;
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
      throw new Error('missing property: schemas is a required property');
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
