import SecurableTypes from '../../src/constants/types/SecurableTypes';

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

      it('should not throw when given valid parameters', () => {
        Object.values(SecurableTypes).forEach((type) => {
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

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setId(MOCK_ID);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new AclKeyFragmentBuilder())
            .setType(MOCK_TYPE)
            .build();
        }).toThrow();

        expect(() => {
          (new AclKeyFragmentBuilder())
            .setId(MOCK_ID)
            .build();
        }).toThrow();
      });

      it('should return a valid instance', () => {

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

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_AKF_OBJ)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new AclKeyFragment(
            MOCK_TYPE, MOCK_ID
          ))).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const acl = (new AclKeyFragmentBuilder())
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

      it('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_AKF_OBJ, { type: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_AKF_OBJ, { id: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AclKeyFragment(
              invalidInput, MOCK_ID
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AclKeyFragment(
              MOCK_TYPE, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
