/*
 * @flow
 */

import {
  Schema,
  SchemaBuilder,
  isValidSchema,
} from './Schema';

import { SCHEMA_MOCK, genRandomSchema } from '../utils/testing/MockData';
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
