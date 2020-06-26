/*
 * @flow
 */

import {
  PropertyType,
  PropertyTypeBuilder,
  isValidPropertyType,
} from './PropertyType';

import { AnalyzerTypes, IndexTypes } from '../constants/types';
import { PROPERTY_TYPE_MOCK, genRandomPropertyType } from '../utils/testing/MockData';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  PropertyType,
  PropertyTypeBuilder,
  PROPERTY_TYPE_MOCK,
  isValidPropertyType,
  genRandomPropertyType,
  {
    setAnalyzer: {
      field: 'analyzer',
      isOptional: true,
      validParams: [PROPERTY_TYPE_MOCK.analyzer, ...Object.values(AnalyzerTypes)],
    },
    setDataType: {
      field: 'datatype',
      validParams: [PROPERTY_TYPE_MOCK.datatype],
    },
    setDescription: {
      field: 'description',
      isOptional: true,
      validParams: [PROPERTY_TYPE_MOCK.description],
    },
    setEnumValues: {
      field: 'enumValues',
      isOptional: true,
      validParams: [PROPERTY_TYPE_MOCK.enumValues],
    },
    setId: {
      field: 'id',
      isOptional: true,
      validParams: [PROPERTY_TYPE_MOCK.id],
    },
    setIndexType: {
      field: 'indexType',
      isOptional: true,
      validParams: [PROPERTY_TYPE_MOCK.indexType, ...Object.values(IndexTypes)],
    },
    setMultiValued: {
      field: 'multiValued',
      isOptional: true,
      validParams: [PROPERTY_TYPE_MOCK.multiValued],
    },
    setPII: {
      field: 'pii',
      isOptional: true,
      validParams: [PROPERTY_TYPE_MOCK.pii],
    },
    setSchemas: {
      field: 'schemas',
      isOptional: true,
      validParams: [PROPERTY_TYPE_MOCK.schemas],
    },
    setTitle: {
      field: 'title',
      validParams: [PROPERTY_TYPE_MOCK.title],
    },
    setType: {
      field: 'type',
      validParams: [PROPERTY_TYPE_MOCK.type],
    },
  }
);
