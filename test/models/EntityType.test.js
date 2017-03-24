import EntityType, {
  EntityTypeBuilder,
  isValid
} from '../../src/models/EntityType';

import {
  INVALID_BASE_TYPES,
  INVALID_CATEGORIES,
  INVALID_DESCRIPTIONS,
  INVALID_KEYS,
  INVALID_PARAMS,
  INVALID_PROPERTIES,
  INVALID_SCHEMAS
} from '../constants/InvalidParams';

import {
  MOCK_ENTITY_TYPE_DM
} from '../constants/MockDataModels';

describe('EntityType', () => {

  describe('EntityTypeBuilder', () => {

    let builder :EntityTypeBuilder = null;

    beforeEach(() => {
      builder = new EntityTypeBuilder();
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
          builder.setId(MOCK_ENTITY_TYPE_DM.id);
        }).not.toThrow();
      });

    });

    describe('setType()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setType();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setType(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setType(MOCK_ENTITY_TYPE_DM.type);
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
          builder.setTitle(MOCK_ENTITY_TYPE_DM.title);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_DESCRIPTIONS.forEach((invalidInput) => {
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
          builder.setDescription(MOCK_ENTITY_TYPE_DM.description);
        }).not.toThrow();
      });

    });

    describe('setSchemas()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SCHEMAS.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setSchemas([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_SCHEMAS.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas([...MOCK_ENTITY_TYPE_DM.schemas, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setSchemas();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setSchemas(MOCK_ENTITY_TYPE_DM.schemas);
        }).not.toThrow();
      });

    });

    describe('setKey()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_KEYS.forEach((invalidInput) => {
          expect(() => {
            builder.setKey(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setKey([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_KEYS.forEach((invalidInput) => {
          expect(() => {
            builder.setKey([...MOCK_ENTITY_TYPE_DM.key, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setKey();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setKey(MOCK_ENTITY_TYPE_DM.key);
        }).not.toThrow();
      });

    });

    describe('setPropertyTypes()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PROPERTIES.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypes(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPropertyTypes([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PROPERTIES.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypes([...MOCK_ENTITY_TYPE_DM.properties, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setPropertyTypes();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPropertyTypes(MOCK_ENTITY_TYPE_DM.properties);
        }).not.toThrow();
      });

    });

    describe('setBaseType()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_BASE_TYPES.forEach((invalidInput) => {
          expect(() => {
            builder.setBaseType(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setBaseType();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setBaseType(MOCK_ENTITY_TYPE_DM.baseType);
        }).not.toThrow();
      });

    });

    describe('setCategory()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_CATEGORIES.forEach((invalidInput) => {
          expect(() => {
            builder.setCategory(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setCategory();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setCategory(MOCK_ENTITY_TYPE_DM.category);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new EntityTypeBuilder()).setType(MOCK_ENTITY_TYPE_DM.type).build();
        }).toThrow();

        expect(() => {
          (new EntityTypeBuilder()).setTitle(MOCK_ENTITY_TYPE_DM.title).build();
        }).toThrow();

      });

      it('should not throw when an optional property has not been set', () => {

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

      it('should set required properties that are allowed to be empty', () => {

        const entityType = builder
          .setType(MOCK_ENTITY_TYPE_DM.type)
          .setTitle(MOCK_ENTITY_TYPE_DM.title)
          .build();

        expect(entityType.key).toEqual([]);
        expect(entityType.properties).toEqual([]);
        expect(entityType.schemas).toEqual([]);
      });

      it('should return a valid instance', () => {

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

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ENTITY_TYPE_DM)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
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

      it('should return true when given an instance constructed by the builder', () => {

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
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { type: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_DESCRIPTIONS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "schemas" property', () => {
        INVALID_SCHEMAS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { schemas: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "key" property', () => {
        INVALID_KEYS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { key: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { key: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "properties" property', () => {
        INVALID_PROPERTIES.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { properties: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { properties: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "baseType" property', () => {
        INVALID_BASE_TYPES.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { baseType: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "category" property', () => {
        INVALID_CATEGORIES.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE_DM, { category: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "type" property', () => {
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

      it('should return false when given an instance with an invalid "title" property', () => {
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

      it('should return false when given an instance with an invalid "description" property', () => {
        INVALID_DESCRIPTIONS.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "schemas" property', () => {
        INVALID_SCHEMAS.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "key" property', () => {
        INVALID_KEYS.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "properties" property', () => {
        INVALID_PROPERTIES.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "baseType" property', () => {
        INVALID_BASE_TYPES.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "category" property', () => {
        INVALID_CATEGORIES.forEach((invalidInput) => {
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
