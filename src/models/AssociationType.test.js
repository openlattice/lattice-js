/*
 * @flow
 */

import {
  ASSOCIATION_TYPE_MOCK,
  AssociationType,
  AssociationTypeBuilder,
  genRandomAssociationType,
  isValidAssociationType,
} from './AssociationType';

import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  AssociationType,
  AssociationTypeBuilder,
  ASSOCIATION_TYPE_MOCK,
  isValidAssociationType,
  genRandomAssociationType,
  {
    setBidirectional: {
      field: 'bidirectional',
      validParams: [ASSOCIATION_TYPE_MOCK.bidirectional],
    },
    setEntityType: {
      field: 'entityType',
      validParams: [ASSOCIATION_TYPE_MOCK.entityType],
    },
    setDestinationEntityTypeIds: {
      field: 'dst',
      isOptional: true,
      validParams: [ASSOCIATION_TYPE_MOCK.dst],
    },
    setSourceEntityTypeIds: {
      field: 'src',
      isOptional: true,
      validParams: [ASSOCIATION_TYPE_MOCK.src],
    },
  }
);
