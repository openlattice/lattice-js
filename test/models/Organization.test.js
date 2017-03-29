import Organization, {
  OrganizationBuilder,
  isValid
} from '../../src/models/Organization';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_SS_PARAMS_EMPTY_STRING_ALLOWED
} from '../constants/InvalidParams';

import {
  MOCK_ORGANIZATION_DM
} from '../constants/MockDataModels';

describe('Organization', () => {

  describe('OrganizationBuilder', () => {

    let builder :OrganizationBuilder = null;

    beforeEach(() => {
      builder = new OrganizationBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setId()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setId(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setId();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setId(MOCK_ORGANIZATION_DM.id);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setTitle(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setTitle();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setTitle(MOCK_ORGANIZATION_DM.title);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setDescription(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setDescription();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setDescription(MOCK_ORGANIZATION_DM.description);
        }).not.toThrow();
      });

    });

    describe('setMembers()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setMembers(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setMembers([...MOCK_ORGANIZATION_DM.members, invalidInput]);
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
          builder.setMembers(MOCK_ORGANIZATION_DM.members);
        }).not.toThrow();
      });

    });

    describe('setRoles()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setRoles(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setRoles([...MOCK_ORGANIZATION_DM.roles, invalidInput]);
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
          builder.setRoles(MOCK_ORGANIZATION_DM.roles);
        }).not.toThrow();
      });

    });

    describe('setAutoApprovedEmails()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAutoApprovedEmails(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAutoApprovedEmails([...MOCK_ORGANIZATION_DM.emails, invalidInput]);
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
          builder.setAutoApprovedEmails(MOCK_ORGANIZATION_DM.emails);
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
            .setTitle(MOCK_ORGANIZATION_DM.title)
            .setDescription(MOCK_ORGANIZATION_DM.description)
            .setMembers(MOCK_ORGANIZATION_DM.members)
            .setRoles(MOCK_ORGANIZATION_DM.roles)
            .setAutoApprovedEmails(MOCK_ORGANIZATION_DM.emails)
            .build();
        }).not.toThrow();

        expect(() => {
          (new OrganizationBuilder())
            .setId(MOCK_ORGANIZATION_DM.id)
            .setTitle(MOCK_ORGANIZATION_DM.title)
            .setMembers(MOCK_ORGANIZATION_DM.members)
            .setRoles(MOCK_ORGANIZATION_DM.roles)
            .setAutoApprovedEmails(MOCK_ORGANIZATION_DM.emails)
            .build();
        }).not.toThrow();
      });

      it('should set required properties that are allowed to be empty', () => {

        const org = builder.setTitle(MOCK_ORGANIZATION_DM.title).build();

        expect(org.members).toEqual([]);
        expect(org.roles).toEqual([]);
        expect(org.emails).toEqual([]);
      });

      it('should return a valid instance', () => {

        const org = builder
          .setId(MOCK_ORGANIZATION_DM.id)
          .setTitle(MOCK_ORGANIZATION_DM.title)
          .setDescription(MOCK_ORGANIZATION_DM.description)
          .setMembers(MOCK_ORGANIZATION_DM.members)
          .setRoles(MOCK_ORGANIZATION_DM.roles)
          .setAutoApprovedEmails(MOCK_ORGANIZATION_DM.emails)
          .build();

        expect(org).toEqual(jasmine.any(Organization));

        expect(org.id).toBeDefined();
        expect(org.id).toEqual(MOCK_ORGANIZATION_DM.id);

        expect(org.title).toBeDefined();
        expect(org.title).toEqual(MOCK_ORGANIZATION_DM.title);

        expect(org.description).toBeDefined();
        expect(org.description).toEqual(MOCK_ORGANIZATION_DM.description);

        expect(org.members).toBeDefined();
        expect(org.members).toEqual(MOCK_ORGANIZATION_DM.members);

        expect(org.roles).toBeDefined();
        expect(org.roles).toEqual(MOCK_ORGANIZATION_DM.roles);

        expect(org.emails).toBeDefined();
        expect(org.emails).toEqual(MOCK_ORGANIZATION_DM.emails);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ORGANIZATION_DM)).toEqual(true);
      });

      it('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Organization(
            MOCK_ORGANIZATION_DM.id,
            MOCK_ORGANIZATION_DM.title,
            MOCK_ORGANIZATION_DM.description,
            MOCK_ORGANIZATION_DM.members,
            MOCK_ORGANIZATION_DM.roles
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const org = (new OrganizationBuilder())
          .setId(MOCK_ORGANIZATION_DM.id)
          .setTitle(MOCK_ORGANIZATION_DM.title)
          .setDescription(MOCK_ORGANIZATION_DM.description)
          .setMembers(MOCK_ORGANIZATION_DM.members)
          .setRoles(MOCK_ORGANIZATION_DM.roles)
          .build();

        expect(isValid(org)).toEqual(true);
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

      it('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_SS_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "members" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { members: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "roles" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { roles: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "emails" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { emails: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_SS_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              invalidInput,
              MOCK_ORGANIZATION_DM.title,
              MOCK_ORGANIZATION_DM.description,
              MOCK_ORGANIZATION_DM.members,
              MOCK_ORGANIZATION_DM.roles,
              MOCK_ORGANIZATION_DM.emails
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              invalidInput,
              MOCK_ORGANIZATION_DM.description,
              MOCK_ORGANIZATION_DM.members,
              MOCK_ORGANIZATION_DM.roles,
              MOCK_ORGANIZATION_DM.emails
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              MOCK_ORGANIZATION_DM.title,
              invalidInput,
              MOCK_ORGANIZATION_DM.members,
              MOCK_ORGANIZATION_DM.roles,
              MOCK_ORGANIZATION_DM.emails
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "members" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              MOCK_ORGANIZATION_DM.title,
              MOCK_ORGANIZATION_DM.description,
              invalidInput,
              MOCK_ORGANIZATION_DM.roles,
              MOCK_ORGANIZATION_DM.emails
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "roles" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              MOCK_ORGANIZATION_DM.title,
              MOCK_ORGANIZATION_DM.description,
              MOCK_ORGANIZATION_DM.members,
              invalidInput,
              MOCK_ORGANIZATION_DM.emails
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "emails" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              MOCK_ORGANIZATION_DM.title,
              MOCK_ORGANIZATION_DM.description,
              MOCK_ORGANIZATION_DM.members,
              MOCK_ORGANIZATION_DM.roles,
              invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
