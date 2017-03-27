import DataSource, {
  DataSourceBuilder,
  isValid
} from '../../src/models/DataSource';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

import {
  MOCK_DATA_SOURCE_DM
} from '../constants/MockDataModels';

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
          builder.setId(MOCK_DATA_SOURCE_DM.id);
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
          builder.setTitle(MOCK_DATA_SOURCE_DM.title);
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
          builder.setDescription(MOCK_DATA_SOURCE_DM.description);
        }).not.toThrow();
      });

    });

    describe('setEntitySetIds()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntitySetIds(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setEntitySetIds([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntitySetIds([...MOCK_DATA_SOURCE_DM.entitySetIds, invalidInput]);
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
          builder.setEntitySetIds(MOCK_DATA_SOURCE_DM.entitySetIds);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new DataSourceBuilder())
            .setTitle(MOCK_DATA_SOURCE_DM.title)
            .setEntitySetIds(MOCK_DATA_SOURCE_DM.entitySetIds)
            .build();
        }).toThrow();

        expect(() => {
          (new DataSourceBuilder())
            .setId(MOCK_DATA_SOURCE_DM.id)
            .setEntitySetIds(MOCK_DATA_SOURCE_DM.entitySetIds)
            .build();
        }).toThrow();

        expect(() => {
          (new DataSourceBuilder())
            .setId(MOCK_DATA_SOURCE_DM.id)
            .setTitle(MOCK_DATA_SOURCE_DM.title)
            .build();
        }).toThrow();
      });

      it('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new DataSourceBuilder())
            .setId(MOCK_DATA_SOURCE_DM.id)
            .setTitle(MOCK_DATA_SOURCE_DM.title)
            .setEntitySetIds(MOCK_DATA_SOURCE_DM.entitySetIds)
            .build();
        }).not.toThrow();
      });

      it('should return a valid instance', () => {

        const dataSource = builder
          .setId(MOCK_DATA_SOURCE_DM.id)
          .setTitle(MOCK_DATA_SOURCE_DM.title)
          .setDescription(MOCK_DATA_SOURCE_DM.description)
          .setEntitySetIds(MOCK_DATA_SOURCE_DM.entitySetIds)
          .build();

        expect(dataSource).toEqual(jasmine.any(DataSource));

        expect(dataSource.id).toBeDefined();
        expect(dataSource.id).toEqual(MOCK_DATA_SOURCE_DM.id);

        expect(dataSource.title).toBeDefined();
        expect(dataSource.title).toEqual(MOCK_DATA_SOURCE_DM.title);

        expect(dataSource.description).toBeDefined();
        expect(dataSource.description).toEqual(MOCK_DATA_SOURCE_DM.description);

        expect(dataSource.entitySetIds).toBeDefined();
        expect(dataSource.entitySetIds).toEqual(MOCK_DATA_SOURCE_DM.entitySetIds);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_DATA_SOURCE_DM)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new DataSource(
            MOCK_DATA_SOURCE_DM.id,
            MOCK_DATA_SOURCE_DM.title,
            MOCK_DATA_SOURCE_DM.description,
            MOCK_DATA_SOURCE_DM.entitySetIds
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const dataSource = (new DataSourceBuilder())
          .setId(MOCK_DATA_SOURCE_DM.id)
          .setTitle(MOCK_DATA_SOURCE_DM.title)
          .setDescription(MOCK_DATA_SOURCE_DM.description)
          .setEntitySetIds(MOCK_DATA_SOURCE_DM.entitySetIds)
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
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_DATA_SOURCE_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_DATA_SOURCE_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_DATA_SOURCE_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "entitySetIds" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_DATA_SOURCE_DM, { entitySetIds: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_DATA_SOURCE_DM, { entitySetIds: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new DataSource(
              invalidInput,
              MOCK_DATA_SOURCE_DM.title,
              MOCK_DATA_SOURCE_DM.description,
              MOCK_DATA_SOURCE_DM.entitySetIds
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new DataSource(
              MOCK_DATA_SOURCE_DM.id,
              invalidInput,
              MOCK_DATA_SOURCE_DM.description,
              MOCK_DATA_SOURCE_DM.entitySetIds
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new DataSource(
              MOCK_DATA_SOURCE_DM.id,
              MOCK_DATA_SOURCE_DM.title,
              invalidInput,
              MOCK_DATA_SOURCE_DM.entitySetIds
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "entitySetIds" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new DataSource(
              MOCK_DATA_SOURCE_DM.id,
              MOCK_DATA_SOURCE_DM.title,
              MOCK_DATA_SOURCE_DM.description,
              invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new DataSource(
              MOCK_DATA_SOURCE_DM.id,
              MOCK_DATA_SOURCE_DM.title,
              MOCK_DATA_SOURCE_DM.description,
              [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
