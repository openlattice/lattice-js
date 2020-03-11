import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_ROLE,
  MOCK_ROLE_OBJECT,
  ROLE_CLASS_PACKAGE,
  Role,
  RoleBuilder,
  genRandomRole,
  isValidRole as isValid,
} from './Role';

import { AT_CLASS } from '../constants/GlobalConstants';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

import {
  testBuilderConstructor,
  testBuilderSetter,
  testBuilderSetterOfType,
} from '../utils/testing/ModelTestUtils';

describe('Role', () => {

  describe('RoleBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(Role, RoleBuilder, MOCK_ROLE);
    });

    describe('setDescription()', () => {
      const validParams = [MOCK_ROLE.description];
      testBuilderSetter(RoleBuilder, 'setDescription', validParams, true);
    });

    describe('setId()', () => {
      const validParams = [MOCK_ROLE.id];
      testBuilderSetter(RoleBuilder, 'setId', validParams, true);
    });

    describe('setOrganizationId()', () => {
      const validParams = [MOCK_ROLE.organizationId];
      testBuilderSetter(RoleBuilder, 'setOrganizationId', validParams);
    });

    describe('setPrincipal()', () => {
      const validParams = [MOCK_ROLE.principal];
      testBuilderSetter(RoleBuilder, 'setPrincipal', validParams);
    });

    describe('setTitle()', () => {
      const validParams = [MOCK_ROLE.title];
      testBuilderSetter(RoleBuilder, 'setTitle', validParams);
    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          // omitting setOrganizationId()
          (new RoleBuilder())
            .setDescription(MOCK_ROLE.description)
            .setId(MOCK_ROLE.id)
            .setPrincipal(MOCK_ROLE.principal)
            .setTitle(MOCK_ROLE.title)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setPrincipal()
          (new RoleBuilder())
            .setDescription(MOCK_ROLE.description)
            .setId(MOCK_ROLE.id)
            .setOrganizationId(MOCK_ROLE.organizationId)
            .setTitle(MOCK_ROLE.title)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setTitle()
          (new RoleBuilder())
            .setDescription(MOCK_ROLE.description)
            .setId(MOCK_ROLE.id)
            .setOrganizationId(MOCK_ROLE.organizationId)
            .setPrincipal(MOCK_ROLE.principal)
            .build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          // omitting setDescription()
          (new RoleBuilder())
            .setId(MOCK_ROLE.id)
            .setOrganizationId(MOCK_ROLE.organizationId)
            .setPrincipal(MOCK_ROLE.principal)
            .setTitle(MOCK_ROLE.title)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setId()
          (new RoleBuilder())
            .setDescription(MOCK_ROLE.description)
            .setOrganizationId(MOCK_ROLE.organizationId)
            .setPrincipal(MOCK_ROLE.principal)
            .setTitle(MOCK_ROLE.title)
            .build();
        }).not.toThrow();
      });

      test('should return a valid instance', () => {

        const role = (new RoleBuilder())
          .setDescription(MOCK_ROLE.description)
          .setId(MOCK_ROLE.id)
          .setOrganizationId(MOCK_ROLE.organizationId)
          .setPrincipal(MOCK_ROLE.principal)
          .setTitle(MOCK_ROLE.title)
          .build();

        expectValidInstance(role);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ROLE_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_ROLE)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ROLE, description: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ROLE, id: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "organizationId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ROLE, organizationId: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ROLE, principal: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ROLE, title: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new Role({
              description: invalidInput,
              id: MOCK_ROLE.id,
              organizationId: MOCK_ROLE.organizationId,
              principal: MOCK_ROLE.principal,
              title: MOCK_ROLE.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new Role({
              description: MOCK_ROLE.description,
              id: invalidInput,
              organizationId: MOCK_ROLE.organizationId,
              principal: MOCK_ROLE.principal,
              title: MOCK_ROLE.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "organizationId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new Role({
              description: MOCK_ROLE.description,
              id: MOCK_ROLE.id,
              organizationId: invalidInput,
              principal: MOCK_ROLE.principal,
              title: MOCK_ROLE.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Role({
              description: MOCK_ROLE.description,
              id: MOCK_ROLE.id,
              organizationId: MOCK_ROLE.organizationId,
              principal: invalidInput,
              title: MOCK_ROLE.title,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Role({
              description: MOCK_ROLE.description,
              id: MOCK_ROLE.id,
              organizationId: MOCK_ROLE.organizationId,
              principal: MOCK_ROLE.principal,
              title: invalidInput,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_ROLE.valueOf()).toEqual(
        fromJS({
          [AT_CLASS]: ROLE_CLASS_PACKAGE,
          aclKey: MOCK_ROLE.aclKey,
          description: MOCK_ROLE.description,
          id: MOCK_ROLE.id,
          organizationId: MOCK_ROLE.organizationId,
          principal: MOCK_ROLE.principal.toObject(),
          title: MOCK_ROLE.title,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomRole = genRandomRole();
      const role0 = (new RoleBuilder(MOCK_ROLE)).build();
      const role1 = (new RoleBuilder(MOCK_ROLE)).build();

      const testSet = Set()
        .add(role0)
        .add(randomRole)
        .add(role1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().aclKey).toEqual(MOCK_ROLE.aclKey);
      expect(testSet.first().description).toEqual(MOCK_ROLE.description);
      expect(testSet.first().id).toEqual(MOCK_ROLE.id);
      expect(testSet.first().organizationId).toEqual(MOCK_ROLE.organizationId);
      expect(testSet.first().principal).toEqual(MOCK_ROLE.principal);
      expect(testSet.first().type).toEqual(MOCK_ROLE.type);

      expect(testSet.last().aclKey).toEqual(randomRole.aclKey);
      expect(testSet.last().description).toEqual(randomRole.description);
      expect(testSet.last().id).toEqual(randomRole.id);
      expect(testSet.last().organizationId).toEqual(randomRole.organizationId);
      expect(testSet.last().principal).toEqual(randomRole.principal);
      expect(testSet.last().type).toEqual(randomRole.type);
    });

    test('Immutable.Map', () => {

      const randomRole = genRandomRole();
      const role0 = (new RoleBuilder(MOCK_ROLE)).build();
      const role1 = (new RoleBuilder(MOCK_ROLE)).build();

      const testMap = Map()
        .set(role0, 'test_value_1')
        .set(randomRole, 'test_value_2')
        .set(role1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(role0)).toEqual('test_value_3');
      expect(testMap.get(randomRole)).toEqual('test_value_2');
      expect(testMap.get(role1)).toEqual('test_value_3');
    });

  });

});
