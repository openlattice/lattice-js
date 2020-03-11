import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_DATA_GRAPH,
  MOCK_DATA_GRAPH_OBJECT,
  DataGraph,
  DataGraphBuilder,
  genRandomDataGraph,
  isValidDataGraph as isValid,
} from './DataGraph';

import { INVALID_PARAMS, INVALID_PARAMS_FOR_OPTIONAL_OBJECT } from '../utils/testing/Invalid';
import {
  testBuilderConstructor,
  testBuilderSetter,
} from '../utils/testing/ModelTestUtils';

describe('DataGraph', () => {

  describe('DataGraphBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(DataGraph, DataGraphBuilder, MOCK_DATA_GRAPH);
    });

    describe('setAssociations()', () => {
      const validParams = [MOCK_DATA_GRAPH.associations];
      testBuilderSetter(DataGraphBuilder, 'setAssociations', validParams, true);
    });

    describe('setEntities()', () => {
      const validParams = [MOCK_DATA_GRAPH.entities];
      testBuilderSetter(DataGraphBuilder, 'setEntities', validParams);
    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          // omitting setEntities
          (new DataGraphBuilder())
            .setAssociations(MOCK_DATA_GRAPH.associations)
            .build();
        }).toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const dataGraph = (new DataGraphBuilder())
          .setEntities(MOCK_DATA_GRAPH.entities)
          .build();

        expect(dataGraph.associations).toEqual({});
      });

      test('should return a valid instance', () => {

        const dataGraph = (new DataGraphBuilder())
          .setAssociations(MOCK_DATA_GRAPH.associations)
          .setEntities(MOCK_DATA_GRAPH.entities)
          .build();

        expectValidInstance(dataGraph);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_DATA_GRAPH_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_DATA_GRAPH)).toEqual(true);
      });

    });

    describe('invalid', () => {

      test('should return false when not given any parameters', () => {
        expect(isValid()).toEqual(false);
      });

      test('should return false when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(invalidInput)).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "associations" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_OBJECT.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_DATA_GRAPH_OBJECT, associations: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entities" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_DATA_GRAPH_OBJECT, entities: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "associations" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_OBJECT.forEach((invalidInput) => {
          expect(isValid(
            new DataGraph({
              associations: invalidInput,
              entities: MOCK_DATA_GRAPH.entities,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entities" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new DataGraph({
              associations: MOCK_DATA_GRAPH.associations,
              entities: invalidInput,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_DATA_GRAPH.valueOf()).toEqual(
        fromJS({
          associations: MOCK_DATA_GRAPH.associations,
          entities: MOCK_DATA_GRAPH.entities,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomDataGraph = genRandomDataGraph();
      const dataGraph0 = (new DataGraphBuilder(MOCK_DATA_GRAPH)).build();
      const dataGraph1 = (new DataGraphBuilder(MOCK_DATA_GRAPH)).build();

      const testSet = Set()
        .add(dataGraph0)
        .add(randomDataGraph)
        .add(dataGraph1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().associations).toEqual(MOCK_DATA_GRAPH.associations);
      expect(testSet.first().entities).toEqual(MOCK_DATA_GRAPH.entities);

      expect(testSet.last().associations).toEqual(randomDataGraph.associations);
      expect(testSet.last().entities).toEqual(randomDataGraph.entities);
    });

    test('Immutable.Map', () => {

      const randomDataGraph = genRandomDataGraph();
      const dataGraph0 = (new DataGraphBuilder(MOCK_DATA_GRAPH)).build();
      const dataGraph1 = (new DataGraphBuilder(MOCK_DATA_GRAPH)).build();

      const testMap = Map()
        .set(dataGraph0, 'test_value_1')
        .set(randomDataGraph, 'test_value_2')
        .set(dataGraph1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(dataGraph0)).toEqual('test_value_3');
      expect(testMap.get(randomDataGraph)).toEqual('test_value_2');
      expect(testMap.get(dataGraph1)).toEqual('test_value_3');
    });

  });

});
