import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_ENTITY_TYPE,
  MOCK_ENTITY_TYPE_OBJECT,
  EntityType,
  EntityTypeBuilder,
  genRandomEntityType,
  isValidEntityType as isValid,
} from './EntityType';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_NUMBER,
  INVALID_PARAMS_FOR_OPTIONAL_OBJECT,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

const INVALID_PARAMS_FOR_SHARD = INVALID_PARAMS_FOR_OPTIONAL_NUMBER.slice(0);
INVALID_PARAMS_FOR_SHARD.push(-1);
INVALID_PARAMS_FOR_SHARD.push(0);
INVALID_PARAMS_FOR_SHARD.push(20);

function expectValidInstance(value) {

  expect(value).toBeInstanceOf(EntityType);

  expect(value.baseType).toBeDefined();
  expect(value.category).toBeDefined();
  expect(value.description).toBeDefined();
  expect(value.id).toBeDefined();
  expect(value.key).toBeDefined();
  expect(value.properties).toBeDefined();
  expect(value.propertyTags).toBeDefined();
  expect(value.schemas).toBeDefined();
  expect(value.shards).toBeDefined();
  expect(value.title).toBeDefined();
  expect(value.type).toBeDefined();

  expect(value.baseType).toEqual(MOCK_ENTITY_TYPE.baseType);
  expect(value.category).toEqual(MOCK_ENTITY_TYPE.category);
  expect(value.description).toEqual(MOCK_ENTITY_TYPE.description);
  expect(value.id).toEqual(MOCK_ENTITY_TYPE.id);
  expect(value.key).toEqual(MOCK_ENTITY_TYPE.key);
  expect(value.properties).toEqual(MOCK_ENTITY_TYPE.properties);
  expect(value.propertyTags).toEqual(MOCK_ENTITY_TYPE.propertyTags);
  expect(value.schemas).toEqual(MOCK_ENTITY_TYPE.schemas);
  expect(value.shards).toEqual(MOCK_ENTITY_TYPE.shards);
  expect(value.title).toEqual(MOCK_ENTITY_TYPE.title);
  expect(value.type).toEqual(MOCK_ENTITY_TYPE.type);
}

