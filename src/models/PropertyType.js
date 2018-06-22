/*
 * @flow
 */

import Immutable from 'immutable';

import has from 'lodash/has';

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

import type { Analyzer } from '../constants/types/AnalyzerTypes';

const LOG = new Logger('PropertyType');

/**
 * @class PropertyType
 * @memberof lattice
 */
export default class PropertyType {

  id :?UUID;
  type :FullyQualifiedName;
  title :string;
  description :?string;
  datatype :string;
  schemas :FullyQualifiedName[];
  piiField :boolean;
  analyzer :Analyzer;

  constructor(
    id :?UUID,
    type :FullyQualifiedName,
    title :string,
    description :?string,
    datatype :string,
    schemas :FullyQualifiedName[],
    piiField :boolean,
    analyzer :Analyzer
  ) {

    // required properties
    this.type = type;
    this.title = title;
    this.datatype = datatype;
    this.schemas = schemas;

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

  asImmutable() {

    const propertyTypeObj = {};

    // required properties
    propertyTypeObj.type = this.type;
    propertyTypeObj.title = this.title;
    propertyTypeObj.datatype = this.datatype;
    propertyTypeObj.schemas = this.schemas;

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

    return Immutable.fromJS(propertyTypeObj);
  }
}

/**
 * @class PropertyTypeBuilder
 * @memberof lattice
 */
export class PropertyTypeBuilder {

  id :?UUID;
  type :FullyQualifiedName;
  title :string;
  description :?string;
  datatype :string;
  schemas :FullyQualifiedName[];
  piiField :boolean;
  analyzer :Analyzer;

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

  setSchemas(schemas :FullyQualifiedName[]) :PropertyTypeBuilder {

    if (!isDefined(schemas) || isEmptyArray(schemas)) {
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

  setAnalyzer(analyzer :Analyzer) :PropertyTypeBuilder {

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

    if (!this.type) {
      errorMsg = 'missing property: type is a required property';
    }

    if (!this.title) {
      errorMsg = 'missing property: title is a required property';
    }

    if (!this.datatype) {
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
      this.analyzer
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
