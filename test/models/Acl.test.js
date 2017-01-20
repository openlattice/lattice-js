import Acl, {
  AclBuilder,
  isValid
} from '../../src/models/Acl';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED
} from '../constants/TestConstants';

const MOCK_ACL_KEY = [
  'ec6865e6-e60e-424b-a071-6a9c1603d735'
];

const MOCK_ACES = [
  {
    principal: {
      type: 'USER',
      id: 'principalId'
    },
    permissions: [
      'READ'
    ]
  }
];

const MOCK_ACL_OBJ = {
  aclKey: MOCK_ACL_KEY,
  aces: MOCK_ACES
};

describe('Acl', () => {

  describe('AclBuilder', () => {

    let builder :AclBuilder = null;

    beforeEach(() => {
      builder = new AclBuilder();
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

    describe('setAces()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAces(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setAces([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAces([...MOCK_ACES, invalidInput]);
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
          builder.setAces(MOCK_ACES);
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
          .setAclKey(MOCK_ACL_KEY)
          .setAces(MOCK_ACES)
          .build();

        expect(acl).toEqual(jasmine.any(Acl));

        expect(acl.aclKey).toBeDefined();
        expect(acl.aclKey).toEqual(MOCK_ACL_KEY);

        expect(acl.aces).toBeDefined();
        expect(acl.aces).toEqual(MOCK_ACES);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ACL_OBJ)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new Acl(
            MOCK_ACL_KEY, MOCK_ACES
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const acl = (new AclBuilder())
          .setAclKey(MOCK_ACL_KEY)
          .setAces(MOCK_ACES)
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
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACL_OBJ, { aclKey: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACL_OBJ, { aclKey: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "aces" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ACL_OBJ, { aces: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ACL_OBJ, { aces: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "aclKey" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Acl(
              invalidInput, MOCK_ACES
            )
          )).toEqual(false);
          expect(isValid(
            new Acl(
              [invalidInput], MOCK_ACES
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "aces" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Acl(
              MOCK_ACL_KEY, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new Acl(
              MOCK_ACL_KEY, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
