/*
 * @flow
 */

import {
  AssociationType,
  AssociationTypeBuilder,
  isValidAssociationType,
} from './AssociationType';

import { ASSOCIATION_TYPE_MOCK, genRandomAssociationType } from '../utils/testing/MockData';
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
