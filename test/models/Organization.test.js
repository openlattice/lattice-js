import Organization, {
  OrganizationBuilder,
  isValid
} from '../../src/models/Organization';

import {
  isDefined
} from '../../src/utils/LangUtils';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_ORG_UUID = 'ec6865e6-e60e-424b-a071-6a9c1603d735';
const MOCK_TITLE = 'MyOrganization';
const MOCK_DESCRIPTION = 'what an organization';

const MOCK_USER_PRINCIPAL = {
  type: 'USER',
  id: 'principalId_0'
};

const MOCK_ROLE_PRINCIPAL = {
  type: 'ROLE',
  id: 'principalId_1'
};

const MOCK_ORG = {
  id: MOCK_ORG_UUID,
  title: MOCK_TITLE,
  description: MOCK_DESCRIPTION,
  members: [MOCK_USER_PRINCIPAL],
  roles: [MOCK_ROLE_PRINCIPAL]
};

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

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setId();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setId(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given a valid parameter', () => {
        expect(() => {
          builder.setId(MOCK_ORG_UUID);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setTitle();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setTitle(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given a valid parameter', () => {
        expect(() => {
          builder.setTitle(MOCK_TITLE);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setDescription();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setDescription(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given a valid parameter', () => {
        expect(() => {
          builder.setDescription(MOCK_DESCRIPTION);
        }).not.toThrow();
      });

    });

    describe('setMembers()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setMembers();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setMembers(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setMembers([MOCK_USER_PRINCIPAL, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when given a valid parameter', () => {
        expect(() => {
          builder.setMembers([MOCK_USER_PRINCIPAL]);
        }).not.toThrow();
      });

    });

    describe('setRoles()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setRoles();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setRoles(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setRoles([MOCK_ROLE_PRINCIPAL, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when given a valid parameter', () => {
        expect(() => {
          builder.setRoles([MOCK_ROLE_PRINCIPAL]);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new OrganizationBuilder())
            .setMembers([MOCK_USER_PRINCIPAL])
            .setRoles([MOCK_ROLE_PRINCIPAL])
            .build();
        }).toThrow();

        expect(() => {
          (new OrganizationBuilder())
            .setTitle(MOCK_TITLE)
            .setRoles([MOCK_ROLE_PRINCIPAL])
            .build();
        }).toThrow();

        expect(() => {
          (new OrganizationBuilder())
            .setTitle(MOCK_TITLE)
            .setMembers([MOCK_USER_PRINCIPAL])
            .build();
        }).toThrow();

      });

      it('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new OrganizationBuilder())
            .setTitle(MOCK_TITLE)
            .setDescription(MOCK_DESCRIPTION)
            .setMembers([MOCK_USER_PRINCIPAL])
            .setRoles([MOCK_ROLE_PRINCIPAL])
            .build();
        }).not.toThrow();

        expect(() => {
          (new OrganizationBuilder())
            .setId(MOCK_ORG_UUID)
            .setTitle(MOCK_TITLE)
            .setMembers([MOCK_USER_PRINCIPAL])
            .setRoles([MOCK_ROLE_PRINCIPAL])
            .build();
        }).not.toThrow();
      });

      it('should return a valid Organization instance', () => {

        const org = builder
          .setId(MOCK_ORG_UUID)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .setMembers([MOCK_USER_PRINCIPAL])
          .setRoles([MOCK_ROLE_PRINCIPAL])
          .build();

        expect(org).toEqual(jasmine.any(Organization));

        expect(org.id).toBeDefined();
        expect(org.id).toEqual(MOCK_ORG_UUID);

        expect(org.title).toBeDefined();
        expect(org.title).toEqual(MOCK_TITLE);

        expect(org.description).toBeDefined();
        expect(org.description).toEqual(MOCK_DESCRIPTION);

        expect(org.members).toBeDefined();
        expect(org.members).toEqual([MOCK_USER_PRINCIPAL]);

        expect(org.roles).toBeDefined();
        expect(org.roles).toEqual([MOCK_ROLE_PRINCIPAL]);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid Organization object literal', () => {
        expect(isValid(MOCK_ORG)).toEqual(true);
      });

      it('should return true when given a valid Organization instance ', () => {
        expect(isValid(
          new Organization(
            MOCK_ORG_UUID, MOCK_TITLE, MOCK_DESCRIPTION, [MOCK_USER_PRINCIPAL], [MOCK_ROLE_PRINCIPAL]
          )
        )).toEqual(true);
      });

      it('should return true when given an Organization instance constructed by the builder', () => {

        const org = (new OrganizationBuilder())
          .setId(MOCK_ORG_UUID)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .setMembers([MOCK_USER_PRINCIPAL])
          .setRoles([MOCK_ROLE_PRINCIPAL])
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

      it('should return false when given an EntityType object literal with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_ORG, { id: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an EntityType object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORG, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an EntityType object literal with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_ORG, { description: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an EntityType object literal with an invalid "members" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORG, { members: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an EntityType object literal with an invalid "roles" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ORG, { roles: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an EntityType instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new Organization(
                invalidInput, MOCK_TITLE, MOCK_DESCRIPTION, [MOCK_USER_PRINCIPAL], [MOCK_ROLE_PRINCIPAL]
              )
            )).toEqual(false);
          }
        });
      });

      it('should return false when given an EntityType instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORG_UUID, invalidInput, MOCK_DESCRIPTION, [MOCK_USER_PRINCIPAL], [MOCK_ROLE_PRINCIPAL]
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an EntityType instance with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new Organization(
                MOCK_ORG_UUID, MOCK_TITLE, invalidInput, [MOCK_USER_PRINCIPAL], [MOCK_ROLE_PRINCIPAL]
              )
            )).toEqual(false);
          }
        });
      });

      it('should return false when given an EntityType instance with an invalid "members" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORG_UUID, MOCK_TITLE, MOCK_DESCRIPTION, invalidInput, [MOCK_ROLE_PRINCIPAL]
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an EntityType instance with an invalid "roles" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Organization(
              MOCK_ORG_UUID, MOCK_TITLE, MOCK_DESCRIPTION, [MOCK_USER_PRINCIPAL], invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
