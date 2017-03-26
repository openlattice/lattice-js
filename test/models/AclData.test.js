import ActionTypes from '../../src/constants/types/ActionTypes';

import AclData, {
  AclDataBuilder,
  isValid
} from '../../src/models/AclData';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

import {
  MOCK_ACL_DATA_DM
} from '../constants/MockDataModels';

describe('AclData', () => {

  describe('AclDataBuilder', () => {

    let builder :AclDataBuilder = null;

    beforeEach(() => {
      builder = new AclDataBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setAcl()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAcl(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setAcl();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setAcl(MOCK_ACL_DATA_DM.acl);
        }).not.toThrow();
      });

    });

    describe('setAction()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAction(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setAction();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        Object.values(ActionTypes).forEach((type) => {
          expect(() => {
            builder.setAction(type);
          }).not.toThrow();
        });
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

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

      it('should return a valid instance', () => {

        const acl = builder
          .setAcl(MOCK_ACL_DATA_DM.acl)
          .setAction(MOCK_ACL_DATA_DM.action)
          .build();

        expect(acl).toEqual(jasmine.any(AclData));

        expect(acl.acl).toBeDefined();
        expect(acl.acl).toEqual(MOCK_ACL_DATA_DM.acl);

        expect(acl.action).toBeDefined();
        expect(acl.action).toEqual(MOCK_ACL_DATA_DM.action);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACL_DATA_DM)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new AclData(
            MOCK_ACL_DATA_DM.acl, MOCK_ACL_DATA_DM.action
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const acl = (new AclDataBuilder())
          .setAcl(MOCK_ACL_DATA_DM.acl)
          .setAction(MOCK_ACL_DATA_DM.action)
          .build();

        expect(isValid(acl)).toEqual(true);
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

      it('should return false when given an object literal with an invalid "acl" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACL_DATA_DM, { acl: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "action" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACL_DATA_DM, { action: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "acl" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AclData(
              invalidInput, MOCK_ACL_DATA_DM.action
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "action" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
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
