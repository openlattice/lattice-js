import { Map, Set, fromJS } from 'immutable';
import Principal, { PrincipalBuilder, isValidPrincipal as isValid } from './Principal';
import { PrincipalTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_PRINCIPAL, genRandomPrincipal } from '../utils/testing/MockDataModels';

describe('Principal', () => {

  describe('PrincipalBuilder', () => {

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new PrincipalBuilder()).setId();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new PrincipalBuilder()).setId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PrincipalBuilder()).setId(MOCK_PRINCIPAL.id);
        }).not.toThrow();
      });

    });

    describe('setType()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new PrincipalBuilder()).setType();
        }).toThrow();
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new PrincipalBuilder()).setType(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        Object.values(PrincipalTypes).forEach((type) => {
          expect(() => {
            (new PrincipalBuilder()).setType(type);
          }).not.toThrow();
        });
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new PrincipalBuilder())
            .setType(MOCK_PRINCIPAL.type)
            .build();
        }).toThrow();

        expect(() => {
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

        expect(principal).toBeInstanceOf(Principal);

        expect(principal.type).toBeDefined();
        expect(principal.type).toEqual(MOCK_PRINCIPAL.type);

        expect(principal.id).toBeDefined();
        expect(principal.id).toEqual(MOCK_PRINCIPAL.id);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_PRINCIPAL)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new Principal(
            MOCK_PRINCIPAL.id,
            MOCK_PRINCIPAL.type,
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const principal = (new PrincipalBuilder())
          .setId(MOCK_PRINCIPAL.id)
          .setType(MOCK_PRINCIPAL.type)
          .build();

        expect(isValid(principal)).toEqual(true);
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
          expect(isValid({ ...MOCK_PRINCIPAL, id: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_PRINCIPAL, type: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Principal(
              invalidInput,
              MOCK_PRINCIPAL.type,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new Principal(
              MOCK_PRINCIPAL.id,
              invalidInput,
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const entityType = new Principal(
        MOCK_PRINCIPAL.id,
        MOCK_PRINCIPAL.type,
      );
      expect(entityType.valueOf()).toEqual(
        fromJS({
          id: MOCK_PRINCIPAL.id,
          type: MOCK_PRINCIPAL.type,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomPrincipal = genRandomPrincipal();
      const principal0 = new Principal(
        MOCK_PRINCIPAL.id,
        MOCK_PRINCIPAL.type,
      );
      const principal1 = new Principal(
        MOCK_PRINCIPAL.id,
        MOCK_PRINCIPAL.type,
      );

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
      const principal0 = new Principal(
        MOCK_PRINCIPAL.id,
        MOCK_PRINCIPAL.type,
      );
      const principal1 = new Principal(
        MOCK_PRINCIPAL.id,
        MOCK_PRINCIPAL.type,
      );

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
