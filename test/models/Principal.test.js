import PrincipalTypes from '../../src/constants/PrincipalTypes';

import Principal, {
  PrincipalBuilder,
  isValid
} from '../../src/models/Principal';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_TYPE = 'USER';
const MOCK_ID = 'principalId';

const MOCK_PRINCIPAL_OBJ = {
  type: MOCK_TYPE,
  id: MOCK_ID
};

fdescribe('Principal', () => {

  describe('PrincipalBuilder', () => {

    let builder :PrincipalBuilder = null;

    beforeEach(() => {
      builder = new PrincipalBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setType()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setType();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setType(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given a valid PrincipalType', () => {
        Object.values(PrincipalTypes).forEach((type) => {
          expect(() => {
            builder.setType(type);
          }).not.toThrow();
        });
      });

    });

    describe('setId()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setId();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setId(invalidInput);
          }).toThrow();
        });
      });

    });

    describe('build()', () => {

      it('should return a Principal instance with the correct properties', () => {

        const principal = builder
          .setType(MOCK_TYPE)
          .setId(MOCK_ID)
          .build();

        expect(principal).toEqual(jasmine.any(Principal));

        expect(principal.type).toBeDefined();
        expect(principal.type).toEqual(MOCK_TYPE);

        expect(principal.id).toBeDefined();
        expect(principal.id).toEqual(MOCK_ID);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid Principal object literal', () => {
        expect(isValid(MOCK_PRINCIPAL_OBJ)).toEqual(true);
      });

      it('should return true when given a valid Principal instance ', () => {
        expect(isValid(new Principal(MOCK_TYPE, MOCK_ID))).toEqual(true);
      });

      it('should return true when given a Principal instance constructed by the builder', () => {

        const principal = new PrincipalBuilder()
          .setType(MOCK_TYPE)
          .setId(MOCK_ID)
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

      it('should return false when given an invalid Principal object literal', () => {
        INVALID_PARAMS.forEach((invalidInput1) => {
          INVALID_PARAMS.forEach((invalidInput2) => {
            expect(isValid({ type: invalidInput1, id: invalidInput2 })).toEqual(false);
          });
        });
      });

      it('should return false when given a Principal object literal with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ type: invalidInput, id: MOCK_ID })).toEqual(false);
        });
      });

      it('should return false when given a Principal object literal with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ type: MOCK_TYPE, id: invalidInput })).toEqual(false);
        });
      });

      it('should return false when given a Principal instance with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const principal = new Principal(MOCK_TYPE, MOCK_ID);
          principal.type = invalidInput;
          expect(isValid(principal)).toEqual(false);
        });
      });

      it('should return false when given a Principal instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const principal = new Principal(MOCK_TYPE, MOCK_ID);
          principal.id = invalidInput;
          expect(isValid(principal)).toEqual(false);
        });
      });

    });

  });

});
