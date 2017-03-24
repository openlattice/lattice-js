import SecurableTypes from '../../src/constants/types/SecurableTypes';

import EntityType, {
  EntityTypeBuilder,
  isValid
} from '../../src/models/EntityType';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED
} from '../constants/TestConstants';

const MOCK_TITLE = 'title';
const MOCK_DESCRIPTION = 'description';
const MOCK_UUID = 'ec6865e6-e60e-424b-a071-6a9c1603d735';
const MOCK_BASE_TYPE = '9a768c9b-b76f-4fa1-be60-0178695cdbc3';
const MOCK_CATEGORY = SecurableTypes.EntityType;

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

const MOCK_KEY = [
  '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
  '4b08e1f9-4a00-4169-92ea-10e377070220'
];

const MOCK_PROPERTIES = [
  '8f79e123-3411-4099-a41f-88e5d22d0e8d',
  'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
  'fae6af98-2675-45bd-9a5b-1619a87235a8'
];

const MOCK_ET_OBJ = {
  id: MOCK_UUID,
  type: MOCK_TYPE_FQN,
  title: MOCK_TITLE,
  description: MOCK_DESCRIPTION,
  schemas: MOCK_SCHEMAS,
  key: MOCK_KEY,
  properties: MOCK_PROPERTIES,
  baseType: MOCK_BASE_TYPE,
  category: MOCK_CATEGORY
};

const INVALID_SECURABLE_TYPES = INVALID_PARAMS.slice(0);
INVALID_SECURABLE_TYPES.push('invalid');

