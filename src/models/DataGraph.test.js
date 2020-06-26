/*
 * @flow
 */

import {
  DataGraph,
  DataGraphBuilder,
  isValidDataGraph,
} from './DataGraph';

import { DATA_GRAPH_MOCK, genRandomDataGraph } from '../utils/testing/MockData';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
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
