import { Map, Set, fromJS } from 'immutable';

import {
  App,
  AppBuilder,
  MOCK_APP,
  MOCK_APP_OBJECT,
  genRandomApp,
  isValidApp as isValid,
} from './App';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
} from '../utils/testing/Invalid';
import {
  testBuilderBuild,
  testBuilderConstructor,
  testBuilderSet,
} from '../utils/testing/ModelTestUtils';

describe('App', () => {

  describe('AppBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(App, AppBuilder, MOCK_APP);
    });

    describe('setAppTypeIds()', () => {
      const validParams = [MOCK_APP.appTypeIds];
      testBuilderSet(AppBuilder, 'setAppTypeIds', validParams, true);
    });

    describe('setDescription()', () => {
      const validParams = [MOCK_APP.description];
      testBuilderSet(AppBuilder, 'setDescription', validParams, true);
    });

    describe('setId()', () => {
      const validParams = [MOCK_APP.id];
      testBuilderSet(AppBuilder, 'setId', validParams, true);
    });

    describe('setName()', () => {
      const validParams = [MOCK_APP.name];
      testBuilderSet(AppBuilder, 'setName', validParams);
    });

    describe('setTitle()', () => {
      const validParams = [MOCK_APP.title];
      testBuilderSet(AppBuilder, 'setTitle', validParams);
    });

    describe('setUrl()', () => {
      const validParams = [MOCK_APP.url];
      testBuilderSet(AppBuilder, 'setUrl', validParams);
    });

    describe('build()', () => {

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

      testBuilderBuild(App, AppBuilder, MOCK_APP, {
        optional: {
          setAppTypeIds: MOCK_APP.appTypeIds,
          setDescription: MOCK_APP.description,
          setId: MOCK_APP.id,
        },
        required: {
          setName: MOCK_APP.name,
          setTitle: MOCK_APP.title,
          setUrl: MOCK_APP.url,
        },
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
      const app0 = (new AppBuilder(MOCK_APP)).build();
      const app1 = (new AppBuilder(MOCK_APP)).build();

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
      const app0 = (new AppBuilder(MOCK_APP)).build();
      const app1 = (new AppBuilder(MOCK_APP)).build();

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
