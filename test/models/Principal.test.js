import Principal, {
  PrincipalBuilder,
  isValid
} from '../../src/models/Principal';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_PRINCIPAL = {
  type: 'USER',
  id: 'principalId'
};

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

      it('should return a valid Principal instance', () => {

        const principal = builder.setType(MOCK_PRINCIPAL.type).setId(MOCK_PRINCIPAL.id).build();
        expect(principal).toEqual(jasmine.any(Principal));

        expect(principal.type).toBeDefined();
        expect(principal.type).toEqual(MOCK_PRINCIPAL.type);

        expect(principal.id).toBeDefined();
        expect(principal.id).toEqual(MOCK_PRINCIPAL.id);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid Principal object literal', () => {
        expect(isValid(MOCK_PRINCIPAL)).toEqual(true);
      });

      it('should return true when given a valid Principal instance ', () => {
        expect(isValid(new Principal(MOCK_PRINCIPAL.type, MOCK_PRINCIPAL.id))).toEqual(true);
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

      it('should return false when given a Principal object literal with an invalid type', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ type: invalidInput, id: MOCK_PRINCIPAL.id })).toEqual(false);
        });
      });

      it('should return false when given a Principal object literal with an invalid id', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ type: MOCK_PRINCIPAL.type, id: invalidInput })).toEqual(false);
        });
      });

      it('should return false when given an instance of Principal with an invalid type', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const principal = new Principal(MOCK_PRINCIPAL.type, MOCK_PRINCIPAL.id);
          principal.type = invalidInput;
          expect(isValid(principal)).toEqual(false);
        });
      });

      it('should return false when given an instance of Principal with an invalid id', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const principal = new Principal(MOCK_PRINCIPAL.type, MOCK_PRINCIPAL.id);
          principal.id = invalidInput;
          expect(isValid(principal)).toEqual(false);
        });
      });

    });

  });

});
