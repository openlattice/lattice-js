import PermissionTypes from '../../src/constants/types/PermissionTypes';

import Ace, {
  AceBuilder,
  isValid
} from '../../src/models/Ace';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED
} from '../constants/InvalidParams';

import {
  MOCK_ACE_DM
} from '../constants/MockDataModels';

describe('Ace', () => {

  describe('AceBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new AceBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setPrincipal()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPrincipal(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setPrincipal();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPrincipal(MOCK_ACE_DM.principal);
        }).not.toThrow();
      });

    });

    describe('setPermissions()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setPermissions(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPermissions([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setPermissions(Object.values(PermissionTypes).push(invalidInput));
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setPermissions();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        Object.values(PermissionTypes).forEach((type) => {
          expect(() => {
            builder.setPermissions([type]);
          }).not.toThrow();
        });
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new AceBuilder()).build();
        }).toThrow();
      });

      it('should set required properties that are allowed to be empty', () => {

        const ace = builder.setPrincipal(MOCK_ACE_DM.principal).build();
        expect(ace.permissions).toEqual([]);
      });

      it('should return a valid instance', () => {

        const ace = builder
          .setPrincipal(MOCK_ACE_DM.principal)
          .setPermissions(MOCK_ACE_DM.permissions)
          .build();

        expect(ace).toEqual(jasmine.any(Ace));

        expect(ace.principal).toBeDefined();
        expect(ace.principal).toEqual(MOCK_ACE_DM.principal);

        expect(ace.permissions).toBeDefined();
        expect(ace.permissions).toEqual(MOCK_ACE_DM.permissions);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACE_DM)).toEqual(true);
      });

      it('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Ace(
            MOCK_ACE_DM.principal, MOCK_ACE_DM.permissions
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const ace = (new AceBuilder())
          .setPrincipal(MOCK_ACE_DM.principal)
          .setPermissions(MOCK_ACE_DM.permissions)
          .build();

        expect(isValid(ace)).toEqual(true);
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

      it('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACE_DM, { principal: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACE_DM, { permissions: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACE_DM, { permissions: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Ace(
              invalidInput, MOCK_ACE_DM.permissions
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Ace(
              MOCK_ACE_DM.principal, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new Ace(
              MOCK_ACE_DM.principal, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
