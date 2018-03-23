import AppType, { AppTypeBuilder, isValid } from './AppType';
import { MOCK_APP_TYPE_DM } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_SS,
  INVALID_PARAMS_EMPTY_STRING_ALLOWED,
  INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED
} from '../utils/testing/Invalid';

describe('AppType', () => {

  describe('AppTypeBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new AppTypeBuilder();
    });

    afterEach(() => {
      builder = null;
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
          builder.setTitle(MOCK_APP_TYPE_DM.title);
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
          builder.setDescription(MOCK_APP_TYPE_DM.description);
        }).not.toThrow();
      });

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
          builder.setId(MOCK_APP_TYPE_DM.id);
        }).not.toThrow();
      });

    });

    describe('setEntityTypeId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntityTypeId(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setEntityTypeId();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setEntityTypeId(MOCK_APP_TYPE_DM.entityTypeId);
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
          builder.setType(MOCK_APP_TYPE_DM.type);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new AppTypeBuilder())
            .setTitle(MOCK_APP_TYPE_DM.title)
            .setType(MOCK_APP_TYPE_DM.type)
            .build();
        }).toThrow();

        expect(() => {
          (new AppTypeBuilder())
            .setEntityTypeId(MOCK_APP_TYPE_DM.entityTypeId)
            .setType(MOCK_APP_TYPE_DM.type)
            .build();
        }).toThrow();

        expect(() => {
          (new AppTypeBuilder())
            .setEntityTypeId(MOCK_APP_TYPE_DM.entityTypeId)
            .setTitle(MOCK_APP_TYPE_DM.title)
            .build();
        }).toThrow();

        expect(() => {
          (new AppTypeBuilder()).build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new AppTypeBuilder())
            .setType(MOCK_APP_TYPE_DM.type)
            .setTitle(MOCK_APP_TYPE_DM.title)
            .setDescription(MOCK_APP_TYPE_DM.description)
            .setEntityTypeId(MOCK_APP_TYPE_DM.entityTypeId)
            .build();
        }).not.toThrow();

        expect(() => {
          (new AppTypeBuilder())
            .setId(MOCK_APP_TYPE_DM.id)
            .setType(MOCK_APP_TYPE_DM.type)
            .setEntityTypeId(MOCK_APP_TYPE_DM.entityTypeId)
            .setTitle(MOCK_APP_TYPE_DM.title)
            .build();
        }).not.toThrow();
      });

      test('should return a valid instance', () => {

        const appType = builder
          .setTitle(MOCK_APP_TYPE_DM.title)
          .setDescription(MOCK_APP_TYPE_DM.description)
          .setId(MOCK_APP_TYPE_DM.id)
          .setEntityTypeId(MOCK_APP_TYPE_DM.entityTypeId)
          .setType(MOCK_APP_TYPE_DM.type)
          .build();

        expect(appType).toBeInstanceOf(AppType);

        expect(appType.title).toBeDefined();
        expect(appType.title).toEqual(MOCK_APP_TYPE_DM.title);

        expect(appType.description).toBeDefined();
        expect(appType.description).toEqual(MOCK_APP_TYPE_DM.description);

        expect(appType.id).toBeDefined();
        expect(appType.id).toEqual(MOCK_APP_TYPE_DM.id);

        expect(appType.entityTypeId).toBeDefined();
        expect(appType.entityTypeId).toEqual(MOCK_APP_TYPE_DM.entityTypeId);

        expect(appType.type).toBeDefined();
        expect(appType.type).toEqual(MOCK_APP_TYPE_DM.type);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_APP_TYPE_DM)).toEqual(true);
      });

      test('should return true when given a valid object instance', () => {
        expect(isValid(
          new AppType(
            MOCK_APP_TYPE_DM.description,
            MOCK_APP_TYPE_DM.entityTypeId,
            MOCK_APP_TYPE_DM.id,
            MOCK_APP_TYPE_DM.title,
            MOCK_APP_TYPE_DM.type
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const appType = (new AppTypeBuilder())
          .setTitle(MOCK_APP_TYPE_DM.title)
          .setDescription(MOCK_APP_TYPE_DM.description)
          .setId(MOCK_APP_TYPE_DM.id)
          .setEntityTypeId(MOCK_APP_TYPE_DM.entityTypeId)
          .setType(MOCK_APP_TYPE_DM.type)
          .build();

        expect(isValid(appType)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_APP_TYPE_DM, { title: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_APP_TYPE_DM, { description: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_APP_TYPE_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_APP_TYPE_DM, { entityTypeId: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_APP_TYPE_DM, { type: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new AppType(
              invalidInput,
              MOCK_APP_TYPE_DM.entityTypeId,
              MOCK_APP_TYPE_DM.id,
              MOCK_APP_TYPE_DM.title,
              MOCK_APP_TYPE_DM.type
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AppType(
              MOCK_APP_TYPE_DM.description,
              invalidInput,
              MOCK_APP_TYPE_DM.id,
              MOCK_APP_TYPE_DM.title,
              MOCK_APP_TYPE_DM.type
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_SS_EMPTY_STRING_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new AppType(
              MOCK_APP_TYPE_DM.description,
              MOCK_APP_TYPE_DM.entityTypeId,
              invalidInput,
              MOCK_APP_TYPE_DM.title,
              MOCK_APP_TYPE_DM.type
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AppType(
              MOCK_APP_TYPE_DM.description,
              MOCK_APP_TYPE_DM.entityTypeId,
              MOCK_APP_TYPE_DM.id,
              invalidInput,
              MOCK_APP_TYPE_DM.type
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AppType(
              MOCK_APP_TYPE_DM.description,
              MOCK_APP_TYPE_DM.entityTypeId,
              MOCK_APP_TYPE_DM.id,
              MOCK_APP_TYPE_DM.title,
              invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
