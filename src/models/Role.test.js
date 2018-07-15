import Role, { RoleBuilder, isValidRole as isValid } from './Role';
import { MOCK_ROLE_DM } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_PARAMS_SS,
  INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED
} from '../utils/testing/Invalid';

describe('Role', () => {

  describe('RoleBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new RoleBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
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
          builder.setId(MOCK_ROLE_DM.id);
        }).not.toThrow();
      });

    });

    describe('setOrganizationId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            builder.setOrganizationId(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setOrganizationId();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setOrganizationId(MOCK_ROLE_DM.organizationId);
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
          builder.setTitle(MOCK_ROLE_DM.title);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
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
          builder.setDescription(MOCK_ROLE_DM.description);
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
          builder.setPrincipal(MOCK_ROLE_DM.principal);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new RoleBuilder())
            .setId(MOCK_ROLE_DM.id)
            .setTitle(MOCK_ROLE_DM.title)
            .setDescription(MOCK_ROLE_DM.description)
            .setPrincipal(MOCK_ROLE_DM.principal)
            .build();
        }).toThrow();

        expect(() => {
          (new RoleBuilder())
            .setId(MOCK_ROLE_DM.id)
            .setOrganizationId(MOCK_ROLE_DM.organizationId)
            .setDescription(MOCK_ROLE_DM.description)
            .setPrincipal(MOCK_ROLE_DM.principal)
            .build();
        }).toThrow();

        expect(() => {
          (new RoleBuilder())
            .setId(MOCK_ROLE_DM.id)
            .setTitle(MOCK_ROLE_DM.title)
            .setOrganizationId(MOCK_ROLE_DM.organizationId)
            .setDescription(MOCK_ROLE_DM.description)
            .build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new RoleBuilder())
            .setOrganizationId(MOCK_ROLE_DM.organizationId)
            .setTitle(MOCK_ROLE_DM.title)
            .setDescription(MOCK_ROLE_DM.description)
            .setPrincipal(MOCK_ROLE_DM.principal)
            .build();
        }).not.toThrow();

        expect(() => {
          (new RoleBuilder())
            .setId(MOCK_ROLE_DM.id)
            .setOrganizationId(MOCK_ROLE_DM.organizationId)
            .setTitle(MOCK_ROLE_DM.title)
            .setPrincipal(MOCK_ROLE_DM.principal)
            .build();
        }).not.toThrow();
      });

      test('should return a valid instance', () => {

        const role = builder
          .setId(MOCK_ROLE_DM.id)
          .setOrganizationId(MOCK_ROLE_DM.organizationId)
          .setTitle(MOCK_ROLE_DM.title)
          .setDescription(MOCK_ROLE_DM.description)
          .setPrincipal(MOCK_ROLE_DM.principal)
          .build();

        expect(role).toBeInstanceOf(Role);

        expect(role.id).toBeDefined();
        expect(role.id).toEqual(MOCK_ROLE_DM.id);

        expect(role.organizationId).toBeDefined();
        expect(role.organizationId).toEqual(MOCK_ROLE_DM.organizationId);

        expect(role.title).toBeDefined();
        expect(role.title).toEqual(MOCK_ROLE_DM.title);

        expect(role.description).toBeDefined();
        expect(role.description).toEqual(MOCK_ROLE_DM.description);

        expect(role.principal).toBeDefined();
        expect(role.principal).toEqual(MOCK_ROLE_DM.principal);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ROLE_DM)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Role(
            MOCK_ROLE_DM.id,
            MOCK_ROLE_DM.organizationId,
            MOCK_ROLE_DM.title,
            MOCK_ROLE_DM.description,
            MOCK_ROLE_DM.principal
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const role = (new RoleBuilder())
          .setId(MOCK_ROLE_DM.id)
          .setOrganizationId(MOCK_ROLE_DM.organizationId)
          .setTitle(MOCK_ROLE_DM.title)
          .setDescription(MOCK_ROLE_DM.description)
          .setPrincipal(MOCK_ROLE_DM.principal)
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
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "organizationId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE_DM, { organizationId: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE_DM, { principal: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Role(
              invalidInput,
              MOCK_ROLE_DM.organizationId,
              MOCK_ROLE_DM.title,
              MOCK_ROLE_DM.description,
              MOCK_ROLE_DM.principal
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "organizationId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new Role(
              MOCK_ROLE_DM.id,
              invalidInput,
              MOCK_ROLE_DM.title,
              MOCK_ROLE_DM.description,
              MOCK_ROLE_DM.principal
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Role(
              MOCK_ROLE_DM.id,
              MOCK_ROLE_DM.organizationId,
              invalidInput,
              MOCK_ROLE_DM.description,
              MOCK_ROLE_DM.principal
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Role(
              MOCK_ROLE_DM.id,
              MOCK_ROLE_DM.organizationId,
              MOCK_ROLE_DM.title,
              invalidInput,
              MOCK_ROLE_DM.principal
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Role(
              MOCK_ROLE_DM.id,
              MOCK_ROLE_DM.organizationId,
              MOCK_ROLE_DM.title,
              MOCK_ROLE_DM.description,
              invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
