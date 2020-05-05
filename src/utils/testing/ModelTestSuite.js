/*
 * @flow
 */

/* eslint-disable jest/no-identical-title, no-throw-literal */

import _isArray from 'lodash/isArray';
import _isEqual from 'lodash/isEqual';
import _isString from 'lodash/isString';
import { Map, Set, fromJS } from 'immutable';

import { INVALID_PARAMS } from './InvalidParams';
import { getInvalidParams } from './TestUtils';

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

function testBuilderSet(
  Builder :Class<any>,
  setFunction :Function,
  validParams :Array<any>,
  isOptional :boolean = false,
) {

  const invalidParams = getInvalidParams(validParams[0], isOptional);
  const invalidParamsForArrayItems = _isArray(validParams[0]) ? getInvalidParams(validParams[0][0]) : [];

  test('should throw when given invalid parameters', () => {
    invalidParams.forEach((invalidParam) => {
      // console.log(setFunction, invalidParam);
      expectToThrowGivenInvalidParam(Builder, setFunction, invalidParam);
    });
    if (invalidParamsForArrayItems.length) {
      invalidParamsForArrayItems.forEach((invalidParam) => {
        // console.log(setFunction, '[', invalidParam, ']');
        expectToThrowGivenInvalidParam(Builder, setFunction, [invalidParam]);
      });
    }
  });

  if (invalidParamsForArrayItems.length) {
    test('should throw when given a mix of valid and invalid parameters', () => {
      validParams.forEach((validParam) => {
        invalidParamsForArrayItems.forEach((invalidParam) => {
          // console.log(setFunction, invalidParam);
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
      // console.log(setFunction, 'validParam', validParam);
      expect(() => {
        (new Builder())[setFunction](validParam);
      }).not.toThrow();
    });
  });
}

function runTestSuite(
  Model :Class<any>,
  ModelBuilder :Class<any>,
  mockInstance :Object,
  isValid :Function,
  genRandomModel :Function,
  config :Object,
) {

  const givenSetFunctions = Object.keys(config).sort();
  const protoSetFunctions = Object
    .getOwnPropertyNames(ModelBuilder.prototype)
    .filter((value) => value.startsWith('set'))
    .sort();

  if (!_isEqual(givenSetFunctions, protoSetFunctions)) {
    throw new Error('missing set functions');
  }

  const mockObject = mockInstance.toObject();

  describe(`${Model.name}`, () => {

    describe(`${ModelBuilder.name}`, () => {

      describe('constructor()', () => {
        testBuilderConstructor(Model, ModelBuilder, mockInstance);
      });

      Object.keys(config).sort().forEach((setFunction :string) => {
        const { isOptional, validParams } = config[setFunction];
        describe(`${setFunction}()`, () => {
          testBuilderSet(ModelBuilder, setFunction, validParams, isOptional);
        });
      });

      describe('build()', () => {

        const optionalSetFunctions = [];
        const requiredSetFunctions = [];
        Object.keys(config).sort().forEach((setFunction :string) => {
          const { isOptional } = config[setFunction];
          if (isOptional) {
            optionalSetFunctions.push(setFunction);
          }
          else {
            requiredSetFunctions.push(setFunction);
          }
        });

        test('should throw when a required property has not been set', () => {
          if (requiredSetFunctions.length > 0) {
            expect(() => {
              (new ModelBuilder()).build();
            }).toThrow();
          }
          requiredSetFunctions.forEach((requiredSetFunction1) => {
            const builder = new ModelBuilder();
            // invoke all optional setters
            optionalSetFunctions.forEach((optionalSetFunction) => {
              builder[optionalSetFunction](config[optionalSetFunction].validParams[0]);
            });
            // invoke all required setters, except this one
            requiredSetFunctions.forEach((requiredSetFunction2) => {
              if (requiredSetFunction1 !== requiredSetFunction2) {
                builder[requiredSetFunction2](config[requiredSetFunction2].validParams[0]);
              }
            });
            expect(() => {
              builder.build();
            }).toThrow();
          });
        });

        test('should not throw when an optional property has not been set', () => {
          optionalSetFunctions.forEach((optionalSetFunction1) => {
            const builder = new ModelBuilder();
            // invoke all required setters
            requiredSetFunctions.forEach((requiredSetFunction) => {
              builder[requiredSetFunction](config[requiredSetFunction].validParams[0]);
            });
            // invoke all optional setters, except this one
            optionalSetFunctions.forEach((optionalSetFunction2) => {
              if (optionalSetFunction1 !== optionalSetFunction2) {
                builder[optionalSetFunction2](config[optionalSetFunction2].validParams[0]);
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
          requiredSetFunctions.forEach((requiredSetFunction) => {
            builder[requiredSetFunction](config[requiredSetFunction].validParams[0]);
          });
          optionalSetFunctions.forEach((optionalSetFunction) => {
            builder[optionalSetFunction](config[optionalSetFunction].validParams[0]);
          });

          expectValidInstance(Model, mockInstance, builder.build());
        });

      });

    });

    describe('isValid', () => {

      describe('valid', () => {

        test('should return true when given a valid object literal', () => {
          expect(isValid(mockObject)).toEqual(true);
        });

        test('should return true when given a valid instance ', () => {
          expect(isValid(mockInstance)).toEqual(true);
        });

      });

      describe('invalid', () => {

        test('should return false when not given any parameters', () => {
          expect(isValid()).toEqual(false);
        });

        test('should return false when given invalid parameters', () => {
          const errors = [];
          INVALID_PARAMS.forEach((invalidParam) => {
            if (isValid(invalidParam)) {
              errors.push(`expected false - isValid(${JSON.stringify(invalidParam)})`);
            }
          });
          expect(errors).toEqual([]);
        });

        Object.keys(config).sort().forEach((setFunction :string) => {
          const { field, isOptional } = config[setFunction];
          const invalidParams = getInvalidParams(mockObject[field], isOptional);
          const invalidParamsForArrayItems = _isArray(mockObject[field]) ? getInvalidParams(mockObject[field][0]) : [];

          describe(field, () => {
            test('should return false when given an object literal with an invalid property', () => {
              const errors = [];
              const getErrorMessage = (invalidParam) => (
                `expected false - isValid({ ..., ${field}: ${JSON.stringify(invalidParam)} })`
              );
              invalidParams.forEach((invalidParam) => {
                if (isValid({ ...mockObject, [field]: invalidParam })) {
                  errors.push(getErrorMessage(invalidParam));
                }
              });
              if (invalidParamsForArrayItems.length) {
                invalidParamsForArrayItems.forEach((invalidParam) => {
                  if (isValid({ ...mockObject, [field]: [invalidParam] })) {
                    errors.push(getErrorMessage([invalidParam]));
                  }
                });
              }
              expect(errors).toEqual([]);
            });
            test('should return false when given an instance with an invalid property', () => {
              const errors = [];
              const getErrorMessage = (invalidParam) => (
                `expected false - isValid(new ${Model.name}({ ..., ${field}: ${JSON.stringify(invalidParam)} }))`
              );
              invalidParams.forEach((invalidParam) => {
                if (isValid(new Model({ ...mockInstance, [field]: invalidParam }))) {
                  errors.push(getErrorMessage(invalidParam));
                }
              });
              if (invalidParamsForArrayItems.length) {
                invalidParamsForArrayItems.forEach((invalidParam) => {
                  if (isValid(new Model({ ...mockInstance, [field]: [invalidParam] }))) {
                    errors.push(getErrorMessage([invalidParam]));
                  }
                });
              }
              expect(errors).toEqual([]);
            });
          });
        });

      });

    });

    describe('equality', () => {

      test('valueOf()', () => {
        expect(mockInstance.valueOf()).toEqual(fromJS(mockObject).hashCode());
      });

      test('Immutable.Set', () => {

        const randomModel = genRandomModel();
        const model0 = (new ModelBuilder(mockInstance)).build();
        const model1 = (new ModelBuilder(mockInstance)).build();

        const testSet = Set()
          .add(model0)
          .add(randomModel)
          .add(model1);

        expect(testSet.size).toEqual(2);
        expect(testSet.count()).toEqual(2);

        Object.keys(mockInstance).forEach((key) => {
          expect(testSet.first()[key]).toEqual(mockInstance[key]);
        });

        Object.keys(mockInstance).forEach((key) => {
          expect(testSet.last()[key]).toEqual(randomModel[key]);
        });
      });

      test('Immutable.Map', () => {

        const randomModel = genRandomModel();
        const model0 = (new ModelBuilder(mockInstance)).build();
        const model1 = (new ModelBuilder(mockInstance)).build();

        const testMap = Map()
          .set(model0, 'test_value_1')
          .set(randomModel, 'test_value_2')
          .set(model1, 'test_value_3');

        expect(testMap.size).toEqual(2);
        expect(testMap.count()).toEqual(2);
        expect(testMap.get(model0)).toEqual('test_value_3');
        expect(testMap.get(randomModel)).toEqual('test_value_2');
        expect(testMap.get(model1)).toEqual('test_value_3');
      });

    });

  });
}

export {
  runTestSuite,
};
