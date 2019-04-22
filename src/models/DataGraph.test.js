import { Map, Set } from 'immutable';

import DataGraph, { DataGraphBuilder, isValidDataGraph as isValid } from './DataGraph';
import { INVALID_PARAMS, INVALID_PARAMS_FOR_OPTIONAL_OBJECT } from '../utils/testing/Invalid';

import {
  MOCK_DATA_GRAPH_DM as MOCK_DM,
  genRandomDataGraph,
} from '../utils/testing/MockDataModels';

const {
  associations: mockAssociations,
  entities: mockEntities,
} = MOCK_DM;

describe('DataGraph', () => {

  describe('DataGraphBuilder', () => {

    describe('setAssociations()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_OBJECT.forEach((invalidInput) => {
          expect(() => {
            (new DataGraphBuilder()).setAssociations(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new DataGraphBuilder()).setAssociations();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new DataGraphBuilder()).setAssociations(mockAssociations);
        }).not.toThrow();
      });

    });

    describe('setEntities()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new DataGraphBuilder()).setEntities(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new DataGraphBuilder()).setEntities();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new DataGraphBuilder()).setEntities(mockEntities);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new DataGraphBuilder())
            .setEntities(mockEntities)
            .build();
        }).toThrow();

        expect(() => {
          (new DataGraphBuilder())
            .setAssociations(mockAssociations)
            .build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const dataGraph = (new DataGraphBuilder())
          .setAssociations(mockAssociations)
          .setEntities(mockEntities)
          .build();

        expect(dataGraph).toBeInstanceOf(DataGraph);
        expect(dataGraph.associations).toEqual(mockAssociations);
        expect(dataGraph.entities).toEqual(mockEntities);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_DM)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new DataGraph(
            mockAssociations, mockEntities
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const dataGraph = (new DataGraphBuilder())
          .setAssociations(mockAssociations)
          .setEntities(mockEntities)
          .build();

        expect(isValid(dataGraph)).toEqual(true);
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
          expect(isValid(Object.assign({}, MOCK_DM, { associations: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entities" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_DM, { entities: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "associations" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_OBJECT.forEach((invalidInput) => {
          expect(isValid(
            new DataGraph(
              invalidInput, mockEntities
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entities" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new DataGraph(
              mockAssociations, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const dataGraph = new DataGraph(mockAssociations, mockEntities);
      expect(dataGraph.valueOf()).toEqual(JSON.stringify({
        associations: mockAssociations,
        entities: mockEntities,
      }));
    });

    test('Immutable.Set', () => {

      const {
        associations: randomAssociations,
        entities: randomEntities,
      } = genRandomDataGraph();
      const testSet = Set().withMutations((mutableSet) => {
        mutableSet.add(new DataGraph(mockAssociations, mockEntities));
        mutableSet.add(new DataGraph(randomAssociations, randomEntities));
        mutableSet.add(new DataGraph(mockAssociations, mockEntities));
      });
      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().associations).toEqual(mockAssociations);
      expect(testSet.first().entities).toEqual(mockEntities);

      expect(testSet.last().associations).toEqual(randomAssociations);
      expect(testSet.last().entities).toEqual(randomEntities);
    });

    test('Immutable.Map', () => {

      const {
        associations: randomAssociations,
        entities: randomEntities,
      } = genRandomDataGraph();
      const dataGraph0 = new DataGraph(mockAssociations, mockEntities);
      const dataGraph1 = new DataGraph(randomAssociations, randomEntities);
      const dataGraph2 = new DataGraph(mockAssociations, mockEntities);

      const testMap = Map().withMutations((mutableMap) => {
        mutableMap.set(dataGraph0, 'test_value_1');
        mutableMap.set(dataGraph1, 'test_value_2');
        mutableMap.set(dataGraph2, 'test_value_3');
      });
      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(dataGraph0)).toEqual('test_value_3');
      expect(testMap.get(dataGraph1)).toEqual('test_value_2');
      expect(testMap.get(dataGraph2)).toEqual('test_value_3');
    });

  });

});
