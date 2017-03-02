import PermissionTypes from '../../src/constants/types/PermissionTypes';

import Request, {
  RequestBuilder,
  isValid
} from '../../src/models/Request';

import {
  isDefined
} from '../../src/utils/LangUtils';

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

const MOCK_REASON = 'reason';

const MOCK_REQUEST_OBJ = {
  aclKey: MOCK_ACL_KEY,
  permissions: MOCK_PERMISSIONS,
  reason: MOCK_REASON
};

const INVALID_PERMISSION_TYPES = INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.slice(0);
INVALID_PERMISSION_TYPES.push('invalid');

describe('Request', () => {

  describe('RequestBuilder', () => {

    let builder :RequestBuilder = null;

    beforeEach(() => {
      builder = new RequestBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setAclKey()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setAclKey([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey([...MOCK_ACL_KEY, invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setAclKey();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setAclKey(MOCK_ACL_KEY);
        }).not.toThrow();
      });

    });

    describe('setPermissions()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PERMISSION_TYPES.forEach((invalidInput) => {
          expect(() => {
            builder.setPermissions(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPermissions([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PERMISSION_TYPES.forEach((invalidInput) => {
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

    describe('setReason()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setReason(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setReason();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setReason(MOCK_REASON);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new RequestBuilder()).build();
        }).toThrow();
      });

      it('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new RequestBuilder())
            .setAclKey(MOCK_ACL_KEY)
            .build();
        }).not.toThrow();
      });

      it('should set required properties that are allowed to be empty', () => {

        const request = builder
          .setAclKey(MOCK_ACL_KEY)
          .build();

        expect(request.permissions).toEqual([]);
      });

      it('should return a valid instance', () => {

        const request = builder
          .setAclKey(MOCK_ACL_KEY)
          .setPermissions(MOCK_PERMISSIONS)
          .setReason(MOCK_REASON)
          .build();

        expect(request).toEqual(jasmine.any(Request));

        expect(request.aclKey).toBeDefined();
        expect(request.aclKey).toEqual(MOCK_ACL_KEY);

        expect(request.permissions).toBeDefined();
        expect(request.permissions).toEqual(MOCK_PERMISSIONS);

        expect(request.reason).toBeDefined();
        expect(request.reason).toEqual(MOCK_REASON);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_REQUEST_OBJ)).toEqual(true);
      });

      it('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Request(
            MOCK_ACL_KEY, MOCK_PERMISSIONS, MOCK_REASON
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const request = (new RequestBuilder())
          .setAclKey(MOCK_ACL_KEY)
          .setPermissions(MOCK_PERMISSIONS)
          .setReason(MOCK_REASON)
          .build();

        expect(isValid(request)).toEqual(true);
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
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_OBJ, { aclKey: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_REQUEST_OBJ, { aclKey: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_PERMISSION_TYPES.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_OBJ, { permissions: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_REQUEST_OBJ, { permissions: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "reason" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_REQUEST_OBJ, { reason: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an instance with an invalid "aclKey" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Request(
              invalidInput, MOCK_PERMISSIONS, MOCK_REASON
            )
          )).toEqual(false);
          expect(isValid(
            new Request(
              [invalidInput], MOCK_PERMISSIONS, MOCK_REASON
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_PERMISSION_TYPES.forEach((invalidInput) => {
          expect(isValid(
            new Request(
              MOCK_ACL_KEY, invalidInput, MOCK_REASON
            )
          )).toEqual(false);
          expect(isValid(
            new Request(
              MOCK_ACL_KEY, [invalidInput], MOCK_REASON
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "reason" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new Request(
                MOCK_ACL_KEY, MOCK_PERMISSIONS, invalidInput
              )
            )).toEqual(false);
          }
        });
      });

    });

  });

});
