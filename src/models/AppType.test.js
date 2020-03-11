/*
 * @flow
 */

import { Map, Set, fromJS } from 'immutable';

import {
  AppType,
  AppTypeBuilder,
  MOCK_APP_TYPE,
  MOCK_APP_TYPE_OBJECT,
  genRandomAppType,
  isValidAppType as isValid,
} from './AppType';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_SS,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';
import {
  testBuilderBuild,
  testBuilderConstructor,
  testBuilderSet,
} from '../utils/testing/ModelTestUtils';

describe('AppType', () => {

  describe('AppTypeBuilder', () => {

    describe('constructor()', () => {
      testBuilderConstructor(AppType, AppTypeBuilder, MOCK_APP_TYPE);
    });

    describe('setDescription()', () => {
      const validParams = [MOCK_APP_TYPE.description];
      testBuilderSet(AppTypeBuilder, 'setDescription', validParams, true);
    });

    describe('setEntityTypeId()', () => {
      const validParams = [MOCK_APP_TYPE.entityTypeId];
      testBuilderSet(AppTypeBuilder, 'setEntityTypeId', validParams);
    });

    describe('setId()', () => {
      const validParams = [MOCK_APP_TYPE.id];
      testBuilderSet(AppTypeBuilder, 'setId', validParams, true);
    });

    describe('setTitle()', () => {
      const validParams = [MOCK_APP_TYPE.title];
      testBuilderSet(AppTypeBuilder, 'setTitle', validParams);
    });

    describe('setType()', () => {
      const validParams = [MOCK_APP_TYPE.type];
      testBuilderSet(AppTypeBuilder, 'setType', validParams);
    });

    describe('build()', () => {
      testBuilderBuild(AppType, AppTypeBuilder, MOCK_APP_TYPE, {
        optional: {
          setDescription: MOCK_APP_TYPE.description,
          setId: MOCK_APP_TYPE.id,
        },
        required: {
          setEntityTypeId: MOCK_APP_TYPE.entityTypeId,
          setTitle: MOCK_APP_TYPE.title,
          setType: MOCK_APP_TYPE.type,
        },
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
      const app0 = (new AppTypeBuilder(MOCK_APP_TYPE)).build();
      const app1 = (new AppTypeBuilder(MOCK_APP_TYPE)).build();

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
      const app0 = (new AppTypeBuilder(MOCK_APP_TYPE)).build();
      const app1 = (new AppTypeBuilder(MOCK_APP_TYPE)).build();

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
