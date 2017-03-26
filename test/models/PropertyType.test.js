import PropertyType, {
  PropertyTypeBuilder,
  isValid
} from '../../src/models/PropertyType';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_SS_PARAMS,
  INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED
} from '../constants/InvalidParams';

import {
  MOCK_PROPERTY_TYPE_DM
} from '../constants/MockDataModels';

describe('PropertyType', () => {

  describe('PropertyTypeBuilder', () => {

    let builder :PropertyTypeBuilder = null;

    beforeEach(() => {
      builder = new PropertyTypeBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setId()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setId(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setId();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setId(MOCK_PROPERTY_TYPE_DM.id);
        }).not.toThrow();
      });

    });

    describe('setType()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setType(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setType();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setType(MOCK_PROPERTY_TYPE_DM.type);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setTitle(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setTitle();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setTitle(MOCK_PROPERTY_TYPE_DM.title);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
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
          builder.setDescription(MOCK_PROPERTY_TYPE_DM.description);
        }).not.toThrow();
      });

    });

    describe('setDataType()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setDataType(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setDataType();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setDataType(MOCK_PROPERTY_TYPE_DM.datatype);
        }).not.toThrow();
      });

    });

    describe('setSchemas()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setSchemas([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas([...MOCK_PROPERTY_TYPE_DM.schemas, invalidInput]);
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
          builder.setSchemas(MOCK_PROPERTY_TYPE_DM.schemas);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

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

      it('should set required properties that are allowed to be empty', () => {

        const org = builder
          .setType(MOCK_PROPERTY_TYPE_DM.type)
          .setTitle(MOCK_PROPERTY_TYPE_DM.title)
          .setDataType(MOCK_PROPERTY_TYPE_DM.datatype)
          .build();

        expect(org.schemas).toEqual([]);
      });

      it('should not throw when an optional property has not been set', () => {

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

      it('should return a valid instance', () => {

        const propertyType = builder
          .setId(MOCK_PROPERTY_TYPE_DM.id)
          .setType(MOCK_PROPERTY_TYPE_DM.type)
          .setTitle(MOCK_PROPERTY_TYPE_DM.title)
          .setDescription(MOCK_PROPERTY_TYPE_DM.description)
          .setDataType(MOCK_PROPERTY_TYPE_DM.datatype)
          .setSchemas(MOCK_PROPERTY_TYPE_DM.schemas)
          .build();

        expect(propertyType).toEqual(jasmine.any(PropertyType));

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

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_PROPERTY_TYPE_DM)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
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

      it('should return true when given an instance constructed by the builder', () => {

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

      it('should return false when not given any parameters', () => {
        expect(isValid()).toEqual(false);
      });

      it('should return false when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(invalidInput)).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { type: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "datatype" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { datatype: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "schemas" property', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PROPERTY_TYPE_DM, { schemas: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "type" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
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

      it('should return false when given an instance with an invalid "title" property', () => {
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

      it('should return false when given an instance with an invalid "description" property', () => {
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

      it('should return false when given an instance with an invalid "datatype" property', () => {
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

      it('should return false when given an instance with an invalid "schemas" property', () => {
        INVALID_SS_PARAMS_EMPTY_ARRAY_ALLOWED.forEach((invalidInput) => {
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
