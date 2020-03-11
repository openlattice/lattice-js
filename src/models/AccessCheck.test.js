/*
 * @flow
 */

import { Map, Set, fromJS } from 'immutable';

import {
  AccessCheck,
  AccessCheckBuilder,
  MOCK_ACCESS_CHECK,
  MOCK_ACCESS_CHECK_OBJECT,
  genRandomAccessCheck,
  isValidAccessCheck as isValid,
} from './AccessCheck';

import { PermissionTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_OPTIONAL_ARRAY } from '../utils/testing/InvalidParams';
import {
  testBuilderConstructor,
  testBuilderSet,
  testBuilderSetTypes,
  testBuilderBuild,
} from '../utils/testing/ModelTestUtils';

describe('AccessCheck', () => {

  describe('AccessCheckBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(AccessCheck, AccessCheckBuilder, MOCK_ACCESS_CHECK);
    });

    describe('setAclKey()', () => {
      const validParams = [MOCK_ACCESS_CHECK.aclKey];
      testBuilderSet(AccessCheckBuilder, 'setAclKey', validParams);
    });

    describe('setPermissions()', () => {
      testBuilderSetTypes(AccessCheckBuilder, 'setPermissions', PermissionTypes, true);
    });

    describe('build()', () => {

      test('should set required properties that are allowed to be empty', () => {

        const accessCheck = (new AccessCheckBuilder())
          .setAclKey(MOCK_ACCESS_CHECK.aclKey)
          .build();

        expect(accessCheck.permissions).toEqual([]);
      });

      testBuilderBuild(AccessCheck, AccessCheckBuilder, MOCK_ACCESS_CHECK, {
        optional: {
          setPermissions: MOCK_ACCESS_CHECK.permissions,
        },
        required: {
          setAclKey: MOCK_ACCESS_CHECK.aclKey,
        },
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACCESS_CHECK_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_ACCESS_CHECK)).toEqual(true);
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
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACCESS_CHECK_OBJECT, aclKey: invalidInput })).toEqual(false);
        });
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACCESS_CHECK_OBJECT, aclKey: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_PARAMS_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACCESS_CHECK_OBJECT, permissions: invalidInput })).toEqual(false);
        });
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACCESS_CHECK_OBJECT, permissions: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "aclKey" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AccessCheck({
              aclKey: invalidInput,
              permissions: MOCK_ACCESS_CHECK.permissions,
            })
          )).toEqual(false);
        });
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AccessCheck({
              aclKey: [invalidInput],
              permissions: MOCK_ACCESS_CHECK.permissions,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_PARAMS_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new AccessCheck({
              aclKey: MOCK_ACCESS_CHECK.aclKey,
              permissions: invalidInput,
            })
          )).toEqual(false);
        });
        INVALID_PARAMS.forEach((invalidInput) => {
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
      const accessCheck0 = (new AccessCheckBuilder(MOCK_ACCESS_CHECK)).build();
      const accessCheck1 = (new AccessCheckBuilder(MOCK_ACCESS_CHECK)).build();

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
      const accessCheck0 = (new AccessCheckBuilder(MOCK_ACCESS_CHECK)).build();
      const accessCheck1 = (new AccessCheckBuilder(MOCK_ACCESS_CHECK)).build();

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
