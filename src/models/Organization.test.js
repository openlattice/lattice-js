import mapValues from 'lodash/mapValues';
import { Map, Set, fromJS } from 'immutable';

import Organization, { OrganizationBuilder, isValidOrganization as isValid } from './Organization';
import { MOCK_ORGANIZATION, genRandomOrganization } from '../utils/testing/MockData';
import { genRandomUUID } from '../utils/testing/MockUtils';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_OBJECT,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_FOR_REQUIRED_NUMBER,
} from '../utils/testing/Invalid';


const INVALID_PARAMS_FOR_GRANT = INVALID_PARAMS_FOR_OPTIONAL_OBJECT.slice(0);
INVALID_PARAMS_FOR_GRANT.push({ invalid_key: 'invalid_value' });
INVALID_PARAMS_FOR_GRANT.push({ [genRandomUUID()]: 'invalid_value' });

describe('Organization', () => {

  describe('OrganizationBuilder', () => {

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setId();
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setId('');
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setId(MOCK_ORGANIZATION.id);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setTitle();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setTitle(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setTitle(MOCK_ORGANIZATION.title);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setDescription(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setDescription();
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setDescription('');
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setDescription(MOCK_ORGANIZATION.description);
        }).not.toThrow();
      });

    });

    describe('setPrincipal()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setPrincipal();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setPrincipal(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setPrincipal(MOCK_ORGANIZATION.principal);
        }).not.toThrow();
      });

    });

    describe('setMembers()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setMembers(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setMembers([...MOCK_ORGANIZATION.members, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setMembers();
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setMembers([]);
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setMembers(MOCK_ORGANIZATION.members);
        }).not.toThrow();
      });

    });

    describe('setRoles()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setRoles(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setRoles([...MOCK_ORGANIZATION.roles, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setRoles();
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setRoles([]);
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setRoles(MOCK_ORGANIZATION.roles);
        }).not.toThrow();
      });

    });

    describe('setAutoApprovedEmails()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setAutoApprovedEmails(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setAutoApprovedEmails([...MOCK_ORGANIZATION.emails, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setAutoApprovedEmails();
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setAutoApprovedEmails([]);
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setAutoApprovedEmails(MOCK_ORGANIZATION.emails);
        }).not.toThrow();
      });

    });

    describe('setApps()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setApps(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setApps([...MOCK_ORGANIZATION.apps, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setApps();
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setApps([]);
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setApps(MOCK_ORGANIZATION.apps);
        }).not.toThrow();
      });

    });

    describe('setPartitions()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setPartitions(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_REQUIRED_NUMBER.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setPartitions([...MOCK_ORGANIZATION.partitions, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setPartitions();
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setPartitions([]);
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setPartitions(MOCK_ORGANIZATION.partitions);
        }).not.toThrow();
      });

    });

    describe('setEnrollments()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setEnrollments(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setEnrollments([...MOCK_ORGANIZATION.enrollments, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setEnrollments();
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setEnrollments([]);
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setEnrollments(MOCK_ORGANIZATION.enrollments);
        }).not.toThrow();
      });

    });

    describe('setGrants()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_GRANT.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setGrants(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setGrants();
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setGrants({});
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setGrants(MOCK_ORGANIZATION.grants);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        // omitting setPrincipal()
        expect(() => {
          (new OrganizationBuilder())
            .setTitle(MOCK_ORGANIZATION.title)
            .build();
        }).toThrow();

        // omitting setTitle()
        expect(() => {
          (new OrganizationBuilder())
            .setPrincipal(MOCK_ORGANIZATION.principal)
            .build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {

        // omitting setDescription()
        expect(() => {
          (new OrganizationBuilder())
            .setApps(MOCK_ORGANIZATION.apps)
            .setAutoApprovedEmails(MOCK_ORGANIZATION.emails)
            .setEnrollments(MOCK_ORGANIZATION.enrollments)
            .setGrants(MOCK_ORGANIZATION.grants)
            .setId(MOCK_ORGANIZATION.id)
            .setMembers(MOCK_ORGANIZATION.members)
            .setPartitions(MOCK_ORGANIZATION.partitions)
            .setPrincipal(MOCK_ORGANIZATION.principal)
            .setRoles(MOCK_ORGANIZATION.roles)
            .setTitle(MOCK_ORGANIZATION.title)
            .build();
        }).not.toThrow();

        // omitting setId()
        expect(() => {
          (new OrganizationBuilder())
            .setApps(MOCK_ORGANIZATION.apps)
            .setAutoApprovedEmails(MOCK_ORGANIZATION.emails)
            .setDescription(MOCK_ORGANIZATION.description)
            .setEnrollments(MOCK_ORGANIZATION.enrollments)
            .setGrants(MOCK_ORGANIZATION.grants)
            .setMembers(MOCK_ORGANIZATION.members)
            .setPartitions(MOCK_ORGANIZATION.partitions)
            .setPrincipal(MOCK_ORGANIZATION.principal)
            .setRoles(MOCK_ORGANIZATION.roles)
            .setTitle(MOCK_ORGANIZATION.title)
            .build();
        }).not.toThrow();

        // omitting setPartitions()
        expect(() => {
          (new OrganizationBuilder())
            .setApps(MOCK_ORGANIZATION.apps)
            .setAutoApprovedEmails(MOCK_ORGANIZATION.emails)
            .setDescription(MOCK_ORGANIZATION.description)
            .setEnrollments(MOCK_ORGANIZATION.enrollments)
            .setGrants(MOCK_ORGANIZATION.grants)
            .setId(MOCK_ORGANIZATION.id)
            .setMembers(MOCK_ORGANIZATION.members)
            .setPrincipal(MOCK_ORGANIZATION.principal)
            .setRoles(MOCK_ORGANIZATION.roles)
            .setTitle(MOCK_ORGANIZATION.title)
            .build();
        }).not.toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const org = (new OrganizationBuilder())
          .setPrincipal(MOCK_ORGANIZATION.principal)
          .setTitle(MOCK_ORGANIZATION.title)
          .build();

        expect(org.apps).toEqual([]);
        expect(org.emails).toEqual([]);
        expect(org.enrollments).toEqual([]);
        expect(org.grants).toEqual({});
        expect(org.members).toEqual([]);
        expect(org.roles).toEqual([]);
      });

      test('should return a valid instance', () => {

        const org = (new OrganizationBuilder())
          .setApps(MOCK_ORGANIZATION.apps)
          .setAutoApprovedEmails(MOCK_ORGANIZATION.emails)
          .setDescription(MOCK_ORGANIZATION.description)
          .setEnrollments(MOCK_ORGANIZATION.enrollments)
          .setGrants(MOCK_ORGANIZATION.grants)
          .setId(MOCK_ORGANIZATION.id)
          .setMembers(MOCK_ORGANIZATION.members)
          .setPartitions(MOCK_ORGANIZATION.partitions)
          .setPrincipal(MOCK_ORGANIZATION.principal)
          .setRoles(MOCK_ORGANIZATION.roles)
          .setTitle(MOCK_ORGANIZATION.title)
          .build();

        expect(org).toBeInstanceOf(Organization);

        expect(org.apps).toBeDefined();
        expect(org.description).toBeDefined();
        expect(org.emails).toBeDefined();
        expect(org.enrollments).toBeDefined();
        expect(org.grants).toBeDefined();
        expect(org.id).toBeDefined();
        expect(org.members).toBeDefined();
        expect(org.principal).toBeDefined();
        expect(org.roles).toBeDefined();
        expect(org.title).toBeDefined();

        expect(org.apps).toEqual(MOCK_ORGANIZATION.apps);
        expect(org.description).toEqual(MOCK_ORGANIZATION.description);
        expect(org.emails).toEqual(MOCK_ORGANIZATION.emails);
        expect(org.enrollments).toEqual(MOCK_ORGANIZATION.enrollments);
        expect(org.grants).toEqual(MOCK_ORGANIZATION.grants);
        expect(org.id).toEqual(MOCK_ORGANIZATION.id);
        expect(org.members).toEqual(MOCK_ORGANIZATION.members);
        expect(org.principal).toEqual(MOCK_ORGANIZATION.principal);
        expect(org.roles).toEqual(MOCK_ORGANIZATION.roles);
        expect(org.title).toEqual(MOCK_ORGANIZATION.title);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ORGANIZATION)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Organization(
            MOCK_ORGANIZATION.id,
            MOCK_ORGANIZATION.title,
            MOCK_ORGANIZATION.description,
            MOCK_ORGANIZATION.principal,
            MOCK_ORGANIZATION.members,
            MOCK_ORGANIZATION.roles,
            MOCK_ORGANIZATION.emails,
            MOCK_ORGANIZATION.apps,
            MOCK_ORGANIZATION.partitions,
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const org = (new OrganizationBuilder())
          .setApps(MOCK_ORGANIZATION.apps)
          .setAutoApprovedEmails(MOCK_ORGANIZATION.emails)
          .setDescription(MOCK_ORGANIZATION.description)
          .setEnrollments(MOCK_ORGANIZATION.enrollments)
          .setGrants(MOCK_ORGANIZATION.grants)
          .setId(MOCK_ORGANIZATION.id)
          .setMembers(MOCK_ORGANIZATION.members)
          .setPartitions(MOCK_ORGANIZATION.partitions)
          .setPrincipal(MOCK_ORGANIZATION.principal)
          .setRoles(MOCK_ORGANIZATION.roles)
          .setTitle(MOCK_ORGANIZATION.title)
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
          expect(isValid({ ...MOCK_ORGANIZATION, id: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION, title: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION, description: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION, principal: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "members" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION, members: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "roles" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION, roles: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "emails" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION, emails: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "apps" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION, apps: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "partitions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION, partitions: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "enrollments" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION, enrollments: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "grants" property', () => {
        INVALID_PARAMS_FOR_GRANT.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION, grants: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              invalidInput,
              MOCK_ORGANIZATION.title,
              MOCK_ORGANIZATION.description,
              MOCK_ORGANIZATION.principal,
              MOCK_ORGANIZATION.members,
              MOCK_ORGANIZATION.roles,
              MOCK_ORGANIZATION.emails,
              MOCK_ORGANIZATION.apps,
              MOCK_ORGANIZATION.partitions,
              MOCK_ORGANIZATION.enrollments,
              MOCK_ORGANIZATION.grants,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION.id,
              invalidInput,
              MOCK_ORGANIZATION.description,
              MOCK_ORGANIZATION.principal,
              MOCK_ORGANIZATION.members,
              MOCK_ORGANIZATION.roles,
              MOCK_ORGANIZATION.emails,
              MOCK_ORGANIZATION.apps,
              MOCK_ORGANIZATION.partitions,
              MOCK_ORGANIZATION.enrollments,
              MOCK_ORGANIZATION.grants,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION.id,
              MOCK_ORGANIZATION.title,
              invalidInput,
              MOCK_ORGANIZATION.principal,
              MOCK_ORGANIZATION.members,
              MOCK_ORGANIZATION.roles,
              MOCK_ORGANIZATION.emails,
              MOCK_ORGANIZATION.apps,
              MOCK_ORGANIZATION.partitions,
              MOCK_ORGANIZATION.enrollments,
              MOCK_ORGANIZATION.grants,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION.id,
              MOCK_ORGANIZATION.title,
              MOCK_ORGANIZATION.description,
              invalidInput,
              MOCK_ORGANIZATION.members,
              MOCK_ORGANIZATION.roles,
              MOCK_ORGANIZATION.emails,
              MOCK_ORGANIZATION.apps,
              MOCK_ORGANIZATION.partitions,
              MOCK_ORGANIZATION.enrollments,
              MOCK_ORGANIZATION.grants,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "members" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION.id,
              MOCK_ORGANIZATION.title,
              MOCK_ORGANIZATION.description,
              MOCK_ORGANIZATION.principal,
              invalidInput,
              MOCK_ORGANIZATION.roles,
              MOCK_ORGANIZATION.emails,
              MOCK_ORGANIZATION.apps,
              MOCK_ORGANIZATION.partitions,
              MOCK_ORGANIZATION.enrollments,
              MOCK_ORGANIZATION.grants,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "roles" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION.id,
              MOCK_ORGANIZATION.title,
              MOCK_ORGANIZATION.description,
              MOCK_ORGANIZATION.principal,
              MOCK_ORGANIZATION.members,
              invalidInput,
              MOCK_ORGANIZATION.emails,
              MOCK_ORGANIZATION.apps,
              MOCK_ORGANIZATION.partitions,
              MOCK_ORGANIZATION.enrollments,
              MOCK_ORGANIZATION.grants,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "emails" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION.id,
              MOCK_ORGANIZATION.title,
              MOCK_ORGANIZATION.description,
              MOCK_ORGANIZATION.principal,
              MOCK_ORGANIZATION.members,
              MOCK_ORGANIZATION.roles,
              invalidInput,
              MOCK_ORGANIZATION.apps,
              MOCK_ORGANIZATION.partitions,
              MOCK_ORGANIZATION.enrollments,
              MOCK_ORGANIZATION.grants,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "apps" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION.id,
              MOCK_ORGANIZATION.title,
              MOCK_ORGANIZATION.description,
              MOCK_ORGANIZATION.principal,
              MOCK_ORGANIZATION.members,
              MOCK_ORGANIZATION.roles,
              MOCK_ORGANIZATION.emails,
              invalidInput,
              MOCK_ORGANIZATION.partitions,
              MOCK_ORGANIZATION.enrollments,
              MOCK_ORGANIZATION.grants,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "partitions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION.id,
              MOCK_ORGANIZATION.title,
              MOCK_ORGANIZATION.description,
              MOCK_ORGANIZATION.principal,
              MOCK_ORGANIZATION.members,
              MOCK_ORGANIZATION.roles,
              MOCK_ORGANIZATION.emails,
              MOCK_ORGANIZATION.apps,
              invalidInput,
              MOCK_ORGANIZATION.enrollments,
              MOCK_ORGANIZATION.grants,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "enrollments" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION.id,
              MOCK_ORGANIZATION.title,
              MOCK_ORGANIZATION.description,
              MOCK_ORGANIZATION.principal,
              MOCK_ORGANIZATION.members,
              MOCK_ORGANIZATION.roles,
              MOCK_ORGANIZATION.emails,
              MOCK_ORGANIZATION.apps,
              MOCK_ORGANIZATION.partitions,
              invalidInput,
              MOCK_ORGANIZATION.grants,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "grants" property', () => {
        INVALID_PARAMS_FOR_GRANT.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORGANIZATION.id,
              MOCK_ORGANIZATION.title,
              MOCK_ORGANIZATION.description,
              MOCK_ORGANIZATION.principal,
              MOCK_ORGANIZATION.members,
              MOCK_ORGANIZATION.roles,
              MOCK_ORGANIZATION.emails,
              MOCK_ORGANIZATION.apps,
              MOCK_ORGANIZATION.partitions,
              MOCK_ORGANIZATION.enrollments,
              invalidInput,
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const organization = (new OrganizationBuilder())
        .setApps(MOCK_ORGANIZATION.apps)
        .setAutoApprovedEmails(MOCK_ORGANIZATION.emails)
        .setDescription(MOCK_ORGANIZATION.description)
        .setEnrollments(MOCK_ORGANIZATION.enrollments)
        .setGrants(MOCK_ORGANIZATION.grants)
        .setId(MOCK_ORGANIZATION.id)
        .setMembers(MOCK_ORGANIZATION.members)
        .setPartitions(MOCK_ORGANIZATION.partitions)
        .setPrincipal(MOCK_ORGANIZATION.principal)
        .setRoles(MOCK_ORGANIZATION.roles)
        .setTitle(MOCK_ORGANIZATION.title)
        .build();
      expect(organization.valueOf()).toEqual(
        fromJS({
          apps: MOCK_ORGANIZATION.apps,
          description: MOCK_ORGANIZATION.description,
          emails: MOCK_ORGANIZATION.emails,
          enrollments: MOCK_ORGANIZATION.enrollments,
          grants: mapValues(MOCK_ORGANIZATION.grants, (g) => g.toObject()),
          id: MOCK_ORGANIZATION.id,
          members: MOCK_ORGANIZATION.members.map((p) => p.toObject()),
          partitions: MOCK_ORGANIZATION.partitions,
          principal: MOCK_ORGANIZATION.principal.toObject(),
          roles: MOCK_ORGANIZATION.roles.map((r) => r.toObject()),
          title: MOCK_ORGANIZATION.title,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomOrganization = genRandomOrganization();

      const organization0 = (new OrganizationBuilder())
        .setApps(MOCK_ORGANIZATION.apps)
        .setAutoApprovedEmails(MOCK_ORGANIZATION.emails)
        .setDescription(MOCK_ORGANIZATION.description)
        .setEnrollments(MOCK_ORGANIZATION.enrollments)
        .setGrants(MOCK_ORGANIZATION.grants)
        .setId(MOCK_ORGANIZATION.id)
        .setMembers(MOCK_ORGANIZATION.members)
        .setPartitions(MOCK_ORGANIZATION.partitions)
        .setPrincipal(MOCK_ORGANIZATION.principal)
        .setRoles(MOCK_ORGANIZATION.roles)
        .setTitle(MOCK_ORGANIZATION.title)
        .build();

      const organization1 = (new OrganizationBuilder())
        .setApps(MOCK_ORGANIZATION.apps)
        .setAutoApprovedEmails(MOCK_ORGANIZATION.emails)
        .setDescription(MOCK_ORGANIZATION.description)
        .setEnrollments(MOCK_ORGANIZATION.enrollments)
        .setGrants(MOCK_ORGANIZATION.grants)
        .setId(MOCK_ORGANIZATION.id)
        .setMembers(MOCK_ORGANIZATION.members)
        .setPartitions(MOCK_ORGANIZATION.partitions)
        .setPrincipal(MOCK_ORGANIZATION.principal)
        .setRoles(MOCK_ORGANIZATION.roles)
        .setTitle(MOCK_ORGANIZATION.title)
        .build();

      const testSet = Set()
        .add(organization0)
        .add(randomOrganization)
        .add(organization1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().apps).toEqual(MOCK_ORGANIZATION.apps);
      expect(testSet.first().description).toEqual(MOCK_ORGANIZATION.description);
      expect(testSet.first().emails).toEqual(MOCK_ORGANIZATION.emails);
      expect(testSet.first().id).toEqual(MOCK_ORGANIZATION.id);
      expect(testSet.first().members).toEqual(MOCK_ORGANIZATION.members);
      expect(testSet.first().partitions).toEqual(MOCK_ORGANIZATION.partitions);
      expect(testSet.first().principal).toEqual(MOCK_ORGANIZATION.principal);
      expect(testSet.first().roles).toEqual(MOCK_ORGANIZATION.roles);
      expect(testSet.first().title).toEqual(MOCK_ORGANIZATION.title);

      expect(testSet.last().apps).toEqual(randomOrganization.apps);
      expect(testSet.last().description).toEqual(randomOrganization.description);
      expect(testSet.last().emails).toEqual(randomOrganization.emails);
      expect(testSet.last().id).toEqual(randomOrganization.id);
      expect(testSet.last().members).toEqual(randomOrganization.members);
      expect(testSet.last().partitions).toEqual(randomOrganization.partitions);
      expect(testSet.last().principal).toEqual(randomOrganization.principal);
      expect(testSet.last().roles).toEqual(randomOrganization.roles);
      expect(testSet.last().title).toEqual(randomOrganization.title);
    });

    test('Immutable.Map', () => {

      const randomOrganization = genRandomOrganization();

      const organization0 = (new OrganizationBuilder())
        .setApps(MOCK_ORGANIZATION.apps)
        .setAutoApprovedEmails(MOCK_ORGANIZATION.emails)
        .setDescription(MOCK_ORGANIZATION.description)
        .setEnrollments(MOCK_ORGANIZATION.enrollments)
        .setGrants(MOCK_ORGANIZATION.grants)
        .setId(MOCK_ORGANIZATION.id)
        .setMembers(MOCK_ORGANIZATION.members)
        .setPartitions(MOCK_ORGANIZATION.partitions)
        .setPrincipal(MOCK_ORGANIZATION.principal)
        .setRoles(MOCK_ORGANIZATION.roles)
        .setTitle(MOCK_ORGANIZATION.title)
        .build();

      const organization1 = (new OrganizationBuilder())
        .setApps(MOCK_ORGANIZATION.apps)
        .setAutoApprovedEmails(MOCK_ORGANIZATION.emails)
        .setDescription(MOCK_ORGANIZATION.description)
        .setEnrollments(MOCK_ORGANIZATION.enrollments)
        .setGrants(MOCK_ORGANIZATION.grants)
        .setId(MOCK_ORGANIZATION.id)
        .setMembers(MOCK_ORGANIZATION.members)
        .setPartitions(MOCK_ORGANIZATION.partitions)
        .setPrincipal(MOCK_ORGANIZATION.principal)
        .setRoles(MOCK_ORGANIZATION.roles)
        .setTitle(MOCK_ORGANIZATION.title)
        .build();

      const testMap = Map()
        .set(organization0, 'test_value_1')
        .set(randomOrganization, 'test_value_2')
        .set(organization1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(organization0)).toEqual('test_value_3');
      expect(testMap.get(randomOrganization)).toEqual('test_value_2');
      expect(testMap.get(organization1)).toEqual('test_value_3');
    });

  });

});
