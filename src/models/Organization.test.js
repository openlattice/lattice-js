/*
 * @flow
 */

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

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_OBJECT,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_FOR_REQUIRED_NUMBER,
} from '../utils/testing/Invalid';
import { genRandomUUID } from '../utils/testing/MockUtils';
import {
  testBuilderBuild,
  testBuilderConstructor,
  testBuilderSet,
} from '../utils/testing/ModelTestUtils';

const INVALID_PARAMS_FOR_GRANT = INVALID_PARAMS_FOR_OPTIONAL_OBJECT.slice(0);
INVALID_PARAMS_FOR_GRANT.push({ invalid_key: 'invalid_value' });
INVALID_PARAMS_FOR_GRANT.push({ [genRandomUUID()]: 'invalid_value' });

describe('Organization', () => {

  describe('OrganizationBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(Organization, OrganizationBuilder, MOCK_ORGANIZATION);
    });

    describe('setApps()', () => {
      const validParams = [MOCK_ORGANIZATION.apps];
      testBuilderSet(OrganizationBuilder, 'setApps', validParams, true);
    });

    describe('setConnections()', () => {
      const validParams = [MOCK_ORGANIZATION.connections];
      testBuilderSet(OrganizationBuilder, 'setConnections', validParams, true);
    });

    describe('setDescription()', () => {
      const validParams = [MOCK_ORGANIZATION.description];
      testBuilderSet(OrganizationBuilder, 'setDescription', validParams, true);
    });

    describe('setEmailDomains()', () => {
      const validParams = [MOCK_ORGANIZATION.emailDomains];
      testBuilderSet(OrganizationBuilder, 'setEmailDomains', validParams, true);
    });

    describe('setGrants()', () => {
      const validParams = [MOCK_ORGANIZATION.grants];
      // const invalidParams = INVALID_PARAMS_FOR_OPTIONAL_OBJECT.slice(0);
      // invalidParams.push({ invalid_key: 'invalid_value' });
      // invalidParams.push({ [genRandomUUID()]: 'invalid_value' });
      testBuilderSet(OrganizationBuilder, 'setGrants', validParams, true);
    });

    describe('setId()', () => {
      const validParams = [MOCK_ORGANIZATION.id];
      testBuilderSet(OrganizationBuilder, 'setId', validParams, true);
    });

    describe('setMembers()', () => {
      const validParams = [MOCK_ORGANIZATION.members];
      testBuilderSet(OrganizationBuilder, 'setMembers', validParams, true);
    });

    describe('setPartitions()', () => {
      const validParams = [MOCK_ORGANIZATION.partitions];
      testBuilderSet(OrganizationBuilder, 'setPartitions', validParams, true);
    });

    describe('setPrincipal()', () => {
      const validParams = [MOCK_ORGANIZATION.principal];
      testBuilderSet(OrganizationBuilder, 'setPrincipal', validParams);
    });

    describe('setRoles()', () => {
      const validParams = [MOCK_ORGANIZATION.roles];
      testBuilderSet(OrganizationBuilder, 'setRoles', validParams, true);
    });

    describe('setTitle()', () => {
      const validParams = [MOCK_ORGANIZATION.title];
      testBuilderSet(OrganizationBuilder, 'setTitle', validParams);
    });

    describe('build()', () => {

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

      testBuilderBuild(Organization, OrganizationBuilder, MOCK_ORGANIZATION, {
        optional: {
          setApps: MOCK_ORGANIZATION.apps,
          setConnections: MOCK_ORGANIZATION.connections,
          setDescription: MOCK_ORGANIZATION.description,
          setEmailDomains: MOCK_ORGANIZATION.emailDomains,
          setGrants: MOCK_ORGANIZATION.grants,
          setId: MOCK_ORGANIZATION.id,
          setMembers: MOCK_ORGANIZATION.members,
          setPartitions: MOCK_ORGANIZATION.partitions,
          setRoles: MOCK_ORGANIZATION.roles,
        },
        required: {
          setPrincipal: MOCK_ORGANIZATION.principal,
          setTitle: MOCK_ORGANIZATION.title,
        },
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
