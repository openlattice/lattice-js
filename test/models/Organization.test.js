import Organization, {
  OrganizationBuilder,
  isValid
} from '../../src/models/Organization';

import {
  isDefined
} from '../../src/utils/LangUtils';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_ORG_UUID = 'ec6865e6-e60e-424b-a071-6a9c1603d735';
const MOCK_TITLE = 'MyOrganization';
const MOCK_DESCRIPTION = 'what an organization';
const MOCK_EMAIL_DOMAIN = 'kryptnostic.com';

const MOCK_USER_PRINCIPAL = {
  type: 'USER',
  id: 'principalId_0'
};

const MOCK_ROLE_PRINCIPAL = {
  type: 'ROLE',
  id: 'principalId_1'
};

const MOCK_ORG_OBJ = {
  id: MOCK_ORG_UUID,
  title: MOCK_TITLE,
  description: MOCK_DESCRIPTION,
  members: [MOCK_USER_PRINCIPAL],
  roles: [MOCK_ROLE_PRINCIPAL],
  emails: [MOCK_EMAIL_DOMAIN]
};

describe('Organization', () => {

  describe('OrganizationBuilder', () => {

    // "undefined" and "[]" are allowed
    const invalidParams = INVALID_PARAMS.slice(0);
    invalidParams.splice(3, 1); // remove "new Array()"
    invalidParams.splice(2, 1); // remove "[]"
    invalidParams.splice(0, 1); // remove "undefined"

    let builder :OrganizationBuilder = null;

    beforeEach(() => {
      builder = new OrganizationBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setId()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setId();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setId(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setId(MOCK_ORG_UUID);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setTitle();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setTitle(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setTitle(MOCK_TITLE);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setDescription();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setDescription(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setDescription(MOCK_DESCRIPTION);
        }).not.toThrow();
      });

    });

    describe('setMembers()', () => {

      it('should throw when given invalid parameters', () => {
        invalidParams.forEach((invalidInput) => {
          expect(() => {
            builder.setMembers(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        invalidParams.forEach((invalidInput) => {
          expect(() => {
            builder.setMembers([MOCK_USER_PRINCIPAL, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setMembers();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setMembers([MOCK_USER_PRINCIPAL]);
        }).not.toThrow();
      });

    });

    describe('setRoles()', () => {

      it('should throw when given invalid parameters', () => {
        invalidParams.forEach((invalidInput) => {
          expect(() => {
            builder.setRoles(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        invalidParams.forEach((invalidInput) => {
          expect(() => {
            builder.setRoles([MOCK_ROLE_PRINCIPAL, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setRoles();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setRoles([MOCK_ROLE_PRINCIPAL]);
        }).not.toThrow();
      });

    });

    describe('setAutoApprovedEmails()', () => {
      it('should throw when given invalid parameters', () => {
        invalidParams.forEach((invalidInput) => {
          expect(() => {
            builder.setAutoApprovedEmails(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        invalidParams.forEach((invalidInput) => {
          expect(() => {
            builder.setAutoApprovedEmails([MOCK_EMAIL_DOMAIN, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setAutoApprovedEmails();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setAutoApprovedEmails([MOCK_EMAIL_DOMAIN]);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new OrganizationBuilder()).build();
        }).toThrow();

      });

      it('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new OrganizationBuilder())
            .setTitle(MOCK_TITLE)
            .setDescription(MOCK_DESCRIPTION)
            .setMembers([MOCK_USER_PRINCIPAL])
            .setRoles([MOCK_ROLE_PRINCIPAL])
            .setAutoApprovedEmails([MOCK_EMAIL_DOMAIN])
            .build();
        }).not.toThrow();

        expect(() => {
          (new OrganizationBuilder())
            .setId(MOCK_ORG_UUID)
            .setTitle(MOCK_TITLE)
            .setMembers([MOCK_USER_PRINCIPAL])
            .setRoles([MOCK_ROLE_PRINCIPAL])
            .setAutoApprovedEmails([MOCK_EMAIL_DOMAIN])
            .build();
        }).not.toThrow();

      });

      it('should correctly set required properties when the properties have not been set', () => {

        const org = builder.setTitle(MOCK_TITLE).build();

        expect(org.members).toEqual([]);
        expect(org.roles).toEqual([]);
        expect(org.emails).toEqual([]);
      });

      it('should return a valid instance', () => {

        const org = builder
          .setId(MOCK_ORG_UUID)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .setMembers([MOCK_USER_PRINCIPAL])
          .setRoles([MOCK_ROLE_PRINCIPAL])
          .setAutoApprovedEmails([MOCK_EMAIL_DOMAIN])
          .build();

        expect(org).toEqual(jasmine.any(Organization));

        expect(org.id).toBeDefined();
        expect(org.id).toEqual(MOCK_ORG_UUID);

        expect(org.title).toBeDefined();
        expect(org.title).toEqual(MOCK_TITLE);

        expect(org.description).toBeDefined();
        expect(org.description).toEqual(MOCK_DESCRIPTION);

        expect(org.members).toBeDefined();
        expect(org.members).toEqual([MOCK_USER_PRINCIPAL]);

        expect(org.roles).toBeDefined();
        expect(org.roles).toEqual([MOCK_ROLE_PRINCIPAL]);

        expect(org.emails).toBeDefined();
        expect(org.emails).toEqual([MOCK_EMAIL_DOMAIN]);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ORG_OBJ)).toEqual(true);
      });

      it('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Organization(
            MOCK_ORG_UUID, MOCK_TITLE, MOCK_DESCRIPTION, [MOCK_USER_PRINCIPAL], [MOCK_ROLE_PRINCIPAL]
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const org = (new OrganizationBuilder())
          .setId(MOCK_ORG_UUID)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .setMembers([MOCK_USER_PRINCIPAL])
          .setRoles([MOCK_ROLE_PRINCIPAL])
          .build();

        expect(isValid(org)).toEqual(true);
      });

    });

    describe('invalid', () => {

      // "undefined" and "[]" are allowed
      const invalidParams = INVALID_PARAMS.slice(0);
      invalidParams.splice(3, 1); // remove "new Array()"
      invalidParams.splice(2, 1); // remove "[]"
      invalidParams.splice(0, 1); // remove "undefined"

      it('should return false when not given any parameters', () => {
        expect(isValid()).toEqual(false);
      });

      it('should return false when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(invalidInput)).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_ORG_OBJ, { id: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORG_OBJ, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_ORG_OBJ, { description: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an object literal with an invalid "members" property', () => {
        invalidParams.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORG_OBJ, { members: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "roles" property', () => {
        invalidParams.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORG_OBJ, { roles: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "emails" property', () => {
        invalidParams.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORG_OBJ, { emails: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new Organization(
                invalidInput,
                MOCK_TITLE,
                MOCK_DESCRIPTION,
                [MOCK_USER_PRINCIPAL],
                [MOCK_ROLE_PRINCIPAL],
                [MOCK_EMAIL_DOMAIN]
              )
            )).toEqual(false);
          }
        });
      });

      it('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORG_UUID,
              invalidInput,
              MOCK_DESCRIPTION,
              [MOCK_USER_PRINCIPAL],
              [MOCK_ROLE_PRINCIPAL],
              [MOCK_EMAIL_DOMAIN]
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new Organization(
                MOCK_ORG_UUID,
                MOCK_TITLE,
                invalidInput,
                [MOCK_USER_PRINCIPAL],
                [MOCK_ROLE_PRINCIPAL],
                [MOCK_EMAIL_DOMAIN]
              )
            )).toEqual(false);
          }
        });
      });

      it('should return false when given an instance with an invalid "members" property', () => {
        invalidParams.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORG_UUID,
              MOCK_TITLE,
              MOCK_DESCRIPTION,
              invalidInput,
              [MOCK_ROLE_PRINCIPAL],
              [MOCK_EMAIL_DOMAIN]
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "roles" property', () => {
        invalidParams.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORG_UUID,
              MOCK_TITLE,
              MOCK_DESCRIPTION,
              [MOCK_USER_PRINCIPAL],
              invalidInput,
              [MOCK_EMAIL_DOMAIN]
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "emails" property', () => {
        invalidParams.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORG_UUID,
              MOCK_TITLE,
              MOCK_DESCRIPTION,
              [MOCK_USER_PRINCIPAL],
              [MOCK_ROLE_PRINCIPAL],
              invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
