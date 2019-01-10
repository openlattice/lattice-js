/*
 * @flow
 */

import has from 'lodash/has';
import { Map, Set, fromJS } from 'immutable';

import FullyQualifiedName from './FullyQualifiedName';

import AnalyzerTypes from '../constants/types/AnalyzerTypes';
import Logger from '../utils/Logger';

import {
  isDefined,
  isEmptyArray,
  isEmptyString,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid,
  isValidFqnArray,
  validateNonEmptyArray
} from '../utils/ValidationUtils';

const LOG = new Logger('PropertyType');

/**
 * @class PropertyType
 * @memberof lattice
 */
export default class PropertyType {

  analyzer :?AnalyzerType;
  datatype :string;
  description :?string;
  id :?UUID;
  piiField :?boolean;
  schemas :FQN[];
  title :string;
  type :FQN;

  constructor(
    id :?UUID,
    type :FQN,
    title :string,
    description :?string,
    datatype :string,
    schemas :FQN[],
    piiField :?boolean,
    analyzer :?AnalyzerType,
  ) {

    // required properties
    this.datatype = datatype;
    this.schemas = schemas;
    this.title = title;
    this.type = type;

    // optional properties
    if (isDefined(id)) {
      this.id = id;
    }

    if (isDefined(description)) {
      this.description = description;
    }

    if (isDefined(piiField)) {
      this.piiField = piiField;
    }

    if (isDefined(analyzer)) {
      this.analyzer = analyzer;
    }
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :PropertyTypeObject {

    // required properties
    const propertyTypeObj :PropertyTypeObject = {
      datatype: this.datatype,
      schemas: this.schemas.map((fqn :FQN) => fqn.toObject()),
      title: this.title,
      type: this.type.toObject(),
    };

    // optional properties
    if (isDefined(this.id)) {
      propertyTypeObj.id = this.id;
    }

    if (isDefined(this.description)) {
      propertyTypeObj.description = this.description;
    }

    if (isDefined(this.piiField)) {
      propertyTypeObj.piiField = this.piiField;
    }

    if (isDefined(this.analyzer)) {
      propertyTypeObj.analyzer = this.analyzer;
    }

    return propertyTypeObj;
  }

  toString() :string {

    return JSON.stringify(this.toObject());
  }

  valueOf() :string {

    return this.toString();
  }
}

/**
 * @class PropertyTypeBuilder
 * @memberof lattice
 */
export class PropertyTypeBuilder {

  analyzer :?AnalyzerType;
  datatype :string;
  description :?string;
  id :?UUID;
  piiField :?boolean;
  schemas :FQN[];
  title :string;
  type :FQN;

  setId(propertyTypeId :?UUID) :PropertyTypeBuilder {

    if (!isDefined(propertyTypeId) || isEmptyString(propertyTypeId)) {
      return this;
    }

    if (!isValidUuid(propertyTypeId)) {
      throw new Error('invalid parameter: propertyTypeId must be a valid UUID');
    }

    this.id = propertyTypeId;
    return this;
  }

  setType(propertyTypeFqn :FQN) :PropertyTypeBuilder {

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

  setDescription(description :?string) :PropertyTypeBuilder {

    if (!isDefined(description) || isEmptyString(description)) {
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

  setSchemas(schemas :FQN[]) :PropertyTypeBuilder {

    if (!isDefined(schemas) || isEmptyArray(schemas)) {
      return this;
    }

    if (!isValidFqnArray(schemas)) {
      throw new Error('invalid parameter: schemas must be a non-empty array of valid FQNs');
    }

    this.schemas = Set().withMutations((set :Set<FQN>) => {
      schemas.forEach((schemaFqn :FQN) => {
        set.add(schemaFqn);
      });
    }).toJS();

    return this;
  }

  setPii(pii :boolean) :PropertyTypeBuilder {

    if (!isDefined(pii)) {
      return this;
    }

    if (pii !== true && pii !== false) {
      throw new Error('invalid parameter: pii must be a boolean');
    }

    this.piiField = pii;
    return this;
  }

  setAnalyzer(analyzer :AnalyzerType) :PropertyTypeBuilder {

    if (!isDefined(analyzer) || isEmptyString(analyzer)) {
      return this;
    }

    if (analyzer !== AnalyzerTypes.METAPHONE && analyzer !== AnalyzerTypes.STANDARD) {
      throw new Error('invalid parameter: analyzer must be one of ["METAPHONE","STANDARD"]');
    }

    this.analyzer = analyzer;
    return this;
  }

  build() :PropertyType {

    let errorMsg :string = '';

    if (!isDefined(this.type)) {
      errorMsg = 'missing property: type is a required property';
    }

    if (!isDefined(this.title)) {
      errorMsg = 'missing property: title is a required property';
    }

    if (!isDefined(this.datatype)) {
      errorMsg = 'missing property: datatype is a required property';
    }

    if (errorMsg) {
      LOG.error(errorMsg);
      throw new Error(errorMsg);
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
      this.schemas,
      this.piiField,
      this.analyzer,
    );
  }
}

export function isValidPropertyType(propertyType :any) :boolean {

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

    if (has(propertyType, 'piiField')) {
      propertyTypeBuilder.setPii(propertyType.piiField);
    }

    if (has(propertyType, 'analyzer')) {
      propertyTypeBuilder.setAnalyzer(propertyType.analyzer);
    }

    propertyTypeBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, propertyType);
    return false;
  }
}

export function isValidPropertyTypeArray(propertyTypes :PropertyType[]) :boolean {

  return validateNonEmptyArray(propertyTypes, (propertyType :PropertyType) => isValidPropertyType(propertyType));
}
