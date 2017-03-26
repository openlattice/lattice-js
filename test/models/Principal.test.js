import PrincipalTypes from '../../src/constants/types/PrincipalTypes';

import Principal, {
  PrincipalBuilder,
  isValid
} from '../../src/models/Principal';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

import {
  MOCK_PRINCIPAL_DM
} from '../constants/MockDataModels';

describe('Principal', () => {

  describe('PrincipalBuilder', () => {

    let builder :PrincipalBuilder = null;

    beforeEach(() => {
      builder = new PrincipalBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setType()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setType(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setType();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        Object.values(PrincipalTypes).forEach((type) => {
          expect(() => {
            builder.setType(type);
          }).not.toThrow();
        });
      });

    });

    describe('setId()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setId(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setId();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setId(MOCK_PRINCIPAL_DM.id);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

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

      it('should return a valid instance', () => {

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

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_PRINCIPAL_DM)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new Principal(
            MOCK_PRINCIPAL_DM.type, MOCK_PRINCIPAL_DM.id
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const principal = (new PrincipalBuilder())
          .setType(MOCK_PRINCIPAL_DM.type)
          .setId(MOCK_PRINCIPAL_DM.id)
          .build();

        expect(isValid(principal)).toEqual(true);
      });

    });

    describe('invalid', () => {

      it('should return false when not given any parameters', () => {
        expect(isValid()).toEqual(false);
      });

      it('should return false when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(invalidInput)).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PRINCIPAL_DM, { type: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PRINCIPAL_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "type" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Principal(
              invalidInput, MOCK_PRINCIPAL_DM.id
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
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
