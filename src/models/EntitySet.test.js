import EntitySet, { EntitySetBuilder, isValid } from './EntitySet';
import { MOCK_ENTITY_SET_DM } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_PARAMS_SS,
  INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED
} from '../utils/testing/Invalid';

describe('EntitySet', () => {

  describe('EntitySetBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new EntitySetBuilder();
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
          builder.setId(MOCK_ENTITY_SET_DM.id);
        }).not.toThrow();
      });

    });

    describe('setEntityTypeId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntityTypeId(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setEntityTypeId();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setEntityTypeId(MOCK_ENTITY_SET_DM.entityTypeId);
        }).not.toThrow();
      });

    });

    describe('setName()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setName(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setName();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setName(MOCK_ENTITY_SET_DM.name);
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
          builder.setTitle(MOCK_ENTITY_SET_DM.title);
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
          builder.setDescription(MOCK_ENTITY_SET_DM.description);
        }).not.toThrow();
      });

    });

    describe('setContacts()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setContacts(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setContacts([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setContacts(Object.values(MOCK_ENTITY_SET_DM.contacts).push(invalidInput));
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setContacts();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setContacts(MOCK_ENTITY_SET_DM.contacts);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

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

      test('should not throw when an optional property has not been set', () => {

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

      test('should set required properties that are allowed to be empty', () => {

        const entitySet = builder
          .setId(MOCK_ENTITY_SET_DM.id)
          .setEntityTypeId(MOCK_ENTITY_SET_DM.entityTypeId)
          .setName(MOCK_ENTITY_SET_DM.name)
          .setTitle(MOCK_ENTITY_SET_DM.title)
          .setDescription(MOCK_ENTITY_SET_DM.description)
          .build();

        expect(entitySet.contacts).toEqual([]);
      });

      test('should return a valid instance', () => {

        const entitySet = builder
          .setId(MOCK_ENTITY_SET_DM.id)
          .setEntityTypeId(MOCK_ENTITY_SET_DM.entityTypeId)
          .setName(MOCK_ENTITY_SET_DM.name)
          .setTitle(MOCK_ENTITY_SET_DM.title)
          .setDescription(MOCK_ENTITY_SET_DM.description)
          .setContacts(MOCK_ENTITY_SET_DM.contacts)
          .build();

        expect(entitySet).toBeInstanceOf(EntitySet);

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

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ENTITY_SET_DM)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
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

      test('should return true when given an instance constructed by the builder', () => {

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
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { entityTypeId: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { name: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "contacts" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { contacts: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ENTITY_SET_DM, { contacts: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
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
        });
      });

      test('should return false when given an instance with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
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

      test('should return false when given an instance with an invalid "name" property', () => {
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

      test('should return false when given an instance with an invalid "title" property', () => {
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

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
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
        });
      });

      test('should return false when given an instance with an invalid "contacts" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
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
