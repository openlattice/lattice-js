import mapValues from 'lodash/mapValues';
import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_ORGANIZATION,
  MOCK_ORGANIZATION_OBJECT,
  Organization,
  OrganizationBuilder,
  genRandomOrganization,
  isValidOrganization as isValid,
} from './Organization';
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

function expectValidInstance(value) {

  expect(value).toBeInstanceOf(Organization);

  expect(value.apps).toBeDefined();
  expect(value.connections).toBeDefined();
  expect(value.description).toBeDefined();
  expect(value.emailDomains).toBeDefined();
  expect(value.grants).toBeDefined();
  expect(value.id).toBeDefined();
  expect(value.members).toBeDefined();
  expect(value.principal).toBeDefined();
  expect(value.roles).toBeDefined();
  expect(value.title).toBeDefined();

  expect(value.apps).toEqual(MOCK_ORGANIZATION.apps);
  expect(value.connections).toEqual(MOCK_ORGANIZATION.connections);
  expect(value.description).toEqual(MOCK_ORGANIZATION.description);
  expect(value.emailDomains).toEqual(MOCK_ORGANIZATION.emailDomains);
  expect(value.grants).toEqual(MOCK_ORGANIZATION.grants);
  expect(value.id).toEqual(MOCK_ORGANIZATION.id);
  expect(value.members).toEqual(MOCK_ORGANIZATION.members);
  expect(value.principal).toEqual(MOCK_ORGANIZATION.principal);
  expect(value.roles).toEqual(MOCK_ORGANIZATION.roles);
  expect(value.title).toEqual(MOCK_ORGANIZATION.title);
}

