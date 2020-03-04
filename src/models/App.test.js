import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_APP,
  MOCK_APP_OBJECT,
  App,
  AppBuilder,
  genRandomApp,
  isValidApp as isValid,
} from './App';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
} from '../utils/testing/Invalid';

function expectValidInstance(value) {

  expect(value).toBeInstanceOf(App);

  expect(value.appTypeIds).toBeDefined();
  expect(value.description).toBeDefined();
  expect(value.id).toBeDefined();
  expect(value.name).toBeDefined();
  expect(value.title).toBeDefined();
  expect(value.url).toBeDefined();

  expect(value.appTypeIds).toEqual(MOCK_APP.appTypeIds);
  expect(value.description).toEqual(MOCK_APP.description);
  expect(value.id).toEqual(MOCK_APP.id);
  expect(value.name).toEqual(MOCK_APP.name);
  expect(value.title).toEqual(MOCK_APP.title);
  expect(value.url).toEqual(MOCK_APP.url);
}

describe('App', () => {

  describe('AppBuilder', () => {

    describe('constructor()', () => {

      test('should construct given an instance', () => {
        expectValidInstance(
          (new AppBuilder(MOCK_APP)).build()
        );
      });

      test('should construct given an object literal', () => {
        expectValidInstance(
          (new AppBuilder({ ...MOCK_APP })).build()
        );
        expectValidInstance(
          (new AppBuilder(MOCK_APP_OBJECT)).build()
        );
      });

      test('should construct given an immutable object', () => {
        expectValidInstance(
          (new AppBuilder(MOCK_APP.toImmutable())).build()
        );
        expectValidInstance(
          (new AppBuilder(fromJS({ ...MOCK_APP }))).build()
        );
        expectValidInstance(
          (new AppBuilder(fromJS(MOCK_APP_OBJECT))).build()
        );
      });

    });

    describe('setAppTypeIds()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AppBuilder()).setAppTypeIds(invalidInput);
          }).toThrow();
          expect(() => {
            (new AppBuilder()).setAppTypeIds([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AppBuilder()).setAppTypeIds([...MOCK_APP.appTypeIds, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AppBuilder()).setAppTypeIds();
        }).not.toThrow();
        expect(() => {
          (new AppBuilder()).setAppTypeIds([]);
        }).not.toThrow();
        expect(() => {
          (new AppBuilder()).setAppTypeIds(MOCK_APP.appTypeIds);
        }).not.toThrow();
      });

    });

    describe('setDescription()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(() => {
            (new AppBuilder()).setDescription(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AppBuilder()).setDescription();
        }).not.toThrow();
        expect(() => {
          (new AppBuilder()).setDescription('');
        }).not.toThrow();
        expect(() => {
          (new AppBuilder()).setDescription(MOCK_APP.description);
        }).not.toThrow();
      });

    });

    describe('setId()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(() => {
            (new AppBuilder()).setId(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AppBuilder()).setId();
        }).not.toThrow();
        expect(() => {
          (new AppBuilder()).setId('');
        }).not.toThrow();
        expect(() => {
          (new AppBuilder()).setId(MOCK_APP.id);
        }).not.toThrow();
      });

    });

    describe('setName()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new AppBuilder()).setName();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new AppBuilder()).setName(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AppBuilder()).setName(MOCK_APP.name);
        }).not.toThrow();
      });

    });

    describe('setTitle()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new AppBuilder()).setTitle();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new AppBuilder()).setTitle(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AppBuilder()).setTitle(MOCK_APP.title);
        }).not.toThrow();
      });

    });

    describe('setUrl()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new AppBuilder()).setUrl();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new AppBuilder()).setUrl(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AppBuilder()).setUrl(MOCK_APP.url);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new AppBuilder()).build();
        }).toThrow();

        expect(() => {
          // omitting setName()
          (new AppBuilder())
            .setAppTypeIds(MOCK_APP.appTypeIds)
            .setDescription(MOCK_APP.description)
            .setId(MOCK_APP.id)
            .setTitle(MOCK_APP.title)
            .setUrl(MOCK_APP.url)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setTitle()
          (new AppBuilder())
            .setAppTypeIds(MOCK_APP.appTypeIds)
            .setDescription(MOCK_APP.description)
            .setId(MOCK_APP.id)
            .setName(MOCK_APP.name)
            .setUrl(MOCK_APP.url)
            .build();
        }).toThrow();

        expect(() => {
          // omitting setUrl()
          (new AppBuilder())
            .setAppTypeIds(MOCK_APP.appTypeIds)
            .setDescription(MOCK_APP.description)
            .setId(MOCK_APP.id)
            .setName(MOCK_APP.name)
            .setTitle(MOCK_APP.title)
            .build();
        }).toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        // omitting setAppTypeIds()
        const app = (new AppBuilder())
          .setDescription(MOCK_APP.description)
          .setId(MOCK_APP.id)
          .setName(MOCK_APP.name)
          .setTitle(MOCK_APP.title)
          .setUrl(MOCK_APP.url)
          .build();

        expect(app.appTypeIds).toEqual([]);
      });

      test('should not throw when an optional property has not been set', () => {

        expect(() => {
          // omitting setDescription()
          (new AppBuilder())
            .setAppTypeIds(MOCK_APP.appTypeIds)
            .setId(MOCK_APP.id)
            .setName(MOCK_APP.name)
            .setTitle(MOCK_APP.title)
            .setUrl(MOCK_APP.url)
            .build();
        }).not.toThrow();

        expect(() => {
          // omitting setId()
          (new AppBuilder())
            .setAppTypeIds(MOCK_APP.appTypeIds)
            .setDescription(MOCK_APP.description)
            .setName(MOCK_APP.name)
            .setTitle(MOCK_APP.title)
            .setUrl(MOCK_APP.url)
            .build();
        }).not.toThrow();
      });

      test('should return a valid instance', () => {

        const app = (new AppBuilder())
          .setAppTypeIds(MOCK_APP.appTypeIds)
          .setDescription(MOCK_APP.description)
          .setId(MOCK_APP.id)
          .setName(MOCK_APP.name)
          .setTitle(MOCK_APP.title)
          .setUrl(MOCK_APP.url)
          .build();

        expectValidInstance(app);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_APP_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_APP)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "appTypeIds" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_APP_OBJECT, appTypeIds: invalidInput })).toEqual(false);
          expect(isValid({ ...MOCK_APP_OBJECT, appTypeIds: [invalidInput] })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_APP_OBJECT, description: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_APP_OBJECT, id: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_APP_OBJECT, name: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_APP_OBJECT, title: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "url" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid({ ...MOCK_APP_OBJECT, url: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "appTypeIds" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new App({
              appTypeIds: invalidInput,
              description: MOCK_APP.description,
              id: MOCK_APP.id,
              name: MOCK_APP.name,
              title: MOCK_APP.title,
              url: MOCK_APP.url,
            })
          )).toEqual(false);
          expect(isValid(
            new App({
              appTypeIds: [invalidInput],
              description: MOCK_APP.description,
              id: MOCK_APP.id,
              name: MOCK_APP.name,
              title: MOCK_APP.title,
              url: MOCK_APP.url,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "description" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_STRING.forEach((invalidInput) => {
          expect(isValid(
            new App({
              appTypeIds: MOCK_APP.appTypeIds,
              description: invalidInput,
              id: MOCK_APP.id,
              name: MOCK_APP.name,
              title: MOCK_APP.title,
              url: MOCK_APP.url,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS.forEach((invalidInput) => {
          expect(isValid(
            new App({
              appTypeIds: MOCK_APP.appTypeIds,
              description: MOCK_APP.description,
              id: invalidInput,
              name: MOCK_APP.name,
              title: MOCK_APP.title,
              url: MOCK_APP.url,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "name" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new App({
              appTypeIds: MOCK_APP.appTypeIds,
              description: MOCK_APP.description,
              id: MOCK_APP.id,
              name: invalidInput,
              title: MOCK_APP.title,
              url: MOCK_APP.url,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "title" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new App({
              appTypeIds: MOCK_APP.appTypeIds,
              description: MOCK_APP.description,
              id: MOCK_APP.id,
              name: MOCK_APP.name,
              title: invalidInput,
              url: MOCK_APP.url,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "url" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new App({
              appTypeIds: MOCK_APP.appTypeIds,
              description: MOCK_APP.description,
              id: MOCK_APP.id,
              name: MOCK_APP.name,
              title: MOCK_APP.title,
              url: invalidInput,
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_APP.valueOf()).toEqual(
        fromJS({
          appTypeIds: MOCK_APP.appTypeIds,
          description: MOCK_APP.description,
          id: MOCK_APP.id,
          name: MOCK_APP.name,
          title: MOCK_APP.title,
          url: MOCK_APP.url,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomApp = genRandomApp();
      const app0 = new App({ ...MOCK_APP });
      const app1 = new App({ ...MOCK_APP });

      const testSet = Set()
        .add(app0)
        .add(randomApp)
        .add(app1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().appTypeIds).toEqual(MOCK_APP.appTypeIds);
      expect(testSet.first().description).toEqual(MOCK_APP.description);
      expect(testSet.first().id).toEqual(MOCK_APP.id);
      expect(testSet.first().name).toEqual(MOCK_APP.name);
      expect(testSet.first().title).toEqual(MOCK_APP.title);
      expect(testSet.first().url).toEqual(MOCK_APP.url);

      expect(testSet.last().appTypeIds).toEqual(randomApp.appTypeIds);
      expect(testSet.last().description).toEqual(randomApp.description);
      expect(testSet.last().id).toEqual(randomApp.id);
      expect(testSet.last().name).toEqual(randomApp.name);
      expect(testSet.last().title).toEqual(randomApp.title);
      expect(testSet.last().url).toEqual(randomApp.url);
    });

    test('Immutable.Map', () => {

      const randomApp = genRandomApp();
      const app0 = new App({ ...MOCK_APP });
      const app1 = new App({ ...MOCK_APP });

      const testMap = Map()
        .set(app0, 'test_value_1')
        .set(randomApp, 'test_value_2')
        .set(app1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(app0)).toEqual('test_value_3');
      expect(testMap.get(randomApp)).toEqual('test_value_2');
      expect(testMap.get(app1)).toEqual('test_value_3');
    });

  });

});
