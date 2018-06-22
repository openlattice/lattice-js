import AclData, { AclDataBuilder, isValidAclData as isValid } from './AclData';
import { ActionTypes } from '../constants/types';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_ACL_DATA_DM } from '../utils/testing/MockDataModels';

describe('AclData', () => {

  describe('AclDataBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new AclDataBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setAcl()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAcl(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setAcl();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setAcl(MOCK_ACL_DATA_DM.acl);
        }).not.toThrow();
      });

    });

    describe('setAction()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            builder.setAction(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setAction();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        Object.values(ActionTypes).forEach((type) => {
          expect(() => {
            builder.setAction(type);
          }).not.toThrow();
        });
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new AclDataBuilder())
            .setAcl(MOCK_ACL_DATA_DM.acl)
            .build();
        }).toThrow();

        expect(() => {
          (new AclDataBuilder())
            .setAction(MOCK_ACL_DATA_DM.action)
            .build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const acl = builder
          .setAcl(MOCK_ACL_DATA_DM.acl)
          .setAction(MOCK_ACL_DATA_DM.action)
          .build();

        expect(acl).toBeInstanceOf(AclData);

        expect(acl.acl).toBeDefined();
        expect(acl.acl).toEqual(MOCK_ACL_DATA_DM.acl);

        expect(acl.action).toBeDefined();
        expect(acl.action).toEqual(MOCK_ACL_DATA_DM.action);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACL_DATA_DM)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new AclData(
            MOCK_ACL_DATA_DM.acl, MOCK_ACL_DATA_DM.action
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const acl = (new AclDataBuilder())
          .setAcl(MOCK_ACL_DATA_DM.acl)
          .setAction(MOCK_ACL_DATA_DM.action)
          .build();

        expect(isValid(acl)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "acl" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACL_DATA_DM, { acl: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "action" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACL_DATA_DM, { action: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "acl" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AclData(
              invalidInput, MOCK_ACL_DATA_DM.action
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "action" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new AclData(
              MOCK_ACL_DATA_DM.acl, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
