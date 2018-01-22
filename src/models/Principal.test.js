import Principal, { PrincipalBuilder, isValid } from './Principal';
import { PrincipalTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_PRINCIPAL_DM } from '../utils/testing/MockDataModels';

describe('Principal', () => {

  describe('PrincipalBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new PrincipalBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setType()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            builder.setType(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setType();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        Object.values(PrincipalTypes).forEach((type) => {
          expect(() => {
            builder.setType(type);
          }).not.toThrow();
        });
      });

    });

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setId(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setId();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setId(MOCK_PRINCIPAL_DM.id);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new PrincipalBuilder())
            .setType(MOCK_PRINCIPAL_DM.type)
            .build();
        }).toThrow();

        expect(() => {
          (new PrincipalBuilder())
            .setId(MOCK_PRINCIPAL_DM.id)
            .build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const principal = builder
          .setType(MOCK_PRINCIPAL_DM.type)
          .setId(MOCK_PRINCIPAL_DM.id)
          .build();

        expect(principal).toEqual(jasmine.any(Principal));

        expect(principal.type).toBeDefined();
        expect(principal.type).toEqual(MOCK_PRINCIPAL_DM.type);

        expect(principal.id).toBeDefined();
        expect(principal.id).toEqual(MOCK_PRINCIPAL_DM.id);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_PRINCIPAL_DM)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new Principal(
            MOCK_PRINCIPAL_DM.type, MOCK_PRINCIPAL_DM.id
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const principal = (new PrincipalBuilder())
          .setType(MOCK_PRINCIPAL_DM.type)
          .setId(MOCK_PRINCIPAL_DM.id)
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

      test('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PRINCIPAL_DM, { type: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PRINCIPAL_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new Principal(
              invalidInput, MOCK_PRINCIPAL_DM.id
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Principal(
              MOCK_PRINCIPAL_DM.type, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
