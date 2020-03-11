/*
 * @flow
 */

import { Map, Set, fromJS } from 'immutable';

import {
  Ace,
  AceBuilder,
  MOCK_ACE,
  MOCK_ACE_OBJECT,
  genRandomAce,
  isValidAce as isValid,
} from './Ace';

import { PermissionTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY } from '../utils/testing/Invalid';
import {
  testBuilderBuild,
  testBuilderConstructor,
  testBuilderSet,
  testBuilderSetTypes,
} from '../utils/testing/ModelTestUtils';

describe('Ace', () => {

  describe('AceBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(Ace, AceBuilder, MOCK_ACE);
    });

    describe('setPrincipal()', () => {
      const validParams = [MOCK_ACE.principal];
      testBuilderSet(AceBuilder, 'setPrincipal', validParams);
    });

    describe('setPermissions()', () => {
      testBuilderSetTypes(AceBuilder, 'setPermissions', PermissionTypes, true);
    });

    describe('build()', () => {

      test('should set required properties that are allowed to be empty', () => {

        const ace = (new AceBuilder())
          .setPrincipal(MOCK_ACE.principal)
          .build();

        expect(ace.permissions).toEqual([]);
      });

      testBuilderBuild(Ace, AceBuilder, MOCK_ACE, {
        optional: {
          setPermissions: MOCK_ACE.permissions,
        },
        required: {
          setPrincipal: MOCK_ACE.principal,
        },
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACE_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_ACE)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACE_OBJECT, principal: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ACE_OBJECT, permissions: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ACE_OBJECT, permissions: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Ace({
              permissions: MOCK_ACE.permissions,
              principal: invalidInput,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Ace({
              principal: MOCK_ACE.principal,
              permissions: invalidInput,
            })
          )).toEqual(false);
          expect(isValid(
            new Ace({
              principal: MOCK_ACE.principal,
              permissions: [invalidInput],
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_ACE.valueOf()).toEqual(
        fromJS({
          permissions: MOCK_ACE.permissions,
          principal: MOCK_ACE.principal.toObject(),
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomAce = genRandomAce();
      const ace0 = (new AceBuilder(MOCK_ACE)).build();
      const ace1 = (new AceBuilder(MOCK_ACE)).build();

      const testSet = Set()
        .add(ace0)
        .add(randomAce)
        .add(ace1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().permissions).toEqual(MOCK_ACE.permissions);
      expect(testSet.first().principal).toEqual(MOCK_ACE.principal);

      expect(testSet.last().permissions).toEqual(randomAce.permissions);
      expect(testSet.last().principal).toEqual(randomAce.principal);
    });

    test('Immutable.Map', () => {

      const randomAce = genRandomAce();
      const ace0 = (new AceBuilder(MOCK_ACE)).build();
      const ace1 = (new AceBuilder(MOCK_ACE)).build();

      const testMap = Map()
        .set(ace0, 'test_value_1')
        .set(randomAce, 'test_value_2')
        .set(ace1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(ace0)).toEqual('test_value_3');
      expect(testMap.get(randomAce)).toEqual('test_value_2');
      expect(testMap.get(ace1)).toEqual('test_value_3');
    });

  });

});
