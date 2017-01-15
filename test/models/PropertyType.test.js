import PropertyType, {
  PropertyTypeBuilder,
  isValid
} from '../../src/models/PropertyType';

import {
  isDefined
} from '../../src/utils/LangUtils';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_UUID = 'ec6865e6-e60e-424b-a071-6a9c1603d735';
const MOCK_TITLE = 'title';
const MOCK_DESCRIPTION = 'description';
const MOCK_DATATYPE = 'GeographyPoint';

const MOCK_TYPE_FQN = {
  namespace: 'LOOM',
  name: 'Data'
};

const MOCK_SCHEMAS = [
  {
    namespace: 'LOOM',
    name: 'Schema'
  }
];

const MOCK_PT_OBJ = {
  id: MOCK_UUID,
  type: MOCK_TYPE_FQN,
  title: MOCK_TITLE,
  description: MOCK_DESCRIPTION,
  datatype: MOCK_DATATYPE,
  schemas: MOCK_SCHEMAS
};

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

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setId();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setId(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setId(MOCK_UUID);
        }).not.toThrow();
      });

    });

    describe('setType()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setType();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setType(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setType(MOCK_TYPE_FQN);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setTitle();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setTitle(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setTitle(MOCK_TITLE);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setDescription();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setDescription(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setDescription(MOCK_DESCRIPTION);
        }).not.toThrow();
      });

    });

    describe('setDataType()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setDataType();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setDataType(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setDataType(MOCK_DATATYPE);
        }).not.toThrow();
      });

    });

    describe('setSchemas()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setSchemas();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setSchemas([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas([...MOCK_SCHEMAS, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setSchemas(MOCK_SCHEMAS);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new PropertyTypeBuilder())
            .setTitle(MOCK_TITLE)
            .setDataType(MOCK_DATATYPE)
            .setSchemas(MOCK_SCHEMAS)
            .build();
        }).toThrow();

        expect(() => {
          (new PropertyTypeBuilder())
            .setType(MOCK_TYPE_FQN)
            .setDataType(MOCK_DATATYPE)
            .setSchemas(MOCK_SCHEMAS)
            .build();
        }).toThrow();

        expect(() => {
          (new PropertyTypeBuilder())
            .setType(MOCK_TYPE_FQN)
            .setTitle(MOCK_TITLE)
            .setSchemas(MOCK_SCHEMAS)
            .build();
        }).toThrow();

        expect(() => {
          (new PropertyTypeBuilder())
            .setType(MOCK_TYPE_FQN)
            .setTitle(MOCK_TITLE)
            .setDataType(MOCK_DATATYPE)
            .build();
        }).toThrow();

      });

      it('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new PropertyTypeBuilder())
            .setType(MOCK_TYPE_FQN)
            .setTitle(MOCK_TITLE)
            .setDescription(MOCK_DESCRIPTION)
            .setDataType(MOCK_DATATYPE)
            .setSchemas(MOCK_SCHEMAS)
            .build();
        }).not.toThrow();

        expect(() => {
          (new PropertyTypeBuilder())
            .setId(MOCK_UUID)
            .setType(MOCK_TYPE_FQN)
            .setTitle(MOCK_TITLE)
            .setDataType(MOCK_DATATYPE)
            .setSchemas(MOCK_SCHEMAS)
            .build();
        }).not.toThrow();
      });

      it('should return a valid instance', () => {

        const propertyType = builder
          .setId(MOCK_UUID)
          .setType(MOCK_TYPE_FQN)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .setDataType(MOCK_DATATYPE)
          .setSchemas(MOCK_SCHEMAS)
          .build();

        expect(propertyType).toEqual(jasmine.any(PropertyType));

        expect(propertyType.id).toBeDefined();
        expect(propertyType.id).toEqual(MOCK_UUID);

        expect(propertyType.type).toBeDefined();
        expect(propertyType.type).toEqual(MOCK_TYPE_FQN);

        expect(propertyType.title).toBeDefined();
        expect(propertyType.title).toEqual(MOCK_TITLE);

        expect(propertyType.description).toBeDefined();
        expect(propertyType.description).toEqual(MOCK_DESCRIPTION);

        expect(propertyType.datatype).toBeDefined();
        expect(propertyType.datatype).toEqual(MOCK_DATATYPE);

        expect(propertyType.schemas).toBeDefined();
        expect(propertyType.schemas).toEqual(MOCK_SCHEMAS);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_PT_OBJ)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new PropertyType(
            MOCK_UUID, MOCK_TYPE_FQN, MOCK_TITLE, MOCK_DESCRIPTION, MOCK_DATATYPE, MOCK_SCHEMAS
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const propertyType = (new PropertyTypeBuilder())
          .setId(MOCK_UUID)
          .setType(MOCK_TYPE_FQN)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .setDataType(MOCK_DATATYPE)
          .setSchemas(MOCK_SCHEMAS)
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
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_PT_OBJ, { id: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PT_OBJ, { type: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PT_OBJ, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_PT_OBJ, { description: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an object literal with an invalid "datatype" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PT_OBJ, { datatype: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "schemas" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_PT_OBJ, { schemas: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new PropertyType(
                invalidInput, MOCK_TYPE_FQN, MOCK_TITLE, MOCK_DESCRIPTION, MOCK_DATATYPE, MOCK_SCHEMAS
              )
            )).toEqual(false);
          }
        });
      });

      it('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_UUID, invalidInput, MOCK_TITLE, MOCK_DESCRIPTION, MOCK_DATATYPE, MOCK_SCHEMAS
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_UUID, MOCK_TYPE_FQN, invalidInput, MOCK_DESCRIPTION, MOCK_DATATYPE, MOCK_SCHEMAS
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new PropertyType(
                MOCK_UUID, MOCK_TYPE_FQN, MOCK_TITLE, invalidInput, MOCK_DATATYPE, MOCK_SCHEMAS
              )
            )).toEqual(false);
          }
        });
      });

      it('should return false when given an instance with an invalid "datatype" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_UUID, MOCK_TYPE_FQN, MOCK_TITLE, MOCK_DESCRIPTION, invalidInput, MOCK_SCHEMAS
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "schemas" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new PropertyType(
              MOCK_UUID, MOCK_TYPE_FQN, MOCK_TITLE, MOCK_DESCRIPTION, MOCK_DATATYPE, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
