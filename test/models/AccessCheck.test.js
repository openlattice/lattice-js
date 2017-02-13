import PermissionTypes from '../../src/constants/types/PermissionTypes';

import AccessCheck, {
  AccessCheckBuilder,
  isValid
} from '../../src/models/AccessCheck';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED
} from '../constants/TestConstants';

const MOCK_ACL_KEY = [
  'ec6865e6-e60e-424b-a071-6a9c1603d735'
];

const MOCK_PERMISSIONS = [
  'READ'
];

const MOCK_ACCESS_CHECK_OBJ = {
  aclKey: MOCK_ACL_KEY,
  permissions: MOCK_PERMISSIONS
};

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
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setAclKey([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey([...MOCK_ACL_KEY, invalidInput]);
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
          builder.setAclKey(MOCK_ACL_KEY);
        }).not.toThrow();
      });

    });

    describe('setPermissions()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setPermissions(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPermissions([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
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
          .setAclKey(MOCK_ACL_KEY)
          .setPermissions(MOCK_PERMISSIONS)
          .build();

        expect(accessCheck).toEqual(jasmine.any(AccessCheck));

        expect(accessCheck.aclKey).toBeDefined();
        expect(accessCheck.aclKey).toEqual(MOCK_ACL_KEY);

        expect(accessCheck.permissions).toBeDefined();
        expect(accessCheck.permissions).toEqual(MOCK_PERMISSIONS);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACCESS_CHECK_OBJ)).toEqual(true);
      });

      it('should return true when given a valid object instance ', () => {
        expect(isValid(
          new AccessCheck(
            MOCK_ACL_KEY, MOCK_PERMISSIONS
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const accessCheck = (new AccessCheckBuilder())
          .setAclKey(MOCK_ACL_KEY)
          .setPermissions(MOCK_PERMISSIONS)
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
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_OBJ, { aclKey: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_OBJ, { aclKey: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_OBJ, { permissions: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACCESS_CHECK_OBJ, { permissions: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "aclKey" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new AccessCheck(
              invalidInput, MOCK_PERMISSIONS
            )
          )).toEqual(false);
          expect(isValid(
            new AccessCheck(
              [invalidInput], MOCK_PERMISSIONS
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new AccessCheck(
              MOCK_ACL_KEY, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new AccessCheck(
              MOCK_ACL_KEY, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
