import Acl, {
  AclBuilder,
  isValid
} from '../../src/models/Acl';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_ACL_KEY = [
  {
    type: 'EntityType',
    id: 'ec6865e6-e60e-424b-a071-6a9c1603d735'
  }
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

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setAclKey();
        }).toThrow();
      });

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

      it('should throw when given a mix of valid and invalid AclKeyFragments', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAclKey([...MOCK_ACL_KEY, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when given valid AclKeyFragments', () => {
        expect(() => {
          builder.setAclKey(MOCK_ACL_KEY);
        }).not.toThrow();
      });

    });

    describe('setAces()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setAces();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAces(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setAces([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid Aces', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAces([...MOCK_ACES, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when given valid Aces', () => {
        expect(() => {
          builder.setAces(MOCK_ACES);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should return a valid Acl instance', () => {

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

      it('should return true when given a valid Acl object literal', () => {
        expect(isValid(MOCK_ACL_OBJ)).toEqual(true);
      });

      it('should return true when given a valid Acl instance ', () => {
        expect(isValid(new Acl(MOCK_ACL_KEY, MOCK_ACES))).toEqual(true);
      });

      it('should return true when given an Acl instance constructed by the builder', () => {

        const acl = new AclBuilder()
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

      it('should return false when given an invalid Acl object literal', () => {
        INVALID_PARAMS.forEach((invalidInput1) => {
          INVALID_PARAMS.forEach((invalidInput2) => {
            expect(isValid({ aclKey: invalidInput1, aces: invalidInput2 })).toEqual(false);
            expect(isValid({ aclKey: [invalidInput1], aces: [invalidInput2] })).toEqual(false);
          });
        });
      });

      it('should return false when given an Acl object literal with an invalid "aclKey" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ aclKey: invalidInput, aces: MOCK_ACES })).toEqual(false);
        });
      });

      it('should return false when given an Acl object literal with an invalid "aces" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ aclKey: MOCK_ACL_KEY, aces: invalidInput })).toEqual(false);
          expect(isValid({ aclKey: MOCK_ACL_KEY, aces: [invalidInput] })).toEqual(false);
        });
      });

      it('should return false when given an Acl instance with an invalid "aclKey" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const acl = new Acl(MOCK_ACL_KEY, MOCK_ACES);
          acl.aclKey = invalidInput;
          expect(isValid(acl)).toEqual(false);
        });
      });

      it('should return false when given an Acl instance with an invalid "aces" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const acl = new Acl(MOCK_ACL_KEY, MOCK_ACES);
          acl.aces = invalidInput;
          expect(isValid(acl)).toEqual(false);
          acl.aces = [invalidInput];
          expect(isValid(acl)).toEqual(false);
        });
      });

    });

  });

});
