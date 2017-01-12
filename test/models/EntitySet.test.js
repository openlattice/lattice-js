import EntitySet, {
  EntitySetBuilder,
  isValid
} from '../../src/models/EntitySet';

import {
  isDefined
} from '../../src/utils/LangUtils';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_NAME = 'name';
const MOCK_TITLE = 'title';
const MOCK_DESCRIPTION = 'description';
const MOCK_UUID = 'ec6865e6-e60e-424b-a071-6a9c1603d735';
const MOCK_ET_UUID = '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e';

const MOCK_TYPE_FQN = {
  namespace: 'LOOM',
  name: 'Data'
};

const MOCK_ES_OBJ = {
  id: MOCK_UUID,
  type: MOCK_TYPE_FQN,
  entityTypeId: MOCK_ET_UUID,
  name: MOCK_NAME,
  title: MOCK_TITLE,
  description: MOCK_DESCRIPTION
};

describe('EntitySet', () => {

  describe('EntitySetBuilder', () => {

    let builder :EntitySetBuilder = null;

    beforeEach(() => {
      builder = new EntitySetBuilder();
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

      it('should not throw when given a valid parameter', () => {
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

      it('should not throw when given a valid parameter', () => {
        expect(() => {
          builder.setType(MOCK_TYPE_FQN);
        }).not.toThrow();
      });

    });

    describe('setEntityTypeId()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setEntityTypeId();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntityTypeId(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given a valid parameter', () => {
        expect(() => {
          builder.setEntityTypeId(MOCK_UUID);
        }).not.toThrow();
      });

    });

    describe('setName()', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setName();
        }).toThrow();
      });

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setName(invalidInput);
          }).toThrow();
        });
      });

      it('should not throw when given a valid parameter', () => {
        expect(() => {
          builder.setName(MOCK_NAME);
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

      it('should not throw when given a valid parameter', () => {
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

      it('should not throw when given a valid parameter', () => {
        expect(() => {
          builder.setDescription(MOCK_DESCRIPTION);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new EntitySetBuilder())
            .setEntityTypeId(MOCK_ET_UUID)
            .setName(MOCK_NAME)
            .setTitle(MOCK_TITLE)
            .build();
        }).toThrow();

        expect(() => {
          (new EntitySetBuilder())
            .setType(MOCK_TYPE_FQN)
            .setName(MOCK_NAME)
            .setTitle(MOCK_TITLE)
            .build();
        }).toThrow();

        expect(() => {
          (new EntitySetBuilder())
            .setType(MOCK_TYPE_FQN)
            .setEntityTypeId(MOCK_ET_UUID)
            .setTitle(MOCK_TITLE)
            .build();
        }).toThrow();

        expect(() => {
          (new EntitySetBuilder())
            .setType(MOCK_TYPE_FQN)
            .setEntityTypeId(MOCK_ET_UUID)
            .setName(MOCK_NAME)
            .build();
        }).toThrow();
      });

      it('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new EntitySetBuilder())
            .setType(MOCK_TYPE_FQN)
            .setEntityTypeId(MOCK_ET_UUID)
            .setName(MOCK_NAME)
            .setTitle(MOCK_TITLE)
            .setDescription(MOCK_DESCRIPTION)
            .build();
        }).not.toThrow();

        expect(() => {
          (new EntitySetBuilder())
            .setId(MOCK_UUID)
            .setType(MOCK_TYPE_FQN)
            .setEntityTypeId(MOCK_ET_UUID)
            .setName(MOCK_NAME)
            .setTitle(MOCK_TITLE)
            .build();
        }).not.toThrow();
      });

      it('should return a valid EntitySet instance', () => {

        const entitySet = builder
          .setId(MOCK_UUID)
          .setType(MOCK_TYPE_FQN)
          .setEntityTypeId(MOCK_ET_UUID)
          .setName(MOCK_NAME)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .build();

        expect(entitySet).toEqual(jasmine.any(EntitySet));

        expect(entitySet.id).toBeDefined();
        expect(entitySet.id).toEqual(MOCK_UUID);

        expect(entitySet.type).toBeDefined();
        expect(entitySet.type).toEqual(MOCK_TYPE_FQN);

        expect(entitySet.entityTypeId).toBeDefined();
        expect(entitySet.entityTypeId).toEqual(MOCK_ET_UUID);

        expect(entitySet.name).toBeDefined();
        expect(entitySet.name).toEqual(MOCK_NAME);

        expect(entitySet.title).toBeDefined();
        expect(entitySet.title).toEqual(MOCK_TITLE);

        expect(entitySet.description).toBeDefined();
        expect(entitySet.description).toEqual(MOCK_DESCRIPTION);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid EntitySet object literal', () => {
        expect(isValid(MOCK_ES_OBJ)).toEqual(true);
      });

      it('should return true when given a valid EntitySet instance ', () => {
        expect(isValid(
          new EntitySet(
            MOCK_UUID, MOCK_TYPE_FQN, MOCK_ET_UUID, MOCK_NAME, MOCK_TITLE, MOCK_DESCRIPTION
          )
        )).toEqual(true);
      });

      it('should return true when given an EntitySet instance constructed by the builder', () => {

        const entitySet = (new EntitySetBuilder())
          .setId(MOCK_UUID)
          .setType(MOCK_TYPE_FQN)
          .setEntityTypeId(MOCK_ET_UUID)
          .setName(MOCK_NAME)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .build();

        expect(isValid(entitySet)).toEqual(true);
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

      it('should return false when given an EntitySet object literal with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_ES_OBJ, { id: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an EntitySet object literal with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ES_OBJ, { type: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an EntitySet object literal with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ES_OBJ, { entityTypeId: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an EntitySet object literal with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ES_OBJ, { name: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an EntitySet object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_ES_OBJ, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an EntitySet object literal with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_ES_OBJ, { description: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an EntitySet instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new EntitySet(
                invalidInput, MOCK_TYPE_FQN, MOCK_ET_UUID, MOCK_NAME, MOCK_TITLE, MOCK_DESCRIPTION
              )
            )).toEqual(false);
          }
        });
      });

      it('should return false when given an EntitySet instance with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_UUID, invalidInput, MOCK_ET_UUID, MOCK_NAME, MOCK_TITLE, MOCK_DESCRIPTION
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an EntitySet instance with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_UUID, MOCK_TYPE_FQN, invalidInput, MOCK_NAME, MOCK_TITLE, MOCK_DESCRIPTION
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an EntitySet instance with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_UUID, MOCK_TYPE_FQN, MOCK_ET_UUID, invalidInput, MOCK_TITLE, MOCK_DESCRIPTION
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an EntitySet instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new EntitySet(
              MOCK_UUID, MOCK_TYPE_FQN, MOCK_ET_UUID, MOCK_NAME, invalidInput, MOCK_DESCRIPTION
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an EntitySet instance with an invalid "description" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new EntitySet(
                MOCK_UUID, MOCK_TYPE_FQN, MOCK_ET_UUID, MOCK_NAME, MOCK_TITLE, invalidInput
              )
            )).toEqual(false);
          }
        });
      });

    });

  });

});
