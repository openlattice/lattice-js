/*
 * @flow
 */

/* eslint-disable jest/no-identical-title, no-throw-literal */

import _has from 'lodash/has';
import _isArray from 'lodash/isArray';
import _isBoolean from 'lodash/isBoolean';
import _isNumber from 'lodash/isNumber';
import _isPlainObject from 'lodash/isPlainObject';
import _isString from 'lodash/isString';
import { fromJS } from 'immutable';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_OPTIONAL,
  INVALID_PARAMS_OPTIONAL_ARRAY,
  INVALID_PARAMS_OPTIONAL_BOOLEAN,
  INVALID_PARAMS_OPTIONAL_NUMBER,
  INVALID_PARAMS_OPTIONAL_OBJECT,
  INVALID_PARAMS_OPTIONAL_SPECIAL_STRING,
  INVALID_PARAMS_OPTIONAL_STRING,
  INVALID_PARAMS_REQUIRED_BOOLEAN,
  INVALID_PARAMS_REQUIRED_NUMBER,
  INVALID_PARAMS_REQUIRED_STRING,
} from './InvalidParams';

import * as TheTypes from '../../constants/types';
import { isValidUUID } from '../ValidationUtils';

/*
 *
 * internal
 *
 */

function expectToThrowGivenInvalidParam(Builder :Class<any>, setFunction :Function, invalidParam :any) {

  expect(() => {
    (new Builder())[setFunction](invalidParam);
    throw `expected function to throw: ${setFunction}(${JSON.stringify(invalidParam)})`;
  }).toThrow(Error);
}

function isSpecialString(value :string) {

  if (!_isString(value)) {
    return false;
  }

  if (isValidUUID(value)) {
    return true;
  }

  return Object.keys(TheTypes).reduce((special, key) => special || _has(TheTypes[key], value), false);
}

/*
 *
 * external
 *
 */

function expectValidInstance(Model :Class<any>, mockInstance :Class<any>, instance :any) {

  expect(instance).toBeInstanceOf(Model);

  Object.keys(mockInstance).forEach((key) => {
    expect(instance[key]).toBeDefined();
    expect(instance[key]).toEqual(mockInstance[key]);
  });
}

function testBuilderConstructor(
  Model :Class<any>,
  ModelBuilder :Class<any>,
  mockInstance :Class<any>,
) {

  const mockObject = mockInstance.toObject();

  test('should construct given an instance', () => {
    expectValidInstance(
      Model,
      mockInstance,
      (new ModelBuilder(mockInstance)).build()
    );
  });

  test('should construct given an object literal', () => {
    expectValidInstance(
      Model,
      mockInstance,
      (new ModelBuilder({ ...mockInstance })).build()
    );
    expectValidInstance(
      Model,
      mockInstance,
      (new ModelBuilder(mockObject)).build()
    );
  });

  test('should construct given an immutable object', () => {
    expectValidInstance(
      Model,
      mockInstance,
      (new ModelBuilder(mockInstance.toImmutable())).build()
    );
    expectValidInstance(
      Model,
      mockInstance,
      (new ModelBuilder(fromJS({ ...mockInstance }))).build()
    );
    expectValidInstance(
      Model,
      mockInstance,
      (new ModelBuilder(fromJS(mockObject))).build()
    );
  });
}

