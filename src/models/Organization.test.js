import Organization, { OrganizationBuilder, isValidOrganization as isValid } from './Organization';
import { MOCK_ORGANIZATION_DM } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_FOR_OPTIONAL_SS
} from '../utils/testing/Invalid';

describe('Organization', () => {

  describe('OrganizationBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new OrganizationBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            builder.setId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setId();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setId(MOCK_ORGANIZATION_DM.id);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setTitle(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setTitle();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setTitle(MOCK_ORGANIZATION_DM.title);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(() => {
            builder.setDescription(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setDescription();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setDescription(MOCK_ORGANIZATION_DM.description);
        }).not.toThrow();
      });

    });

    describe('setPrincipal()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPrincipal(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setPrincipal();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPrincipal(MOCK_ORGANIZATION_DM.principal);
        }).not.toThrow();
      });

    });

    describe('setMembers()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setMembers(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setMembers([...MOCK_ORGANIZATION_DM.members, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setMembers();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setMembers(MOCK_ORGANIZATION_DM.members);
        }).not.toThrow();
      });

    });

    describe('setRoles()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setRoles(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setRoles([...MOCK_ORGANIZATION_DM.roles, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setRoles();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setRoles(MOCK_ORGANIZATION_DM.roles);
        }).not.toThrow();
      });

    });

    describe('setAutoApprovedEmails()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAutoApprovedEmails(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setAutoApprovedEmails([...MOCK_ORGANIZATION_DM.emails, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setAutoApprovedEmails();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setAutoApprovedEmails(MOCK_ORGANIZATION_DM.emails);
        }).not.toThrow();
      });

    });

    describe('setApps()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setApps(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setApps([...MOCK_ORGANIZATION_DM.apps, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setApps();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setApps(MOCK_ORGANIZATION_DM.apps);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new OrganizationBuilder()).build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new OrganizationBuilder())
            .setTitle(MOCK_ORGANIZATION_DM.title)
            .setDescription(MOCK_ORGANIZATION_DM.description)
            .setPrincipal(MOCK_ORGANIZATION_DM.principal)
            .setMembers(MOCK_ORGANIZATION_DM.members)
            .setRoles(MOCK_ORGANIZATION_DM.roles)
            .setAutoApprovedEmails(MOCK_ORGANIZATION_DM.emails)
            .setApps(MOCK_ORGANIZATION_DM.apps)
            .build();
        }).not.toThrow();

        expect(() => {
          (new OrganizationBuilder())
            .setId(MOCK_ORGANIZATION_DM.id)
            .setTitle(MOCK_ORGANIZATION_DM.title)
            .setPrincipal(MOCK_ORGANIZATION_DM.principal)
            .setMembers(MOCK_ORGANIZATION_DM.members)
            .setRoles(MOCK_ORGANIZATION_DM.roles)
            .setAutoApprovedEmails(MOCK_ORGANIZATION_DM.emails)
            .setApps(MOCK_ORGANIZATION_DM.apps)
            .build();
        }).not.toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const org = builder
          .setTitle(MOCK_ORGANIZATION_DM.title)
          .setPrincipal(MOCK_ORGANIZATION_DM.principal)
          .build();

        expect(org.members).toEqual([]);
        expect(org.roles).toEqual([]);
        expect(org.emails).toEqual([]);
        expect(org.apps).toEqual([]);
      });

      test('should return a valid instance', () => {

        const org = builder
          .setId(MOCK_ORGANIZATION_DM.id)
          .setTitle(MOCK_ORGANIZATION_DM.title)
          .setDescription(MOCK_ORGANIZATION_DM.description)
          .setPrincipal(MOCK_ORGANIZATION_DM.principal)
          .setMembers(MOCK_ORGANIZATION_DM.members)
          .setRoles(MOCK_ORGANIZATION_DM.roles)
          .setAutoApprovedEmails(MOCK_ORGANIZATION_DM.emails)
          .setApps(MOCK_ORGANIZATION_DM.apps)
          .build();

        expect(org).toBeInstanceOf(Organization);

        expect(org.id).toBeDefined();
        expect(org.id).toEqual(MOCK_ORGANIZATION_DM.id);

        expect(org.title).toBeDefined();
        expect(org.title).toEqual(MOCK_ORGANIZATION_DM.title);

        expect(org.description).toBeDefined();
        expect(org.description).toEqual(MOCK_ORGANIZATION_DM.description);

        expect(org.principal).toBeDefined();
        expect(org.principal).toEqual(MOCK_ORGANIZATION_DM.principal);

        expect(org.members).toBeDefined();
        expect(org.members).toEqual(MOCK_ORGANIZATION_DM.members);

        expect(org.roles).toBeDefined();
        expect(org.roles).toEqual(MOCK_ORGANIZATION_DM.roles);

        expect(org.emails).toBeDefined();
        expect(org.emails).toEqual(MOCK_ORGANIZATION_DM.emails);

        expect(org.apps).toBeDefined();
        expect(org.apps).toEqual(MOCK_ORGANIZATION_DM.apps);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ORGANIZATION_DM)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Organization(
            MOCK_ORGANIZATION_DM.id,
            MOCK_ORGANIZATION_DM.title,
            MOCK_ORGANIZATION_DM.description,
            MOCK_ORGANIZATION_DM.principal,
            MOCK_ORGANIZATION_DM.members,
            MOCK_ORGANIZATION_DM.roles,
            MOCK_ORGANIZATION_DM.apps
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const org = (new OrganizationBuilder())
          .setId(MOCK_ORGANIZATION_DM.id)
          .setTitle(MOCK_ORGANIZATION_DM.title)
          .setDescription(MOCK_ORGANIZATION_DM.description)
          .setPrincipal(MOCK_ORGANIZATION_DM.principal)
          .setMembers(MOCK_ORGANIZATION_DM.members)
          .setRoles(MOCK_ORGANIZATION_DM.roles)
          .setApps(MOCK_ORGANIZATION_DM.apps)
          .build();

        expect(isValid(org)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { principal: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "members" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { members: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "roles" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { roles: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "emails" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { emails: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "apps" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORGANIZATION_DM, { apps: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              invalidInput,
              MOCK_ORGANIZATION_DM.title,
              MOCK_ORGANIZATION_DM.description,
              MOCK_ORGANIZATION_DM.principal,
              MOCK_ORGANIZATION_DM.members,
              MOCK_ORGANIZATION_DM.roles,
              MOCK_ORGANIZATION_DM.emails,
              MOCK_ORGANIZATION_DM.apps
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              invalidInput,
              MOCK_ORGANIZATION_DM.description,
              MOCK_ORGANIZATION_DM.principal,
              MOCK_ORGANIZATION_DM.members,
              MOCK_ORGANIZATION_DM.roles,
              MOCK_ORGANIZATION_DM.emails,
              MOCK_ORGANIZATION_DM.apps
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              MOCK_ORGANIZATION_DM.title,
              invalidInput,
              MOCK_ORGANIZATION_DM.principal,
              MOCK_ORGANIZATION_DM.members,
              MOCK_ORGANIZATION_DM.roles,
              MOCK_ORGANIZATION_DM.emails,
              MOCK_ORGANIZATION_DM.apps
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              MOCK_ORGANIZATION_DM.title,
              MOCK_ORGANIZATION_DM.description,
              invalidInput,
              MOCK_ORGANIZATION_DM.members,
              MOCK_ORGANIZATION_DM.roles,
              MOCK_ORGANIZATION_DM.emails,
              MOCK_ORGANIZATION_DM.apps
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "members" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              MOCK_ORGANIZATION_DM.title,
              MOCK_ORGANIZATION_DM.description,
              MOCK_ORGANIZATION_DM.principal,
              invalidInput,
              MOCK_ORGANIZATION_DM.roles,
              MOCK_ORGANIZATION_DM.emails
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "roles" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              MOCK_ORGANIZATION_DM.title,
              MOCK_ORGANIZATION_DM.description,
              MOCK_ORGANIZATION_DM.principal,
              MOCK_ORGANIZATION_DM.members,
              invalidInput,
              MOCK_ORGANIZATION_DM.emails,
              MOCK_ORGANIZATION_DM.apps
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "emails" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              MOCK_ORGANIZATION_DM.title,
              MOCK_ORGANIZATION_DM.description,
              MOCK_ORGANIZATION_DM.principal,
              MOCK_ORGANIZATION_DM.members,
              MOCK_ORGANIZATION_DM.roles,
              invalidInput,
              MOCK_ORGANIZATION_DM.apps
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "apps" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION_DM.id,
              MOCK_ORGANIZATION_DM.title,
              MOCK_ORGANIZATION_DM.description,
              MOCK_ORGANIZATION_DM.principal,
              MOCK_ORGANIZATION_DM.members,
              MOCK_ORGANIZATION_DM.roles,
              MOCK_ORGANIZATION_DM.emails,
              invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
