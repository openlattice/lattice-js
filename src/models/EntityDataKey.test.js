/*
 * @flow
 */

import {
  ENTITY_DATA_KEY_MOCK,
  EntityDataKey,
  EntityDataKeyBuilder,
  genRandomEntityDataKey,
  isValidEntityDataKey,
} from './EntityDataKey';

import { runModelTestSuite } from '../utils/testing/ModelTestUtils';

runModelTestSuite(
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
