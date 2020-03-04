import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_ACCESS_CHECK,
  AccessCheck,
  AccessCheckBuilder,
  genRandomAccessCheck,
  isValidAccessCheck as isValid,
} from './AccessCheck';

import { PermissionTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY, INVALID_PARAMS_SS } from '../utils/testing/Invalid';

function expectValidInstance(value) {

  expect(value).toBeInstanceOf(AccessCheck);

  expect(value.aclKey).toBeDefined();
  expect(value.permissions).toBeDefined();

  expect(value.aclKey).toEqual(MOCK_ACCESS_CHECK.aclKey);
  expect(value.permissions).toEqual(MOCK_ACCESS_CHECK.permissions);
}


describe('AccessCheck', () => {

  describe('AccessCheckBuilder', () => {

    describe('constructor()', () => {

      test('should construct given an instance', () => {
        expectValidInstance(
          (new AccessCheckBuilder(MOCK_ACCESS_CHECK)).build()
        );
      });

      test('should construct given an object literal', () => {
        expectValidInstance(
          (new AccessCheckBuilder({ ...MOCK_ACCESS_CHECK })).build()
        );
        expectValidInstance(
          (new AccessCheckBuilder(MOCK_ACCESS_CHECK.toObject())).build()
        );
      });

      test('should construct given an immutable object', () => {
        expectValidInstance(
          (new AccessCheckBuilder(MOCK_ACCESS_CHECK.toImmutable())).build()
        );
        expectValidInstance(
          (new AccessCheckBuilder(fromJS({ ...MOCK_ACCESS_CHECK }))).build()
        );
        expectValidInstance(
          (new AccessCheckBuilder(fromJS(MOCK_ACCESS_CHECK.toObject()))).build()
        );
      });

    });

    describe('setAclKey()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new AccessCheckBuilder()).setAclKey(invalidInput);
          }).toThrow();
          expect(() => {
            (new AccessCheckBuilder()).setAclKey([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new AccessCheckBuilder()).setAclKey([...MOCK_ACCESS_CHECK.aclKey, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AccessCheckBuilder()).setAclKey(MOCK_ACCESS_CHECK.aclKey);
        }).not.toThrow();
      });

    });

    describe('setPermissions()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AccessCheckBuilder()).setPermissions(invalidInput);
          }).toThrow();
          expect(() => {
            (new AccessCheckBuilder()).setPermissions([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AccessCheckBuilder()).setPermissions(Object.values(PermissionTypes).push(invalidInput));
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AccessCheckBuilder()).setPermissions();
        }).not.toThrow();
        expect(() => {
          (new AccessCheckBuilder()).setPermissions([]);
        }).not.toThrow();
        Object.values(PermissionTypes).forEach((type) => {
          expect(() => {
            (new AccessCheckBuilder()).setPermissions([type]);
          }).not.toThrow();
        });
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {
        expect(() => {
          (new AccessCheckBuilder()).build();
        }).toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const accessCheck = (new AccessCheckBuilder())
          .setAclKey(MOCK_ACCESS_CHECK.aclKey)
          .build();

        expect(accessCheck.permissions).toEqual([]);
      });

      test('should return a valid instance', () => {

        const accessCheck = (new AccessCheckBuilder())
          .setAclKey(MOCK_ACCESS_CHECK.aclKey)
          .setPermissions(MOCK_ACCESS_CHECK.permissions)
          .build();

        expectValidInstance(accessCheck);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACCESS_CHECK.toObject())).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_ACCESS_CHECK)).toEqual(true);
      });

      test('should return true when given a valid instance constructed by the builder', () => {

        const accessCheck = (new AccessCheckBuilder())
          .setAclKey(MOCK_ACCESS_CHECK.aclKey)
          .setPermissions(MOCK_ACCESS_CHECK.permissions)
          .build();

        expect(isValid(accessCheck)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "aclKey" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACCESS_CHECK, aclKey: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ACCESS_CHECK, aclKey: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACCESS_CHECK, permissions: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ACCESS_CHECK, permissions: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "aclKey" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new AccessCheck({
              aclKey: invalidInput,
              permissions: MOCK_ACCESS_CHECK.permissions,
            })
          )).toEqual(false);
          expect(isValid(
            new AccessCheck({
              aclKey: [invalidInput],
              permissions: MOCK_ACCESS_CHECK.permissions,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new AccessCheck({
              aclKey: MOCK_ACCESS_CHECK.aclKey,
              permissions: invalidInput,
            })
          )).toEqual(false);
          expect(isValid(
            new AccessCheck({
              aclKey: MOCK_ACCESS_CHECK.aclKey,
              permissions: [invalidInput],
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_ACCESS_CHECK.valueOf()).toEqual(
        fromJS({
          aclKey: MOCK_ACCESS_CHECK.aclKey,
          permissions: MOCK_ACCESS_CHECK.permissions,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomAccessCheck = genRandomAccessCheck();
      const accessCheck0 = new AccessCheck({ ...MOCK_ACCESS_CHECK });
      const accessCheck1 = new AccessCheck({ ...MOCK_ACCESS_CHECK });

      const testSet = Set()
        .add(accessCheck0)
        .add(randomAccessCheck)
        .add(accessCheck1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().aclKey).toEqual(MOCK_ACCESS_CHECK.aclKey);
      expect(testSet.first().permissions).toEqual(MOCK_ACCESS_CHECK.permissions);

      expect(testSet.last().aclKey).toEqual(randomAccessCheck.aclKey);
      expect(testSet.last().permissions).toEqual(randomAccessCheck.permissions);
    });

    test('Immutable.Map', () => {

      const randomAccessCheck = genRandomAccessCheck();
      const accessCheck0 = new AccessCheck({ ...MOCK_ACCESS_CHECK });
      const accessCheck1 = new AccessCheck({ ...MOCK_ACCESS_CHECK });

      const testMap = Map()
        .set(accessCheck0, 'test_value_1')
        .set(randomAccessCheck, 'test_value_2')
        .set(accessCheck1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(accessCheck0)).toEqual('test_value_3');
      expect(testMap.get(randomAccessCheck)).toEqual('test_value_2');
      expect(testMap.get(accessCheck1)).toEqual('test_value_3');
    });

  });

});
