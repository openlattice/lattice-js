import { Map, Set, fromJS } from 'immutable';
import Schema, { SchemaBuilder, isValidSchema as isValid } from './Schema';
import {
  MOCK_ENTITY_TYPE,
  MOCK_PROPERTY_TYPE,
  MOCK_SCHEMA,
  genRandomSchema,
} from '../utils/testing/MockData';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

describe('Schema', () => {

  describe('SchemaBuilder', () => {

    describe('setFullyQualifiedName()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new SchemaBuilder()).setFullyQualifiedName(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new SchemaBuilder()).setFullyQualifiedName();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new SchemaBuilder()).setFullyQualifiedName(MOCK_SCHEMA.fqn);
        }).not.toThrow();
      });

    });

    describe('setEntityTypes()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new SchemaBuilder()).setEntityTypes(invalidInput);
          }).toThrow();
          expect(() => {
            (new SchemaBuilder()).setEntityTypes([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new SchemaBuilder()).setEntityTypes([...MOCK_SCHEMA.entityTypes, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          (new SchemaBuilder()).setEntityTypes();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new SchemaBuilder()).setEntityTypes(MOCK_SCHEMA.entityTypes);
        }).not.toThrow();
      });

    });

    describe('setPropertyTypes()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new SchemaBuilder()).setPropertyTypes(invalidInput);
          }).toThrow();
          expect(() => {
            (new SchemaBuilder()).setPropertyTypes([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new SchemaBuilder()).setPropertyTypes([...MOCK_SCHEMA.propertyTypes, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          (new SchemaBuilder()).setPropertyTypes();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new SchemaBuilder()).setPropertyTypes(MOCK_SCHEMA.propertyTypes);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new SchemaBuilder())
            .setEntityTypes(MOCK_SCHEMA.entityTypes)
            .setPropertyTypes(MOCK_SCHEMA.propertyTypes)
            .build();
        }).toThrow();

      });

      test('should set required properties that are allowed to be empty', () => {

        const schema = (new SchemaBuilder())
          .setFullyQualifiedName(MOCK_SCHEMA.fqn)
          .build();

        expect(schema.entityTypes).toEqual([]);
        expect(schema.propertyTypes).toEqual([]);
      });

      test('should return a valid instance', () => {

        const schema = (new SchemaBuilder())
          .setFullyQualifiedName(MOCK_SCHEMA.fqn)
          .setEntityTypes(MOCK_SCHEMA.entityTypes)
          .setPropertyTypes(MOCK_SCHEMA.propertyTypes)
          .build();

        expect(schema).toBeInstanceOf(Schema);

        expect(schema.fqn).toBeDefined();
        expect(schema.fqn).toEqual(MOCK_SCHEMA.fqn);

        expect(schema.entityTypes).toBeDefined();
        expect(schema.entityTypes).toEqual(MOCK_SCHEMA.entityTypes);

        expect(schema.propertyTypes).toBeDefined();
        expect(schema.propertyTypes).toEqual(MOCK_SCHEMA.propertyTypes);

        // ensure setEntityTypes() and setPropertyTypes() are calling all builder .set() methods
        expect(schema.entityTypes).toEqual([MOCK_ENTITY_TYPE]);
        expect(schema.propertyTypes).toEqual([MOCK_PROPERTY_TYPE]);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_SCHEMA)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new Schema(
            MOCK_SCHEMA.fqn, MOCK_SCHEMA.entityTypes, MOCK_SCHEMA.propertyTypes
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const schema = (new SchemaBuilder())
          .setFullyQualifiedName(MOCK_SCHEMA.fqn)
          .setEntityTypes(MOCK_SCHEMA.entityTypes)
          .setPropertyTypes(MOCK_SCHEMA.propertyTypes)
          .build();

        expect(isValid(schema)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "fqn" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_SCHEMA, fqn: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entityTypes" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_SCHEMA, entityTypes: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_SCHEMA, entityTypes: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "propertyTypes" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_SCHEMA, propertyTypes: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_SCHEMA, propertyTypes: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "fqn" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Schema(
              invalidInput, MOCK_SCHEMA.entityTypes, MOCK_SCHEMA.propertyTypes
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entityTypes" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Schema(
              MOCK_SCHEMA.fqn, invalidInput, MOCK_SCHEMA.propertyTypes
            )
          )).toEqual(false);
          expect(isValid(
            new Schema(
              MOCK_SCHEMA.fqn, [invalidInput], MOCK_SCHEMA.propertyTypes
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "propertyTypes" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new Schema(
              MOCK_SCHEMA.fqn, MOCK_SCHEMA.entityTypes, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new Schema(
              MOCK_SCHEMA.fqn, MOCK_SCHEMA.entityTypes, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const schema = new Schema(
        MOCK_SCHEMA.fqn,
        MOCK_SCHEMA.entityTypes,
        MOCK_SCHEMA.propertyTypes,
      );
      expect(schema.valueOf()).toEqual(
        fromJS({
          fqn: MOCK_SCHEMA.fqn.toObject(),
          entityTypes: MOCK_SCHEMA.entityTypes.map((entityType) => entityType.toObject()),
          propertyTypes: MOCK_SCHEMA.propertyTypes.map((propertyType) => propertyType.toObject()),
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomSchema = genRandomSchema();
      const schema0 = new Schema(
        MOCK_SCHEMA.fqn,
        MOCK_SCHEMA.entityTypes,
        MOCK_SCHEMA.propertyTypes,
      );
      const schema1 = new Schema(
        MOCK_SCHEMA.fqn,
        MOCK_SCHEMA.entityTypes,
        MOCK_SCHEMA.propertyTypes,
      );

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
      const schema0 = new Schema(
        MOCK_SCHEMA.fqn,
        MOCK_SCHEMA.entityTypes,
        MOCK_SCHEMA.propertyTypes,
      );
      const schema1 = new Schema(
        MOCK_SCHEMA.fqn,
        MOCK_SCHEMA.entityTypes,
        MOCK_SCHEMA.propertyTypes,
      );

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