describe('Organization', () => {

  describe('OrganizationBuilder', () => {

    describe('constructor()', () => {

      test('should construct given an instance', () => {
        expectValidInstance(
          (new OrganizationBuilder(MOCK_ORGANIZATION)).build()
        );
      });

      test('should construct given an object literal', () => {
        expectValidInstance(
          (new OrganizationBuilder({ ...MOCK_ORGANIZATION })).build()
        );
        expectValidInstance(
          (new OrganizationBuilder(MOCK_ORGANIZATION_OBJECT)).build()
        );
      });

      test('should construct given an immutable object', () => {
        expectValidInstance(
          (new OrganizationBuilder(MOCK_ORGANIZATION.toImmutable())).build()
        );
        expectValidInstance(
          (new OrganizationBuilder(fromJS({ ...MOCK_ORGANIZATION }))).build()
        );
        expectValidInstance(
          (new OrganizationBuilder(fromJS(MOCK_ORGANIZATION_OBJECT))).build()
        );
      });

    });

    describe('setApps()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setApps(invalidInput);
          }).toThrow();
          expect(() => {
            (new OrganizationBuilder()).setApps([invalidInput]);
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

    describe('setConnections()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setConnections(invalidInput);
          }).toThrow();
          expect(() => {
            (new OrganizationBuilder()).setConnections([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setConnections([...MOCK_ORGANIZATION.connections, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setConnections();
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setConnections([]);
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setConnections(MOCK_ORGANIZATION.connections);
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

    describe('setEmailDomains()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setEmailDomains(invalidInput);
          }).toThrow();
          expect(() => {
            (new OrganizationBuilder()).setEmailDomains([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setEmailDomains([...MOCK_ORGANIZATION.emailDomains, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new OrganizationBuilder()).setEmailDomains();
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setEmailDomains([]);
        }).not.toThrow();
        expect(() => {
          (new OrganizationBuilder()).setEmailDomains(MOCK_ORGANIZATION.emailDomains);
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

    describe('setMembers()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setMembers(invalidInput);
          }).toThrow();
          expect(() => {
            (new OrganizationBuilder()).setMembers([invalidInput]);
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

    describe('setPartitions()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setPartitions(invalidInput);
          }).toThrow();
        });
        INVALID_PARAMS_FOR_REQUIRED_NUMBER.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setPartitions([invalidInput]);
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

    describe('setRoles()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new OrganizationBuilder()).setRoles(invalidInput);
          }).toThrow();
          expect(() => {
            (new OrganizationBuilder()).setRoles([invalidInput]);
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

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        // omitting setPrincipal()
        expect(() => {
          (new OrganizationBuilder())
            .setApps(MOCK_ORGANIZATION.apps)
            .setConnections(MOCK_ORGANIZATION.connections)
            .setDescription(MOCK_ORGANIZATION.description)
            .setEmailDomains(MOCK_ORGANIZATION.emailDomains)
            .setGrants(MOCK_ORGANIZATION.grants)
            .setId(MOCK_ORGANIZATION.id)
            .setMembers(MOCK_ORGANIZATION.members)
            .setPartitions(MOCK_ORGANIZATION.partitions)
            .setRoles(MOCK_ORGANIZATION.roles)
            .setTitle(MOCK_ORGANIZATION.title)
            .build();
        }).toThrow();

        // omitting setTitle()
        expect(() => {
          (new OrganizationBuilder())
            .setApps(MOCK_ORGANIZATION.apps)
            .setConnections(MOCK_ORGANIZATION.connections)
            .setDescription(MOCK_ORGANIZATION.description)
            .setEmailDomains(MOCK_ORGANIZATION.emailDomains)
            .setGrants(MOCK_ORGANIZATION.grants)
            .setId(MOCK_ORGANIZATION.id)
            .setMembers(MOCK_ORGANIZATION.members)
            .setPartitions(MOCK_ORGANIZATION.partitions)
            .setPrincipal(MOCK_ORGANIZATION.principal)
            .setRoles(MOCK_ORGANIZATION.roles)
            .build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {

        // omitting setDescription()
        expect(() => {
          (new OrganizationBuilder())
            .setApps(MOCK_ORGANIZATION.apps)
            .setConnections(MOCK_ORGANIZATION.connections)
            .setEmailDomains(MOCK_ORGANIZATION.emailDomains)
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
            .setConnections(MOCK_ORGANIZATION.connections)
            .setDescription(MOCK_ORGANIZATION.description)
            .setEmailDomains(MOCK_ORGANIZATION.emailDomains)
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
            .setConnections(MOCK_ORGANIZATION.connections)
            .setDescription(MOCK_ORGANIZATION.description)
            .setEmailDomains(MOCK_ORGANIZATION.emailDomains)
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
          .setDescription(MOCK_ORGANIZATION.description)
          .setId(MOCK_ORGANIZATION.id)
          .setPartitions(MOCK_ORGANIZATION.partitions)
          .setPrincipal(MOCK_ORGANIZATION.principal)
          .setTitle(MOCK_ORGANIZATION.title)
          .build();

        expect(org.apps).toEqual([]);
        expect(org.connections).toEqual([]);
        expect(org.emailDomains).toEqual([]);
        expect(org.grants).toEqual({});
        expect(org.members).toEqual([]);
        expect(org.roles).toEqual([]);
      });

      test('should return a valid instance', () => {

        const org = (new OrganizationBuilder())
          .setApps(MOCK_ORGANIZATION.apps)
          .setConnections(MOCK_ORGANIZATION.connections)
          .setDescription(MOCK_ORGANIZATION.description)
          .setEmailDomains(MOCK_ORGANIZATION.emailDomains)
          .setGrants(MOCK_ORGANIZATION.grants)
          .setId(MOCK_ORGANIZATION.id)
          .setMembers(MOCK_ORGANIZATION.members)
          .setPartitions(MOCK_ORGANIZATION.partitions)
          .setPrincipal(MOCK_ORGANIZATION.principal)
          .setRoles(MOCK_ORGANIZATION.roles)
          .setTitle(MOCK_ORGANIZATION.title)
          .build();

        expectValidInstance(org);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ORGANIZATION_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_ORGANIZATION)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "apps" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, apps: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, apps: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "connections" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, connections: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, connections: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, description: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "emailDomains" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, emailDomains: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, emailDomains: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "grants" property', () => {
        INVALID_PARAMS_FOR_GRANT.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, grants: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, id: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "members" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, members: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, members: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "partitions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, partitions: invalidInput })).toEqual(false);
        });
        INVALID_PARAMS_FOR_REQUIRED_NUMBER.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, partitions: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, principal: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "roles" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, roles: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, roles: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ORGANIZATION_OBJECT, title: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "apps" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: invalidInput,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
          expect(isValid(
            new Organization({
              apps: [invalidInput],
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "connections" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: invalidInput,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: [invalidInput],
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: invalidInput,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "emailDomains" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: invalidInput,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: [invalidInput],
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "grants" property', () => {
        INVALID_PARAMS_FOR_GRANT.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: invalidInput,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: invalidInput,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "members" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: invalidInput,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: [invalidInput],
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "partitions" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: invalidInput,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
        });
        INVALID_PARAMS_FOR_REQUIRED_NUMBER.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: [invalidInput],
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: invalidInput,
              roles: MOCK_ORGANIZATION.roles,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "roles" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: invalidInput,
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: [invalidInput],
              title: MOCK_ORGANIZATION.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Organization({
              apps: MOCK_ORGANIZATION.apps,
              connections: MOCK_ORGANIZATION.connections,
              description: MOCK_ORGANIZATION.description,
              emailDomains: MOCK_ORGANIZATION.emailDomains,
              grants: MOCK_ORGANIZATION.grants,
              id: MOCK_ORGANIZATION.id,
              members: MOCK_ORGANIZATION.members,
              partitions: MOCK_ORGANIZATION.partitions,
              principal: MOCK_ORGANIZATION.principal,
              roles: MOCK_ORGANIZATION.roles,
              title: invalidInput,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_ORGANIZATION.valueOf()).toEqual(
        fromJS({
          apps: MOCK_ORGANIZATION.apps,
          description: MOCK_ORGANIZATION.description,
          emailDomains: MOCK_ORGANIZATION.emailDomains,
          connections: MOCK_ORGANIZATION.connections,
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
      const organization0 = (new OrganizationBuilder(MOCK_ORGANIZATION)).build();
      const organization1 = (new OrganizationBuilder(MOCK_ORGANIZATION)).build();

      const testSet = Set()
        .add(organization0)
        .add(randomOrganization)
        .add(organization1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().apps).toEqual(MOCK_ORGANIZATION.apps);
      expect(testSet.first().description).toEqual(MOCK_ORGANIZATION.description);
      expect(testSet.first().emailDomains).toEqual(MOCK_ORGANIZATION.emailDomains);
      expect(testSet.first().id).toEqual(MOCK_ORGANIZATION.id);
      expect(testSet.first().members).toEqual(MOCK_ORGANIZATION.members);
      expect(testSet.first().partitions).toEqual(MOCK_ORGANIZATION.partitions);
      expect(testSet.first().principal).toEqual(MOCK_ORGANIZATION.principal);
      expect(testSet.first().roles).toEqual(MOCK_ORGANIZATION.roles);
      expect(testSet.first().title).toEqual(MOCK_ORGANIZATION.title);

      expect(testSet.last().apps).toEqual(randomOrganization.apps);
      expect(testSet.last().description).toEqual(randomOrganization.description);
      expect(testSet.last().emailDomains).toEqual(randomOrganization.emailDomains);
      expect(testSet.last().id).toEqual(randomOrganization.id);
      expect(testSet.last().members).toEqual(randomOrganization.members);
      expect(testSet.last().partitions).toEqual(randomOrganization.partitions);
      expect(testSet.last().principal).toEqual(randomOrganization.principal);
      expect(testSet.last().roles).toEqual(randomOrganization.roles);
      expect(testSet.last().title).toEqual(randomOrganization.title);
    });

    test('Immutable.Map', () => {

      const randomOrganization = genRandomOrganization();
      const organization0 = (new OrganizationBuilder(MOCK_ORGANIZATION)).build();
      const organization1 = (new OrganizationBuilder(MOCK_ORGANIZATION)).build();

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