describe('EntityType', () => {

  describe('EntityTypeBuilder', () => {

    describe('constructor()', () => {

      test('should construct given an instance', () => {
        expectValidInstance(
          (new EntityTypeBuilder(MOCK_ENTITY_TYPE)).build()
        );
      });

      test('should construct given an object literal', () => {
        expectValidInstance(
          (new EntityTypeBuilder({ ...MOCK_ENTITY_TYPE })).build()
        );
        expectValidInstance(
          (new EntityTypeBuilder(MOCK_ENTITY_TYPE_OBJECT)).build()
        );
      });

      test('should construct given an immutable object', () => {
        expectValidInstance(
          (new EntityTypeBuilder(MOCK_ENTITY_TYPE.toImmutable())).build()
        );
        expectValidInstance(
          (new EntityTypeBuilder(fromJS({ ...MOCK_ENTITY_TYPE }))).build()
        );
        expectValidInstance(
          (new EntityTypeBuilder(fromJS(MOCK_ENTITY_TYPE_OBJECT))).build()
        );
      });

    });

    describe('setBaseType()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setBaseType(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setBaseType();
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setBaseType('');
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setBaseType(MOCK_ENTITY_TYPE.baseType);
        }).not.toThrow();
      });

    });

    describe('setCategory()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setCategory(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setCategory();
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setCategory('');
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setCategory(MOCK_ENTITY_TYPE.category);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setDescription(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setDescription();
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setDescription('');
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setDescription(MOCK_ENTITY_TYPE.description);
        }).not.toThrow();
      });

    });

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setId();
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setId('');
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setId(MOCK_ENTITY_TYPE.id);
        }).not.toThrow();
      });

    });

    describe('setKey()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setKey(invalidInput);
          }).toThrow();
          expect(() => {
            (new EntityTypeBuilder()).setKey([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setKey([...MOCK_ENTITY_TYPE.key, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setKey();
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setKey([]);
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setKey(MOCK_ENTITY_TYPE.key);
        }).not.toThrow();
      });

    });

    describe('setPropertyTags()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_OBJECT.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setPropertyTags(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setPropertyTags();
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setPropertyTags({});
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setPropertyTags(MOCK_ENTITY_TYPE.propertyTags);
        }).not.toThrow();
      });

    });

    describe('setPropertyTypes()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setPropertyTypes(invalidInput);
          }).toThrow();
          expect(() => {
            (new EntityTypeBuilder()).setPropertyTypes([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setPropertyTypes([...MOCK_ENTITY_TYPE.properties, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setPropertyTypes();
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setPropertyTypes([]);
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setPropertyTypes(MOCK_ENTITY_TYPE.properties);
        }).not.toThrow();
      });

    });

    describe('setSchemas()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setSchemas(invalidInput);
          }).toThrow();
          expect(() => {
            (new EntityTypeBuilder()).setSchemas([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setSchemas([...MOCK_ENTITY_TYPE.schemas, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setSchemas();
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setSchemas([]);
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setSchemas(MOCK_ENTITY_TYPE.schemas);
        }).not.toThrow();
      });

    });

    describe('setShards()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_SHARD.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setShards(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setShards();
        }).not.toThrow();
        expect(() => {
          (new EntityTypeBuilder()).setShards(MOCK_ENTITY_TYPE.shards);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setTitle();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setTitle(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setTitle(MOCK_ENTITY_TYPE.title);
        }).not.toThrow();
      });

    });

    describe('setType()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setType();
        }).toThrow();
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setType(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setType(MOCK_ENTITY_TYPE.type);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          // omitting setTitle()
          (new EntityTypeBuilder())
            .setBaseType(MOCK_ENTITY_TYPE.baseType)
            .setCategory(MOCK_ENTITY_TYPE.category)
            .setDescription(MOCK_ENTITY_TYPE.description)
            .setId(MOCK_ENTITY_TYPE.id)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTags(MOCK_ENTITY_TYPE.propertyTags)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setShards(MOCK_ENTITY_TYPE.shards)
            .setType(MOCK_ENTITY_TYPE.type)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setType()
          (new EntityTypeBuilder())
            .setBaseType(MOCK_ENTITY_TYPE.baseType)
            .setCategory(MOCK_ENTITY_TYPE.category)
            .setDescription(MOCK_ENTITY_TYPE.description)
            .setId(MOCK_ENTITY_TYPE.id)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTags(MOCK_ENTITY_TYPE.propertyTags)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setShards(MOCK_ENTITY_TYPE.shards)
            .setTitle(MOCK_ENTITY_TYPE.title)
            .build();
        }).toThrow();

      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          // omitting setBaseType()
          (new EntityTypeBuilder())
            .setCategory(MOCK_ENTITY_TYPE.category)
            .setDescription(MOCK_ENTITY_TYPE.description)
            .setId(MOCK_ENTITY_TYPE.id)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTags(MOCK_ENTITY_TYPE.propertyTags)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setShards(MOCK_ENTITY_TYPE.shards)
            .setTitle(MOCK_ENTITY_TYPE.title)
            .setType(MOCK_ENTITY_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setCategory()
          (new EntityTypeBuilder())
            .setBaseType(MOCK_ENTITY_TYPE.baseType)
            .setDescription(MOCK_ENTITY_TYPE.description)
            .setId(MOCK_ENTITY_TYPE.id)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTags(MOCK_ENTITY_TYPE.propertyTags)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setShards(MOCK_ENTITY_TYPE.shards)
            .setTitle(MOCK_ENTITY_TYPE.title)
            .setType(MOCK_ENTITY_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setDescription()
          (new EntityTypeBuilder())
            .setBaseType(MOCK_ENTITY_TYPE.baseType)
            .setCategory(MOCK_ENTITY_TYPE.category)
            .setId(MOCK_ENTITY_TYPE.id)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTags(MOCK_ENTITY_TYPE.propertyTags)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setShards(MOCK_ENTITY_TYPE.shards)
            .setTitle(MOCK_ENTITY_TYPE.title)
            .setType(MOCK_ENTITY_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setId()
          (new EntityTypeBuilder())
            .setBaseType(MOCK_ENTITY_TYPE.baseType)
            .setCategory(MOCK_ENTITY_TYPE.category)
            .setDescription(MOCK_ENTITY_TYPE.description)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTags(MOCK_ENTITY_TYPE.propertyTags)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setShards(MOCK_ENTITY_TYPE.shards)
            .setTitle(MOCK_ENTITY_TYPE.title)
            .setType(MOCK_ENTITY_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setPropertyTags()
          (new EntityTypeBuilder())
            .setBaseType(MOCK_ENTITY_TYPE.baseType)
            .setCategory(MOCK_ENTITY_TYPE.category)
            .setDescription(MOCK_ENTITY_TYPE.description)
            .setId(MOCK_ENTITY_TYPE.id)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setShards(MOCK_ENTITY_TYPE.shards)
            .setTitle(MOCK_ENTITY_TYPE.title)
            .setType(MOCK_ENTITY_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setShards()
          (new EntityTypeBuilder())
            .setBaseType(MOCK_ENTITY_TYPE.baseType)
            .setCategory(MOCK_ENTITY_TYPE.category)
            .setDescription(MOCK_ENTITY_TYPE.description)
            .setId(MOCK_ENTITY_TYPE.id)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTags(MOCK_ENTITY_TYPE.propertyTags)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setTitle(MOCK_ENTITY_TYPE.title)
            .setType(MOCK_ENTITY_TYPE.type)
            .build();
        }).not.toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        // omitting setKey(), setPropertyTypes(), setSchemas()
        const entityType = (new EntityTypeBuilder())
          .setBaseType(MOCK_ENTITY_TYPE.baseType)
          .setCategory(MOCK_ENTITY_TYPE.category)
          .setDescription(MOCK_ENTITY_TYPE.description)
          .setId(MOCK_ENTITY_TYPE.id)
          .setPropertyTags(MOCK_ENTITY_TYPE.propertyTags)
          .setShards(MOCK_ENTITY_TYPE.shards)
          .setTitle(MOCK_ENTITY_TYPE.title)
          .setType(MOCK_ENTITY_TYPE.type)
          .build();

        expect(entityType.key).toEqual([]);
        expect(entityType.properties).toEqual([]);
        expect(entityType.schemas).toEqual([]);
      });

      test('should return a valid instance', () => {

        const entityType = (new EntityTypeBuilder())
          .setBaseType(MOCK_ENTITY_TYPE.baseType)
          .setCategory(MOCK_ENTITY_TYPE.category)
          .setDescription(MOCK_ENTITY_TYPE.description)
          .setId(MOCK_ENTITY_TYPE.id)
          .setKey(MOCK_ENTITY_TYPE.key)
          .setPropertyTags(MOCK_ENTITY_TYPE.propertyTags)
          .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
          .setSchemas(MOCK_ENTITY_TYPE.schemas)
          .setShards(MOCK_ENTITY_TYPE.shards)
          .setTitle(MOCK_ENTITY_TYPE.title)
          .setType(MOCK_ENTITY_TYPE.type)
          .build();

        expectValidInstance(entityType);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ENTITY_TYPE_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_ENTITY_TYPE)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "baseType" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, baseType: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "category" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, category: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, description: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, id: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "key" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, key: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, key: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "properties" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, properties: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, properties: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "propertyTags" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_OBJECT.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, propertyTags: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "schemas" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, schemas: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "shards" property', () => {
        INVALID_PARAMS_FOR_SHARD.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, shards: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, title: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_ENTITY_TYPE_OBJECT, type: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "baseType" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType({
              baseType: invalidInput,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: MOCK_ENTITY_TYPE.key,
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "category" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: invalidInput,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: MOCK_ENTITY_TYPE.key,
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: invalidInput,
              id: MOCK_ENTITY_TYPE.id,
              key: MOCK_ENTITY_TYPE.key,
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: invalidInput,
              key: MOCK_ENTITY_TYPE.key,
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "key" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: invalidInput,
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: [invalidInput],
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "properties" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: MOCK_ENTITY_TYPE.key,
              properties: invalidInput,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: MOCK_ENTITY_TYPE.key,
              properties: [invalidInput],
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "propertyTags" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_OBJECT.forEach((invalidInput) => {
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: MOCK_ENTITY_TYPE.key,
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: invalidInput,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "schemas" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: MOCK_ENTITY_TYPE.key,
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: invalidInput,
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: MOCK_ENTITY_TYPE.key,
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: [invalidInput],
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "shards" property', () => {
        INVALID_PARAMS_FOR_SHARD.forEach((invalidInput) => {
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: MOCK_ENTITY_TYPE.key,
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: invalidInput,
              title: MOCK_ENTITY_TYPE.title,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: MOCK_ENTITY_TYPE.key,
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: MOCK_ENTITY_TYPE.shards,
              title: invalidInput,
              type: MOCK_ENTITY_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType({
              baseType: MOCK_ENTITY_TYPE.baseType,
              category: MOCK_ENTITY_TYPE.category,
              description: MOCK_ENTITY_TYPE.description,
              id: MOCK_ENTITY_TYPE.id,
              key: MOCK_ENTITY_TYPE.key,
              properties: MOCK_ENTITY_TYPE.properties,
              propertyTags: MOCK_ENTITY_TYPE.propertyTags,
              schemas: MOCK_ENTITY_TYPE.schemas,
              shards: MOCK_ENTITY_TYPE.shards,
              title: MOCK_ENTITY_TYPE.title,
              type: invalidInput,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_ENTITY_TYPE.valueOf()).toEqual(
        fromJS({
          baseType: MOCK_ENTITY_TYPE.baseType,
          category: MOCK_ENTITY_TYPE.category,
          description: MOCK_ENTITY_TYPE.description,
          id: MOCK_ENTITY_TYPE.id,
          key: MOCK_ENTITY_TYPE.key,
          properties: MOCK_ENTITY_TYPE.properties,
          propertyTags: MOCK_ENTITY_TYPE.propertyTags,
          schemas: MOCK_ENTITY_TYPE.schemas.map((fqn) => fqn.toObject()),
          shards: MOCK_ENTITY_TYPE.shards,
          title: MOCK_ENTITY_TYPE.title,
          type: MOCK_ENTITY_TYPE.type.toObject(),
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomEntityType = genRandomEntityType();
      const entityType0 = (new EntityTypeBuilder(MOCK_ENTITY_TYPE)).build();
      const entityType1 = (new EntityTypeBuilder(MOCK_ENTITY_TYPE)).build();

      const testSet = Set()
        .add(entityType0)
        .add(randomEntityType)
        .add(entityType1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().baseType).toEqual(MOCK_ENTITY_TYPE.baseType);
      expect(testSet.first().category).toEqual(MOCK_ENTITY_TYPE.category);
      expect(testSet.first().description).toEqual(MOCK_ENTITY_TYPE.description);
      expect(testSet.first().id).toEqual(MOCK_ENTITY_TYPE.id);
      expect(testSet.first().key).toEqual(MOCK_ENTITY_TYPE.key);
      expect(testSet.first().properties).toEqual(MOCK_ENTITY_TYPE.properties);
      expect(testSet.first().propertyTags).toEqual(MOCK_ENTITY_TYPE.propertyTags);
      expect(testSet.first().schemas).toEqual(MOCK_ENTITY_TYPE.schemas);
      expect(testSet.first().shards).toEqual(MOCK_ENTITY_TYPE.shards);
      expect(testSet.first().title).toEqual(MOCK_ENTITY_TYPE.title);
      expect(testSet.first().type).toEqual(MOCK_ENTITY_TYPE.type);

      expect(testSet.last().baseType).toEqual(randomEntityType.baseType);
      expect(testSet.last().category).toEqual(randomEntityType.category);
      expect(testSet.last().description).toEqual(randomEntityType.description);
      expect(testSet.last().id).toEqual(randomEntityType.id);
      expect(testSet.last().key).toEqual(randomEntityType.key);
      expect(testSet.last().properties).toEqual(randomEntityType.properties);
      expect(testSet.last().propertyTags).toEqual(randomEntityType.propertyTags);
      expect(testSet.last().schemas).toEqual(randomEntityType.schemas);
      expect(testSet.last().shards).toEqual(randomEntityType.shards);
      expect(testSet.last().title).toEqual(randomEntityType.title);
      expect(testSet.last().type).toEqual(randomEntityType.type);
    });

    test('Immutable.Map', () => {

      const randomEntityType = genRandomEntityType();
      const entityType0 = (new EntityTypeBuilder(MOCK_ENTITY_TYPE)).build();
      const entityType1 = (new EntityTypeBuilder(MOCK_ENTITY_TYPE)).build();

      const testMap = Map()
        .set(entityType0, 'test_value_1')
        .set(randomEntityType, 'test_value_2')
        .set(entityType1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(entityType0)).toEqual('test_value_3');
      expect(testMap.get(randomEntityType)).toEqual('test_value_2');
      expect(testMap.get(entityType1)).toEqual('test_value_3');
    });

  });

});
