import { Map, Set } from 'immutable';

import EntityDataKey, { EntityDataKeyBuilder, isValidEntityDataKey as isValid } from './EntityDataKey';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_ENTITY_DATA_KEY_DM as MOCK_DM } from '../utils/testing/MockDataModels';
import { genRandomUUID } from '../utils/testing/MockUtils';

const {
  entityKeyId: mockEntityKeyId,
  entitySetId: mockEntitySetId,
} = MOCK_DM;

describe('EntityDataKey', () => {

  describe('EntityDataKeyBuilder', () => {

    describe('setEntityKeyId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new EntityDataKeyBuilder()).setEntityKeyId(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new EntityDataKeyBuilder()).setEntityKeyId();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityDataKeyBuilder()).setEntityKeyId(mockEntityKeyId);
        }).not.toThrow();
      });

    });

    describe('setEntitySetId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new EntityDataKeyBuilder()).setEntitySetId(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new EntityDataKeyBuilder()).setEntitySetId();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityDataKeyBuilder()).setEntitySetId(mockEntitySetId);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new EntityDataKeyBuilder())
            .setEntityKeyId(mockEntityKeyId)
            .build();
        }).toThrow();

        expect(() => {
          (new EntityDataKeyBuilder())
            .setEntitySetId(mockEntitySetId)
            .build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const entityDataKey = (new EntityDataKeyBuilder())
          .setEntityKeyId(mockEntityKeyId)
          .setEntitySetId(mockEntitySetId)
          .build();

        expect(entityDataKey).toBeInstanceOf(EntityDataKey);
        expect(entityDataKey.entityKeyId).toEqual(mockEntityKeyId);
        expect(entityDataKey.entitySetId).toEqual(mockEntitySetId);
      });

    });

  });

  describe('isValid', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_DM)).toEqual(true);
      });

      test('should return true when given a valid instance', () => {
        expect(isValid(
          new EntityDataKey(
            mockEntitySetId, mockEntityKeyId
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const entityDataKey = (new EntityDataKeyBuilder())
          .setEntityKeyId(mockEntityKeyId)
          .setEntitySetId(mockEntitySetId)
          .build();

        expect(isValid(entityDataKey)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "entityKeyId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_DM, { entityKeyId: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entitySetId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_DM, { entitySetId: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entitySetId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntityDataKey(
              invalidInput, mockEntityKeyId
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entityKeyId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntityDataKey(
              mockEntitySetId, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('valueOf', () => {

    test('Immutable.Set', () => {

      const randomEntityKeyId = genRandomUUID();
      const randomEntitySetId = genRandomUUID();
      const testSet = Set().withMutations((mutableSet) => {
        mutableSet.add(new EntityDataKey(mockEntitySetId, mockEntityKeyId));
        mutableSet.add(new EntityDataKey(randomEntitySetId, randomEntityKeyId));
        mutableSet.add(new EntityDataKey(mockEntitySetId, mockEntityKeyId));
      });
      expect(testSet.size).toEqual(2);
      expect(testSet.first().entityKeyId).toEqual(mockEntityKeyId);
      expect(testSet.first().entitySetId).toEqual(mockEntitySetId);
      expect(testSet.last().entityKeyId).toEqual(randomEntityKeyId);
      expect(testSet.last().entitySetId).toEqual(randomEntitySetId);
    });

    test('Immutable.Map', () => {

      const randomEntityKeyId = genRandomUUID();
      const randomEntitySetId = genRandomUUID();
      const edk0 = new EntityDataKey(mockEntitySetId, mockEntityKeyId);
      const edk1 = new EntityDataKey(randomEntitySetId, randomEntityKeyId);
      const edk2 = new EntityDataKey(mockEntitySetId, mockEntityKeyId);

      const testMap = Map().withMutations((mutableMap) => {
        mutableMap.set(edk0, 'test_value_1');
        mutableMap.set(edk1, 'test_value_2');
        mutableMap.set(edk2, 'test_value_3');
      });
      expect(testMap.size).toEqual(2);
      expect(testMap.get(edk0)).toEqual('test_value_3');
      expect(testMap.get(edk1)).toEqual('test_value_2');
    });

  });

});
