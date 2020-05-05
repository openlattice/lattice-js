/*
 * @flow
 */

import {
  SCHEMA_MOCK,
  Schema,
  SchemaBuilder,
  genRandomSchema,
  isValidSchema,
} from './Schema';

import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  Schema,
  SchemaBuilder,
  SCHEMA_MOCK,
  isValidSchema,
  genRandomSchema,
  {
    setEntityTypes: {
      field: 'entityTypes',
      isOptional: true,
      validParams: [SCHEMA_MOCK.entityTypes],
    },
    setFQN: {
      field: 'fqn',
      validParams: [SCHEMA_MOCK.fqn],
    },
    setPropertyTypes: {
      field: 'propertyTypes',
      isOptional: true,
      validParams: [SCHEMA_MOCK.propertyTypes],
    },
  }
);
