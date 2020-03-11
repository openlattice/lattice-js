/*
 * @flow
 */

import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_GRANT,
  MOCK_GRANT_OBJECT,
  Grant,
  GrantBuilder,
  genRandomGrant,
  isValidGrant as isValid,
} from './Grant';

import { GrantTypes } from '../constants/types';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';
import {
  testBuilderBuild,
  testBuilderConstructor,
  testBuilderSet,
  testBuilderSetType,
} from '../utils/testing/ModelTestUtils';

describe('Grant', () => {

  describe('GrantBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(Grant, GrantBuilder, MOCK_GRANT);
    });

    describe('setAttribute()', () => {
      const validParams = [MOCK_GRANT.attribute];
      testBuilderSet(GrantBuilder, 'setAttribute', validParams, true);
    });

    describe('setGrantType()', () => {
      testBuilderSetType(GrantBuilder, 'setGrantType', GrantTypes);
    });

    describe('setMappings()', () => {
      const validParams = [MOCK_GRANT.mappings];
      testBuilderSet(GrantBuilder, 'setMappings', validParams, true);
    });

    describe('build()', () => {

      test('should set required properties that are allowed to be empty', () => {

        const grant = (new GrantBuilder())
          .setGrantType(MOCK_GRANT.grantType)
          .build();

        expect(grant.attribute).toEqual('');
        expect(grant.mappings).toEqual([]);
      });

      testBuilderBuild(Grant, GrantBuilder, MOCK_GRANT, {
        optional: {
          setAttribute: MOCK_GRANT.attribute,
          setMappings: MOCK_GRANT.mappings,
        },
        required: {
          setGrantType: MOCK_GRANT.grantType,
        },
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_GRANT_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_GRANT)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "attribute" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_GRANT, attribute: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "grantType" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_GRANT, grantType: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "mappings" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_GRANT, mappings: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_GRANT, mappings: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "attribute" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new Grant({
              attribute: invalidInput,
              grantType: MOCK_GRANT.grantType,
              mappings: MOCK_GRANT.mappings,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "grantType" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new Grant({
              attribute: MOCK_GRANT.attribute,
              grantType: invalidInput,
              mappings: MOCK_GRANT.mappings,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "mappings" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Grant({
              attribute: MOCK_GRANT.attribute,
              grantType: MOCK_GRANT.grantType,
              mappings: invalidInput,
            })
          )).toEqual(false);
          expect(isValid(
            new Grant({
              attribute: MOCK_GRANT.attribute,
              grantType: MOCK_GRANT.grantType,
              mappings: [invalidInput],
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_GRANT.valueOf()).toEqual(
        fromJS({
          attribute: MOCK_GRANT.attribute,
          grantType: MOCK_GRANT.grantType,
          mappings: MOCK_GRANT.mappings,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomGrant = genRandomGrant();
      const grant0 = (new GrantBuilder(MOCK_GRANT)).build();
      const grant1 = (new GrantBuilder(MOCK_GRANT)).build();

      const testSet = Set()
        .add(grant0)
        .add(randomGrant)
        .add(grant1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().attribute).toEqual(MOCK_GRANT.attribute);
      expect(testSet.first().grantType).toEqual(MOCK_GRANT.grantType);
      expect(testSet.first().mappings).toEqual(MOCK_GRANT.mappings);

      expect(testSet.last().attribute).toEqual(randomGrant.attribute);
      expect(testSet.last().grantType).toEqual(randomGrant.grantType);
      expect(testSet.last().mappings).toEqual(randomGrant.mappings);
    });

    test('Immutable.Map', () => {

      const randomGrant = genRandomGrant();
      const grant0 = (new GrantBuilder(MOCK_GRANT)).build();
      const grant1 = (new GrantBuilder(MOCK_GRANT)).build();

      const testMap = Map()
        .set(grant0, 'test_value_1')
        .set(randomGrant, 'test_value_2')
        .set(grant1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(grant0)).toEqual('test_value_3');
      expect(testMap.get(randomGrant)).toEqual('test_value_2');
      expect(testMap.get(grant1)).toEqual('test_value_3');
    });

  });

});
