import EntityType, { EntityTypeBuilder, isValid } from './EntityType';
import { MOCK_ENTITY_TYPE_DM } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED
} from '../utils/testing/Invalid';

describe('EntityType', () => {

  describe('EntityTypeBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new EntityTypeBuilder();
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
          builder.setId(MOCK_ENTITY_TYPE_DM.id);
        }).not.toThrow();
      });

    });

    describe('setType()', () => {


      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setType(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setType();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setType(MOCK_ENTITY_TYPE_DM.type);
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
          builder.setTitle(MOCK_ENTITY_TYPE_DM.title);
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
          builder.setDescription(MOCK_ENTITY_TYPE_DM.description);
        }).not.toThrow();
      });

    });

    describe('setSchemas()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setSchemas([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas([...MOCK_ENTITY_TYPE_DM.schemas, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setSchemas();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setSchemas(MOCK_ENTITY_TYPE_DM.schemas);
        }).not.toThrow();
      });

    });

    describe('setKey()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setKey(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setKey([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setKey([...MOCK_ENTITY_TYPE_DM.key, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setKey();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setKey(MOCK_ENTITY_TYPE_DM.key);
        }).not.toThrow();
      });

    });

    describe('setPropertyTypes()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypes(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPropertyTypes([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypes([...MOCK_ENTITY_TYPE_DM.properties, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setPropertyTypes();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPropertyTypes(MOCK_ENTITY_TYPE_DM.properties);
        }).not.toThrow();
      });

    });

    describe('setBaseType()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setBaseType(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setBaseType();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setBaseType(MOCK_ENTITY_TYPE_DM.baseType);
        }).not.toThrow();
      });

    });

    describe('setCategory()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setCategory(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setCategory();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setCategory(MOCK_ENTITY_TYPE_DM.category);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new EntityTypeBuilder()).setType(MOCK_ENTITY_TYPE_DM.type).build();
        }).toThrow();

        expect(() => {
          (new EntityTypeBuilder()).setTitle(MOCK_ENTITY_TYPE_DM.title).build();
        }).toThrow();

      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new EntityTypeBuilder())
            .setType(MOCK_ENTITY_TYPE_DM.type)
            .setTitle(MOCK_ENTITY_TYPE_DM.title)
            .setDescription(MOCK_ENTITY_TYPE_DM.description)
            .setSchemas(MOCK_ENTITY_TYPE_DM.schemas)
            .setKey(MOCK_ENTITY_TYPE_DM.key)
            .setPropertyTypes(MOCK_ENTITY_TYPE_DM.properties)
            .setBaseType(MOCK_ENTITY_TYPE_DM.baseType)
            .setCategory(MOCK_ENTITY_TYPE_DM.category)
            .build();
        }).not.toThrow();

        expect(() => {
          (new EntityTypeBuilder())
            .setId(MOCK_ENTITY_TYPE_DM.id)
            .setType(MOCK_ENTITY_TYPE_DM.type)
            .setTitle(MOCK_ENTITY_TYPE_DM.title)
            .setSchemas(MOCK_ENTITY_TYPE_DM.schemas)
            .setKey(MOCK_ENTITY_TYPE_DM.key)
            .setPropertyTypes(MOCK_ENTITY_TYPE_DM.properties)
            .setBaseType(MOCK_ENTITY_TYPE_DM.baseType)
            .setCategory(MOCK_ENTITY_TYPE_DM.category)
            .build();
        }).not.toThrow();

        expect(() => {
          (new EntityTypeBuilder())
            .setId(MOCK_ENTITY_TYPE_DM.id)
            .setType(MOCK_ENTITY_TYPE_DM.type)
            .setTitle(MOCK_ENTITY_TYPE_DM.title)
            .setDescription(MOCK_ENTITY_TYPE_DM.description)
            .setSchemas(MOCK_ENTITY_TYPE_DM.schemas)
            .setKey(MOCK_ENTITY_TYPE_DM.key)
            .setPropertyTypes(MOCK_ENTITY_TYPE_DM.properties)
            .setCategory(MOCK_ENTITY_TYPE_DM.category)
            .build();
        }).not.toThrow();

        expect(() => {
          (new EntityTypeBuilder())
            .setId(MOCK_ENTITY_TYPE_DM.id)
            .setType(MOCK_ENTITY_TYPE_DM.type)
            .setTitle(MOCK_ENTITY_TYPE_DM.title)
            .setDescription(MOCK_ENTITY_TYPE_DM.description)
            .setSchemas(MOCK_ENTITY_TYPE_DM.schemas)
            .setKey(MOCK_ENTITY_TYPE_DM.key)
            .setPropertyTypes(MOCK_ENTITY_TYPE_DM.properties)
            .setBaseType(MOCK_ENTITY_TYPE_DM.baseType)
            .build();
        }).not.toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const entityType = builder
          .setType(MOCK_ENTITY_TYPE_DM.type)
          .setTitle(MOCK_ENTITY_TYPE_DM.title)
          .build();

        expect(entityType.key).toEqual([]);
        expect(entityType.properties).toEqual([]);
        expect(entityType.schemas).toEqual([]);
      });

      test('should return a valid instance', () => {

        const entityType = builder
          .setId(MOCK_ENTITY_TYPE_DM.id)
          .setType(MOCK_ENTITY_TYPE_DM.type)
          .setTitle(MOCK_ENTITY_TYPE_DM.title)
          .setDescription(MOCK_ENTITY_TYPE_DM.description)
          .setSchemas(MOCK_ENTITY_TYPE_DM.schemas)
          .setKey(MOCK_ENTITY_TYPE_DM.key)
          .setPropertyTypes(MOCK_ENTITY_TYPE_DM.properties)
          .setBaseType(MOCK_ENTITY_TYPE_DM.baseType)
          .setCategory(MOCK_ENTITY_TYPE_DM.category)
          .build();

        expect(entityType).toEqual(jasmine.any(EntityType));

        expect(entityType.id).toBeDefined();
        expect(entityType.id).toEqual(MOCK_ENTITY_TYPE_DM.id);

        expect(entityType.type).toBeDefined();
        expect(entityType.type).toEqual(MOCK_ENTITY_TYPE_DM.type);

        expect(entityType.title).toBeDefined();
        expect(entityType.title).toEqual(MOCK_ENTITY_TYPE_DM.title);

        expect(entityType.description).toBeDefined();
        expect(entityType.description).toEqual(MOCK_ENTITY_TYPE_DM.description);

        expect(entityType.schemas).toBeDefined();
        expect(entityType.schemas).toEqual(MOCK_ENTITY_TYPE_DM.schemas);

        expect(entityType.key).toBeDefined();
        expect(entityType.key).toEqual(MOCK_ENTITY_TYPE_DM.key);

        expect(entityType.properties).toBeDefined();
        expect(entityType.properties).toEqual(MOCK_ENTITY_TYPE_DM.properties);

        expect(entityType.baseType).toBeDefined();
        expect(entityType.baseType).toEqual(MOCK_ENTITY_TYPE_DM.baseType);

        expect(entityType.category).toBeDefined();
        expect(entityType.category).toEqual(MOCK_ENTITY_TYPE_DM.category);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ENTITY_TYPE_DM)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new EntityType(
            MOCK_ENTITY_TYPE_DM.id,
            MOCK_ENTITY_TYPE_DM.type,
            MOCK_ENTITY_TYPE_DM.title,
            MOCK_ENTITY_TYPE_DM.description,
            MOCK_ENTITY_TYPE_DM.schemas,
            MOCK_ENTITY_TYPE_DM.key,
            MOCK_ENTITY_TYPE_DM.properties,
            MOCK_ENTITY_TYPE_DM.baseType,
            MOCK_ENTITY_TYPE_DM.category
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const entityType = (new EntityTypeBuilder())
          .setId(MOCK_ENTITY_TYPE_DM.id)
          .setType(MOCK_ENTITY_TYPE_DM.type)
          .setTitle(MOCK_ENTITY_TYPE_DM.title)
          .setDescription(MOCK_ENTITY_TYPE_DM.description)
          .setSchemas(MOCK_ENTITY_TYPE_DM.schemas)
          .setKey(MOCK_ENTITY_TYPE_DM.key)
          .setPropertyTypes(MOCK_ENTITY_TYPE_DM.properties)
          .setBaseType(MOCK_ENTITY_TYPE_DM.baseType)
          .setCategory(MOCK_ENTITY_TYPE_DM.category)
          .build();

        expect(isValid(entityType)).toEqual(true);
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
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { type: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "schemas" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { schemas: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "key" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { key: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { key: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "properties" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { properties: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { properties: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "baseType" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { baseType: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "category" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { category: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              invalidInput,
              MOCK_ENTITY_TYPE_DM.type,
              MOCK_ENTITY_TYPE_DM.title,
              MOCK_ENTITY_TYPE_DM.description,
              MOCK_ENTITY_TYPE_DM.schemas,
              MOCK_ENTITY_TYPE_DM.key,
              MOCK_ENTITY_TYPE_DM.properties,
              MOCK_ENTITY_TYPE_DM.baseType,
              MOCK_ENTITY_TYPE_DM.category
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE_DM.id,
              invalidInput,
              MOCK_ENTITY_TYPE_DM.title,
              MOCK_ENTITY_TYPE_DM.description,
              MOCK_ENTITY_TYPE_DM.schemas,
              MOCK_ENTITY_TYPE_DM.key,
              MOCK_ENTITY_TYPE_DM.properties,
              MOCK_ENTITY_TYPE_DM.baseType,
              MOCK_ENTITY_TYPE_DM.category
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE_DM.id,
              MOCK_ENTITY_TYPE_DM.type,
              invalidInput,
              MOCK_ENTITY_TYPE_DM.description,
              MOCK_ENTITY_TYPE_DM.schemas,
              MOCK_ENTITY_TYPE_DM.key,
              MOCK_ENTITY_TYPE_DM.properties,
              MOCK_ENTITY_TYPE_DM.baseType,
              MOCK_ENTITY_TYPE_DM.category
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE_DM.id,
              MOCK_ENTITY_TYPE_DM.type,
              MOCK_ENTITY_TYPE_DM.title,
              invalidInput,
              MOCK_ENTITY_TYPE_DM.schemas,
              MOCK_ENTITY_TYPE_DM.key,
              MOCK_ENTITY_TYPE_DM.properties,
              MOCK_ENTITY_TYPE_DM.baseType,
              MOCK_ENTITY_TYPE_DM.category
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "schemas" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE_DM.id,
              MOCK_ENTITY_TYPE_DM.type,
              MOCK_ENTITY_TYPE_DM.title,
              MOCK_ENTITY_TYPE_DM.description,
              invalidInput,
              MOCK_ENTITY_TYPE_DM.key,
              MOCK_ENTITY_TYPE_DM.properties,
              MOCK_ENTITY_TYPE_DM.baseType,
              MOCK_ENTITY_TYPE_DM.category
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "key" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE_DM.id,
              MOCK_ENTITY_TYPE_DM.type,
              MOCK_ENTITY_TYPE_DM.title,
              MOCK_ENTITY_TYPE_DM.description,
              MOCK_ENTITY_TYPE_DM.schemas,
              invalidInput,
              MOCK_ENTITY_TYPE_DM.properties,
              MOCK_ENTITY_TYPE_DM.baseType,
              MOCK_ENTITY_TYPE_DM.category
            )
          )).toEqual(false);
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE_DM.id,
              MOCK_ENTITY_TYPE_DM.type,
              MOCK_ENTITY_TYPE_DM.title,
              MOCK_ENTITY_TYPE_DM.description,
              MOCK_ENTITY_TYPE_DM.schemas,
              [invalidInput],
              MOCK_ENTITY_TYPE_DM.properties,
              MOCK_ENTITY_TYPE_DM.baseType,
              MOCK_ENTITY_TYPE_DM.category
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "properties" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE_DM.id,
              MOCK_ENTITY_TYPE_DM.type,
              MOCK_ENTITY_TYPE_DM.title,
              MOCK_ENTITY_TYPE_DM.description,
              MOCK_ENTITY_TYPE_DM.schemas,
              MOCK_ENTITY_TYPE_DM.key,
              invalidInput,
              MOCK_ENTITY_TYPE_DM.baseType,
              MOCK_ENTITY_TYPE_DM.category
            )
          )).toEqual(false);
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE_DM.id,
              MOCK_ENTITY_TYPE_DM.type,
              MOCK_ENTITY_TYPE_DM.title,
              MOCK_ENTITY_TYPE_DM.description,
              MOCK_ENTITY_TYPE_DM.schemas,
              MOCK_ENTITY_TYPE_DM.key,
              [invalidInput],
              MOCK_ENTITY_TYPE_DM.baseType,
              MOCK_ENTITY_TYPE_DM.category
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "baseType" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE_DM.id,
              MOCK_ENTITY_TYPE_DM.type,
              MOCK_ENTITY_TYPE_DM.title,
              MOCK_ENTITY_TYPE_DM.description,
              MOCK_ENTITY_TYPE_DM.schemas,
              MOCK_ENTITY_TYPE_DM.key,
              MOCK_ENTITY_TYPE_DM.properties,
              invalidInput,
              MOCK_ENTITY_TYPE_DM.category
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "category" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE_DM.id,
              MOCK_ENTITY_TYPE_DM.type,
              MOCK_ENTITY_TYPE_DM.title,
              MOCK_ENTITY_TYPE_DM.description,
              MOCK_ENTITY_TYPE_DM.schemas,
              MOCK_ENTITY_TYPE_DM.key,
              MOCK_ENTITY_TYPE_DM.properties,
              MOCK_ENTITY_TYPE_DM.baseType,
              invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
