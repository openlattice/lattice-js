import ActionTypes from '../../src/constants/ActionTypes';

import AclData, {
  AclDataBuilder,
  isValid
} from '../../src/models/AclData';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_ACTION = 'ADD';

const MOCK_ACL = {
  aclKey: [
    {
      type: 'EntityType',
      id: 'ec6865e6-e60e-424b-a071-6a9c1603d735'
    }
  ],
  aces: [
    {
      principal: {
        type: 'USER',
        id: 'principalId'
      },
      permissions: [
        'READ'
      ]
    }
  ]
};

const MOCK_ACL_DATA_OBJ = {
  acl: MOCK_ACL,
  action: MOCK_ACTION
};

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

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setAcl();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAcl(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given a valid Acl', () => {
        expect(() => {
          builder.setAcl(MOCK_ACL);
        }).not.toThrow();
      });

    });

    describe('setAction()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setAction();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setAction(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given a valid Action', () => {
        Object.values(ActionTypes).forEach((type) => {
          expect(() => {
            builder.setAction([type]);
          }).not.toThrow();
        });
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new AclDataBuilder())
            .setAcl(MOCK_ACL)
            .build();
        }).toThrow();

        expect(() => {
          (new AclDataBuilder())
            .setAction(MOCK_ACTION)
            .build();
        }).toThrow();
      });

      it('should return a valid AclData instance', () => {

        const acl = builder
          .setAcl(MOCK_ACL)
          .setAction(MOCK_ACTION)
          .build();

        expect(acl).toEqual(jasmine.any(AclData));

        expect(acl.acl).toBeDefined();
        expect(acl.acl).toEqual(MOCK_ACL);

        expect(acl.action).toBeDefined();
        expect(acl.action).toEqual(MOCK_ACTION);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid AclData object literal', () => {
        expect(isValid(MOCK_ACL_DATA_OBJ)).toEqual(true);
      });

      it('should return true when given a valid AclData instance ', () => {
        expect(isValid(new AclData(MOCK_ACL, MOCK_ACTION))).toEqual(true);
      });

      it('should return true when given an AclData instance constructed by the builder', () => {

        const acl = (new AclDataBuilder())
          .setAcl(MOCK_ACL)
          .setAction(MOCK_ACTION)
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

      it('should return false when given an invalid AclData object literal', () => {
        INVALID_PARAMS.forEach((invalidInput1) => {
          INVALID_PARAMS.forEach((invalidInput2) => {
            expect(isValid({ acl: invalidInput1, action: invalidInput2 })).toEqual(false);
          });
        });
      });

      it('should return false when given an AclData object literal with an invalid "acl" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ acl: invalidInput, action: MOCK_ACTION })).toEqual(false);
        });
      });

      it('should return false when given an AclData object literal with an invalid "action" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ acl: MOCK_ACL, action: invalidInput })).toEqual(false);
        });
      });

      it('should return false when given an AclData instance with an invalid "acl" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const aclData = new AclData(MOCK_ACL, MOCK_ACTION);
          aclData.acl = invalidInput;
          expect(isValid(aclData)).toEqual(false);
        });
      });

      it('should return false when given an AclData instance with an invalid "action" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const aclData = new AclData(MOCK_ACL, MOCK_ACTION);
          aclData.action = invalidInput;
          expect(isValid(aclData)).toEqual(false);
        });
      });

    });

  });

});
