import { Map, Set, fromJS } from 'immutable';
import PropertyType, { PropertyTypeBuilder, isValidPropertyType as isValid } from './PropertyType';
import { MOCK_PROPERTY_TYPE, genRandomPropertyType } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

describe('PropertyType', () => {

  describe('PropertyTypeBuilder', () => {

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setId();
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setId('');
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setId(MOCK_PROPERTY_TYPE.id);
        }).not.toThrow();
      });

    });

    describe('setType()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setType();
        }).toThrow();
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setType(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setType(MOCK_PROPERTY_TYPE.type);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setTitle();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setTitle(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setTitle(MOCK_PROPERTY_TYPE.title);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setDescription(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setDescription();
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setDescription('');
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setDescription(MOCK_PROPERTY_TYPE.description);
        }).not.toThrow();
      });

    });

    describe('setDataType()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setDataType();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setDataType(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setDataType(MOCK_PROPERTY_TYPE.datatype);
        }).not.toThrow();
      });

    });

    describe('setSchemas()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setSchemas(invalidInput);
          }).toThrow();
          expect(() => {
            (new PropertyTypeBuilder()).setSchemas([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setSchemas([...MOCK_PROPERTY_TYPE.schemas, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setSchemas();
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setSchemas([]);
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setSchemas(MOCK_PROPERTY_TYPE.schemas);
        }).not.toThrow();
      });

    });

    describe('setPii()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setPii(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setPii();
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setPii(MOCK_PROPERTY_TYPE.pii);
        }).not.toThrow();
      });

    });

    describe('setAnalyzer()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setAnalyzer(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setAnalyzer();
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setAnalyzer('');
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setAnalyzer(MOCK_PROPERTY_TYPE.analyzer);
        }).not.toThrow();
      });

    });

    describe('setMultiValued()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setMultiValued(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setMultiValued();
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setPii(MOCK_PROPERTY_TYPE.multiValued);
        }).not.toThrow();
      });

    });

    describe('setEnumValues()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setEnumValues(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setEnumValues();
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setEnumValues([]);
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setEnumValues(MOCK_PROPERTY_TYPE.enumValues);
        }).not.toThrow();
      });

    });

    describe('setIndexType()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            (new PropertyTypeBuilder()).setIndexType(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new PropertyTypeBuilder()).setIndexType();
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setIndexType('');
        }).not.toThrow();
        expect(() => {
          (new PropertyTypeBuilder()).setIndexType(MOCK_PROPERTY_TYPE.indexType);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new PropertyTypeBuilder())
            .setTitle(MOCK_PROPERTY_TYPE.title)
            .setDataType(MOCK_PROPERTY_TYPE.datatype)
            .build();
        }).toThrow();

        expect(() => {
          (new PropertyTypeBuilder())
            .setType(MOCK_PROPERTY_TYPE.type)
            .setDataType(MOCK_PROPERTY_TYPE.datatype)
            .build();
        }).toThrow();

        expect(() => {
          (new PropertyTypeBuilder())
            .setType(MOCK_PROPERTY_TYPE.type)
            .setTitle(MOCK_PROPERTY_TYPE.title)
            .build();
        }).toThrow();

      });

      test('should set required properties that are allowed to be empty', () => {

        const org = (new PropertyTypeBuilder())
          .setType(MOCK_PROPERTY_TYPE.type)
          .setTitle(MOCK_PROPERTY_TYPE.title)
          .setDataType(MOCK_PROPERTY_TYPE.datatype)
          .build();

        expect(org.schemas).toEqual([]);
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          // omitting setId()
          (new PropertyTypeBuilder())
            .setAnalyzer(MOCK_PROPERTY_TYPE.analyzer)
            .setDataType(MOCK_PROPERTY_TYPE.datatype)
            .setDescription(MOCK_PROPERTY_TYPE.description)
            .setEnumValues(MOCK_PROPERTY_TYPE.enumValues)
            .setIndexType(MOCK_PROPERTY_TYPE.indexType)
            .setMultiValued(MOCK_PROPERTY_TYPE.multiValued)
            .setPii(MOCK_PROPERTY_TYPE.pii)
            .setSchemas(MOCK_PROPERTY_TYPE.schemas)
            .setTitle(MOCK_PROPERTY_TYPE.title)
            .setType(MOCK_PROPERTY_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setDescription()
          (new PropertyTypeBuilder())
            .setAnalyzer(MOCK_PROPERTY_TYPE.analyzer)
            .setDataType(MOCK_PROPERTY_TYPE.datatype)
            .setEnumValues(MOCK_PROPERTY_TYPE.enumValues)
            .setId(MOCK_PROPERTY_TYPE.id)
            .setIndexType(MOCK_PROPERTY_TYPE.indexType)
            .setMultiValued(MOCK_PROPERTY_TYPE.multiValued)
            .setPii(MOCK_PROPERTY_TYPE.pii)
            .setSchemas(MOCK_PROPERTY_TYPE.schemas)
            .setTitle(MOCK_PROPERTY_TYPE.title)
            .setType(MOCK_PROPERTY_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setPii()
          (new PropertyTypeBuilder())
            .setAnalyzer(MOCK_PROPERTY_TYPE.analyzer)
            .setDataType(MOCK_PROPERTY_TYPE.datatype)
            .setDescription(MOCK_PROPERTY_TYPE.description)
            .setEnumValues(MOCK_PROPERTY_TYPE.enumValues)
            .setId(MOCK_PROPERTY_TYPE.id)
            .setIndexType(MOCK_PROPERTY_TYPE.indexType)
            .setMultiValued(MOCK_PROPERTY_TYPE.multiValued)
            .setSchemas(MOCK_PROPERTY_TYPE.schemas)
            .setTitle(MOCK_PROPERTY_TYPE.title)
            .setType(MOCK_PROPERTY_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setAnalyzer()
          (new PropertyTypeBuilder())
            .setDataType(MOCK_PROPERTY_TYPE.datatype)
            .setDescription(MOCK_PROPERTY_TYPE.description)
            .setEnumValues(MOCK_PROPERTY_TYPE.enumValues)
            .setId(MOCK_PROPERTY_TYPE.id)
            .setIndexType(MOCK_PROPERTY_TYPE.indexType)
            .setMultiValued(MOCK_PROPERTY_TYPE.multiValued)
            .setPii(MOCK_PROPERTY_TYPE.pii)
            .setSchemas(MOCK_PROPERTY_TYPE.schemas)
            .setTitle(MOCK_PROPERTY_TYPE.title)
            .setType(MOCK_PROPERTY_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setMultiValued()
          (new PropertyTypeBuilder())
            .setAnalyzer(MOCK_PROPERTY_TYPE.analyzer)
            .setDataType(MOCK_PROPERTY_TYPE.datatype)
            .setDescription(MOCK_PROPERTY_TYPE.description)
            .setEnumValues(MOCK_PROPERTY_TYPE.enumValues)
            .setId(MOCK_PROPERTY_TYPE.id)
            .setIndexType(MOCK_PROPERTY_TYPE.indexType)
            .setPii(MOCK_PROPERTY_TYPE.pii)
            .setSchemas(MOCK_PROPERTY_TYPE.schemas)
            .setTitle(MOCK_PROPERTY_TYPE.title)
            .setType(MOCK_PROPERTY_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setEnumValues()
          (new PropertyTypeBuilder())
            .setAnalyzer(MOCK_PROPERTY_TYPE.analyzer)
            .setDataType(MOCK_PROPERTY_TYPE.datatype)
            .setDescription(MOCK_PROPERTY_TYPE.description)
            .setId(MOCK_PROPERTY_TYPE.id)
            .setIndexType(MOCK_PROPERTY_TYPE.indexType)
            .setMultiValued(MOCK_PROPERTY_TYPE.multiValued)
            .setPii(MOCK_PROPERTY_TYPE.pii)
            .setSchemas(MOCK_PROPERTY_TYPE.schemas)
            .setTitle(MOCK_PROPERTY_TYPE.title)
            .setType(MOCK_PROPERTY_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setIndexType()
          (new PropertyTypeBuilder())
            .setAnalyzer(MOCK_PROPERTY_TYPE.analyzer)
            .setDataType(MOCK_PROPERTY_TYPE.datatype)
            .setDescription(MOCK_PROPERTY_TYPE.description)
            .setEnumValues(MOCK_PROPERTY_TYPE.enumValues)
            .setId(MOCK_PROPERTY_TYPE.id)
            .setMultiValued(MOCK_PROPERTY_TYPE.multiValued)
            .setPii(MOCK_PROPERTY_TYPE.pii)
            .setSchemas(MOCK_PROPERTY_TYPE.schemas)
            .setTitle(MOCK_PROPERTY_TYPE.title)
            .setType(MOCK_PROPERTY_TYPE.type)
            .build();
        }).not.toThrow();
      });

      test('should return a valid instance', () => {

        const propertyType = (new PropertyTypeBuilder())
          .setAnalyzer(MOCK_PROPERTY_TYPE.analyzer)
          .setDataType(MOCK_PROPERTY_TYPE.datatype)
          .setDescription(MOCK_PROPERTY_TYPE.description)
          .setEnumValues(MOCK_PROPERTY_TYPE.enumValues)
          .setId(MOCK_PROPERTY_TYPE.id)
          .setIndexType(MOCK_PROPERTY_TYPE.indexType)
          .setMultiValued(MOCK_PROPERTY_TYPE.multiValued)
          .setPii(MOCK_PROPERTY_TYPE.pii)
          .setSchemas(MOCK_PROPERTY_TYPE.schemas)
          .setTitle(MOCK_PROPERTY_TYPE.title)
          .setType(MOCK_PROPERTY_TYPE.type)
          .build();

        expect(propertyType).toBeInstanceOf(PropertyType);

        expect(propertyType.analyzer).toBeDefined();
        expect(propertyType.datatype).toBeDefined();
        expect(propertyType.description).toBeDefined();
        expect(propertyType.enumValues).toBeDefined();
        expect(propertyType.id).toBeDefined();
        expect(propertyType.indexType).toBeDefined();
        expect(propertyType.multiValued).toBeDefined();
        expect(propertyType.pii).toBeDefined();
        expect(propertyType.schemas).toBeDefined();
        expect(propertyType.title).toBeDefined();
        expect(propertyType.type).toBeDefined();

        expect(propertyType.analyzer).toEqual(MOCK_PROPERTY_TYPE.analyzer);
        expect(propertyType.datatype).toEqual(MOCK_PROPERTY_TYPE.datatype);
        expect(propertyType.description).toEqual(MOCK_PROPERTY_TYPE.description);
        expect(propertyType.enumValues).toEqual(MOCK_PROPERTY_TYPE.enumValues);
        expect(propertyType.id).toEqual(MOCK_PROPERTY_TYPE.id);
        expect(propertyType.indexType).toEqual(MOCK_PROPERTY_TYPE.indexType);
        expect(propertyType.multiValued).toEqual(MOCK_PROPERTY_TYPE.multiValued);
        expect(propertyType.pii).toEqual(MOCK_PROPERTY_TYPE.pii);
        expect(propertyType.schemas).toEqual(MOCK_PROPERTY_TYPE.schemas);
        expect(propertyType.title).toEqual(MOCK_PROPERTY_TYPE.title);
        expect(propertyType.type).toEqual(MOCK_PROPERTY_TYPE.type);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_PROPERTY_TYPE)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new PropertyType(
            MOCK_PROPERTY_TYPE.id,
            MOCK_PROPERTY_TYPE.type,
            MOCK_PROPERTY_TYPE.title,
            MOCK_PROPERTY_TYPE.description,
            MOCK_PROPERTY_TYPE.datatype,
            MOCK_PROPERTY_TYPE.schemas,
            MOCK_PROPERTY_TYPE.pii,
            MOCK_PROPERTY_TYPE.analyzer,
            MOCK_PROPERTY_TYPE.multiValued,
            MOCK_PROPERTY_TYPE.enumValues,
            MOCK_PROPERTY_TYPE.indexType,
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const propertyType = (new PropertyTypeBuilder())
          .setId(MOCK_PROPERTY_TYPE.id)
          .setType(MOCK_PROPERTY_TYPE.type)
          .setTitle(MOCK_PROPERTY_TYPE.title)
          .setDescription(MOCK_PROPERTY_TYPE.description)
          .setDataType(MOCK_PROPERTY_TYPE.datatype)
          .setSchemas(MOCK_PROPERTY_TYPE.schemas)
          .setPii(MOCK_PROPERTY_TYPE.pii)
          .setAnalyzer(MOCK_PROPERTY_TYPE.analyzer)
          .setMultiValued(MOCK_PROPERTY_TYPE.multiValued)
          .setEnumValues(MOCK_PROPERTY_TYPE.enumValues)
          .setIndexType(MOCK_PROPERTY_TYPE.indexType)
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
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { id: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { type: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { title: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { description: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "datatype" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { datatype: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "schemas" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { schemas: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { schemas: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "pii" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { pii: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "analyzer" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { analyzer: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "multiValued" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { multiValued: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "enumValues" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { enumValues: invalidInput }))).toEqual(false);
        });
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { enumValues: [invalidInput] }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "indexType" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE, { indexType: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              invalidInput,
              MOCK_PROPERTY_TYPE.type,
              MOCK_PROPERTY_TYPE.title,
              MOCK_PROPERTY_TYPE.description,
              MOCK_PROPERTY_TYPE.datatype,
              MOCK_PROPERTY_TYPE.schemas,
              MOCK_PROPERTY_TYPE.pii,
              MOCK_PROPERTY_TYPE.analyzer,
              MOCK_PROPERTY_TYPE.multiValued,
              MOCK_PROPERTY_TYPE.enumValues,
              MOCK_PROPERTY_TYPE.indexType,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE.id,
              invalidInput,
              MOCK_PROPERTY_TYPE.title,
              MOCK_PROPERTY_TYPE.description,
              MOCK_PROPERTY_TYPE.datatype,
              MOCK_PROPERTY_TYPE.schemas,
              MOCK_PROPERTY_TYPE.pii,
              MOCK_PROPERTY_TYPE.analyzer,
              MOCK_PROPERTY_TYPE.multiValued,
              MOCK_PROPERTY_TYPE.enumValues,
              MOCK_PROPERTY_TYPE.indexType,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE.id,
              MOCK_PROPERTY_TYPE.type,
              invalidInput,
              MOCK_PROPERTY_TYPE.description,
              MOCK_PROPERTY_TYPE.datatype,
              MOCK_PROPERTY_TYPE.schemas,
              MOCK_PROPERTY_TYPE.pii,
              MOCK_PROPERTY_TYPE.analyzer,
              MOCK_PROPERTY_TYPE.multiValued,
              MOCK_PROPERTY_TYPE.enumValues,
              MOCK_PROPERTY_TYPE.indexType,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE.id,
              MOCK_PROPERTY_TYPE.type,
              MOCK_PROPERTY_TYPE.title,
              invalidInput,
              MOCK_PROPERTY_TYPE.datatype,
              MOCK_PROPERTY_TYPE.schemas,
              MOCK_PROPERTY_TYPE.pii,
              MOCK_PROPERTY_TYPE.analyzer,
              MOCK_PROPERTY_TYPE.multiValued,
              MOCK_PROPERTY_TYPE.enumValues,
              MOCK_PROPERTY_TYPE.indexType,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "datatype" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE.id,
              MOCK_PROPERTY_TYPE.type,
              MOCK_PROPERTY_TYPE.title,
              MOCK_PROPERTY_TYPE.description,
              invalidInput,
              MOCK_PROPERTY_TYPE.schemas,
              MOCK_PROPERTY_TYPE.pii,
              MOCK_PROPERTY_TYPE.analyzer,
              MOCK_PROPERTY_TYPE.multiValued,
              MOCK_PROPERTY_TYPE.enumValues,
              MOCK_PROPERTY_TYPE.indexType,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "schemas" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE.id,
              MOCK_PROPERTY_TYPE.type,
              MOCK_PROPERTY_TYPE.title,
              MOCK_PROPERTY_TYPE.description,
              MOCK_PROPERTY_TYPE.datatype,
              invalidInput,
              MOCK_PROPERTY_TYPE.pii,
              MOCK_PROPERTY_TYPE.analyzer,
              MOCK_PROPERTY_TYPE.multiValued,
              MOCK_PROPERTY_TYPE.enumValues,
              MOCK_PROPERTY_TYPE.indexType,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "pii" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE.id,
              MOCK_PROPERTY_TYPE.type,
              MOCK_PROPERTY_TYPE.title,
              MOCK_PROPERTY_TYPE.description,
              MOCK_PROPERTY_TYPE.datatype,
              MOCK_PROPERTY_TYPE.schemas,
              invalidInput,
              MOCK_PROPERTY_TYPE.analyzer,
              MOCK_PROPERTY_TYPE.multiValued,
              MOCK_PROPERTY_TYPE.enumValues,
              MOCK_PROPERTY_TYPE.indexType,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "analyzer" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE.id,
              MOCK_PROPERTY_TYPE.type,
              MOCK_PROPERTY_TYPE.title,
              MOCK_PROPERTY_TYPE.description,
              MOCK_PROPERTY_TYPE.datatype,
              MOCK_PROPERTY_TYPE.schemas,
              MOCK_PROPERTY_TYPE.pii,
              invalidInput,
              MOCK_PROPERTY_TYPE.multiValued,
              MOCK_PROPERTY_TYPE.enumValues,
              MOCK_PROPERTY_TYPE.indexType,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "multiValued" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_BOOLEAN.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE.id,
              MOCK_PROPERTY_TYPE.type,
              MOCK_PROPERTY_TYPE.title,
              MOCK_PROPERTY_TYPE.description,
              MOCK_PROPERTY_TYPE.datatype,
              MOCK_PROPERTY_TYPE.schemas,
              MOCK_PROPERTY_TYPE.pii,
              MOCK_PROPERTY_TYPE.analyzer,
              invalidInput,
              MOCK_PROPERTY_TYPE.enumValues,
              MOCK_PROPERTY_TYPE.indexType,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "enumValues" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE.id,
              MOCK_PROPERTY_TYPE.type,
              MOCK_PROPERTY_TYPE.title,
              MOCK_PROPERTY_TYPE.description,
              MOCK_PROPERTY_TYPE.datatype,
              MOCK_PROPERTY_TYPE.schemas,
              MOCK_PROPERTY_TYPE.pii,
              MOCK_PROPERTY_TYPE.analyzer,
              MOCK_PROPERTY_TYPE.multiValued,
              invalidInput,
              MOCK_PROPERTY_TYPE.indexType,
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "indexType" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_PROPERTY_TYPE.id,
              MOCK_PROPERTY_TYPE.type,
              MOCK_PROPERTY_TYPE.title,
              MOCK_PROPERTY_TYPE.description,
              MOCK_PROPERTY_TYPE.datatype,
              MOCK_PROPERTY_TYPE.schemas,
              MOCK_PROPERTY_TYPE.pii,
              MOCK_PROPERTY_TYPE.analyzer,
              MOCK_PROPERTY_TYPE.multiValued,
              MOCK_PROPERTY_TYPE.enumValues,
              invalidInput,
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const propertyType = new PropertyType(
        MOCK_PROPERTY_TYPE.id,
        MOCK_PROPERTY_TYPE.type,
        MOCK_PROPERTY_TYPE.title,
        MOCK_PROPERTY_TYPE.description,
        MOCK_PROPERTY_TYPE.datatype,
        MOCK_PROPERTY_TYPE.schemas,
        MOCK_PROPERTY_TYPE.pii,
        MOCK_PROPERTY_TYPE.analyzer,
        MOCK_PROPERTY_TYPE.multiValued,
        MOCK_PROPERTY_TYPE.enumValues,
        MOCK_PROPERTY_TYPE.indexType,
      );
      expect(propertyType.valueOf()).toEqual(
        fromJS({
          analyzer: MOCK_PROPERTY_TYPE.analyzer,
          datatype: MOCK_PROPERTY_TYPE.datatype,
          description: MOCK_PROPERTY_TYPE.description,
          enumValues: MOCK_PROPERTY_TYPE.enumValues,
          id: MOCK_PROPERTY_TYPE.id,
          indexType: MOCK_PROPERTY_TYPE.indexType,
          multiValued: MOCK_PROPERTY_TYPE.multiValued,
          pii: MOCK_PROPERTY_TYPE.pii,
          schemas: MOCK_PROPERTY_TYPE.schemas.map(fqn => fqn.toObject()),
          title: MOCK_PROPERTY_TYPE.title,
          type: MOCK_PROPERTY_TYPE.type.toObject(),
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomPropertyType = genRandomPropertyType();
      const propertyType0 = new PropertyType(
        MOCK_PROPERTY_TYPE.id,
        MOCK_PROPERTY_TYPE.type,
        MOCK_PROPERTY_TYPE.title,
        MOCK_PROPERTY_TYPE.description,
        MOCK_PROPERTY_TYPE.datatype,
        MOCK_PROPERTY_TYPE.schemas,
        MOCK_PROPERTY_TYPE.pii,
        MOCK_PROPERTY_TYPE.analyzer,
        MOCK_PROPERTY_TYPE.multiValued,
        MOCK_PROPERTY_TYPE.enumValues,
        MOCK_PROPERTY_TYPE.indexType,
      );
      const propertyType1 = new PropertyType(
        MOCK_PROPERTY_TYPE.id,
        MOCK_PROPERTY_TYPE.type,
        MOCK_PROPERTY_TYPE.title,
        MOCK_PROPERTY_TYPE.description,
        MOCK_PROPERTY_TYPE.datatype,
        MOCK_PROPERTY_TYPE.schemas,
        MOCK_PROPERTY_TYPE.pii,
        MOCK_PROPERTY_TYPE.analyzer,
        MOCK_PROPERTY_TYPE.multiValued,
        MOCK_PROPERTY_TYPE.enumValues,
        MOCK_PROPERTY_TYPE.indexType,
      );

      const testSet = Set()
        .add(propertyType0)
        .add(randomPropertyType)
        .add(propertyType1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().analyzer).toEqual(MOCK_PROPERTY_TYPE.analyzer);
      expect(testSet.first().datatype).toEqual(MOCK_PROPERTY_TYPE.datatype);
      expect(testSet.first().description).toEqual(MOCK_PROPERTY_TYPE.description);
      expect(testSet.first().enumValues).toEqual(MOCK_PROPERTY_TYPE.enumValues);
      expect(testSet.first().id).toEqual(MOCK_PROPERTY_TYPE.id);
      expect(testSet.first().indexType).toEqual(MOCK_PROPERTY_TYPE.indexType);
      expect(testSet.first().multiValued).toEqual(MOCK_PROPERTY_TYPE.multiValued);
      expect(testSet.first().pii).toEqual(MOCK_PROPERTY_TYPE.pii);
      expect(testSet.first().schemas).toEqual(MOCK_PROPERTY_TYPE.schemas);
      expect(testSet.first().title).toEqual(MOCK_PROPERTY_TYPE.title);
      expect(testSet.first().type).toEqual(MOCK_PROPERTY_TYPE.type);

      expect(testSet.last().analyzer).toEqual(randomPropertyType.analyzer);
      expect(testSet.last().datatype).toEqual(randomPropertyType.datatype);
      expect(testSet.last().description).toEqual(randomPropertyType.description);
      expect(testSet.last().enumValues).toEqual(randomPropertyType.enumValues);
      expect(testSet.last().id).toEqual(randomPropertyType.id);
      expect(testSet.last().indexType).toEqual(randomPropertyType.indexType);
      expect(testSet.last().multiValued).toEqual(randomPropertyType.multiValued);
      expect(testSet.last().pii).toEqual(randomPropertyType.pii);
      expect(testSet.last().schemas).toEqual(randomPropertyType.schemas);
      expect(testSet.last().title).toEqual(randomPropertyType.title);
      expect(testSet.last().type).toEqual(randomPropertyType.type);
    });

    test('Immutable.Map', () => {

      const randomPropertyType = genRandomPropertyType();
      const propertyType0 = new PropertyType(
        MOCK_PROPERTY_TYPE.id,
        MOCK_PROPERTY_TYPE.type,
        MOCK_PROPERTY_TYPE.title,
        MOCK_PROPERTY_TYPE.description,
        MOCK_PROPERTY_TYPE.datatype,
        MOCK_PROPERTY_TYPE.schemas,
        MOCK_PROPERTY_TYPE.pii,
        MOCK_PROPERTY_TYPE.analyzer,
        MOCK_PROPERTY_TYPE.multiValued,
        MOCK_PROPERTY_TYPE.enumValues,
        MOCK_PROPERTY_TYPE.indexType,
      );
      const propertyType1 = new PropertyType(
        MOCK_PROPERTY_TYPE.id,
        MOCK_PROPERTY_TYPE.type,
        MOCK_PROPERTY_TYPE.title,
        MOCK_PROPERTY_TYPE.description,
        MOCK_PROPERTY_TYPE.datatype,
        MOCK_PROPERTY_TYPE.schemas,
        MOCK_PROPERTY_TYPE.pii,
        MOCK_PROPERTY_TYPE.analyzer,
        MOCK_PROPERTY_TYPE.multiValued,
        MOCK_PROPERTY_TYPE.enumValues,
        MOCK_PROPERTY_TYPE.indexType,
      );

      const testMap = Map()
        .set(propertyType0, 'test_value_1')
        .set(randomPropertyType, 'test_value_2')
        .set(propertyType1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(propertyType0)).toEqual('test_value_3');
      expect(testMap.get(randomPropertyType)).toEqual('test_value_2');
      expect(testMap.get(propertyType1)).toEqual('test_value_3');
    });

  });

});
