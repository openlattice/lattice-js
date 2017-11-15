import Role, {
  RoleBuilder,
  isValid
} from '../../src/models/Role';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_SS_PARAMS,
  INVALID_SS_PARAMS_EMPTY_STRING_ALLOWED
} from '../constants/InvalidParams';

import {
  MOCK_ROLE_DM
} from '../constants/MockDataModels';

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
          builder.setId(MOCK_ROLE_DM.id);
        }).not.toThrow();
      });

    });

    describe('setOrganizationId()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setOrganizationId(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setOrganizationId();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setOrganizationId(MOCK_ROLE_DM.organizationId);
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
          builder.setTitle(MOCK_ROLE_DM.title);
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
          builder.setDescription(MOCK_ROLE_DM.description);
        }).not.toThrow();
      });

    });

    describe('setPrincipal()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPrincipal(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setPrincipal();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPrincipal(MOCK_ROLE_DM.principal);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

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

      it('should not throw when an optional property has not been set', () => {

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

      it('should return a valid instance', () => {

        const org = builder
          .setId(MOCK_ROLE_DM.id)
          .setOrganizationId(MOCK_ROLE_DM.organizationId)
          .setTitle(MOCK_ROLE_DM.title)
          .setDescription(MOCK_ROLE_DM.description)
          .setPrincipal(MOCK_ROLE_DM.principal)
          .build();

        expect(org).toEqual(jasmine.any(Role));

        expect(org.id).toBeDefined();
        expect(org.id).toEqual(MOCK_ROLE_DM.id);

        expect(org.organizationId).toBeDefined();
        expect(org.organizationId).toEqual(MOCK_ROLE_DM.organizationId);

        expect(org.title).toBeDefined();
        expect(org.title).toEqual(MOCK_ROLE_DM.title);

        expect(org.description).toBeDefined();
        expect(org.description).toEqual(MOCK_ROLE_DM.description);

        expect(org.principal).toBeDefined();
        expect(org.principal).toEqual(MOCK_ROLE_DM.principal);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ROLE_DM)).toEqual(true);
      });

      it('should return true when given a valid object instance ', () => {
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

      it('should return true when given an instance constructed by the builder', () => {

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
          expect(isValid(Object.assign({}, MOCK_ROLE_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "organizationId" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE_DM, { organizationId: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "principal" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ROLE_DM, { principal: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_SS_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "organizationId" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "title" property', () => {
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

      it('should return false when given an instance with an invalid "description" property', () => {
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

      it('should return false when given an instance with an invalid "principal" property', () => {
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
