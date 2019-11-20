import { Map, Set, fromJS } from 'immutable';
import AccessCheck, { AccessCheckBuilder, isValidAccessCheck as isValid } from './AccessCheck';
import { PermissionTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY } from '../utils/testing/Invalid';
import { MOCK_ACCESS_CHECK, genRandomAccessCheck } from '../utils/testing/MockData';

describe('AccessCheck', () => {

  describe('AccessCheckBuilder', () => {

    describe('setAclKey()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AccessCheckBuilder()).setAclKey(invalidInput);
          }).toThrow();
          expect(() => {
            (new AccessCheckBuilder()).setAclKey([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AccessCheckBuilder()).setAclKey([...MOCK_ACCESS_CHECK.aclKey, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AccessCheckBuilder()).setAclKey();
        }).not.toThrow();
        expect(() => {
          (new AccessCheckBuilder()).setAclKey([]);
        }).not.toThrow();
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

      test('should set required properties that are allowed to be empty', () => {

        const accessCheck = (new AccessCheckBuilder()).build();
        expect(accessCheck.aclKey).toEqual([]);
        expect(accessCheck.permissions).toEqual([]);
      });

      test('should return a valid instance', () => {

        const accessCheck = (new AccessCheckBuilder())
          .setAclKey(MOCK_ACCESS_CHECK.aclKey)
          .setPermissions(MOCK_ACCESS_CHECK.permissions)
          .build();

        expect(accessCheck).toBeInstanceOf(AccessCheck);

        expect(accessCheck.aclKey).toBeDefined();
        expect(accessCheck.permissions).toBeDefined();

        expect(accessCheck.aclKey).toEqual(MOCK_ACCESS_CHECK.aclKey);
        expect(accessCheck.permissions).toEqual(MOCK_ACCESS_CHECK.permissions);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACCESS_CHECK)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new AccessCheck(
            MOCK_ACCESS_CHECK.aclKey, MOCK_ACCESS_CHECK.permissions
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

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
            new AccessCheck(
              invalidInput, MOCK_ACCESS_CHECK.permissions
            )
          )).toEqual(false);
          expect(isValid(
            new AccessCheck(
              [invalidInput], MOCK_ACCESS_CHECK.permissions
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new AccessCheck(
              MOCK_ACCESS_CHECK.aclKey, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new AccessCheck(
              MOCK_ACCESS_CHECK.aclKey, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const accessCheck = new AccessCheck(
        MOCK_ACCESS_CHECK.aclKey,
        MOCK_ACCESS_CHECK.permissions,
      );
      expect(accessCheck.valueOf()).toEqual(
        fromJS({
          aclKey: MOCK_ACCESS_CHECK.aclKey,
          permissions: MOCK_ACCESS_CHECK.permissions,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomAccessCheck = genRandomAccessCheck();
      const accessCheck0 = new AccessCheck(
        MOCK_ACCESS_CHECK.aclKey,
        MOCK_ACCESS_CHECK.permissions,
      );
      const accessCheck1 = new AccessCheck(
        MOCK_ACCESS_CHECK.aclKey,
        MOCK_ACCESS_CHECK.permissions,
      );

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
      const accessCheck0 = new AccessCheck(
        MOCK_ACCESS_CHECK.aclKey,
        MOCK_ACCESS_CHECK.permissions,
      );
      const accessCheck1 = new AccessCheck(
        MOCK_ACCESS_CHECK.aclKey,
        MOCK_ACCESS_CHECK.permissions,
      );

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
