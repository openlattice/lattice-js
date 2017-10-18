import Acl, {
  AclBuilder,
  isValid
} from '../../src/models/Acl';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_ARRAY_ALLOWED,
  INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED
} from '../constants/InvalidParams';

import {
  MOCK_ACL_DM
} from '../constants/MockDataModels';

describe('Acl', () => {

  describe('AclBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new AclBuilder();
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
            builder.setAclKey([...MOCK_ACL_DM.aclKey, invalidInput]);
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
          builder.setAclKey(MOCK_ACL_DM.aclKey);
        }).not.toThrow();
      });

    });

    describe('setAces()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAces(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setAces([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAces([...MOCK_ACL_DM.aces, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setAces();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setAces(MOCK_ACL_DM.aces);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should set required properties that are allowed to be empty', () => {

        const org = builder.build();

        expect(org.aclKey).toEqual([]);
        expect(org.aces).toEqual([]);
      });

      it('should return a valid instance', () => {

        const acl = builder
          .setAclKey(MOCK_ACL_DM.aclKey)
          .setAces(MOCK_ACL_DM.aces)
          .build();

        expect(acl).toEqual(jasmine.any(Acl));

        expect(acl.aclKey).toBeDefined();
        expect(acl.aclKey).toEqual(MOCK_ACL_DM.aclKey);

        expect(acl.aces).toBeDefined();
        expect(acl.aces).toEqual(MOCK_ACL_DM.aces);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACL_DM)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new Acl(
            MOCK_ACL_DM.aclKey, MOCK_ACL_DM.aces
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const acl = (new AclBuilder())
          .setAclKey(MOCK_ACL_DM.aclKey)
          .setAces(MOCK_ACL_DM.aces)
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

      it('should return false when given an object literal with an invalid "aclKey" property', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACL_DM, { aclKey: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACL_DM, { aclKey: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "aces" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACL_DM, { aces: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACL_DM, { aces: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "aclKey" property', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Acl(
              invalidInput, MOCK_ACL_DM.aces
            )
          )).toEqual(false);
          expect(isValid(
            new Acl(
              [invalidInput], MOCK_ACL_DM.aces
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "aces" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Acl(
              MOCK_ACL_DM.aclKey, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new Acl(
              MOCK_ACL_DM.aclKey, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
