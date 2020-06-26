/*
 * @flow
 */

import {
  EntityDataKey,
  EntityDataKeyBuilder,
  isValidEntityDataKey,
} from './EntityDataKey';

import { ENTITY_DATA_KEY_MOCK, genRandomEntityDataKey } from '../utils/testing/MockData';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  EntityDataKey,
  EntityDataKeyBuilder,
  ENTITY_DATA_KEY_MOCK,
  isValidEntityDataKey,
  genRandomEntityDataKey,
  {
    setEntityKeyId: {
      field: 'entityKeyId',
      validParams: [ENTITY_DATA_KEY_MOCK.entityKeyId],
    },
    setEntitySetId: {
      field: 'entitySetId',
      validParams: [ENTITY_DATA_KEY_MOCK.entitySetId],
    },
  }
);
