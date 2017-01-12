import SecurableObjectTypes from '../../src/constants/SecurableObjectTypes';

import AclKeyFragment, {
  AclKeyFragmentBuilder,
  isValid
} from '../../src/models/AclKeyFragment';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_TYPE = 'EntityType';
const MOCK_ID = 'ec6865e6-e60e-424b-a071-6a9c1603d735';

const MOCK_AKF_OBJ = {
  type: MOCK_TYPE,
  id: MOCK_ID
};

describe('AclKeyFragment', () => {

  describe('AclKeyFragmentBuilder', () => {

    let builder :AclKeyFragmentBuilder = null;

    beforeEach(() => {
      builder = new AclKeyFragmentBuilder();
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

      it('should not throw when given valid SecurableObjectTypes', () => {
        Object.values(SecurableObjectTypes).forEach((type) => {
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

      it('should not throw when given valid Aces', () => {
        expect(() => {
          builder.setId(MOCK_ID);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should return a valid AclKeyFragment instance', () => {

        const frag = builder
          .setType(MOCK_TYPE)
          .setId(MOCK_ID)
          .build();

        expect(frag).toEqual(jasmine.any(AclKeyFragment));

        expect(frag.type).toBeDefined();
        expect(frag.type).toEqual(MOCK_TYPE);

        expect(frag.id).toBeDefined();
        expect(frag.id).toEqual(MOCK_ID);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid AclKeyFragment object literal', () => {
        expect(isValid(MOCK_AKF_OBJ)).toEqual(true);
      });

      it('should return true when given a valid AclKeyFragment instance ', () => {
        expect(isValid(new AclKeyFragment(MOCK_TYPE, MOCK_ID))).toEqual(true);
      });

      it('should return true when given an AclKeyFragment instance constructed by the builder', () => {

        const acl = new AclKeyFragmentBuilder()
          .setType(MOCK_TYPE)
          .setId(MOCK_ID)
          .build();

        expect(isValid(acl)).toEqual(true);
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

      it('should return false when given an invalid AclKeyFragment object literal', () => {
        INVALID_PARAMS.forEach((invalidInput1) => {
          INVALID_PARAMS.forEach((invalidInput2) => {
            expect(isValid({ type: invalidInput1, id: invalidInput2 })).toEqual(false);
          });
        });
      });

      it('should return false when given an AclKeyFragment object literal with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ type: invalidInput, id: MOCK_ID })).toEqual(false);
        });
      });

      it('should return false when given an AclKeyFragment object literal with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ type: MOCK_TYPE, id: invalidInput })).toEqual(false);
        });
      });

      it('should return false when given an AclKeyFragment instance with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const frag = new AclKeyFragment(MOCK_TYPE, MOCK_ID);
          frag.type = invalidInput;
          expect(isValid(frag)).toEqual(false);
        });
      });

      it('should return false when given an AclKeyFragment instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const frag = new AclKeyFragment(MOCK_TYPE, MOCK_ID);
          frag.id = invalidInput;
          expect(isValid(frag)).toEqual(false);
        });
      });

    });

  });

});
