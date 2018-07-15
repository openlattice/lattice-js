import PropertyType, { PropertyTypeBuilder, isValidPropertyType as isValid } from './PropertyType';
import { MOCK_PROPERTY_TYPE_DM } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_PARAMS_SS,
  INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED,
  INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED
} from '../utils/testing/Invalid';

describe('PropertyType', () => {

  describe('PropertyTypeBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new PropertyTypeBuilder();
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
          builder.setId(MOCK_PROPERTY_TYPE_DM.id);
        }).not.toThrow();
      });

    });

    describe('setType()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
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
          builder.setType(MOCK_PROPERTY_TYPE_DM.type);
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
          builder.setTitle(MOCK_PROPERTY_TYPE_DM.title);
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
          builder.setDescription(MOCK_PROPERTY_TYPE_DM.description);
        }).not.toThrow();
      });

    });

    describe('setDataType()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setDataType(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setDataType();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setDataType(MOCK_PROPERTY_TYPE_DM.datatype);
        }).not.toThrow();
      });

    });

    describe('setSchemas()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setSchemas([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas([...MOCK_PROPERTY_TYPE_DM.schemas, invalidInput]);
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
          builder.setSchemas(MOCK_PROPERTY_TYPE_DM.schemas);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new PropertyTypeBuilder())
            .setTitle(MOCK_PROPERTY_TYPE_DM.title)
            .setDataType(MOCK_PROPERTY_TYPE_DM.datatype)
            .build();
        }).toThrow();

        expect(() => {
          (new PropertyTypeBuilder())
            .setType(MOCK_PROPERTY_TYPE_DM.type)
            .setDataType(MOCK_PROPERTY_TYPE_DM.datatype)
            .build();
        }).toThrow();

        expect(() => {
          (new PropertyTypeBuilder())
            .setType(MOCK_PROPERTY_TYPE_DM.type)
            .setTitle(MOCK_PROPERTY_TYPE_DM.title)
            .build();
        }).toThrow();

      });

      test('should set required properties that are allowed to be empty', () => {

        const org = builder
          .setType(MOCK_PROPERTY_TYPE_DM.type)
          .setTitle(MOCK_PROPERTY_TYPE_DM.title)
          .setDataType(MOCK_PROPERTY_TYPE_DM.datatype)
          .build();

        expect(org.schemas).toEqual([]);
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new PropertyTypeBuilder())
            .setType(MOCK_PROPERTY_TYPE_DM.type)
            .setTitle(MOCK_PROPERTY_TYPE_DM.title)
            .setDescription(MOCK_PROPERTY_TYPE_DM.description)
            .setDataType(MOCK_PROPERTY_TYPE_DM.datatype)
            .setSchemas(MOCK_PROPERTY_TYPE_DM.schemas)
            .build();
        }).not.toThrow();

        expect(() => {
          (new PropertyTypeBuilder())
            .setId(MOCK_PROPERTY_TYPE_DM.id)
            .setType(MOCK_PROPERTY_TYPE_DM.type)
            .setTitle(MOCK_PROPERTY_TYPE_DM.title)
            .setDataType(MOCK_PROPERTY_TYPE_DM.datatype)
            .setSchemas(MOCK_PROPERTY_TYPE_DM.schemas)
            .build();
        }).not.toThrow();
      });

      test('should return a valid instance', () => {

        const propertyType = builder
          .setId(MOCK_PROPERTY_TYPE_DM.id)
          .setType(MOCK_PROPERTY_TYPE_DM.type)
          .setTitle(MOCK_PROPERTY_TYPE_DM.title)
          .setDescription(MOCK_PROPERTY_TYPE_DM.description)
          .setDataType(MOCK_PROPERTY_TYPE_DM.datatype)
          .setSchemas(MOCK_PROPERTY_TYPE_DM.schemas)
          .build();

        expect(propertyType).toBeInstanceOf(PropertyType);

        expect(propertyType.id).toBeDefined();
        expect(propertyType.id).toEqual(MOCK_PROPERTY_TYPE_DM.id);

        expect(propertyType.type).toBeDefined();
        expect(propertyType.type).toEqual(MOCK_PROPERTY_TYPE_DM.type);

        expect(propertyType.title).toBeDefined();
        expect(propertyType.title).toEqual(MOCK_PROPERTY_TYPE_DM.title);

        expect(propertyType.description).toBeDefined();
        expect(propertyType.description).toEqual(MOCK_PROPERTY_TYPE_DM.description);

        expect(propertyType.datatype).toBeDefined();
        expect(propertyType.datatype).toEqual(MOCK_PROPERTY_TYPE_DM.datatype);

        expect(propertyType.schemas).toBeDefined();
        expect(propertyType.schemas).toEqual(MOCK_PROPERTY_TYPE_DM.schemas);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_PROPERTY_TYPE_DM)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new PropertyType(
            MOCK_PROPERTY_TYPE_DM.id,
            MOCK_PROPERTY_TYPE_DM.type,
            MOCK_PROPERTY_TYPE_DM.title,
            MOCK_PROPERTY_TYPE_DM.description,
            MOCK_PROPERTY_TYPE_DM.datatype,
            MOCK_PROPERTY_TYPE_DM.schemas
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const propertyType = (new PropertyTypeBuilder())
          .setId(MOCK_PROPERTY_TYPE_DM.id)
          .setType(MOCK_PROPERTY_TYPE_DM.type)
          .setTitle(MOCK_PROPERTY_TYPE_DM.title)
          .setDescription(MOCK_PROPERTY_TYPE_DM.description)
          .setDataType(MOCK_PROPERTY_TYPE_DM.datatype)
          .setSchemas(MOCK_PROPERTY_TYPE_DM.schemas)
          .build();

        expect(isValid(propertyType)).toEqual(true);
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
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { type: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "datatype" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { datatype: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "schemas" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { schemas: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              invalidInput,
              MOCK_PROPERTY_TYPE_DM.type,
              MOCK_PROPERTY_TYPE_DM.title,
              MOCK_PROPERTY_TYPE_DM.description,
              MOCK_PROPERTY_TYPE_DM.datatype,
              MOCK_PROPERTY_TYPE_DM.schemas
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE_DM.id,
              invalidInput,
              MOCK_PROPERTY_TYPE_DM.title,
              MOCK_PROPERTY_TYPE_DM.description,
              MOCK_PROPERTY_TYPE_DM.datatype,
              MOCK_PROPERTY_TYPE_DM.schemas
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE_DM.id,
              MOCK_PROPERTY_TYPE_DM.type,
              invalidInput,
              MOCK_PROPERTY_TYPE_DM.description,
              MOCK_PROPERTY_TYPE_DM.datatype,
              MOCK_PROPERTY_TYPE_DM.schemas
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE_DM.id,
              MOCK_PROPERTY_TYPE_DM.type,
              MOCK_PROPERTY_TYPE_DM.title,
              invalidInput,
              MOCK_PROPERTY_TYPE_DM.datatype,
              MOCK_PROPERTY_TYPE_DM.schemas
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "datatype" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE_DM.id,
              MOCK_PROPERTY_TYPE_DM.type,
              MOCK_PROPERTY_TYPE_DM.title,
              MOCK_PROPERTY_TYPE_DM.description,
              invalidInput,
              MOCK_PROPERTY_TYPE_DM.schemas
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "schemas" property', () => {
        INVALID_PARAMS_SS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE_DM.id,
              MOCK_PROPERTY_TYPE_DM.type,
              MOCK_PROPERTY_TYPE_DM.title,
              MOCK_PROPERTY_TYPE_DM.description,
              MOCK_PROPERTY_TYPE_DM.datatype,
              invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
