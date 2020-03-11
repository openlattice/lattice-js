import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_SCHEMA,
  MOCK_SCHEMA_OBJECT,
  Schema,
  SchemaBuilder,
  genRandomSchema,
  isValidSchema as isValid,
} from './Schema';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
} from '../utils/testing/Invalid';
import {
  testBuilderConstructor,
  testBuilderSetter,
} from '../utils/testing/ModelTestUtils';

describe('Schema', () => {

  describe('SchemaBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(Schema, SchemaBuilder, MOCK_SCHEMA);
    });

    describe('setEntityTypes()', () => {
      const validParams = [MOCK_SCHEMA.entityTypes];
      testBuilderSetter(SchemaBuilder, 'setEntityTypes', validParams, true);
    });

    describe('setFQN()', () => {
      const validParams = [MOCK_SCHEMA.fqn];
      testBuilderSetter(SchemaBuilder, 'setFQN', validParams);
    });

    describe('setPropertyTypes()', () => {
      const validParams = [MOCK_SCHEMA.propertyTypes];
      testBuilderSetter(SchemaBuilder, 'setPropertyTypes', validParams, true);
    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          // omitting setFQN()
          (new SchemaBuilder())
            .setEntityTypes(MOCK_SCHEMA.entityTypes)
            .setPropertyTypes(MOCK_SCHEMA.propertyTypes)
            .build();
        }).toThrow();

      });

      test('should set required properties that are allowed to be empty', () => {

        const schema = (new SchemaBuilder())
          .setFQN(MOCK_SCHEMA.fqn)
          .build();

        expect(schema.entityTypes).toEqual([]);
        expect(schema.propertyTypes).toEqual([]);
      });

      test('should return a valid instance', () => {

        const schema = (new SchemaBuilder())
          .setEntityTypes(MOCK_SCHEMA.entityTypes)
          .setFQN(MOCK_SCHEMA.fqn)
          .setPropertyTypes(MOCK_SCHEMA.propertyTypes)
          .build();

        expectValidInstance(schema);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_SCHEMA_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_SCHEMA)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "entityTypes" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_SCHEMA_OBJECT, entityTypes: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_SCHEMA_OBJECT, entityTypes: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "fqn" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_SCHEMA_OBJECT, fqn: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "propertyTypes" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_SCHEMA_OBJECT, propertyTypes: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_SCHEMA_OBJECT, propertyTypes: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entityTypes" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Schema({
              entityTypes: invalidInput,
              fqn: MOCK_SCHEMA.fqn,
              propertyTypes: MOCK_SCHEMA.propertyTypes,
            })
          )).toEqual(false);
          expect(isValid(
            new Schema({
              entityTypes: [invalidInput],
              fqn: MOCK_SCHEMA.fqn,
              propertyTypes: MOCK_SCHEMA.propertyTypes,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "fqn" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Schema({
              entityTypes: MOCK_SCHEMA.entityTypes,
              fqn: invalidInput,
              propertyTypes: MOCK_SCHEMA.propertyTypes,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "propertyTypes" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Schema({
              entityTypes: MOCK_SCHEMA.entityTypes,
              fqn: MOCK_SCHEMA.fqn,
              propertyTypes: invalidInput,
            })
          )).toEqual(false);
          expect(isValid(
            new Schema({
              entityTypes: MOCK_SCHEMA.entityTypes,
              fqn: MOCK_SCHEMA.fqn,
              propertyTypes: [invalidInput],
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_SCHEMA.valueOf()).toEqual(
        fromJS({
          entityTypes: MOCK_SCHEMA.entityTypes.map((entityType) => entityType.toObject()),
          fqn: MOCK_SCHEMA.fqn.toObject(),
          propertyTypes: MOCK_SCHEMA.propertyTypes.map((propertyType) => propertyType.toObject()),
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomSchema = genRandomSchema();
      const schema0 = (new SchemaBuilder(MOCK_SCHEMA)).build();
      const schema1 = (new SchemaBuilder(MOCK_SCHEMA)).build();

      const testSet = Set()
        .add(schema0)
        .add(randomSchema)
        .add(schema1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().fqn).toEqual(MOCK_SCHEMA.fqn);
      expect(testSet.first().entityTypes).toEqual(MOCK_SCHEMA.entityTypes);
      expect(testSet.first().propertyTypes).toEqual(MOCK_SCHEMA.propertyTypes);

      expect(testSet.last().fqn).toEqual(randomSchema.fqn);
      expect(testSet.last().entityTypes).toEqual(randomSchema.entityTypes);
      expect(testSet.last().propertyTypes).toEqual(randomSchema.propertyTypes);
    });

    test('Immutable.Map', () => {

      const randomSchema = genRandomSchema();
      const schema0 = (new SchemaBuilder(MOCK_SCHEMA)).build();
      const schema1 = (new SchemaBuilder(MOCK_SCHEMA)).build();

      const testMap = Map()
        .set(schema0, 'test_value_1')
        .set(randomSchema, 'test_value_2')
        .set(schema1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(schema0)).toEqual('test_value_3');
      expect(testMap.get(randomSchema)).toEqual('test_value_2');
      expect(testMap.get(schema1)).toEqual('test_value_3');
    });

  });

});
