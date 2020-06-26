/*
 * @flow
 */

import {
  EntityType,
  EntityTypeBuilder,
  isValidEntityType,
} from './EntityType';

import { SecurableTypes } from '../constants/types';
import { ENTITY_TYPE_MOCK, genRandomEntityType } from '../utils/testing/MockData';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  EntityType,
  EntityTypeBuilder,
  ENTITY_TYPE_MOCK,
  isValidEntityType,
  genRandomEntityType,
  {
    setBaseType: {
      field: 'baseType',
      isOptional: true,
      validParams: [ENTITY_TYPE_MOCK.baseType],
    },
    setCategory: {
      field: 'category',
      isOptional: true,
      validParams: [ENTITY_TYPE_MOCK.category, ...Object.values(SecurableTypes)],
    },
    setDescription: {
      field: 'description',
      isOptional: true,
      validParams: [ENTITY_TYPE_MOCK.description],
    },
    setId: {
      field: 'id',
      isOptional: true,
      validParams: [ENTITY_TYPE_MOCK.id],
    },
    setKey: {
      field: 'key',
      isOptional: true,
      validParams: [ENTITY_TYPE_MOCK.key],
    },
    setPropertyTags: {
      field: 'propertyTags',
      isOptional: true,
      validParams: [ENTITY_TYPE_MOCK.propertyTags],
    },
    setPropertyTypes: {
      field: 'properties',
      isOptional: true,
      validParams: [ENTITY_TYPE_MOCK.properties],
    },
    setSchemas: {
      field: 'schemas',
      isOptional: true,
      validParams: [ENTITY_TYPE_MOCK.schemas],
    },
    setTitle: {
      field: 'title',
      validParams: [ENTITY_TYPE_MOCK.title],
    },
    setType: {
      field: 'type',
      validParams: [ENTITY_TYPE_MOCK.type],
    },
  }
);
