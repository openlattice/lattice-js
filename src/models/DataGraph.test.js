/*
 * @flow
 */

import {
  DATA_GRAPH_MOCK,
  DataGraph,
  DataGraphBuilder,
  genRandomDataGraph,
  isValidDataGraph,
} from './DataGraph';

import { runModelTestSuite } from '../utils/testing/ModelTestUtils';

runModelTestSuite(
  DataGraph,
  DataGraphBuilder,
  DATA_GRAPH_MOCK,
  isValidDataGraph,
  genRandomDataGraph,
  {
    setAssociations: {
      field: 'associations',
      isOptional: true,
      validParams: [DATA_GRAPH_MOCK.associations],
    },
    setEntities: {
      field: 'entities',
      validParams: [DATA_GRAPH_MOCK.entities],
    },
  }
);
