import Schema, { SchemaBuilder, isValid } from './Schema';
import { INVALID_PARAMS, INVALID_PARAMS_SS, INVALID_PARAMS_EMPTY_ARRAY_ALLOWED } from '../utils/testing/Invalid';
import { MOCK_SCHEMA_DM } from '../utils/testing/MockDataModels';

describe('Schema', () => {

  describe('SchemaBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new SchemaBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setFullyQualifiedName()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            builder.setFullyQualifiedName(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setFullyQualifiedName();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setFullyQualifiedName(MOCK_SCHEMA_DM.fqn);
        }).not.toThrow();
      });

    });

    describe('setEntityTypes()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setEntityTypes(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setEntityTypes([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setEntityTypes([...MOCK_SCHEMA_DM.entityTypes, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setEntityTypes();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setEntityTypes(MOCK_SCHEMA_DM.entityTypes);
        }).not.toThrow();
      });

    });

    describe('setPropertyTypes()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypes(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPropertyTypes([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypes([...MOCK_SCHEMA_DM.propertyTypes, invalidInput]);
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
          builder.setPropertyTypes(MOCK_SCHEMA_DM.propertyTypes);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new SchemaBuilder())
            .setEntityTypes(MOCK_SCHEMA_DM.entityTypes)
            .setPropertyTypes(MOCK_SCHEMA_DM.propertyTypes)
            .build();
        }).toThrow();

      });

      test('should return a valid instance', () => {

        const schema = builder
          .setFullyQualifiedName(MOCK_SCHEMA_DM.fqn)
          .setEntityTypes(MOCK_SCHEMA_DM.entityTypes)
          .setPropertyTypes(MOCK_SCHEMA_DM.propertyTypes)
          .build();

        expect(schema).toBeInstanceOf(Schema);

        expect(schema.fqn).toBeDefined();
        expect(schema.fqn).toEqual(MOCK_SCHEMA_DM.fqn);

        expect(schema.entityTypes).toBeDefined();
        expect(schema.entityTypes).toEqual(MOCK_SCHEMA_DM.entityTypes);

        expect(schema.propertyTypes).toBeDefined();
        expect(schema.propertyTypes).toEqual(MOCK_SCHEMA_DM.propertyTypes);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_SCHEMA_DM)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new Schema(
            MOCK_SCHEMA_DM.fqn, MOCK_SCHEMA_DM.entityTypes, MOCK_SCHEMA_DM.propertyTypes
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const schema = (new SchemaBuilder())
          .setFullyQualifiedName(MOCK_SCHEMA_DM.fqn)
          .setEntityTypes(MOCK_SCHEMA_DM.entityTypes)
          .setPropertyTypes(MOCK_SCHEMA_DM.propertyTypes)
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
          expect(isValid(Object.assign({}, MOCK_SCHEMA_DM, { fqn: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entityTypes" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_SCHEMA_DM, { entityTypes: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_SCHEMA_DM, { entityTypes: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "propertyTypes" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_SCHEMA_DM, { propertyTypes: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_SCHEMA_DM, { propertyTypes: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "fqn" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Schema(
              invalidInput, MOCK_SCHEMA_DM.entityTypes, MOCK_SCHEMA_DM.propertyTypes
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entityTypes" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Schema(
              MOCK_SCHEMA_DM.fqn, invalidInput, MOCK_SCHEMA_DM.propertyTypes
            )
          )).toEqual(false);
          expect(isValid(
            new Schema(
              MOCK_SCHEMA_DM.fqn, [invalidInput], MOCK_SCHEMA_DM.propertyTypes
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "propertyTypes" property', () => {
        INVALID_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new Schema(
              MOCK_SCHEMA_DM.fqn, MOCK_SCHEMA_DM.entityTypes, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new Schema(
              MOCK_SCHEMA_DM.fqn, MOCK_SCHEMA_DM.entityTypes, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
