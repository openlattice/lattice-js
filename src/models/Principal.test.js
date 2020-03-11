import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_PRINCIPAL,
  MOCK_PRINCIPAL_OBJECT,
  Principal,
  PrincipalBuilder,
  genRandomPrincipal,
  isValidPrincipal as isValid,
} from './Principal';

import { PrincipalTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import {
  testBuilderConstructor,
  testBuilderSetter,
  testBuilderSetterOfType,
} from '../utils/testing/ModelTestUtils';

describe('Principal', () => {

  describe('PrincipalBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(Principal, PrincipalBuilder, MOCK_PRINCIPAL);
    });

    describe('setId()', () => {
      const validParams = [MOCK_PRINCIPAL.id];
      testBuilderSetter(PrincipalBuilder, 'setId', validParams);
    });

    describe('setType()', () => {
      testBuilderSetterOfType(PrincipalBuilder, 'setType', PrincipalTypes);
    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          // omitting setId()
          (new PrincipalBuilder())
            .setType(MOCK_PRINCIPAL.type)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setType()
          (new PrincipalBuilder())
            .setId(MOCK_PRINCIPAL.id)
            .build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const principal = (new PrincipalBuilder())
          .setId(MOCK_PRINCIPAL.id)
          .setType(MOCK_PRINCIPAL.type)
          .build();

        expectValidInstance(principal);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_PRINCIPAL_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_PRINCIPAL)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PRINCIPAL_OBJECT, id: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PRINCIPAL_OBJECT, type: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Principal({
              id: invalidInput,
              type: MOCK_PRINCIPAL.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new Principal({
              id: MOCK_PRINCIPAL.id,
              type: invalidInput,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_PRINCIPAL.valueOf()).toEqual(
        fromJS({
          id: MOCK_PRINCIPAL.id,
          type: MOCK_PRINCIPAL.type,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomPrincipal = genRandomPrincipal();
      const principal0 = (new PrincipalBuilder(MOCK_PRINCIPAL)).build();
      const principal1 = (new PrincipalBuilder(MOCK_PRINCIPAL)).build();

      const testSet = Set()
        .add(principal0)
        .add(randomPrincipal)
        .add(principal1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().id).toEqual(MOCK_PRINCIPAL.id);
      expect(testSet.first().type).toEqual(MOCK_PRINCIPAL.type);

      expect(testSet.last().id).toEqual(randomPrincipal.id);
      expect(testSet.last().type).toEqual(randomPrincipal.type);
    });

    test('Immutable.Map', () => {

      const randomPrincipal = genRandomPrincipal();
      const principal0 = (new PrincipalBuilder(MOCK_PRINCIPAL)).build();
      const principal1 = (new PrincipalBuilder(MOCK_PRINCIPAL)).build();

      const testMap = Map()
        .set(principal0, 'test_value_1')
        .set(randomPrincipal, 'test_value_2')
        .set(principal1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(principal0)).toEqual('test_value_3');
      expect(testMap.get(randomPrincipal)).toEqual('test_value_2');
      expect(testMap.get(principal1)).toEqual('test_value_3');
    });

  });

});
