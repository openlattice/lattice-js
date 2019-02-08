import { Map, Set, fromJS } from 'immutable';
import EntityType, { EntityTypeBuilder, isValidEntityType as isValid } from './EntityType';
import { MOCK_ENTITY_TYPE, genRandomEntityType } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED
} from '../utils/testing/Invalid';

describe('EntityType', () => {

  describe('EntityTypeBuilder', () => {

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setId();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setId(MOCK_ENTITY_TYPE.id);
        }).not.toThrow();
      });

    });

    describe('setType()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setType(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setType();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setType(MOCK_ENTITY_TYPE.type);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setTitle(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setTitle();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setTitle(MOCK_ENTITY_TYPE.title);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setDescription(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setDescription();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setDescription(MOCK_ENTITY_TYPE.description);
        }).not.toThrow();
      });

    });

    describe('setSchemas()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setSchemas(invalidInput);
          }).toThrow();
          expect(() => {
            (new EntityTypeBuilder()).setSchemas([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setSchemas([...MOCK_ENTITY_TYPE.schemas, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setSchemas();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setSchemas(MOCK_ENTITY_TYPE.schemas);
        }).not.toThrow();
      });

    });

    describe('setKey()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setKey(invalidInput);
          }).toThrow();
          expect(() => {
            (new EntityTypeBuilder()).setKey([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setKey([...MOCK_ENTITY_TYPE.key, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setKey();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setKey(MOCK_ENTITY_TYPE.key);
        }).not.toThrow();
      });

    });

    describe('setPropertyTypes()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setPropertyTypes(invalidInput);
          }).toThrow();
          expect(() => {
            (new EntityTypeBuilder()).setPropertyTypes([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setPropertyTypes([...MOCK_ENTITY_TYPE.properties, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setPropertyTypes();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setPropertyTypes(MOCK_ENTITY_TYPE.properties);
        }).not.toThrow();
      });

    });

    describe('setBaseType()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setBaseType(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setBaseType();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setBaseType(MOCK_ENTITY_TYPE.baseType);
        }).not.toThrow();
      });

    });

    describe('setCategory()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            (new EntityTypeBuilder()).setCategory(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setCategory();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new EntityTypeBuilder()).setCategory(MOCK_ENTITY_TYPE.category);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new EntityTypeBuilder()).setType(MOCK_ENTITY_TYPE.type).build();
        }).toThrow();

        expect(() => {
          (new EntityTypeBuilder()).setTitle(MOCK_ENTITY_TYPE.title).build();
        }).toThrow();

      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new EntityTypeBuilder())
            .setType(MOCK_ENTITY_TYPE.type)
            .setTitle(MOCK_ENTITY_TYPE.title)
            .setDescription(MOCK_ENTITY_TYPE.description)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setBaseType(MOCK_ENTITY_TYPE.baseType)
            .setCategory(MOCK_ENTITY_TYPE.category)
            .build();
        }).not.toThrow();

        expect(() => {
          (new EntityTypeBuilder())
            .setId(MOCK_ENTITY_TYPE.id)
            .setType(MOCK_ENTITY_TYPE.type)
            .setTitle(MOCK_ENTITY_TYPE.title)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setBaseType(MOCK_ENTITY_TYPE.baseType)
            .setCategory(MOCK_ENTITY_TYPE.category)
            .build();
        }).not.toThrow();

        expect(() => {
          (new EntityTypeBuilder())
            .setId(MOCK_ENTITY_TYPE.id)
            .setType(MOCK_ENTITY_TYPE.type)
            .setTitle(MOCK_ENTITY_TYPE.title)
            .setDescription(MOCK_ENTITY_TYPE.description)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setCategory(MOCK_ENTITY_TYPE.category)
            .build();
        }).not.toThrow();

        expect(() => {
          (new EntityTypeBuilder())
            .setId(MOCK_ENTITY_TYPE.id)
            .setType(MOCK_ENTITY_TYPE.type)
            .setTitle(MOCK_ENTITY_TYPE.title)
            .setDescription(MOCK_ENTITY_TYPE.description)
            .setSchemas(MOCK_ENTITY_TYPE.schemas)
            .setKey(MOCK_ENTITY_TYPE.key)
            .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
            .setBaseType(MOCK_ENTITY_TYPE.baseType)
            .build();
        }).not.toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const entityType = (new EntityTypeBuilder())
          .setType(MOCK_ENTITY_TYPE.type)
          .setTitle(MOCK_ENTITY_TYPE.title)
          .build();

        expect(entityType.key).toEqual([]);
        expect(entityType.properties).toEqual([]);
        expect(entityType.schemas).toEqual([]);
      });

      test('should return a valid instance', () => {

        const entityType = (new EntityTypeBuilder())
          .setId(MOCK_ENTITY_TYPE.id)
          .setType(MOCK_ENTITY_TYPE.type)
          .setTitle(MOCK_ENTITY_TYPE.title)
          .setDescription(MOCK_ENTITY_TYPE.description)
          .setSchemas(MOCK_ENTITY_TYPE.schemas)
          .setKey(MOCK_ENTITY_TYPE.key)
          .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
          .setBaseType(MOCK_ENTITY_TYPE.baseType)
          .setCategory(MOCK_ENTITY_TYPE.category)
          .build();

        expect(entityType).toBeInstanceOf(EntityType);

        expect(entityType.id).toBeDefined();
        expect(entityType.type).toBeDefined();
        expect(entityType.title).toBeDefined();
        expect(entityType.description).toBeDefined();
        expect(entityType.schemas).toBeDefined();
        expect(entityType.key).toBeDefined();
        expect(entityType.properties).toBeDefined();
        expect(entityType.baseType).toBeDefined();
        expect(entityType.category).toBeDefined();

        expect(entityType.id).toEqual(MOCK_ENTITY_TYPE.id);
        expect(entityType.type).toEqual(MOCK_ENTITY_TYPE.type);
        expect(entityType.title).toEqual(MOCK_ENTITY_TYPE.title);
        expect(entityType.description).toEqual(MOCK_ENTITY_TYPE.description);
        expect(entityType.schemas).toEqual(MOCK_ENTITY_TYPE.schemas);
        expect(entityType.key).toEqual(MOCK_ENTITY_TYPE.key);
        expect(entityType.properties).toEqual(MOCK_ENTITY_TYPE.properties);
        expect(entityType.baseType).toEqual(MOCK_ENTITY_TYPE.baseType);
        expect(entityType.category).toEqual(MOCK_ENTITY_TYPE.category);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ENTITY_TYPE)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new EntityType(
            MOCK_ENTITY_TYPE.id,
            MOCK_ENTITY_TYPE.type,
            MOCK_ENTITY_TYPE.title,
            MOCK_ENTITY_TYPE.description,
            MOCK_ENTITY_TYPE.schemas,
            MOCK_ENTITY_TYPE.key,
            MOCK_ENTITY_TYPE.properties,
            MOCK_ENTITY_TYPE.baseType,
            MOCK_ENTITY_TYPE.category
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const entityType = (new EntityTypeBuilder())
          .setId(MOCK_ENTITY_TYPE.id)
          .setType(MOCK_ENTITY_TYPE.type)
          .setTitle(MOCK_ENTITY_TYPE.title)
          .setDescription(MOCK_ENTITY_TYPE.description)
          .setSchemas(MOCK_ENTITY_TYPE.schemas)
          .setKey(MOCK_ENTITY_TYPE.key)
          .setPropertyTypes(MOCK_ENTITY_TYPE.properties)
          .setBaseType(MOCK_ENTITY_TYPE.baseType)
          .setCategory(MOCK_ENTITY_TYPE.category)
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
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE, { id: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE, { type: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE, { title: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE, { description: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "schemas" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE, { schemas: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "key" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE, { key: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE, { key: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "properties" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE, { properties: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE, { properties: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "baseType" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE, { baseType: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "category" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ENTITY_TYPE, { category: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              invalidInput,
              MOCK_ENTITY_TYPE.type,
              MOCK_ENTITY_TYPE.title,
              MOCK_ENTITY_TYPE.description,
              MOCK_ENTITY_TYPE.schemas,
              MOCK_ENTITY_TYPE.key,
              MOCK_ENTITY_TYPE.properties,
              MOCK_ENTITY_TYPE.baseType,
              MOCK_ENTITY_TYPE.category,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE.id,
              invalidInput,
              MOCK_ENTITY_TYPE.title,
              MOCK_ENTITY_TYPE.description,
              MOCK_ENTITY_TYPE.schemas,
              MOCK_ENTITY_TYPE.key,
              MOCK_ENTITY_TYPE.properties,
              MOCK_ENTITY_TYPE.baseType,
              MOCK_ENTITY_TYPE.category,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE.id,
              MOCK_ENTITY_TYPE.type,
              invalidInput,
              MOCK_ENTITY_TYPE.description,
              MOCK_ENTITY_TYPE.schemas,
              MOCK_ENTITY_TYPE.key,
              MOCK_ENTITY_TYPE.properties,
              MOCK_ENTITY_TYPE.baseType,
              MOCK_ENTITY_TYPE.category,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE.id,
              MOCK_ENTITY_TYPE.type,
              MOCK_ENTITY_TYPE.title,
              invalidInput,
              MOCK_ENTITY_TYPE.schemas,
              MOCK_ENTITY_TYPE.key,
              MOCK_ENTITY_TYPE.properties,
              MOCK_ENTITY_TYPE.baseType,
              MOCK_ENTITY_TYPE.category,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "schemas" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE.id,
              MOCK_ENTITY_TYPE.type,
              MOCK_ENTITY_TYPE.title,
              MOCK_ENTITY_TYPE.description,
              invalidInput,
              MOCK_ENTITY_TYPE.key,
              MOCK_ENTITY_TYPE.properties,
              MOCK_ENTITY_TYPE.baseType,
              MOCK_ENTITY_TYPE.category,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "key" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE.id,
              MOCK_ENTITY_TYPE.type,
              MOCK_ENTITY_TYPE.title,
              MOCK_ENTITY_TYPE.description,
              MOCK_ENTITY_TYPE.schemas,
              invalidInput,
              MOCK_ENTITY_TYPE.properties,
              MOCK_ENTITY_TYPE.baseType,
              MOCK_ENTITY_TYPE.category,
            )
          )).toEqual(false);
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE.id,
              MOCK_ENTITY_TYPE.type,
              MOCK_ENTITY_TYPE.title,
              MOCK_ENTITY_TYPE.description,
              MOCK_ENTITY_TYPE.schemas,
              [invalidInput],
              MOCK_ENTITY_TYPE.properties,
              MOCK_ENTITY_TYPE.baseType,
              MOCK_ENTITY_TYPE.category,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "properties" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE.id,
              MOCK_ENTITY_TYPE.type,
              MOCK_ENTITY_TYPE.title,
              MOCK_ENTITY_TYPE.description,
              MOCK_ENTITY_TYPE.schemas,
              MOCK_ENTITY_TYPE.key,
              invalidInput,
              MOCK_ENTITY_TYPE.baseType,
              MOCK_ENTITY_TYPE.category,
            )
          )).toEqual(false);
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE.id,
              MOCK_ENTITY_TYPE.type,
              MOCK_ENTITY_TYPE.title,
              MOCK_ENTITY_TYPE.description,
              MOCK_ENTITY_TYPE.schemas,
              MOCK_ENTITY_TYPE.key,
              [invalidInput],
              MOCK_ENTITY_TYPE.baseType,
              MOCK_ENTITY_TYPE.category,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "baseType" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE.id,
              MOCK_ENTITY_TYPE.type,
              MOCK_ENTITY_TYPE.title,
              MOCK_ENTITY_TYPE.description,
              MOCK_ENTITY_TYPE.schemas,
              MOCK_ENTITY_TYPE.key,
              MOCK_ENTITY_TYPE.properties,
              invalidInput,
              MOCK_ENTITY_TYPE.category,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "category" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_ENTITY_TYPE.id,
              MOCK_ENTITY_TYPE.type,
              MOCK_ENTITY_TYPE.title,
              MOCK_ENTITY_TYPE.description,
              MOCK_ENTITY_TYPE.schemas,
              MOCK_ENTITY_TYPE.key,
              MOCK_ENTITY_TYPE.properties,
              MOCK_ENTITY_TYPE.baseType,
              invalidInput,
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const entityType = new EntityType(
        MOCK_ENTITY_TYPE.id,
        MOCK_ENTITY_TYPE.type,
        MOCK_ENTITY_TYPE.title,
        MOCK_ENTITY_TYPE.description,
        MOCK_ENTITY_TYPE.schemas,
        MOCK_ENTITY_TYPE.key,
        MOCK_ENTITY_TYPE.properties,
        MOCK_ENTITY_TYPE.baseType,
        MOCK_ENTITY_TYPE.category,
      );
      expect(entityType.valueOf()).toEqual(
        fromJS({
          baseType: MOCK_ENTITY_TYPE.baseType,
          category: MOCK_ENTITY_TYPE.category,
          description: MOCK_ENTITY_TYPE.description,
          id: MOCK_ENTITY_TYPE.id,
          key: MOCK_ENTITY_TYPE.key,
          properties: MOCK_ENTITY_TYPE.properties,
          schemas: MOCK_ENTITY_TYPE.schemas.map(fqn => fqn.toObject()),
          title: MOCK_ENTITY_TYPE.title,
          type: MOCK_ENTITY_TYPE.type.toObject(),
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomEntityType = genRandomEntityType();
      const entityType0 = new EntityType(
        MOCK_ENTITY_TYPE.id,
        MOCK_ENTITY_TYPE.type,
        MOCK_ENTITY_TYPE.title,
        MOCK_ENTITY_TYPE.description,
        MOCK_ENTITY_TYPE.schemas,
        MOCK_ENTITY_TYPE.key,
        MOCK_ENTITY_TYPE.properties,
        MOCK_ENTITY_TYPE.baseType,
        MOCK_ENTITY_TYPE.category,
      );
      const entityType1 = new EntityType(
        MOCK_ENTITY_TYPE.id,
        MOCK_ENTITY_TYPE.type,
        MOCK_ENTITY_TYPE.title,
        MOCK_ENTITY_TYPE.description,
        MOCK_ENTITY_TYPE.schemas,
        MOCK_ENTITY_TYPE.key,
        MOCK_ENTITY_TYPE.properties,
        MOCK_ENTITY_TYPE.baseType,
        MOCK_ENTITY_TYPE.category,
      );

      const testSet = Set()
        .add(entityType0)
        .add(randomEntityType)
        .add(entityType1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().id).toEqual(MOCK_ENTITY_TYPE.id);
      expect(testSet.first().type).toEqual(MOCK_ENTITY_TYPE.type);
      expect(testSet.first().title).toEqual(MOCK_ENTITY_TYPE.title);
      expect(testSet.first().description).toEqual(MOCK_ENTITY_TYPE.description);
      expect(testSet.first().schemas).toEqual(MOCK_ENTITY_TYPE.schemas);
      expect(testSet.first().key).toEqual(MOCK_ENTITY_TYPE.key);
      expect(testSet.first().properties).toEqual(MOCK_ENTITY_TYPE.properties);
      expect(testSet.first().baseType).toEqual(MOCK_ENTITY_TYPE.baseType);
      expect(testSet.first().category).toEqual(MOCK_ENTITY_TYPE.category);

      expect(testSet.last().id).toEqual(randomEntityType.id);
      expect(testSet.last().type).toEqual(randomEntityType.type);
      expect(testSet.last().title).toEqual(randomEntityType.title);
      expect(testSet.last().description).toEqual(randomEntityType.description);
      expect(testSet.last().schemas).toEqual(randomEntityType.schemas);
      expect(testSet.last().key).toEqual(randomEntityType.key);
      expect(testSet.last().properties).toEqual(randomEntityType.properties);
      expect(testSet.last().baseType).toEqual(randomEntityType.baseType);
      expect(testSet.last().category).toEqual(randomEntityType.category);
    });

    test('Immutable.Map', () => {

      const randomEntityType = genRandomEntityType();
      const entityType0 = new EntityType(
        MOCK_ENTITY_TYPE.id,
        MOCK_ENTITY_TYPE.type,
        MOCK_ENTITY_TYPE.title,
        MOCK_ENTITY_TYPE.description,
        MOCK_ENTITY_TYPE.schemas,
        MOCK_ENTITY_TYPE.key,
        MOCK_ENTITY_TYPE.properties,
        MOCK_ENTITY_TYPE.baseType,
        MOCK_ENTITY_TYPE.category,
      );
      const entityType1 = new EntityType(
        MOCK_ENTITY_TYPE.id,
        MOCK_ENTITY_TYPE.type,
        MOCK_ENTITY_TYPE.title,
        MOCK_ENTITY_TYPE.description,
        MOCK_ENTITY_TYPE.schemas,
        MOCK_ENTITY_TYPE.key,
        MOCK_ENTITY_TYPE.properties,
        MOCK_ENTITY_TYPE.baseType,
        MOCK_ENTITY_TYPE.category,
      );

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
