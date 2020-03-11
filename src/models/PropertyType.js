/*
 * @flow
 */

import isArray from 'lodash/isArray';
import {
  Map,
  Set,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import FQN from './FQN';
import type { FQNObject } from './FQN';

import AnalyzerTypes from '../constants/types/AnalyzerTypes';
import IndexTypes from '../constants/types/IndexTypes';
import Logger from '../utils/Logger';
import { isDefined, isEmptyString, isNonEmptyString } from '../utils/LangUtils';
import { isValidModel, isValidUUID } from '../utils/ValidationUtils';
import { genRandomBoolean, genRandomString, genRandomUUID } from '../utils/testing/MockUtils';
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

class PropertyType {

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

  constructor(propertyType :{
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
  }) {

    // required properties
    this.datatype = propertyType.datatype;
    this.schemas = propertyType.schemas;
    this.title = propertyType.title;
    this.type = propertyType.type;

    // optional properties
    if (isDefined(propertyType.analyzer)) {
      this.analyzer = propertyType.analyzer;
    }

    if (isDefined(propertyType.description)) {
      this.description = propertyType.description;
    }

    if (isDefined(propertyType.enumValues)) {
      this.enumValues = propertyType.enumValues;
    }

    if (isDefined(propertyType.id)) {
      this.id = propertyType.id;
    }

    if (isDefined(propertyType.indexType)) {
      this.indexType = propertyType.indexType;
    }

    if (isDefined(propertyType.multiValued)) {
      this.multiValued = propertyType.multiValued;
    }

    if (isDefined(propertyType.pii)) {
      this.pii = propertyType.pii;
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

class PropertyTypeBuilder {

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

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setAnalyzer(value.get('analyzer'));
      this.setDataType(value.get('datatype'));
      this.setDescription(value.get('description'));
      this.setEnumValues(value.get('enumValues'));
      this.setId(value.get('id'));
      this.setIndexType(value.get('indexType'));
      this.setMultiValued(value.get('multiValued'));
      this.setPii(value.get('pii'));
      this.setSchemas(value.get('schemas'));
      this.setTitle(value.get('title'));
      this.setType(value.get('type'));
    }
    else if (isDefined(value)) {
      this.setAnalyzer(value.analyzer);
      this.setDataType(value.datatype);
      this.setDescription(value.description);
      this.setEnumValues(value.enumValues);
      this.setId(value.id);
      this.setIndexType(value.indexType);
      this.setMultiValued(value.multiValued);
      this.setPii(value.pii);
      this.setSchemas(value.schemas);
      this.setTitle(value.title);
      this.setType(value.type);
    }
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

  setDataType(datatype :string) :PropertyTypeBuilder {

    if (!isNonEmptyString(datatype)) {
      throw new Error('invalid parameter: datatype must be a non-empty string');
    }

    this.datatype = datatype;
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

  setEnumValues(values :?$ReadOnlyArray<string>) :PropertyTypeBuilder {

    if (!isDefined(values)) {
      return this;
    }

    if (!isArray(values) && !isCollection(values)) {
      throw new Error('invalid parameter: "values" must be an array');
    }

    const set = Set(values);
    if (set.every(isNonEmptyString)) {
      this.enumValues = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "values" must be a non-empty array of non-empty strings');
    }

    return this;
  }

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

  setSchemas(schemas :$ReadOnlyArray<FQN | FQNObject>) :PropertyTypeBuilder {

    if (!isDefined(schemas)) {
      return this;
    }

    if (!isArray(schemas) && !isCollection(schemas)) {
      throw new Error('invalid parameter: "schemas" must be an array');
    }

    try {
      this.schemas = Set(schemas).map((fqn) => FQN.of(fqn)).toJS();
    }
    catch (e) {
      throw new Error('invalid parameter: "schemas" must be a non-empty array of valid FQNs');
    }

    return this;
  }

  setTitle(title :string) :PropertyTypeBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: "title" must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setType(propertyTypeFQN :FQN | FQNObject | string) :PropertyTypeBuilder {

    this.type = FQN.of(propertyTypeFQN);
    return this;
  }

  build() :PropertyType {

    if (!isDefined(this.datatype)) {
      throw new Error('missing property: "datatype" is a required property');
    }

    if (!isDefined(this.title)) {
      throw new Error('missing property: "title" is a required property');
    }

    if (!isDefined(this.type)) {
      throw new Error('missing property: "type" is a required property');
    }

    if (!this.schemas) {
      this.schemas = [];
    }

    return new PropertyType({
      analyzer: this.analyzer,
      datatype: this.datatype,
      description: this.description,
      enumValues: this.enumValues,
      id: this.id,
      indexType: this.indexType,
      multiValued: this.multiValued,
      pii: this.pii,
      schemas: this.schemas,
      title: this.title,
      type: this.type,
    });
  }
}

const isValidPropertyType = (value :any) :boolean => isValidModel(value, PropertyTypeBuilder, LOG);

export {
  PropertyType,
  PropertyTypeBuilder,
  isValidPropertyType,
};

export type {
  PropertyTypeObject,
};

/*
 *
 * testing
 *
 */

const MOCK_PROPERTY_TYPE :PropertyType = new PropertyTypeBuilder()
  .setAnalyzer(AnalyzerTypes.STANDARD)
  .setDataType('String')
  .setDescription('MockPropertyTypeDescription')
  .setEnumValues(['ENUM_1', 'ENUM_2'])
  .setId('3771c28a-cdee-403b-9cea-48845210f8ab')
  .setIndexType(IndexTypes.BTREE)
  .setMultiValued(true)
  .setPii(false)
  .setSchemas([FQN.of('mock.schema')])
  .setTitle('MockPropertyTypeTitle')
  .setType(FQN.of('mock.propertytype'))
  .build();

const MOCK_PROPERTY_TYPE_OBJECT = MOCK_PROPERTY_TYPE.toObject();

function genRandomPropertyType() :PropertyType {
  return new PropertyTypeBuilder()
    .setAnalyzer(AnalyzerTypes.STANDARD)
    .setDataType('String')
    .setDescription(genRandomString())
    .setEnumValues([genRandomString(), genRandomString()])
    .setId(genRandomUUID())
    .setIndexType(IndexTypes.HASH)
    .setMultiValued(genRandomBoolean())
    .setPii(genRandomBoolean())
    .setSchemas([FQN.of(genRandomString(), genRandomString())])
    .setTitle(genRandomString())
    .setType(FQN.of(genRandomString(), genRandomString()))
    .build();
}

export {
  MOCK_PROPERTY_TYPE,
  MOCK_PROPERTY_TYPE_OBJECT,
  genRandomPropertyType,
};
