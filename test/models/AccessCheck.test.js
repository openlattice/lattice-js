import PermissionTypes from '../../src/constants/types/PermissionTypes';

import AccessCheck, {
  AccessCheckBuilder,
  isValid
} from '../../src/models/AccessCheck';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED
} from '../constants/InvalidParams';

import {
  MOCK_ACCESS_CHECK_DM
} from '../constants/MockDataModels';

describe('AccessCheck', () => {

  describe('AccessCheckBuilder', () => {

    let builder :AccessCheckBuilder = null;

    beforeEach(() => {
      builder = new AccessCheckBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setAclKey()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setAclKey([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey([...MOCK_ACCESS_CHECK_DM.aclKey, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setAclKey();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setAclKey(MOCK_ACCESS_CHECK_DM.aclKey);
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

      it('should set required properties that are allowed to be empty', () => {

        const accessCheck = builder.build();
        expect(accessCheck.aclKey).toEqual([]);
        expect(accessCheck.permissions).toEqual([]);
      });

      it('should return a valid instance', () => {

        const accessCheck = builder
          .setAclKey(MOCK_ACCESS_CHECK_DM.aclKey)
          .setPermissions(MOCK_ACCESS_CHECK_DM.permissions)
          .build();

        expect(accessCheck).toEqual(jasmine.any(AccessCheck));

        expect(accessCheck.aclKey).toBeDefined();
        expect(accessCheck.aclKey).toEqual(MOCK_ACCESS_CHECK_DM.aclKey);

        expect(accessCheck.permissions).toBeDefined();
        expect(accessCheck.permissions).toEqual(MOCK_ACCESS_CHECK_DM.permissions);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACCESS_CHECK_DM)).toEqual(true);
      });

      it('should return true when given a valid object instance ', () => {
        expect(isValid(
          new AccessCheck(
            MOCK_ACCESS_CHECK_DM.aclKey, MOCK_ACCESS_CHECK_DM.permissions
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const accessCheck = (new AccessCheckBuilder())
          .setAclKey(MOCK_ACCESS_CHECK_DM.aclKey)
          .setPermissions(MOCK_ACCESS_CHECK_DM.permissions)
          .build();

        expect(isValid(accessCheck)).toEqual(true);
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

      it('should return false when given an object literal with an invalid "aclKey" property', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_DM, { aclKey: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_DM, { aclKey: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_DM, { permissions: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_DM, { permissions: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "aclKey" property', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
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
