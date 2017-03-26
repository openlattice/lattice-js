import PermissionTypes from '../../src/constants/types/PermissionTypes';

import Request, {
  RequestBuilder,
  isValid
} from '../../src/models/Request';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_SS_PARAMS,
  INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED
} from '../constants/InvalidParams';

import {
  MOCK_REQUEST_DM
} from '../constants/MockDataModels';

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
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setAclKey([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey([...MOCK_REQUEST_DM.aclKey, invalidInput]);
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
          builder.setAclKey(MOCK_REQUEST_DM.aclKey);
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

    describe('setReason()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setReason(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setReason();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setReason(MOCK_REQUEST_DM.reason);
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
            .setAclKey(MOCK_REQUEST_DM.aclKey)
            .build();
        }).not.toThrow();
      });

      it('should set required properties that are allowed to be empty', () => {

        const request = builder
          .setAclKey(MOCK_REQUEST_DM.aclKey)
          .build();

        expect(request.permissions).toEqual([]);
      });

      it('should return a valid instance', () => {

        const request = builder
          .setAclKey(MOCK_REQUEST_DM.aclKey)
          .setPermissions(MOCK_REQUEST_DM.permissions)
          .setReason(MOCK_REQUEST_DM.reason)
          .build();

        expect(request).toEqual(jasmine.any(Request));

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

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_REQUEST_DM)).toEqual(true);
      });

      it('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Request(
            MOCK_REQUEST_DM.aclKey, MOCK_REQUEST_DM.permissions, MOCK_REQUEST_DM.reason
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const request = (new RequestBuilder())
          .setAclKey(MOCK_REQUEST_DM.aclKey)
          .setPermissions(MOCK_REQUEST_DM.permissions)
          .setReason(MOCK_REQUEST_DM.reason)
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
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_DM, { aclKey: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_REQUEST_DM, { aclKey: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "permissions" property', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_DM, { permissions: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_REQUEST_DM, { permissions: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "reason" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_REQUEST_DM, { reason: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "aclKey" property', () => {
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

      it('should return false when given an instance with an invalid "permissions" property', () => {
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

      it('should return false when given an instance with an invalid "reason" property', () => {
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
