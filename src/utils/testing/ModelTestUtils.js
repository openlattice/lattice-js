/*
 * @flow
 */

/* eslint-disable jest/no-identical-title, no-throw-literal */

import _has from 'lodash/has';
import _isArray from 'lodash/isArray';
import _isBoolean from 'lodash/isBoolean';
import _isEqual from 'lodash/isEqual';
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

function expectValidInstance(Model :Class<any>, mockInstance :Object, instance :any) {

  expect(instance).toBeInstanceOf(Model);

  Object.keys(mockInstance).forEach((key) => {
    expect(instance[key]).toBeDefined();
    expect(instance[key]).toEqual(mockInstance[key]);
  });
}

function testBuilderConstructor(
  Model :Class<any>,
  ModelBuilder :Class<any>,
  mockInstance :Object,
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

function testBuilderBuild(
  Model :Class<any>,
  ModelBuilder :Class<any>,
  mockInstance :Object,
  setters :{ optional ?:Object; required ?:Object; },
) {

  // const emptySetters = setters.empty || {};
  const optionalSetters = setters.optional || {};
  const requiredSetters = setters.required || {};

  const givenSetFunctions = [
    ...Object.keys(optionalSetters),
    ...Object.keys(requiredSetters),
  ].sort();
  const protoSetFunctions = Object
    .getOwnPropertyNames(ModelBuilder.prototype)
    .filter((value) => value.startsWith('set'))
    .sort();

  // console.log('givenSetFunctions', givenSetFunctions);
  // console.log('protoSetFunctions', protoSetFunctions);

  if (!_isEqual(givenSetFunctions, protoSetFunctions)) {
    throw new Error('missing set functions');
  }

  test('should throw when a required property has not been set', () => {
    if (Object.keys(requiredSetters).length > 0) {
      expect(() => {
        (new ModelBuilder()).build();
      }).toThrow();
    }
    Object.keys(requiredSetters).forEach((reqSetFunction1) => {
      const builder = new ModelBuilder();
      // invoke all optional setters
      Object.keys(optionalSetters).forEach((optSetFunction) => {
        // console.log('invoking optional setter', optSetFunction);
        builder[optSetFunction](optionalSetters[optSetFunction]);
      });
      // invoke all required setters, except this one
      Object.keys(requiredSetters).forEach((reqSetFunction2) => {
        if (reqSetFunction1 !== reqSetFunction2) {
          // console.log('invoking required setter', reqSetFunction2);
          builder[reqSetFunction2](requiredSetters[reqSetFunction2]);
        }
      });
      expect(() => {
        builder.build();
      }).toThrow();
    });
  });

  test('should not throw when an optional property has not been set', () => {
    Object.keys(optionalSetters).forEach((optSetFunction1) => {
      const builder = new ModelBuilder();
      // invoke all required setters
      Object.keys(requiredSetters).forEach((reqSetFunction) => {
        // console.log('invoking required setter', reqSetFunction);
        builder[reqSetFunction](requiredSetters[reqSetFunction]);
      });
      // invoke all optional setters, except this one
      Object.keys(optionalSetters).forEach((optSetFunction2) => {
        if (optSetFunction1 !== optSetFunction2) {
          // console.log('invoking optional setter', optSetFunction2);
          builder[optSetFunction2](optionalSetters[optSetFunction2]);
        }
      });
      expect(() => {
        builder.build();
      }).not.toThrow();
    });
  });

  // test('should set required properties that are allowed to be empty', () => {});

  test('should return a valid instance', () => {

    const builder = new ModelBuilder();
    Object.keys(requiredSetters).forEach((reqSetFunction) => {
      builder[reqSetFunction](requiredSetters[reqSetFunction]);
    });
    Object.keys(optionalSetters).forEach((optSetFunction2) => {
      builder[optSetFunction2](optionalSetters[optSetFunction2]);
    });

    expectValidInstance(Model, mockInstance, builder.build());
  });
}

function testBuilderSet(
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

function testBuilderSetType(
  Builder :Class<any>,
  setFunction :Function,
  types :Object,
  isOptional :boolean = false,
) {

  if (!_isPlainObject(types)) {
    throw new Error('"types" should be an enum object');
  }

  const validParams = [...Object.values(types)];
  testBuilderSet(Builder, setFunction, validParams, isOptional);
}

function testBuilderSetTypes(
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
  testBuilderSet(Builder, setFunction, validParams, isOptional);
}

export {
  testBuilderBuild,
  testBuilderConstructor,
  testBuilderSet,
  testBuilderSetType,
  testBuilderSetTypes,
};
