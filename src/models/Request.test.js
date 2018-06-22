import Request, { RequestBuilder, isValidRequest as isValid } from './Request';
import { PermissionTypes } from '../constants/types';
import { MOCK_REQUEST_DM } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_PARAMS_SS,
  INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED
} from '../utils/testing/Invalid';

describe('Request', () => {

  describe('RequestBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new RequestBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setAclKey()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setAclKey([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey([...MOCK_REQUEST_DM.aclKey, invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setAclKey();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setAclKey(MOCK_REQUEST_DM.aclKey);
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

    describe('setReason()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setReason(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setReason();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setReason(MOCK_REQUEST_DM.reason);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new RequestBuilder()).build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new RequestBuilder())
            .setAclKey(MOCK_REQUEST_DM.aclKey)
            .build();
        }).not.toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const request = builder
          .setAclKey(MOCK_REQUEST_DM.aclKey)
          .build();

        expect(request.permissions).toEqual([]);
      });

      test('should return a valid instance', () => {

        const request = builder
          .setAclKey(MOCK_REQUEST_DM.aclKey)
          .setPermissions(MOCK_REQUEST_DM.permissions)
          .setReason(MOCK_REQUEST_DM.reason)
          .build();

        expect(request).toBeInstanceOf(Request);

        expect(request.aclKey).toBeDefined();
        expect(request.aclKey).toEqual(MOCK_REQUEST_DM.aclKey);

        expect(request.permissions).toBeDefined();
        expect(request.permissions).toEqual(MOCK_REQUEST_DM.permissions);

        expect(request.reason).toBeDefined();
        expect(request.reason).toEqual(MOCK_REQUEST_DM.reason);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_REQUEST_DM)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Request(
            MOCK_REQUEST_DM.aclKey, MOCK_REQUEST_DM.permissions, MOCK_REQUEST_DM.reason
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const request = (new RequestBuilder())
          .setAclKey(MOCK_REQUEST_DM.aclKey)
          .setPermissions(MOCK_REQUEST_DM.permissions)
          .setReason(MOCK_REQUEST_DM.reason)
          .build();

        expect(isValid(request)).toEqual(true);
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
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_DM, { aclKey: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_REQUEST_DM, { aclKey: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_DM, { permissions: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_REQUEST_DM, { permissions: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "reason" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_DM, { reason: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "aclKey" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Request(
              invalidInput, MOCK_REQUEST_DM.permissions, MOCK_REQUEST_DM.reason
            )
          )).toEqual(false);
          expect(isValid(
            new Request(
              [invalidInput], MOCK_REQUEST_DM.permissions, MOCK_REQUEST_DM.reason
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "permissions" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Request(
              MOCK_REQUEST_DM.aclKey, invalidInput, MOCK_REQUEST_DM.reason
            )
          )).toEqual(false);
          expect(isValid(
            new Request(
              MOCK_REQUEST_DM.aclKey, [invalidInput], MOCK_REQUEST_DM.reason
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "reason" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Request(
              MOCK_REQUEST_DM.aclKey, MOCK_REQUEST_DM.permissions, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
