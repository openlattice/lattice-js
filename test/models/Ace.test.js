import PermissionTypes from '../../src/constants/PermissionTypes';

import Ace, {
  AceBuilder,
  isValid
} from '../../src/models/Ace';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_PRINCIPAL = {
  type: 'USER',
  id: 'principalId'
};

const MOCK_PERMISSIONS = [
  'READ'
];

const MOCK_ACE_OBJ = {
  principal: MOCK_PRINCIPAL,
  permissions: MOCK_PERMISSIONS
};

describe('Ace', () => {

  describe('AceBuilder', () => {

    let builder :AceBuilder = null;

    beforeEach(() => {
      builder = new AceBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setPrincipal()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setPrincipal();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPrincipal(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPrincipal(MOCK_PRINCIPAL);
        }).not.toThrow();
      });

    });

    describe('setPermissions()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setPermissions();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPermissions(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPermissions([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPermissions(Object.values(PermissionTypes).push(invalidInput));
          }).toThrow();
        });
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
          (new AceBuilder())
            .setPrincipal(MOCK_PRINCIPAL)
            .build();
        }).toThrow();

        expect(() => {
          (new AceBuilder())
            .setPermissions(MOCK_PERMISSIONS)
            .build();
        }).toThrow();
      });

      it('should return a valid instance', () => {

        const ace = builder
          .setPrincipal(MOCK_PRINCIPAL)
          .setPermissions(MOCK_PERMISSIONS)
          .build();

        expect(ace).toEqual(jasmine.any(Ace));

        expect(ace.principal).toBeDefined();
        expect(ace.principal).toEqual(MOCK_PRINCIPAL);

        expect(ace.permissions).toBeDefined();
        expect(ace.permissions).toEqual(MOCK_PERMISSIONS);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACE_OBJ)).toEqual(true);
      });

      it('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Ace(
            MOCK_PRINCIPAL, MOCK_PERMISSIONS
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const ace = (new AceBuilder())
          .setPrincipal(MOCK_PRINCIPAL)
          .setPermissions(MOCK_PERMISSIONS)
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
          expect(isValid(Object.assign({}, MOCK_ACE_OBJ, { principal: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACE_OBJ, { permissions: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACE_OBJ, { permissions: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Ace(
              invalidInput, MOCK_PERMISSIONS
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Ace(
              MOCK_PRINCIPAL, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new Ace(
              MOCK_PRINCIPAL, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
