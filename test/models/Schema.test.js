import Schema, {
  SchemaBuilder,
  isValid
} from '../../src/models/Schema';

import {
  isDefined
} from '../../src/utils/LangUtils';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_FQN = {
  namespace: 'LOOM',
  name: 'Data'
};

const MOCK_ENTITY_TYPES = [
  {
    id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
    type: {
      namespace: 'LOOM',
      name: 'EntityType'
    },
    title: 'title',
    description: 'description',
    schemas: [
      {
        namespace: 'LOOM',
        name: 'Schema'
      }
    ],
    key: [
      '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
      '4b08e1f9-4a00-4169-92ea-10e377070220'
    ],
    properties: [
      '8f79e123-3411-4099-a41f-88e5d22d0e8d',
      'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
      'fae6af98-2675-45bd-9a5b-1619a87235a8'
    ]
  }
];

const MOCK_PROPERTY_TYPES = [
  {
    id: 'fae6af98-2675-45bd-9a5b-1619a87235a8',
    type: {
      namespace: 'LOOM',
      name: 'PropertyType'
    },
    title: 'title',
    description: 'description',
    datatype: 'GeoPoint',
    schemas: [
      {
        namespace: 'LOOM',
        name: 'Schema'
      }
    ]
  }
];

const MOCK_SCHEMA_OBJ = {
  fqn: MOCK_FQN,
  entityTypes: MOCK_ENTITY_TYPES,
  propertyTypes: MOCK_PROPERTY_TYPES
};

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

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setFullyQualifiedName();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setFullyQualifiedName(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setFullyQualifiedName(MOCK_FQN);
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
            builder.setEntityTypes([...MOCK_ENTITY_TYPES, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setEntityTypes(MOCK_ENTITY_TYPES);
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
            builder.setPropertyTypes([...MOCK_PROPERTY_TYPES, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPropertyTypes(MOCK_PROPERTY_TYPES);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new SchemaBuilder())
            .setEntityTypes(MOCK_ENTITY_TYPES)
            .setPropertyTypes(MOCK_PROPERTY_TYPES)
            .build();
        }).toThrow();

        expect(() => {
          (new SchemaBuilder())
            .setFullyQualifiedName(MOCK_FQN)
            .setPropertyTypes(MOCK_PROPERTY_TYPES)
            .build();
        }).toThrow();

        expect(() => {
          (new SchemaBuilder())
            .setFullyQualifiedName(MOCK_FQN)
            .setEntityTypes(MOCK_ENTITY_TYPES)
            .build();
        }).toThrow();

      });

      it('should return a valid instance', () => {

        const schema = builder
          .setFullyQualifiedName(MOCK_FQN)
          .setEntityTypes(MOCK_ENTITY_TYPES)
          .setPropertyTypes(MOCK_PROPERTY_TYPES)
          .build();

        expect(schema).toEqual(jasmine.any(Schema));

        expect(schema.fqn).toBeDefined();
        expect(schema.fqn).toEqual(MOCK_FQN);

        expect(schema.entityTypes).toBeDefined();
        expect(schema.entityTypes).toEqual(MOCK_ENTITY_TYPES);

        expect(schema.propertyTypes).toBeDefined();
        expect(schema.propertyTypes).toEqual(MOCK_PROPERTY_TYPES);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_SCHEMA_OBJ)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new Schema(
            MOCK_FQN, MOCK_ENTITY_TYPES, MOCK_PROPERTY_TYPES
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const schema = (new SchemaBuilder())
          .setFullyQualifiedName(MOCK_FQN)
          .setEntityTypes(MOCK_ENTITY_TYPES)
          .setPropertyTypes(MOCK_PROPERTY_TYPES)
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
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_SCHEMA_OBJ, { fqn: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an object literal with an invalid "entityTypes" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_SCHEMA_OBJ, { entityTypes: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_SCHEMA_OBJ, { entityTypes: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "propertyTypes" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_SCHEMA_OBJ, { propertyTypes: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_SCHEMA_OBJ, { propertyTypes: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "fqn" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Schema(
              invalidInput, MOCK_ENTITY_TYPES, MOCK_PROPERTY_TYPES
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "entityTypes" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Schema(
              MOCK_FQN, invalidInput, MOCK_PROPERTY_TYPES
            )
          )).toEqual(false);
          expect(isValid(
            new Schema(
              MOCK_FQN, [invalidInput], MOCK_PROPERTY_TYPES
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "propertyTypes" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new Schema(
              MOCK_FQN, MOCK_ENTITY_TYPES, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new Schema(
              MOCK_FQN, MOCK_ENTITY_TYPES, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
