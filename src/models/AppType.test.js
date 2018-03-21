import AppType, { AppTypeBuilder, isValid } from './AppType';
import { MOCK_APP_TYPE_DM } from '../utils/testing/MockDataModels';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_SS
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
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setDescription(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setDescription();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setDescription(MOCK_APP_TYPE_DM.description);
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
          (new AppTypeBuilder()).build();
        }).toThrow();
      });

      // test('should not throw when an optional property has not been set', () => {
      //
      //   expect(() => {
      //     (new AppTypeBuilder())
      //       .setName(MOCK_APP_TYPE_DM.name)
      //       .setTitle(MOCK_APP_TYPE_DM.title)
      //       .setDescription(MOCK_APP_TYPE_DM.description)
      //       .setAppTypeTypeIds(MOCK_APP_TYPE_DM.appTypeIds)
      //       .setUrl(MOCK_APP_TYPE_DM.url)
      //       .build();
      //   }).not.toThrow();

      // expect(() => {
      //   (new AppTypeBuilder())
      //     .setName(MOCK_APP_TYPE_DM.name)
      //       .setTitle(MOCK_APP_TYPE_DM.title)
      //       .setDescription(MOCK_APP_TYPE_DM.description)
      //       .setAppTypeTypeIds(MOCK_APP_TYPE_DM.appTypeIds)
      //       .setUrl(MOCK_APP_TYPE_DM.url)
      //     .build();
      // }).not.toThrow();
      // });

      // test('should set required properties that are allowed to be empty', () => {
      //
      //   const appType = builder
      //     .setName(MOCK_APP_TYPE_DM.name)
      //     .setAppTypeTypeIds(MOCK_APP_TYPE_DM.appTypeIds)
      //     .build();
      //
      //   expect(appType.url).toEqual('');
      //   expect(appType.title).toEqual('');
      //   expect(appType.description).toEqual('');
      // });
      //
      test('should return a valid instance', () => {

        const appType = builder
          .setTitle(MOCK_APP_TYPE_DM.title)
          .setDescription(MOCK_APP_TYPE_DM.description)
          .setEntityTypeId(MOCK_APP_TYPE_DM.entityTypeId)
          .setType(MOCK_APP_TYPE_DM.type)
          .build();

        expect(appType).toBeInstanceOf(AppType);

        expect(appType.title).toBeDefined();
        expect(appType.title).toEqual(MOCK_APP_TYPE_DM.title);

        expect(appType.description).toBeDefined();
        expect(appType.description).toEqual(MOCK_APP_TYPE_DM.description);

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
            MOCK_APP_TYPE_DM.title,
            MOCK_APP_TYPE_DM.type
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const appType = (new AppTypeBuilder())
          .setTitle(MOCK_APP_TYPE_DM.title)
          .setDescription(MOCK_APP_TYPE_DM.description)
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
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_APP_TYPE_DM, { description: invalidInput }))).toEqual(false);
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
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AppType(
              invalidInput,
              MOCK_APP_TYPE_DM.entityTypeId,
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
              MOCK_APP_TYPE_DM.title,
              invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
