import { Map, Set } from 'immutable';

import DataEdgeKey, { DataEdgeKeyBuilder, isValidDataEdgeKey as isValid } from './DataEdgeKey';
import EntityDataKey from './EntityDataKey';
import { INVALID_PARAMS } from '../utils/testing/Invalid';
import { MOCK_DATA_EDGE_KEY_DM as MOCK_DM } from '../utils/testing/MockDataModels';
import { genRandomUUID } from '../utils/testing/MockUtils';

const {
  dst: mockDestination,
  edge: mockEdge,
  src: mockSource,
} = MOCK_DM;

describe('DataEdgeKey', () => {

  describe('DataEdgeKeyBuilder', () => {

    describe('setDestination()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new DataEdgeKeyBuilder()).setDestination(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new DataEdgeKeyBuilder()).setDestination();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new DataEdgeKeyBuilder()).setDestination(mockDestination);
        }).not.toThrow();
      });

    });

    describe('setEdge()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new DataEdgeKeyBuilder()).setEdge(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new DataEdgeKeyBuilder()).setEdge();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new DataEdgeKeyBuilder()).setEdge(mockEdge);
        }).not.toThrow();
      });

    });

    describe('setSource()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new DataEdgeKeyBuilder()).setSource(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new DataEdgeKeyBuilder()).setSource();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new DataEdgeKeyBuilder()).setSource(mockSource);
        }).not.toThrow();
      });

    });


    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new DataEdgeKeyBuilder())
            .setEdge(mockEdge)
            .setSource(mockSource)
            .build();
        }).toThrow();

        expect(() => {
          (new DataEdgeKeyBuilder())
            .setDestination(mockDestination)
            .setSource(mockSource)
            .build();
        }).toThrow();

        expect(() => {
          (new DataEdgeKeyBuilder())
            .setDestination(mockDestination)
            .setEdge(mockEdge)
            .build();
        }).toThrow();

      });

      test('should return a valid instance', () => {

        const dataEdgeKey = (new DataEdgeKeyBuilder())
          .setDestination(mockDestination)
          .setEdge(mockEdge)
          .setSource(mockSource)
          .build();

        expect(dataEdgeKey).toBeInstanceOf(DataEdgeKey);
        expect(dataEdgeKey.dst).toEqual(mockDestination);
        expect(dataEdgeKey.edge).toEqual(mockEdge);
        expect(dataEdgeKey.src).toEqual(mockSource);
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
          new DataEdgeKey(
            mockSource, mockDestination, mockEdge
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const dataEdgeKey = (new DataEdgeKeyBuilder())
          .setDestination(mockDestination)
          .setEdge(mockEdge)
          .setSource(mockSource)
          .build();

        expect(isValid(dataEdgeKey)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "dst" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_DM, dst: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "edge" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_DM, edge: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "src" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_DM, src: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "src" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new DataEdgeKey(
              invalidInput, mockDestination, mockEdge
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "dst" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new DataEdgeKey(
              mockSource, invalidInput, mockEdge
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "edge" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new DataEdgeKey(
              mockSource, mockDestination, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const dataEdgeKey = new DataEdgeKey(mockSource, mockDestination, mockEdge);
      expect(dataEdgeKey.valueOf()).toEqual(JSON.stringify({
        dst: mockDestination,
        edge: mockEdge,
        src: mockSource,
      }));
    });

    test('Immutable.Set', () => {

      const randomDestination = new EntityDataKey(genRandomUUID(), genRandomUUID());
      const randomEdge = new EntityDataKey(genRandomUUID(), genRandomUUID());
      const randomSource = new EntityDataKey(genRandomUUID(), genRandomUUID());

      const testSet = Set().withMutations((mutableSet) => {
        mutableSet.add(new DataEdgeKey(mockSource, mockDestination, mockEdge));
        mutableSet.add(new DataEdgeKey(randomSource, randomDestination, randomEdge));
        mutableSet.add(new DataEdgeKey(mockSource, mockDestination, mockEdge));
      });
      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);
      expect(testSet.first().dst).toEqual(mockDestination);
      expect(testSet.first().edge).toEqual(mockEdge);
      expect(testSet.first().src).toEqual(mockSource);
      expect(testSet.last().dst).toEqual(randomDestination);
      expect(testSet.last().edge).toEqual(randomEdge);
      expect(testSet.last().src).toEqual(randomSource);
    });

    test('Immutable.Map', () => {

      const randomDestination = new EntityDataKey(genRandomUUID(), genRandomUUID());
      const randomEdge = new EntityDataKey(genRandomUUID(), genRandomUUID());
      const randomSource = new EntityDataKey(genRandomUUID(), genRandomUUID());

      const dataEdgeKey0 = new DataEdgeKey(mockSource, mockDestination, mockEdge);
      const dataEdgeKey1 = new DataEdgeKey(randomSource, randomDestination, randomEdge);
      const dataEdgeKey2 = new DataEdgeKey(mockSource, mockDestination, mockEdge);

      const testMap = Map().withMutations((mutableMap) => {
        mutableMap.set(dataEdgeKey0, 'test_value_1');
        mutableMap.set(dataEdgeKey1, 'test_value_2');
        mutableMap.set(dataEdgeKey2, 'test_value_3');
      });
      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(dataEdgeKey0)).toEqual('test_value_3');
      expect(testMap.get(dataEdgeKey1)).toEqual('test_value_2');
      expect(testMap.get(dataEdgeKey2)).toEqual('test_value_3');
    });

  });

});
