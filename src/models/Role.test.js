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

function expectValidInstance(value) {

  expect(value).toBeInstanceOf(Role);
  expect(value[AT_CLASS]).toEqual(ROLE_CLASS_PACKAGE);

  expect(value.aclKey).toBeDefined();
  expect(value.description).toBeDefined();
  expect(value.id).toBeDefined();
  expect(value.organizationId).toBeDefined();
  expect(value.principal).toBeDefined();
  expect(value.title).toBeDefined();

  expect(value.aclKey).toEqual(MOCK_ROLE.aclKey);
  expect(value.description).toEqual(MOCK_ROLE.description);
  expect(value.id).toEqual(MOCK_ROLE.id);
  expect(value.organizationId).toEqual(MOCK_ROLE.organizationId);
  expect(value.principal).toEqual(MOCK_ROLE.principal);
  expect(value.title).toEqual(MOCK_ROLE.title);
}

describe('Role', () => {

  describe('RoleBuilder', () => {

    describe('constructor()', () => {

      test('should construct given an instance', () => {
        expectValidInstance(
          (new RoleBuilder(MOCK_ROLE)).build()
        );
      });

      test('should construct given an object literal', () => {
        expectValidInstance(
          (new RoleBuilder({ ...MOCK_ROLE })).build()
        );
        expectValidInstance(
          (new RoleBuilder(MOCK_ROLE_OBJECT)).build()
        );
      });

      test('should construct given an immutable object', () => {
        expectValidInstance(
          (new RoleBuilder(MOCK_ROLE.toImmutable())).build()
        );
        expectValidInstance(
          (new RoleBuilder(fromJS({ ...MOCK_ROLE }))).build()
        );
        expectValidInstance(
          (new RoleBuilder(fromJS(MOCK_ROLE_OBJECT))).build()
        );
      });

    });

    describe('setDescription()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(() => {
            (new RoleBuilder()).setDescription(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new RoleBuilder()).setDescription();
        }).not.toThrow();
        expect(() => {
          (new RoleBuilder()).setDescription('');
        }).not.toThrow();
        expect(() => {
          (new RoleBuilder()).setDescription(MOCK_ROLE.description);
        }).not.toThrow();
      });

    });

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            (new RoleBuilder()).setId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new RoleBuilder()).setId();
        }).not.toThrow();
        expect(() => {
          (new RoleBuilder()).setId('');
        }).not.toThrow();
        expect(() => {
          (new RoleBuilder()).setId(MOCK_ROLE.id);
        }).not.toThrow();
      });

    });

    describe('setOrganizationId()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new RoleBuilder()).setOrganizationId();
        }).toThrow();
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new RoleBuilder()).setOrganizationId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new RoleBuilder()).setOrganizationId(MOCK_ROLE.organizationId);
        }).not.toThrow();
      });

    });

    describe('setPrincipal()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new RoleBuilder()).setPrincipal();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new RoleBuilder()).setPrincipal(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new RoleBuilder()).setPrincipal(MOCK_ROLE.principal);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new RoleBuilder()).setTitle();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new RoleBuilder()).setTitle(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new RoleBuilder()).setTitle(MOCK_ROLE.title);
        }).not.toThrow();
      });

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
