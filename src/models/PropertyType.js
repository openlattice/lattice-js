/*
 * @flow
 */

import has from 'lodash/has';
import { Map, Set, fromJS } from 'immutable';

import FullyQualifiedName from './FullyQualifiedName';

import AnalyzerTypes from '../constants/types/AnalyzerTypes';
import IndexTypes from '../constants/types/IndexTypes';
import Logger from '../utils/Logger';

import {
  isDefined,
  isEmptyArray,
  isEmptyString,
  isNonEmptyString,
} from '../utils/LangUtils';

import {
  isValidUUID,
  isValidFQNArray,
  validateNonEmptyArray,
} from '../utils/ValidationUtils';

import type { FQN, FQNObject } from './FullyQualifiedName';
import type { AnalyzerType, IndexType } from '../constants/types';

const LOG = new Logger('PropertyType');

type PropertyTypeObject = {|
  analyzer ?:AnalyzerType;
  datatype :string;
  description ?:string;
  enumValues ?:string[];
  id ?:UUID;
  indexType ?:IndexType;
  multiValued ?:boolean;
  pii ?:boolean;
  schemas :FQNObject[];
  title :string;
  type :FQNObject;
|};

/**
 * @class PropertyType
 * @memberof lattice
 */
export default class PropertyType {

  analyzer :?AnalyzerType;
  datatype :string;
  description :?string;
  enumValues :?string[];
  id :?UUID;
  indexType :?IndexType;
  multiValued :?boolean;
  pii :?boolean;
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
    pii :?boolean,
    analyzer :?AnalyzerType,
    multiValued :?boolean,
    enumValues :?string[],
    indexType :?IndexType,
  ) {

    // required properties
    this.datatype = datatype;
    this.schemas = schemas;
    this.title = title;
    this.type = type;

    // optional properties
    if (isDefined(analyzer)) {
      this.analyzer = analyzer;
    }

    if (isDefined(description)) {
      this.description = description;
    }

    if (isDefined(enumValues)) {
      this.enumValues = enumValues;
    }

    if (isDefined(id)) {
      this.id = id;
    }

    if (isDefined(indexType)) {
      this.indexType = indexType;
    }

    if (isDefined(multiValued)) {
      this.multiValued = multiValued;
    }

    if (isDefined(pii)) {
      this.pii = pii;
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
    if (isDefined(this.analyzer)) {
      propertyTypeObj.analyzer = this.analyzer;
    }

    if (isDefined(this.description)) {
      propertyTypeObj.description = this.description;
    }

    if (isDefined(this.enumValues)) {
      propertyTypeObj.enumValues = this.enumValues;
    }

    if (isDefined(this.id)) {
      propertyTypeObj.id = this.id;
    }

    if (isDefined(this.indexType)) {
      propertyTypeObj.indexType = this.indexType;
    }

    if (isDefined(this.multiValued)) {
      propertyTypeObj.multiValued = this.multiValued;
    }

    if (isDefined(this.pii)) {
      propertyTypeObj.pii = this.pii;
    }

    return propertyTypeObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
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
  enumValues :?string[];
  id :?UUID;
  indexType :?IndexType;
  multiValued :?boolean;
  pii :?boolean;
  schemas :FQN[];
  title :string;
  type :FQN;

  setId(propertyTypeId :?UUID) :PropertyTypeBuilder {

    if (!isDefined(propertyTypeId) || isEmptyString(propertyTypeId)) {
      return this;
    }

    if (!isValidUUID(propertyTypeId)) {
      throw new Error('invalid parameter: propertyTypeId must be a valid UUID');
    }

    this.id = propertyTypeId;
    return this;
  }

  setType(propertyTypeFQN :FQN | FQNObject | string) :PropertyTypeBuilder {

    if (!FullyQualifiedName.isValid(propertyTypeFQN)) {
      throw new Error('invalid parameter: propertyTypeFQN must be a valid FQN');
    }

    this.type = new FullyQualifiedName(propertyTypeFQN);
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

  setSchemas(schemas :$ReadOnlyArray<FQN | FQNObject>) :PropertyTypeBuilder {

    if (!isDefined(schemas) || isEmptyArray(schemas)) {
      return this;
    }

    if (!isValidFQNArray(schemas)) {
      throw new Error('invalid parameter: schemas must be a non-empty array of valid FQNs');
    }

    this.schemas = Set().withMutations((set :Set<FQN>) => {
      schemas.forEach((schemaFQN :FQN | FQNObject) => {
        set.add(new FullyQualifiedName(schemaFQN));
      });
    }).toJS();

    return this;
  }

  setPii(pii :?boolean) :PropertyTypeBuilder {

    if (!isDefined(pii)) {
      return this;
    }

    if (pii !== true && pii !== false) {
      throw new Error('invalid parameter: pii must be a boolean');
    }

    this.pii = pii;
    return this;
  }

  setAnalyzer(analyzer :?AnalyzerType) :PropertyTypeBuilder {

    if (!isDefined(analyzer) || isEmptyString(analyzer)) {
      return this;
    }

    if (!AnalyzerTypes[analyzer]) {
      throw new Error('invalid parameter: analyzer must be a valid AnalyzerType');
    }

    this.analyzer = analyzer;
    return this;
  }

  setMultiValued(multiValued :?boolean) :PropertyTypeBuilder {

    if (!isDefined(multiValued)) {
      return this;
    }

    if (multiValued !== true && multiValued !== false) {
      throw new Error('invalid parameter: multiValued must be a boolean');
    }

    this.multiValued = multiValued;
    return this;
  }

  setEnumValues(enumValues :?$ReadOnlyArray<string>) :PropertyTypeBuilder {

    if (!isDefined(enumValues) || isEmptyArray(enumValues)) {
      return this;
    }

    const values = enumValues || [];
    if (!validateNonEmptyArray(values, isNonEmptyString)) {
      throw new Error('invalid parameter: enumValues must be a non-empty array of non-empty strings');
    }

    this.enumValues = Set().withMutations((set :Set<string>) => {
      values.forEach((enumValue :string) => {
        set.add(enumValue);
      });
    }).toJS();

    return this;
  }

  setIndexType(indexType :?IndexType) :PropertyTypeBuilder {

    if (!isDefined(indexType) || isEmptyString(indexType)) {
      return this;
    }

    if (!IndexTypes[indexType]) {
      throw new Error('invalid parameter: indexType must be a valid IndexType');
    }

    this.indexType = indexType;
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
      this.pii,
      this.analyzer,
      this.multiValued,
      this.enumValues,
      this.indexType,
    );
  }
}

export function isValidPropertyType(propertyType :?PropertyType | PropertyTypeObject) :boolean {

  if (!isDefined(propertyType)) {
    LOG.error('invalid parameter: propertyType must be defined', propertyType);
    return false;
  }

  try {

    const propertyTypeBuilder = new PropertyTypeBuilder();

    // required properties
    propertyTypeBuilder
      .setDataType(propertyType.datatype)
      .setSchemas(propertyType.schemas)
      .setTitle(propertyType.title)
      .setType(propertyType.type);

    // optional properties
    if (has(propertyType, 'analyzer')) {
      propertyTypeBuilder.setAnalyzer(propertyType.analyzer);
    }

    if (has(propertyType, 'description')) {
      propertyTypeBuilder.setDescription(propertyType.description);
    }

    if (has(propertyType, 'enumValues')) {
      propertyTypeBuilder.setEnumValues(propertyType.enumValues);
    }

    if (has(propertyType, 'id')) {
      propertyTypeBuilder.setId(propertyType.id);
    }

    if (has(propertyType, 'indexType')) {
      propertyTypeBuilder.setIndexType(propertyType.indexType);
    }

    if (has(propertyType, 'multiValued')) {
      propertyTypeBuilder.setMultiValued(propertyType.multiValued);
    }

    if (has(propertyType, 'pii')) {
      propertyTypeBuilder.setPii(propertyType.pii);
    }

    propertyTypeBuilder.build();
    return true;
  }
  catch (e) {
    LOG.error(`invalid PropertyType: ${e.message}`, propertyType);
    return false;
  }
}

export function isValidPropertyTypeArray(propertyTypes :$ReadOnlyArray<any>) :boolean {

  return validateNonEmptyArray(propertyTypes, isValidPropertyType);
}

export type {
  PropertyTypeObject,
};
