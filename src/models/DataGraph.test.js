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

function expectValidInstance(value) {

  expect(value).toBeInstanceOf(DataGraph);

  expect(value.associations).toBeDefined();
  expect(value.entities).toBeDefined();

  expect(value.associations).toEqual(MOCK_DATA_GRAPH.associations);
  expect(value.entities).toEqual(MOCK_DATA_GRAPH.entities);
}

describe('DataGraph', () => {

  describe('DataGraphBuilder', () => {

    describe('constructor()', () => {

      test('should construct given an instance', () => {
        expectValidInstance(
          (new DataGraphBuilder(MOCK_DATA_GRAPH)).build()
        );
      });

      test('should construct given an object literal', () => {
        expectValidInstance(
          (new DataGraphBuilder({ ...MOCK_DATA_GRAPH })).build()
        );
        expectValidInstance(
          (new DataGraphBuilder(MOCK_DATA_GRAPH_OBJECT)).build()
        );
      });

      test('should construct given an immutable object', () => {
        expectValidInstance(
          (new DataGraphBuilder(MOCK_DATA_GRAPH.toImmutable())).build()
        );
        expectValidInstance(
          (new DataGraphBuilder(fromJS({ ...MOCK_DATA_GRAPH }))).build()
        );
        expectValidInstance(
          (new DataGraphBuilder(fromJS(MOCK_DATA_GRAPH_OBJECT))).build()
        );
      });

    });

    describe('setAssociations()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new DataGraphBuilder()).setAssociations();
        }).toThrow();
        INVALID_PARAMS_FOR_OPTIONAL_OBJECT.forEach((invalidInput) => {
          expect(() => {
            (new DataGraphBuilder()).setAssociations(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new DataGraphBuilder()).setAssociations(MOCK_DATA_GRAPH.associations);
        }).not.toThrow();
      });

    });

    describe('setEntities()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new DataGraphBuilder()).setEntities();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new DataGraphBuilder()).setEntities(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new DataGraphBuilder()).setEntities(MOCK_DATA_GRAPH.entities);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          // omitting setAssociations
          (new DataGraphBuilder())
            .setEntities(MOCK_DATA_GRAPH.entities)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setEntities
          (new DataGraphBuilder())
            .setAssociations(MOCK_DATA_GRAPH.associations)
            .build();
        }).toThrow();
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
