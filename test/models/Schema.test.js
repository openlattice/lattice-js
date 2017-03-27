import Schema, {
  SchemaBuilder,
  isValid
} from '../../src/models/Schema';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

import {
  MOCK_SCHEMA_DM
} from '../constants/MockDataModels';

describe('Schema', () => {

  describe('SchemaBuilder', () => {

    let builder :SchemaBuilder = null;

    beforeEach(() => {
      builder = new SchemaBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setFullyQualifiedName()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setFullyQualifiedName(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setFullyQualifiedName();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setFullyQualifiedName(MOCK_SCHEMA_DM.fqn);
        }).not.toThrow();
      });

    });

    describe('setEntityTypes()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setEntityTypes();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntityTypes(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setEntityTypes([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntityTypes([...MOCK_SCHEMA_DM.entityTypes, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setEntityTypes(MOCK_SCHEMA_DM.entityTypes);
        }).not.toThrow();
      });

    });

    describe('setPropertyTypes()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setPropertyTypes();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypes(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPropertyTypes([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypes([...MOCK_SCHEMA_DM.propertyTypes, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPropertyTypes(MOCK_SCHEMA_DM.propertyTypes);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new SchemaBuilder())
            .setEntityTypes(MOCK_SCHEMA_DM.entityTypes)
            .setPropertyTypes(MOCK_SCHEMA_DM.propertyTypes)
            .build();
        }).toThrow();

        expect(() => {
          (new SchemaBuilder())
            .setFullyQualifiedName(MOCK_SCHEMA_DM.fqn)
            .setPropertyTypes(MOCK_SCHEMA_DM.propertyTypes)
            .build();
        }).toThrow();

        expect(() => {
          (new SchemaBuilder())
            .setFullyQualifiedName(MOCK_SCHEMA_DM.fqn)
            .setEntityTypes(MOCK_SCHEMA_DM.entityTypes)
            .build();
        }).toThrow();

      });

      it('should return a valid instance', () => {

        const schema = builder
          .setFullyQualifiedName(MOCK_SCHEMA_DM.fqn)
          .setEntityTypes(MOCK_SCHEMA_DM.entityTypes)
          .setPropertyTypes(MOCK_SCHEMA_DM.propertyTypes)
          .build();

        expect(schema).toEqual(jasmine.any(Schema));

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

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_SCHEMA_DM)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new Schema(
            MOCK_SCHEMA_DM.fqn, MOCK_SCHEMA_DM.entityTypes, MOCK_SCHEMA_DM.propertyTypes
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const schema = (new SchemaBuilder())
          .setFullyQualifiedName(MOCK_SCHEMA_DM.fqn)
          .setEntityTypes(MOCK_SCHEMA_DM.entityTypes)
          .setPropertyTypes(MOCK_SCHEMA_DM.propertyTypes)
          .build();

        expect(isValid(schema)).toEqual(true);
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

      it('should return false when given an object literal with an invalid "fqn" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_SCHEMA_DM, { fqn: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "entityTypes" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_SCHEMA_DM, { entityTypes: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_SCHEMA_DM, { entityTypes: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "propertyTypes" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_SCHEMA_DM, { propertyTypes: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_SCHEMA_DM, { propertyTypes: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "fqn" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Schema(
              invalidInput, MOCK_SCHEMA_DM.entityTypes, MOCK_SCHEMA_DM.propertyTypes
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "entityTypes" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "propertyTypes" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
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
