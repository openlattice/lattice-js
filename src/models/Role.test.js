import { Map, Set, fromJS } from 'immutable';
import Role, { ROLE_CLASS_PACKAGE, RoleBuilder, isValidRole as isValid } from './Role';
import { AT_CLASS } from '../constants/GlobalConstants';
import { MOCK_ROLE, genRandomRole } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

describe('Role', () => {

  describe('RoleBuilder', () => {

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
          (new RoleBuilder()).setDescription(MOCK_ROLE.description);
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

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new RoleBuilder())
            .setDescription(MOCK_ROLE.description)
            .setId(MOCK_ROLE.id)
            .setPrincipal(MOCK_ROLE.principal)
            .setTitle(MOCK_ROLE.title)
            .build();
        }).toThrow();

        expect(() => {
          (new RoleBuilder())
            .setDescription(MOCK_ROLE.description)
            .setId(MOCK_ROLE.id)
            .setOrganizationId(MOCK_ROLE.organizationId)
            .setPrincipal(MOCK_ROLE.principal)
            .build();
        }).toThrow();

        expect(() => {
          (new RoleBuilder())
            .setDescription(MOCK_ROLE.description)
            .setId(MOCK_ROLE.id)
            .setOrganizationId(MOCK_ROLE.organizationId)
            .setTitle(MOCK_ROLE.title)
            .build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new RoleBuilder())
            .setDescription(MOCK_ROLE.description)
            .setOrganizationId(MOCK_ROLE.organizationId)
            .setPrincipal(MOCK_ROLE.principal)
            .setTitle(MOCK_ROLE.title)
            .build();
        }).not.toThrow();

        expect(() => {
          (new RoleBuilder())
            .setId(MOCK_ROLE.id)
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

        expect(role).toBeInstanceOf(Role);
        expect(role[AT_CLASS]).toEqual(ROLE_CLASS_PACKAGE);

        expect(role.description).toBeDefined();
        expect(role.description).toEqual(MOCK_ROLE.description);

        expect(role.id).toBeDefined();
        expect(role.id).toEqual(MOCK_ROLE.id);

        expect(role.organizationId).toBeDefined();
        expect(role.organizationId).toEqual(MOCK_ROLE.organizationId);

        expect(role.principal).toBeDefined();
        expect(role.principal).toEqual(MOCK_ROLE.principal);

        expect(role.title).toBeDefined();
        expect(role.title).toEqual(MOCK_ROLE.title);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ROLE)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Role(
            MOCK_ROLE.id,
            MOCK_ROLE.organizationId,
            MOCK_ROLE.title,
            MOCK_ROLE.description,
            MOCK_ROLE.principal
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const role = (new RoleBuilder())
          .setId(MOCK_ROLE.id)
          .setOrganizationId(MOCK_ROLE.organizationId)
          .setTitle(MOCK_ROLE.title)
          .setDescription(MOCK_ROLE.description)
          .setPrincipal(MOCK_ROLE.principal)
          .build();

        expect(isValid(role)).toEqual(true);
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
          expect(isValid(Object.assign({}, MOCK_ROLE, { id: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "organizationId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE, { organizationId: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE, { title: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE, { description: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE, { principal: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new Role(
              invalidInput,
              MOCK_ROLE.organizationId,
              MOCK_ROLE.title,
              MOCK_ROLE.description,
              MOCK_ROLE.principal,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "organizationId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new Role(
              MOCK_ROLE.id,
              invalidInput,
              MOCK_ROLE.title,
              MOCK_ROLE.description,
              MOCK_ROLE.principal,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Role(
              MOCK_ROLE.id,
              MOCK_ROLE.organizationId,
              invalidInput,
              MOCK_ROLE.description,
              MOCK_ROLE.principal,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new Role(
              MOCK_ROLE.id,
              MOCK_ROLE.organizationId,
              MOCK_ROLE.title,
              invalidInput,
              MOCK_ROLE.principal,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Role(
              MOCK_ROLE.id,
              MOCK_ROLE.organizationId,
              MOCK_ROLE.title,
              MOCK_ROLE.description,
              invalidInput,
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const role = new Role(
        MOCK_ROLE.id,
        MOCK_ROLE.organizationId,
        MOCK_ROLE.title,
        MOCK_ROLE.description,
        MOCK_ROLE.principal,
      );
      expect(role.valueOf()).toEqual(
        fromJS({
          [AT_CLASS]: ROLE_CLASS_PACKAGE,
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
      const role0 = new Role(
        MOCK_ROLE.id,
        MOCK_ROLE.organizationId,
        MOCK_ROLE.title,
        MOCK_ROLE.description,
        MOCK_ROLE.principal,
      );
      const role1 = new Role(
        MOCK_ROLE.id,
        MOCK_ROLE.organizationId,
        MOCK_ROLE.title,
        MOCK_ROLE.description,
        MOCK_ROLE.principal,
      );

      const testSet = Set()
        .add(role0)
        .add(randomRole)
        .add(role1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().description).toEqual(MOCK_ROLE.description);
      expect(testSet.first().id).toEqual(MOCK_ROLE.id);
      expect(testSet.first().organizationId).toEqual(MOCK_ROLE.organizationId);
      expect(testSet.first().principal).toEqual(MOCK_ROLE.principal);
      expect(testSet.first().type).toEqual(MOCK_ROLE.type);

      expect(testSet.last().description).toEqual(randomRole.description);
      expect(testSet.last().id).toEqual(randomRole.id);
      expect(testSet.last().organizationId).toEqual(randomRole.organizationId);
      expect(testSet.last().principal).toEqual(randomRole.principal);
      expect(testSet.last().type).toEqual(randomRole.type);
    });

    test('Immutable.Map', () => {

      const randomRole = genRandomRole();
      const role0 = new Role(
        MOCK_ROLE.id,
        MOCK_ROLE.organizationId,
        MOCK_ROLE.title,
        MOCK_ROLE.description,
        MOCK_ROLE.principal,
      );
      const role1 = new Role(
        MOCK_ROLE.id,
        MOCK_ROLE.organizationId,
        MOCK_ROLE.title,
        MOCK_ROLE.description,
        MOCK_ROLE.principal,
      );

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
