import DataSource, {
  DataSourceBuilder,
  isValid
} from '../../src/models/DataSource';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED
} from '../constants/TestConstants';

const MOCK_DS_UUID :string = '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e';
const MOCK_TITLE :string = 'title';
const MOCK_DESCRIPTION :string = 'description';
const MOCK_ES_IDS :string[] = [
  'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
  'fae6af98-2675-45bd-9a5b-1619a87235a8'
];

const MOCK_DS_OBJ :Object = {
  id: MOCK_DS_UUID,
  title: MOCK_TITLE,
  description: MOCK_DESCRIPTION,
  entitySetIds: MOCK_ES_IDS
};

const INVALID_PARAMS_DESCRIPTION :any[] = INVALID_PARAMS_EMPTY_STRING_ALLOWED.slice(0);
INVALID_PARAMS_DESCRIPTION.splice(1, 1); // remove "null"
INVALID_PARAMS_DESCRIPTION.splice(0, 1); // remove "undefined"

describe('DataSource', () => {

  describe('DataSourceBuilder', () => {

    let builder :DataSourceBuilder = null;

    beforeEach(() => {
      builder = new DataSourceBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setId()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
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
          builder.setId(MOCK_DS_UUID);
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
          builder.setTitle(MOCK_TITLE);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_DESCRIPTION.forEach((invalidInput) => {
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
          builder.setDescription(MOCK_DESCRIPTION);
        }).not.toThrow();
      });

    });

    describe('setEntitySetIds()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntitySetIds(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setEntitySetIds([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntitySetIds([...MOCK_ES_IDS, invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setEntitySetIds();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setEntitySetIds(MOCK_ES_IDS);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new DataSourceBuilder())
            .setTitle(MOCK_TITLE)
            .setEntitySetIds(MOCK_ES_IDS)
            .build();
        }).toThrow();

        expect(() => {
          (new DataSourceBuilder())
            .setId(MOCK_DS_UUID)
            .setEntitySetIds(MOCK_ES_IDS)
            .build();
        }).toThrow();

        expect(() => {
          (new DataSourceBuilder())
            .setId(MOCK_DS_UUID)
            .setTitle(MOCK_TITLE)
            .build();
        }).toThrow();
      });

      it('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new DataSourceBuilder())
            .setId(MOCK_DS_UUID)
            .setTitle(MOCK_TITLE)
            .setEntitySetIds(MOCK_ES_IDS)
            .build();
        }).not.toThrow();
      });

      it('should return a valid instance', () => {

        const dataSource = builder
          .setId(MOCK_DS_UUID)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .setEntitySetIds(MOCK_ES_IDS)
          .build();

        expect(dataSource).toEqual(jasmine.any(DataSource));

        expect(dataSource.id).toBeDefined();
        expect(dataSource.id).toEqual(MOCK_DS_UUID);

        expect(dataSource.title).toBeDefined();
        expect(dataSource.title).toEqual(MOCK_TITLE);

        expect(dataSource.description).toBeDefined();
        expect(dataSource.description).toEqual(MOCK_DESCRIPTION);

        expect(dataSource.entitySetIds).toBeDefined();
        expect(dataSource.entitySetIds).toEqual(MOCK_ES_IDS);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_DS_OBJ)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new DataSource(
            MOCK_DS_UUID, MOCK_TITLE, MOCK_DESCRIPTION, MOCK_ES_IDS
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const dataSource = (new DataSourceBuilder())
          .setId(MOCK_DS_UUID)
          .setTitle(MOCK_TITLE)
          .setDescription(MOCK_DESCRIPTION)
          .setEntitySetIds(MOCK_ES_IDS)
          .build();

        expect(isValid(dataSource)).toEqual(true);
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
          expect(isValid(Object.assign({}, MOCK_DS_OBJ, { id: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_DS_OBJ, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_DESCRIPTION.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_DS_OBJ, { description: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "entitySetIds" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_DS_OBJ, { entitySetIds: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_DS_OBJ, { entitySetIds: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new DataSource(
              invalidInput, MOCK_TITLE, MOCK_DESCRIPTION, MOCK_ES_IDS
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new DataSource(
              MOCK_DS_UUID, invalidInput, MOCK_DESCRIPTION, MOCK_ES_IDS
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_DESCRIPTION.forEach((invalidInput) => {
          expect(isValid(
            new DataSource(
              MOCK_DS_UUID, MOCK_TITLE, invalidInput, MOCK_ES_IDS
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "entitySetIds" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new DataSource(
              MOCK_DS_UUID, MOCK_TITLE, MOCK_DESCRIPTION, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new DataSource(
              MOCK_DS_UUID, MOCK_TITLE, MOCK_DESCRIPTION, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