function testBuilderSetter(
  Builder :Class<any>,
  setFunction :Function,
  validParams :Array<any>,
  isOptional :boolean = false,
) {

  let invalidParams = INVALID_PARAMS;
  let invalidParamsForArrayItems = [];

  // optional && allowed to be empty
  if (isOptional === true) {
    if (isSpecialString(validParams[0])) {
      invalidParams = INVALID_PARAMS_OPTIONAL_SPECIAL_STRING;
    }
    else if (_isString(validParams[0])) {
      invalidParams = INVALID_PARAMS_OPTIONAL_STRING;
    }
    else if (_isBoolean(validParams[0])) {
      invalidParams = INVALID_PARAMS_OPTIONAL_BOOLEAN;
    }
    else if (_isNumber(validParams[0])) {
      invalidParams = INVALID_PARAMS_OPTIONAL_NUMBER;
    }
    else if (_isArray(validParams[0])) {
      invalidParams = INVALID_PARAMS_OPTIONAL_ARRAY;
    }
    else if (_isPlainObject(validParams[0])) {
      invalidParams = INVALID_PARAMS_OPTIONAL_OBJECT;
    }
    else {
      invalidParams = INVALID_PARAMS_OPTIONAL;
    }
  }
  // required
  else if (_isString(validParams[0]) && !isSpecialString(validParams[0])) {
    invalidParams = INVALID_PARAMS_REQUIRED_STRING;
  }
  else if (_isBoolean(validParams[0])) {
    invalidParams = INVALID_PARAMS_REQUIRED_BOOLEAN;
  }

  if (_isArray(validParams[0])) {
    if (isSpecialString(validParams[0][0])) {
      invalidParamsForArrayItems = INVALID_PARAMS;
    }
    else if (_isString(validParams[0][0])) {
      invalidParamsForArrayItems = INVALID_PARAMS_REQUIRED_STRING;
    }
    else if (_isNumber(validParams[0][0])) {
      invalidParamsForArrayItems = INVALID_PARAMS_REQUIRED_NUMBER;
    }
    else {
      invalidParamsForArrayItems = INVALID_PARAMS;
    }
  }

  test('should throw when given invalid parameters', () => {
    invalidParams.forEach((invalidParam) => {
      expectToThrowGivenInvalidParam(Builder, setFunction, invalidParam);
    });
    if (invalidParamsForArrayItems.length) {
      invalidParamsForArrayItems.forEach((invalidParam) => {
        expectToThrowGivenInvalidParam(Builder, setFunction, [invalidParam]);
      });
    }
  });

  if (invalidParamsForArrayItems.length) {
    test('should throw when given a mix of valid and invalid parameters', () => {
      validParams.forEach((validParam) => {
        invalidParamsForArrayItems.forEach((invalidParam) => {
          expectToThrowGivenInvalidParam(Builder, setFunction, [...validParam, invalidParam]);
        });
      });
    });
  }

  test('should not throw when given valid parameters', () => {
    if (isOptional === true) {
      expect(() => {
        (new Builder())[setFunction]();
      }).not.toThrow();
      if (_isArray(validParams[0])) {
        expect(() => {
          (new Builder())[setFunction]([]);
        }).not.toThrow();
      }
      if (_isString(validParams[0])) {
        expect(() => {
          (new Builder())[setFunction]('');
        }).not.toThrow();
      }
    }
    validParams.forEach((validParam) => {
      expect(() => {
        (new Builder())[setFunction](validParam);
      }).not.toThrow();
    });
  });
}

function testBuilderSetterOfType(
  Builder :Class<any>,
  setFunction :Function,
  types :Object,
  isOptional :boolean = false,
) {

  if (!_isPlainObject(types)) {
    throw new Error('"types" should be an enum object');
  }

  const validParams = [...Object.values(types)];
  testBuilderSetter(Builder, setFunction, validParams, isOptional);
}

function testBuilderSetterOfTypes(
  Builder :Class<any>,
  setFunction :Function,
  types :Object,
  isOptional :boolean = false,
) {

  if (!_isPlainObject(types)) {
    throw new Error('"types" should be an enum object');
  }

  const validParams = [Object.values(types)];
  Object.values(types).forEach((type) => validParams.push([type]));
  testBuilderSetter(Builder, setFunction, validParams, isOptional);
}

export {
  testBuilderConstructor,
  testBuilderSetter,
  testBuilderSetterOfType,
  testBuilderSetterOfTypes,
};
