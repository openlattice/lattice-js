import EntitySet, {
  EntitySetBuilder,
  isValid
} from '../../src/models/EntitySet';

import {
  isDefined
} from '../../src/utils/LangUtils';

import {
  MOCK_ENTITY_SET_DM
} from '../constants/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED
} from '../constants/TestConstants';

describe('EntitySet', () => {

  describe('EntitySetBuilder', () => {

    let builder :EntitySetBuilder = null;

    beforeEach(() => {
      builder = new EntitySetBuilder();
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

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setId(MOCK_ENTITY_SET_DM.id);
        }).not.toThrow();
      });

    });

    describe('setEntityTypeId()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setEntityTypeId();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntityTypeId(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setEntityTypeId(MOCK_ENTITY_SET_DM.entityTypeId);
        }).not.toThrow();
      });

    });

    describe('setName()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setName();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setName(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setName(MOCK_ENTITY_SET_DM.name);
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

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setTitle(MOCK_ENTITY_SET_DM.title);
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

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setDescription(MOCK_ENTITY_SET_DM.description);
        }).not.toThrow();
      });

    });

    describe('setContacts()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setContacts(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setContacts([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setContacts(Object.values(MOCK_ENTITY_SET_DM.contacts).push(invalidInput));
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setContacts();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setContacts(MOCK_ENTITY_SET_DM.contacts);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new EntitySetBuilder())
            .setName(MOCK_ENTITY_SET_DM.name)
            .setTitle(MOCK_ENTITY_SET_DM.title)
            .build();
        }).toThrow();

        expect(() => {
          (new EntitySetBuilder())
            .setEntityTypeId(MOCK_ENTITY_SET_DM.entityTypeId)
            .setTitle(MOCK_ENTITY_SET_DM.title)
            .build();
        }).toThrow();

        expect(() => {
          (new EntitySetBuilder())
            .setEntityTypeId(MOCK_ENTITY_SET_DM.entityTypeId)
            .setName(MOCK_ENTITY_SET_DM.name)
            .build();
        }).toThrow();
      });

      it('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new EntitySetBuilder())
            .setEntityTypeId(MOCK_ENTITY_SET_DM.entityTypeId)
            .setName(MOCK_ENTITY_SET_DM.name)
            .setTitle(MOCK_ENTITY_SET_DM.title)
            .setDescription(MOCK_ENTITY_SET_DM.description)
            .build();
        }).not.toThrow();

        expect(() => {
          (new EntitySetBuilder())
            .setId(MOCK_ENTITY_SET_DM.id)
            .setEntityTypeId(MOCK_ENTITY_SET_DM.entityTypeId)
            .setName(MOCK_ENTITY_SET_DM.name)
            .setTitle(MOCK_ENTITY_SET_DM.title)
            .build();
        }).not.toThrow();
      });

      it('should set required properties that are allowed to be empty', () => {

        const entitySet = builder
          .setId(MOCK_ENTITY_SET_DM.id)
          .setEntityTypeId(MOCK_ENTITY_SET_DM.entityTypeId)
          .setName(MOCK_ENTITY_SET_DM.name)
          .setTitle(MOCK_ENTITY_SET_DM.title)
          .setDescription(MOCK_ENTITY_SET_DM.description)
          .build();

        expect(entitySet.contacts).toEqual([]);
      });

      it('should return a valid instance', () => {

        const entitySet = builder
          .setId(MOCK_ENTITY_SET_DM.id)
          .setEntityTypeId(MOCK_ENTITY_SET_DM.entityTypeId)
          .setName(MOCK_ENTITY_SET_DM.name)
          .setTitle(MOCK_ENTITY_SET_DM.title)
          .setDescription(MOCK_ENTITY_SET_DM.description)
          .setContacts(MOCK_ENTITY_SET_DM.contacts)
          .build();

        expect(entitySet).toEqual(jasmine.any(EntitySet));

        expect(entitySet.id).toBeDefined();
        expect(entitySet.id).toEqual(MOCK_ENTITY_SET_DM.id);

        expect(entitySet.entityTypeId).toBeDefined();
        expect(entitySet.entityTypeId).toEqual(MOCK_ENTITY_SET_DM.entityTypeId);

        expect(entitySet.name).toBeDefined();
        expect(entitySet.name).toEqual(MOCK_ENTITY_SET_DM.name);

        expect(entitySet.title).toBeDefined();
        expect(entitySet.title).toEqual(MOCK_ENTITY_SET_DM.title);

        expect(entitySet.description).toBeDefined();
        expect(entitySet.description).toEqual(MOCK_ENTITY_SET_DM.description);

        expect(entitySet.contacts).toBeDefined();
        expect(entitySet.contacts).toEqual(MOCK_ENTITY_SET_DM.contacts);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ENTITY_SET_DM)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new EntitySet(
            MOCK_ENTITY_SET_DM.id,
            MOCK_ENTITY_SET_DM.entityTypeId,
            MOCK_ENTITY_SET_DM.name,
            MOCK_ENTITY_SET_DM.title,
            MOCK_ENTITY_SET_DM.description,
            MOCK_ENTITY_SET_DM.contacts
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const entitySet = (new EntitySetBuilder())
          .setId(MOCK_ENTITY_SET_DM.id)
          .setEntityTypeId(MOCK_ENTITY_SET_DM.entityTypeId)
          .setName(MOCK_ENTITY_SET_DM.name)
          .setTitle(MOCK_ENTITY_SET_DM.title)
          .setDescription(MOCK_ENTITY_SET_DM.description)
          .setContacts(MOCK_ENTITY_SET_DM.contacts)
          .build();

        expect(isValid(entitySet)).toEqual(true);
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
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { id: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an object literal with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { entityTypeId: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { name: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { description: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an object literal with an invalid "contacts" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { contacts: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { contacts: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new EntitySet(
                invalidInput,
                MOCK_ENTITY_SET_DM.entityTypeId,
                MOCK_ENTITY_SET_DM.name,
                MOCK_ENTITY_SET_DM.title,
                MOCK_ENTITY_SET_DM.description,
                MOCK_ENTITY_SET_DM.contacts
              )
            )).toEqual(false);
          }
        });
      });

      it('should return false when given an instance with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_ENTITY_SET_DM.id,
              invalidInput,
              MOCK_ENTITY_SET_DM.name,
              MOCK_ENTITY_SET_DM.title,
              MOCK_ENTITY_SET_DM.description,
              MOCK_ENTITY_SET_DM.contacts
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_ENTITY_SET_DM.id,
              MOCK_ENTITY_SET_DM.entityTypeId,
              invalidInput,
              MOCK_ENTITY_SET_DM.title,
              MOCK_ENTITY_SET_DM.description,
              MOCK_ENTITY_SET_DM.contacts
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_ENTITY_SET_DM.id,
              MOCK_ENTITY_SET_DM.entityTypeId,
              MOCK_ENTITY_SET_DM.name,
              invalidInput,
              MOCK_ENTITY_SET_DM.description,
              MOCK_ENTITY_SET_DM.contacts
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new EntitySet(
                MOCK_ENTITY_SET_DM.id,
                MOCK_ENTITY_SET_DM.entityTypeId,
                MOCK_ENTITY_SET_DM.name,
                MOCK_ENTITY_SET_DM.title,
                invalidInput,
                MOCK_ENTITY_SET_DM.contacts
              )
            )).toEqual(false);
          }
        });
      });

      it('should return false when given an instance with an invalid "contacts" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_ENTITY_SET_DM.id,
              MOCK_ENTITY_SET_DM.entityTypeId,
              MOCK_ENTITY_SET_DM.name,
              MOCK_ENTITY_SET_DM.title,
              MOCK_ENTITY_SET_DM.description,
              invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new EntitySet(
              MOCK_ENTITY_SET_DM.id,
              MOCK_ENTITY_SET_DM.entityTypeId,
              MOCK_ENTITY_SET_DM.name,
              MOCK_ENTITY_SET_DM.title,
              MOCK_ENTITY_SET_DM.description,
              [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