describe('EntityType', () => {

  describe('EntityTypeBuilder', () => {

    let builder :EntityTypeBuilder = null;

    beforeEach(() => {
      builder = new EntityTypeBuilder();
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

    describe('setSchemas()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setSchemas([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setSchemas([...MOCK_SCHEMAS, invalidInput]);
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
          builder.setSchemas(MOCK_SCHEMAS);
        }).not.toThrow();
      });

    });

    describe('setKey()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setKey(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setKey([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setKey([...MOCK_KEY, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setKey();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setKey(MOCK_KEY);
        }).not.toThrow();
      });

    });

    describe('setPropertyTypes()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypes(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPropertyTypes([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypes([...MOCK_PROPERTIES, invalidInput]);
          }).toThrow();
        });
      });

      it('should not throw when not given any parameters', () => {
        expect(() => {
          builder.setPropertyTypes();
        }).not.toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPropertyTypes(MOCK_PROPERTIES);
        }).not.toThrow();
      });

    });

    describe('setBaseType()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setBaseType(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setBaseType();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setBaseType(MOCK_BASE_TYPE);
        }).not.toThrow();
      });

    });

    describe('setCategory()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SECURABLE_TYPES.forEach((invalidInput) => {
          expect(() => {
            builder.setCategory(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setCategory();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setCategory(MOCK_CATEGORY);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new EntityTypeBuilder()).setTitle(MOCK_TITLE).build();
        }).toThrow();

        expect(() => {
          (new EntityTypeBuilder()).setType(MOCK_TYPE_FQN).build();
        }).toThrow();

      });

      it('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new EntityTypeBuilder())
            .setType(MOCK_TYPE_FQN)
            .setTitle(MOCK_TITLE)
            .setDescription(MOCK_DESCRIPTION)
            .setSchemas(MOCK_SCHEMAS)
            .setKey(MOCK_KEY)
            .setPropertyTypes(MOCK_PROPERTIES)
            .setBaseType(MOCK_BASE_TYPE)
            .setCategory(MOCK_CATEGORY)
            .build();
        }).not.toThrow();

        expect(() => {
          (new EntityTypeBuilder())
            .setId(MOCK_UUID)
            .setType(MOCK_TYPE_FQN)
            .setTitle(MOCK_TITLE)
            .setSchemas(MOCK_SCHEMAS)
            .setKey(MOCK_KEY)
            .setPropertyTypes(MOCK_PROPERTIES)
            .setBaseType(MOCK_BASE_TYPE)
            .setCategory(MOCK_CATEGORY)
            .build();
        }).not.toThrow();

        expect(() => {
          (new EntityTypeBuilder())
            .setId(MOCK_UUID)
            .setType(MOCK_TYPE_FQN)
            .setTitle(MOCK_TITLE)
            .setDescription(MOCK_DESCRIPTION)
            .setSchemas(MOCK_SCHEMAS)
            .setKey(MOCK_KEY)
            .setPropertyTypes(MOCK_PROPERTIES)
            .setCategory(MOCK_CATEGORY)
            .build();
        }).not.toThrow();

        expect(() => {
          (new EntityTypeBuilder())
            .setId(MOCK_UUID)
            .setType(MOCK_TYPE_FQN)
            .setTitle(MOCK_TITLE)
            .setDescription(MOCK_DESCRIPTION)
            .setSchemas(MOCK_SCHEMAS)
            .setKey(MOCK_KEY)
            .setPropertyTypes(MOCK_PROPERTIES)
            .setBaseType(MOCK_BASE_TYPE)
            .build();
        }).not.toThrow();
      });

      it('should set required properties that are allowed to be empty', () => {

        const org = builder
          .setType(MOCK_TYPE_FQN)
          .setTitle(MOCK_TITLE)
          .build();

        expect(org.schemas).toEqual([]);
        expect(org.key).toEqual([]);
        expect(org.properties).toEqual([]);
      });

      it('should return a valid instance', () => {

        const entityType = builder
          .setId(MOCK_UUID)
          .setType(MOCK_TYPE_FQN)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .setSchemas(MOCK_SCHEMAS)
          .setKey(MOCK_KEY)
          .setPropertyTypes(MOCK_PROPERTIES)
          .setBaseType(MOCK_BASE_TYPE)
          .setCategory(MOCK_CATEGORY)
          .build();

        expect(entityType).toEqual(jasmine.any(EntityType));

        expect(entityType.id).toBeDefined();
        expect(entityType.id).toEqual(MOCK_UUID);

        expect(entityType.type).toBeDefined();
        expect(entityType.type).toEqual(MOCK_TYPE_FQN);

        expect(entityType.title).toBeDefined();
        expect(entityType.title).toEqual(MOCK_TITLE);

        expect(entityType.description).toBeDefined();
        expect(entityType.description).toEqual(MOCK_DESCRIPTION);

        expect(entityType.schemas).toBeDefined();
        expect(entityType.schemas).toEqual(MOCK_SCHEMAS);

        expect(entityType.key).toBeDefined();
        expect(entityType.key).toEqual(MOCK_KEY);

        expect(entityType.properties).toBeDefined();
        expect(entityType.properties).toEqual(MOCK_PROPERTIES);

        expect(entityType.baseType).toBeDefined();
        expect(entityType.baseType).toEqual(MOCK_BASE_TYPE);

        expect(entityType.category).toBeDefined();
        expect(entityType.category).toEqual(MOCK_CATEGORY);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ET_OBJ)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new EntityType(
            MOCK_UUID,
            MOCK_TYPE_FQN,
            MOCK_TITLE,
            MOCK_DESCRIPTION,
            MOCK_SCHEMAS,
            MOCK_KEY,
            MOCK_PROPERTIES,
            MOCK_BASE_TYPE,
            MOCK_CATEGORY
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const entityType = (new EntityTypeBuilder())
          .setId(MOCK_UUID)
          .setType(MOCK_TYPE_FQN)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .setSchemas(MOCK_SCHEMAS)
          .setKey(MOCK_KEY)
          .setPropertyTypes(MOCK_PROPERTIES)
          .setBaseType(MOCK_BASE_TYPE)
          .setCategory(MOCK_CATEGORY)
          .build();

        expect(isValid(entityType)).toEqual(true);
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
          expect(isValid(Object.assign({}, MOCK_ET_OBJ, { id: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ET_OBJ, { type: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ET_OBJ, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ET_OBJ, { description: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "schemas" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ET_OBJ, { schemas: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "key" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ET_OBJ, { key: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "properties" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ET_OBJ, { properties: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "baseType" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ET_OBJ, { baseType: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "category" property', () => {
        INVALID_SECURABLE_TYPES.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ET_OBJ, { category: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              invalidInput,
              MOCK_TYPE_FQN,
              MOCK_TITLE,
              MOCK_DESCRIPTION,
              MOCK_SCHEMAS,
              MOCK_KEY,
              MOCK_PROPERTIES,
              MOCK_BASE_TYPE,
              MOCK_CATEGORY
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_UUID,
              invalidInput,
              MOCK_TITLE,
              MOCK_DESCRIPTION,
              MOCK_SCHEMAS,
              MOCK_KEY,
              MOCK_PROPERTIES,
              MOCK_BASE_TYPE,
              MOCK_CATEGORY
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_UUID,
              MOCK_TYPE_FQN,
              invalidInput,
              MOCK_DESCRIPTION,
              MOCK_SCHEMAS,
              MOCK_KEY,
              MOCK_PROPERTIES,
              MOCK_BASE_TYPE,
              MOCK_CATEGORY
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_UUID,
              MOCK_TYPE_FQN,
              MOCK_TITLE,
              invalidInput,
              MOCK_SCHEMAS,
              MOCK_KEY,
              MOCK_PROPERTIES,
              MOCK_BASE_TYPE,
              MOCK_CATEGORY
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "schemas" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_UUID,
              MOCK_TYPE_FQN,
              MOCK_TITLE,
              MOCK_DESCRIPTION,
              invalidInput,
              MOCK_KEY,
              MOCK_PROPERTIES,
              MOCK_BASE_TYPE,
              MOCK_CATEGORY
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "key" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_UUID,
              MOCK_TYPE_FQN,
              MOCK_TITLE,
              MOCK_DESCRIPTION,
              MOCK_SCHEMAS,
              invalidInput,
              MOCK_PROPERTIES,
              MOCK_BASE_TYPE,
              MOCK_CATEGORY
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "properties" property', () => {
        INVALID_PARAMS_EMPTY_COLLECTION_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_UUID,
              MOCK_TYPE_FQN,
              MOCK_TITLE,
              MOCK_DESCRIPTION,
              MOCK_SCHEMAS,
              MOCK_KEY,
              invalidInput,
              MOCK_BASE_TYPE,
              MOCK_CATEGORY
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "baseType" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_UUID,
              MOCK_TYPE_FQN,
              MOCK_TITLE,
              MOCK_DESCRIPTION,
              MOCK_SCHEMAS,
              MOCK_KEY,
              MOCK_PROPERTIES,
              invalidInput,
              MOCK_CATEGORY
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "category" property', () => {
        INVALID_SECURABLE_TYPES.forEach((invalidInput) => {
          expect(isValid(
            new EntityType(
              MOCK_UUID,
              MOCK_TYPE_FQN,
              MOCK_TITLE,
              MOCK_DESCRIPTION,
              MOCK_SCHEMAS,
              MOCK_KEY,
              MOCK_PROPERTIES,
              MOCK_BASE_TYPE,
              invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
