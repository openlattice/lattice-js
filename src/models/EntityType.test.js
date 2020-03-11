/*
 * @flow
 */

import { Map, Set, fromJS } from 'immutable';

import {
  EntityType,
  EntityTypeBuilder,
  MOCK_ENTITY_TYPE,
  MOCK_ENTITY_TYPE_OBJECT,
  genRandomEntityType,
  isValidEntityType as isValid,
} from './EntityType';

import { SecurableTypes } from '../constants/types';
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
import {
  INVALID_PARAMS_OPTIONAL_NUMBER,
} from '../utils/testing/InvalidParams';
import {
  testBuilderBuild,
  testBuilderConstructor,
  testBuilderSet,
  testBuilderSetType,
} from '../utils/testing/ModelTestUtils';

const INVALID_PARAMS_FOR_SHARD = INVALID_PARAMS_FOR_OPTIONAL_NUMBER.slice(0);
INVALID_PARAMS_FOR_SHARD.push(-1);
INVALID_PARAMS_FOR_SHARD.push(0);
INVALID_PARAMS_FOR_SHARD.push(20);

describe('EntityType', () => {

  describe('EntityTypeBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(EntityType, EntityTypeBuilder, MOCK_ENTITY_TYPE);
    });

    describe('setBaseType()', () => {
      const validParams = [MOCK_ENTITY_TYPE.baseType];
      testBuilderSet(EntityTypeBuilder, 'setBaseType', validParams, true);
    });

    describe('setCategory()', () => {
      testBuilderSetType(EntityTypeBuilder, 'setCategory', SecurableTypes, true);
    });

    describe('setDescription()', () => {
      const validParams = [MOCK_ENTITY_TYPE.description];
      testBuilderSet(EntityTypeBuilder, 'setDescription', validParams, true);
    });

    describe('setId()', () => {
      const validParams = [MOCK_ENTITY_TYPE.id];
      testBuilderSet(EntityTypeBuilder, 'setId', validParams, true);
    });

    describe('setKey()', () => {
      const validParams = [MOCK_ENTITY_TYPE.key];
      testBuilderSet(EntityTypeBuilder, 'setKey', validParams, true);
    });

    describe('setPropertyTags()', () => {
      const validParams = [MOCK_ENTITY_TYPE.propertyTags];
      testBuilderSet(EntityTypeBuilder, 'setPropertyTags', validParams, true);
    });

    describe('setPropertyTypes()', () => {
      const validParams = [MOCK_ENTITY_TYPE.properties];
      testBuilderSet(EntityTypeBuilder, 'setPropertyTypes', validParams, true);
    });

    describe('setSchemas()', () => {
      const validParams = [MOCK_ENTITY_TYPE.schemas];
      testBuilderSet(EntityTypeBuilder, 'setSchemas', validParams, true);
    });

    describe('setShards()', () => {
      const validParams = [MOCK_ENTITY_TYPE.shards];
      const invalidParams = INVALID_PARAMS_OPTIONAL_NUMBER.slice(0);
      invalidParams.push(-1);
      invalidParams.push(0);
      invalidParams.push(20);
      testBuilderSet(EntityTypeBuilder, 'setShards', validParams, true);
    });

    describe('setTitle()', () => {
      const validParams = [MOCK_ENTITY_TYPE.title];
      testBuilderSet(EntityTypeBuilder, 'setTitle', validParams);
    });

    describe('setType()', () => {
      const validParams = [MOCK_ENTITY_TYPE.type];
      testBuilderSet(EntityTypeBuilder, 'setType', validParams);
    });

    describe('build()', () => {

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

      testBuilderBuild(EntityType, EntityTypeBuilder, MOCK_ENTITY_TYPE, {
        optional: {
          setBaseType: MOCK_ENTITY_TYPE.baseType,
          setCategory: MOCK_ENTITY_TYPE.category,
          setDescription: MOCK_ENTITY_TYPE.description,
          setId: MOCK_ENTITY_TYPE.id,
          setKey: MOCK_ENTITY_TYPE.key,
          setPropertyTags: MOCK_ENTITY_TYPE.propertyTags,
          setPropertyTypes: MOCK_ENTITY_TYPE.properties,
          setSchemas: MOCK_ENTITY_TYPE.schemas,
          setShards: MOCK_ENTITY_TYPE.shards,
        },
        required: {
          setTitle: MOCK_ENTITY_TYPE.title,
          setType: MOCK_ENTITY_TYPE.type,
        },
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
