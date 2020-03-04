import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_APP_TYPE,
  MOCK_APP_TYPE_OBJECT,
  AppType,
  AppTypeBuilder,
  genRandomAppType,
  isValidAppType as isValid,
} from './AppType';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

function expectValidInstance(value) {

  expect(value).toBeInstanceOf(AppType);

  expect(value.description).toBeDefined();
  expect(value.entityTypeId).toBeDefined();
  expect(value.id).toBeDefined();
  expect(value.title).toBeDefined();
  expect(value.type).toBeDefined();

  expect(value.description).toEqual(MOCK_APP_TYPE.description);
  expect(value.entityTypeId).toEqual(MOCK_APP_TYPE.entityTypeId);
  expect(value.id).toEqual(MOCK_APP_TYPE.id);
  expect(value.title).toEqual(MOCK_APP_TYPE.title);
  expect(value.type).toEqual(MOCK_APP_TYPE.type);
}

describe('AppType', () => {

  describe('AppTypeBuilder', () => {

    describe('constructor()', () => {

      test('should construct given an instance', () => {
        expectValidInstance(
          (new AppTypeBuilder(MOCK_APP_TYPE)).build()
        );
      });

      test('should construct given an object literal', () => {
        expectValidInstance(
          (new AppTypeBuilder({ ...MOCK_APP_TYPE })).build()
        );
        expectValidInstance(
          (new AppTypeBuilder(MOCK_APP_TYPE_OBJECT)).build()
        );
      });

      test('should construct given an immutable object', () => {
        expectValidInstance(
          (new AppTypeBuilder(MOCK_APP_TYPE.toImmutable())).build()
        );
        expectValidInstance(
          (new AppTypeBuilder(fromJS({ ...MOCK_APP_TYPE }))).build()
        );
        expectValidInstance(
          (new AppTypeBuilder(fromJS(MOCK_APP_TYPE_OBJECT))).build()
        );
      });

    });

    describe('setDescription()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(() => {
            (new AppTypeBuilder()).setDescription(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AppTypeBuilder()).setDescription();
        }).not.toThrow();
        expect(() => {
          (new AppTypeBuilder()).setDescription('');
        }).not.toThrow();
        expect(() => {
          (new AppTypeBuilder()).setDescription(MOCK_APP_TYPE.description);
        }).not.toThrow();
      });

    });

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            (new AppTypeBuilder()).setId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AppTypeBuilder()).setId();
        }).not.toThrow();
        expect(() => {
          (new AppTypeBuilder()).setId('');
        }).not.toThrow();
        expect(() => {
          (new AppTypeBuilder()).setId(MOCK_APP_TYPE.id);
        }).not.toThrow();
      });

    });

    describe('setEntityTypeId()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new AppTypeBuilder()).setEntityTypeId();
        }).toThrow();
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new AppTypeBuilder()).setEntityTypeId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AppTypeBuilder()).setEntityTypeId(MOCK_APP_TYPE.entityTypeId);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new AppTypeBuilder()).setTitle();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new AppTypeBuilder()).setTitle(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AppTypeBuilder()).setTitle(MOCK_APP_TYPE.title);
        }).not.toThrow();
      });

    });

    describe('setType()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new AppTypeBuilder()).setType();
        }).toThrow();
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new AppTypeBuilder()).setType(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AppTypeBuilder()).setType(MOCK_APP_TYPE_OBJECT.type);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new AppTypeBuilder()).build();
        }).toThrow();

        expect(() => {
          // omitting setEntityTypeId()
          (new AppTypeBuilder())
            .setDescription(MOCK_APP_TYPE.description)
            .setId(MOCK_APP_TYPE.id)
            .setTitle(MOCK_APP_TYPE.title)
            .setType(MOCK_APP_TYPE.type)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setTitle()
          (new AppTypeBuilder())
            .setDescription(MOCK_APP_TYPE.description)
            .setEntityTypeId(MOCK_APP_TYPE.entityTypeId)
            .setId(MOCK_APP_TYPE.id)
            .setType(MOCK_APP_TYPE.type)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setType()
          (new AppTypeBuilder())
            .setDescription(MOCK_APP_TYPE.description)
            .setEntityTypeId(MOCK_APP_TYPE.entityTypeId)
            .setId(MOCK_APP_TYPE.id)
            .setTitle(MOCK_APP_TYPE.title)
            .build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          // omitting setDescription()
          (new AppTypeBuilder())
            .setEntityTypeId(MOCK_APP_TYPE.entityTypeId)
            .setId(MOCK_APP_TYPE.id)
            .setTitle(MOCK_APP_TYPE.title)
            .setType(MOCK_APP_TYPE.type)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setId()
          (new AppTypeBuilder())
            .setDescription(MOCK_APP_TYPE.description)
            .setEntityTypeId(MOCK_APP_TYPE.entityTypeId)
            .setTitle(MOCK_APP_TYPE.title)
            .setType(MOCK_APP_TYPE.type)
            .build();
        }).not.toThrow();
      });

      test('should return a valid instance', () => {

        const appType = (new AppTypeBuilder())
          .setDescription(MOCK_APP_TYPE.description)
          .setEntityTypeId(MOCK_APP_TYPE.entityTypeId)
          .setId(MOCK_APP_TYPE.id)
          .setTitle(MOCK_APP_TYPE.title)
          .setType(MOCK_APP_TYPE.type)
          .build();

        expectValidInstance(appType);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_APP_TYPE_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_APP_TYPE)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_APP_TYPE_OBJECT, description: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_APP_TYPE_OBJECT, entityTypeId: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_APP_TYPE_OBJECT, id: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_APP_TYPE_OBJECT, title: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_APP_TYPE_OBJECT, type: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new AppType({
              description: invalidInput,
              entityTypeId: MOCK_APP_TYPE.entityTypeId,
              id: MOCK_APP_TYPE.id,
              title: MOCK_APP_TYPE.title,
              type: MOCK_APP_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entityTypeId" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new AppType({
              description: MOCK_APP_TYPE.description,
              entityTypeId: invalidInput,
              id: MOCK_APP_TYPE.id,
              title: MOCK_APP_TYPE.title,
              type: MOCK_APP_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new AppType({
              description: MOCK_APP_TYPE.description,
              entityTypeId: MOCK_APP_TYPE.entityTypeId,
              id: invalidInput,
              title: MOCK_APP_TYPE.title,
              type: MOCK_APP_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AppType({
              description: MOCK_APP_TYPE.description,
              entityTypeId: MOCK_APP_TYPE.entityTypeId,
              id: MOCK_APP_TYPE.id,
              title: invalidInput,
              type: MOCK_APP_TYPE.type,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "type" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new AppType({
              description: MOCK_APP_TYPE.description,
              entityTypeId: MOCK_APP_TYPE.entityTypeId,
              id: MOCK_APP_TYPE.id,
              title: MOCK_APP_TYPE.title,
              type: invalidInput,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_APP_TYPE.valueOf()).toEqual(
        fromJS({
          description: MOCK_APP_TYPE.description,
          entityTypeId: MOCK_APP_TYPE.entityTypeId,
          id: MOCK_APP_TYPE.id,
          title: MOCK_APP_TYPE.title,
          type: MOCK_APP_TYPE.type.toObject(),
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomAppType = genRandomAppType();
      const app0 = new AppType({ ...MOCK_APP_TYPE });
      const app1 = new AppType({ ...MOCK_APP_TYPE });

      const testSet = Set()
        .add(app0)
        .add(randomAppType)
        .add(app1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().description).toEqual(MOCK_APP_TYPE.description);
      expect(testSet.first().entityTypeId).toEqual(MOCK_APP_TYPE.entityTypeId);
      expect(testSet.first().id).toEqual(MOCK_APP_TYPE.id);
      expect(testSet.first().title).toEqual(MOCK_APP_TYPE.title);
      expect(testSet.first().type).toEqual(MOCK_APP_TYPE.type);

      expect(testSet.last().description).toEqual(randomAppType.description);
      expect(testSet.last().entityTypeId).toEqual(randomAppType.entityTypeId);
      expect(testSet.last().id).toEqual(randomAppType.id);
      expect(testSet.last().title).toEqual(randomAppType.title);
      expect(testSet.last().type).toEqual(randomAppType.type);
    });

    test('Immutable.Map', () => {

      const randomAppType = genRandomAppType();
      const app0 = new AppType({ ...MOCK_APP_TYPE });
      const app1 = new AppType({ ...MOCK_APP_TYPE });

      const testMap = Map()
        .set(app0, 'test_value_1')
        .set(randomAppType, 'test_value_2')
        .set(app1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(app0)).toEqual('test_value_3');
      expect(testMap.get(randomAppType)).toEqual('test_value_2');
      expect(testMap.get(app1)).toEqual('test_value_3');
    });

  });

});
