import AccessCheck, { AccessCheckBuilder, isValidAccessCheck as isValid } from './AccessCheck';
import { PermissionTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY } from '../utils/testing/Invalid';
import { MOCK_ACCESS_CHECK_DM } from '../utils/testing/MockDataModels';

describe('AccessCheck', () => {

  describe('AccessCheckBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new AccessCheckBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setAclKey()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setAclKey([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey([...MOCK_ACCESS_CHECK_DM.aclKey, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setAclKey();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setAclKey(MOCK_ACCESS_CHECK_DM.aclKey);
        }).not.toThrow();
      });

    });

    describe('setPermissions()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            builder.setPermissions(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPermissions([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
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

      test('should set required properties that are allowed to be empty', () => {

        const accessCheck = builder.build();
        expect(accessCheck.aclKey).toEqual([]);
        expect(accessCheck.permissions).toEqual([]);
      });

      test('should return a valid instance', () => {

        const accessCheck = builder
          .setAclKey(MOCK_ACCESS_CHECK_DM.aclKey)
          .setPermissions(MOCK_ACCESS_CHECK_DM.permissions)
          .build();

        expect(accessCheck).toBeInstanceOf(AccessCheck);

        expect(accessCheck.aclKey).toBeDefined();
        expect(accessCheck.aclKey).toEqual(MOCK_ACCESS_CHECK_DM.aclKey);

        expect(accessCheck.permissions).toBeDefined();
        expect(accessCheck.permissions).toEqual(MOCK_ACCESS_CHECK_DM.permissions);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACCESS_CHECK_DM)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new AccessCheck(
            MOCK_ACCESS_CHECK_DM.aclKey, MOCK_ACCESS_CHECK_DM.permissions
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const accessCheck = (new AccessCheckBuilder())
          .setAclKey(MOCK_ACCESS_CHECK_DM.aclKey)
          .setPermissions(MOCK_ACCESS_CHECK_DM.permissions)
          .build();

        expect(isValid(accessCheck)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "aclKey" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_DM, { aclKey: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_DM, { aclKey: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_DM, { permissions: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_DM, { permissions: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "aclKey" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new AccessCheck(
              invalidInput, MOCK_ACCESS_CHECK_DM.permissions
            )
          )).toEqual(false);
          expect(isValid(
            new AccessCheck(
              [invalidInput], MOCK_ACCESS_CHECK_DM.permissions
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new AccessCheck(
              MOCK_ACCESS_CHECK_DM.aclKey, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new AccessCheck(
              MOCK_ACCESS_CHECK_DM.aclKey, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
