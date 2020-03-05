import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_ENTITY_DATA_KEY,
  MOCK_ENTITY_DATA_KEY_OBJECT,
  EntityDataKey,
  EntityDataKeyBuilder,
  genRandomEntityDataKey,
  isValidEntityDataKey as isValid,
} from './EntityDataKey';

import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';

function expectValidInstance(value) {

  expect(value).toBeInstanceOf(EntityDataKey);

  expect(value.entityKeyId).toBeDefined();
  expect(value.entitySetId).toBeDefined();

  expect(value.entityKeyId).toEqual(MOCK_ENTITY_DATA_KEY.entityKeyId);
  expect(value.entitySetId).toEqual(MOCK_ENTITY_DATA_KEY.entitySetId);
}

describe('EntityDataKey', () => {

  describe('EntityDataKeyBuilder', () => {

    describe('constructor()', () => {

      test('should construct given an instance', () => {
        expectValidInstance(
          (new EntityDataKeyBuilder(MOCK_ENTITY_DATA_KEY)).build()
        );
      });

      test('should construct given an object literal', () => {
        expectValidInstance(
          (new EntityDataKeyBuilder({ ...MOCK_ENTITY_DATA_KEY })).build()
        );
        expectValidInstance(
          (new EntityDataKeyBuilder(MOCK_ENTITY_DATA_KEY_OBJECT)).build()
        );
      });

      test('should construct given an immutable object', () => {
        expectValidInstance(
          (new EntityDataKeyBuilder(MOCK_ENTITY_DATA_KEY.toImmutable())).build()
        );
        expectValidInstance(
          (new EntityDataKeyBuilder(fromJS({ ...MOCK_ENTITY_DATA_KEY }))).build()
        );
        expectValidInstance(
          (new EntityDataKeyBuilder(fromJS(MOCK_ENTITY_DATA_KEY_OBJECT))).build()
        );
      });

    });

    describe('setEntityKeyId()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new EntityDataKeyBuilder()).setEntityKeyId();
        }).toThrow();
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new EntityDataKeyBuilder()).setEntityKeyId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityDataKeyBuilder()).setEntityKeyId(MOCK_ENTITY_DATA_KEY.entityKeyId);
        }).not.toThrow();
      });

    });

    describe('setEntitySetId()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new EntityDataKeyBuilder()).setEntitySetId();
        }).toThrow();
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new EntityDataKeyBuilder()).setEntitySetId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityDataKeyBuilder()).setEntitySetId(MOCK_ENTITY_DATA_KEY.entitySetId);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          // omitting setEntityKeyId()
          (new EntityDataKeyBuilder())
            .setEntitySetId(MOCK_ENTITY_DATA_KEY.entitySetId)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setEntitySetId()
          (new EntityDataKeyBuilder())
            .setEntityKeyId(MOCK_ENTITY_DATA_KEY.entityKeyId)
            .build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const entityDataKey = (new EntityDataKeyBuilder())
          .setEntityKeyId(MOCK_ENTITY_DATA_KEY.entityKeyId)
          .setEntitySetId(MOCK_ENTITY_DATA_KEY.entitySetId)
          .build();

        expectValidInstance(entityDataKey);
      });

    });

  });

  describe('isValid', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ENTITY_DATA_KEY_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_ENTITY_DATA_KEY)).toEqual(true);
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
          expect(isValid({ ...MOCK_ENTITY_DATA_KEY_OBJECT, entityKeyId: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entitySetId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_DATA_KEY_OBJECT, entitySetId: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entityKeyId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntityDataKey({
              entityKeyId: invalidInput,
              entitySetId: MOCK_ENTITY_DATA_KEY.entitySetId,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entitySetId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntityDataKey({
              entityKeyId: MOCK_ENTITY_DATA_KEY.entityKeyId,
              entitySetId: invalidInput,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_ENTITY_DATA_KEY.valueOf()).toEqual(
        fromJS({
          entityKeyId: MOCK_ENTITY_DATA_KEY.entityKeyId,
          entitySetId: MOCK_ENTITY_DATA_KEY.entitySetId,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomEntityDataKey = genRandomEntityDataKey();
      const entityDataKey0 = (new EntityDataKeyBuilder(MOCK_ENTITY_DATA_KEY)).build();
      const entityDataKey1 = (new EntityDataKeyBuilder(MOCK_ENTITY_DATA_KEY)).build();

      const testSet = Set()
        .add(entityDataKey0)
        .add(randomEntityDataKey)
        .add(entityDataKey1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().acl).toEqual(MOCK_ENTITY_DATA_KEY.acl);
      expect(testSet.first().action).toEqual(MOCK_ENTITY_DATA_KEY.action);

      expect(testSet.last().acl).toEqual(randomEntityDataKey.acl);
      expect(testSet.last().action).toEqual(randomEntityDataKey.action);
    });

    test('Immutable.Map', () => {

      const randomEntityDataKey = genRandomEntityDataKey();
      const entityDataKey0 = (new EntityDataKeyBuilder(MOCK_ENTITY_DATA_KEY)).build();
      const entityDataKey1 = (new EntityDataKeyBuilder(MOCK_ENTITY_DATA_KEY)).build();

      const testMap = Map()
        .set(entityDataKey0, 'test_value_1')
        .set(randomEntityDataKey, 'test_value_2')
        .set(entityDataKey1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(entityDataKey0)).toEqual('test_value_3');
      expect(testMap.get(randomEntityDataKey)).toEqual('test_value_2');
      expect(testMap.get(entityDataKey1)).toEqual('test_value_3');
    });

  });

});
