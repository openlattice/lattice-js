import Ace, { AceBuilder, isValid } from './Ace';
import { PermissionTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED } from '../utils/testing/Invalid';
import { MOCK_ACE_DM } from '../utils/testing/MockDataModels';

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

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPrincipal(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setPrincipal();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPrincipal(MOCK_ACE_DM.principal);
        }).not.toThrow();
      });

    });

    describe('setPermissions()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setPermissions(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPermissions([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setPermissions(Object.values(PermissionTypes).push(invalidInput));
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setPermissions();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        Object.values(PermissionTypes).forEach((type) => {
          expect(() => {
            builder.setPermissions([type]);
          }).not.toThrow();
        });
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new AceBuilder()).build();
        }).toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const ace = builder.setPrincipal(MOCK_ACE_DM.principal).build();
        expect(ace.permissions).toEqual([]);
      });

      test('should return a valid instance', () => {

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

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACE_DM)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Ace(
            MOCK_ACE_DM.principal, MOCK_ACE_DM.permissions
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const ace = (new AceBuilder())
          .setPrincipal(MOCK_ACE_DM.principal)
          .setPermissions(MOCK_ACE_DM.permissions)
          .build();

        expect(isValid(ace)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACE_DM, { principal: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACE_DM, { permissions: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACE_DM, { permissions: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Ace(
              invalidInput, MOCK_ACE_DM.permissions
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
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
