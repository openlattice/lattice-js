import { Map, Set, fromJS } from 'immutable';
import { v4 as uuid } from 'uuid';

import FQN from './FQN';

import { INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING } from '../utils/testing/InvalidParams';

const MOCK_NAMESPACE = 'OL';
const MOCK_NAME = 'DATA';
const MOCK_FQN_STRING = `${MOCK_NAMESPACE}.${MOCK_NAME}`;
const MOCK_FQN_OBJECT = { namespace: MOCK_NAMESPACE, name: MOCK_NAME };

describe('FQN', () => {

  describe('FQN.of()', () => {

    test('should be an instance of FQN', () => {
      const fqn1 = FQN.of(MOCK_FQN_STRING);
      const fqn2 = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
      const fqn3 = FQN.of(MOCK_FQN_OBJECT);
      const fqn4 = FQN.of(fromJS(MOCK_FQN_OBJECT));
      expect(fqn1).toBeInstanceOf(FQN);
      expect(fqn2).toBeInstanceOf(FQN);
      expect(fqn3).toBeInstanceOf(FQN);
      expect(fqn4).toBeInstanceOf(FQN);
    });

    test('should set the correct namespace', () => {
      const fqn1 = FQN.of(MOCK_FQN_STRING);
      const fqn2 = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
      const fqn3 = FQN.of(MOCK_FQN_OBJECT);
      const fqn4 = FQN.of(fromJS(MOCK_FQN_OBJECT));
      expect(fqn1.namespace).toEqual(MOCK_NAMESPACE);
      expect(fqn2.namespace).toEqual(MOCK_NAMESPACE);
      expect(fqn3.namespace).toEqual(MOCK_NAMESPACE);
      expect(fqn4.namespace).toEqual(MOCK_NAMESPACE);
      expect(fqn1.getNamespace()).toEqual(MOCK_NAMESPACE);
      expect(fqn2.getNamespace()).toEqual(MOCK_NAMESPACE);
      expect(fqn3.getNamespace()).toEqual(MOCK_NAMESPACE);
      expect(fqn4.getNamespace()).toEqual(MOCK_NAMESPACE);
    });

    test('should set the correct name', () => {
      const fqn1 = FQN.of(MOCK_FQN_STRING);
      const fqn2 = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
      const fqn3 = FQN.of(MOCK_FQN_OBJECT);
      const fqn4 = FQN.of(fromJS(MOCK_FQN_OBJECT));
      expect(fqn1.name).toEqual(MOCK_NAME);
      expect(fqn2.name).toEqual(MOCK_NAME);
      expect(fqn3.name).toEqual(MOCK_NAME);
      expect(fqn4.name).toEqual(MOCK_NAME);
      expect(fqn1.getName()).toEqual(MOCK_NAME);
      expect(fqn2.getName()).toEqual(MOCK_NAME);
      expect(fqn3.getName()).toEqual(MOCK_NAME);
      expect(fqn4.getName()).toEqual(MOCK_NAME);
    });

    test('should throw when not given any parameters', () => {
      expect(() => {
        FQN.of();
      }).toThrow('invalid parameter count: FQN takes only 1 or 2 parameters, got 0');
    });

    test('should throw when given 1 invalid parameter', () => {
      INVALID_PARAMS.forEach((invalidInput) => {
        expect(() => {
          FQN.of(invalidInput);
        }).toThrow('invalid FQN: namespace must be a non-empty string');
      });
    });

    test('should throw when given 2 invalid parameters', () => {
      INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput1) => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput2) => {
          expect(() => {
            FQN.of(invalidInput1, invalidInput2);
          }).toThrow('invalid FQN: namespace must be a non-empty string');
        });
      });
    });

    test('should throw when given 3 or more parameters', () => {
      INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
        expect(() => {
          FQN.of(invalidInput, invalidInput, invalidInput);
        }).toThrow('invalid parameter count: FQN takes only 1 or 2 parameters, got 3');
      });
    });

    test('should throw when given an Immutable object with an invalid namespace', () => {
      INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
        expect(() => {
          FQN.of(fromJS({ namespace: invalidInput, name: MOCK_NAME }));
        }).toThrow('invalid FQN: namespace must be a non-empty string');
      });
    });

    test('should throw when given an Immutable object with an invalid name', () => {
      INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
        expect(() => {
          FQN.of(fromJS({ namespace: MOCK_NAMESPACE, name: invalidInput }));
        }).toThrow('invalid FQN: name must be a non-empty string');
      });
    });

    test('should throw when given an FQN object literal with an invalid namespace', () => {
      INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
        expect(() => {
          FQN.of({ namespace: invalidInput, name: MOCK_NAME });
        }).toThrow('invalid FQN: namespace must be a non-empty string');
      });
    });

    test('should throw when given an FQN object literal with an invalid name', () => {
      INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
        expect(() => {
          FQN.of({ namespace: MOCK_NAMESPACE, name: invalidInput });
        }).toThrow('invalid FQN: name must be a non-empty string');
      });
    });

    test('should throw when given an FQN instance with an invalid namespace', () => {
      INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
        expect(() => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          FQN.of(fqn);
        }).toThrow('invalid FQN: namespace must be a non-empty string');
      });
    });

    test('should throw when given an FQN instance with an invalid name', () => {
      INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
        expect(() => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          FQN.of(fqn);
        }).toThrow('invalid FQN: name must be a non-empty string');
      });
    });

    test('should throw when given more than 63 characters', () => {
      expect(() => {
        FQN.of(`${uuid()}.${uuid()}`);
      }).toThrow('invalid FQN: FQNs must be <= 63 characters, got 73');
      expect(() => {
        FQN.of(uuid(), uuid());
      }).toThrow('invalid FQN: FQNs must be <= 63 characters, got 73');
      expect(() => {
        FQN.of({ namespace: uuid(), name: uuid() });
      }).toThrow('invalid FQN: FQNs must be <= 63 characters, got 73');
      expect(() => {
        FQN.of(fromJS({ namespace: uuid(), name: uuid() }));
      }).toThrow('invalid FQN: FQNs must be <= 63 characters, got 73');
    });

    describe('toObject()', () => {

      test('should return the correct FQN object literal', () => {
        const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
        expect(fqn.toObject()).toEqual(MOCK_FQN_OBJECT);
      });

      test('should return an empty object literal if namespace was changed to an invalid value', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          expect(fqn.toObject()).toEqual({ namespace: '', name: '' });
        });
      });

      test('should return an empty object literal if name was changed to an invalid value', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          expect(fqn.toObject()).toEqual({ namespace: '', name: '' });
        });
      });

    });

    describe('toString()', () => {

      test('should return the correct FQN string', () => {
        const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
        expect(fqn.toString()).toEqual(MOCK_FQN_STRING);
      });

      test('should return empty string if namespace was changed to an invalid value', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          expect(fqn.toString()).toEqual('');
        });
      });

      test('should return empty string if name was changed to an invalid value', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          expect(fqn.toString()).toEqual('');
        });
      });

    });

    describe('valueOf()', () => {

      test('should return the correct FQN string', () => {
        const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
        expect(fqn.valueOf()).toEqual(MOCK_FQN_STRING);
      });

      test('should return empty string if namespace was changed to an invalid value', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          expect(fqn.valueOf()).toEqual('');
        });
      });

      test('should return empty string if name was changed to an invalid value', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          expect(fqn.valueOf()).toEqual('');
        });
      });

    });

  });

  describe('FQN.isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid FQN string', () => {
        expect(FQN.isValid(MOCK_FQN_STRING)).toEqual(true);
      });

      test('should return true when given a valid namespace and a valid name', () => {
        expect(FQN.isValid(MOCK_NAMESPACE, MOCK_NAME)).toEqual(true);
      });

      test('should return true when given a valid Immutable.Map', () => {
        expect(FQN.isValid(fromJS(MOCK_FQN_OBJECT))).toEqual(true);
      });

      test('should return true when given a valid FQN object literal', () => {
        expect(FQN.isValid(MOCK_FQN_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid FQN instance', () => {
        expect(FQN.isValid(FQN.of(MOCK_NAMESPACE, MOCK_NAME))).toEqual(true);
      });

    });

    describe('invalid', () => {

      test('should return false when not given any parameters', () => {
        expect(FQN.isValid()).toEqual(false);
      });

      test('should return false when given 1 invalid parameter', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FQN.isValid(invalidInput)).toEqual(false);
        });
      });

      test('should return false when given 2 invalid parameters', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput1) => {
          INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput2) => {
            expect(FQN.isValid(invalidInput1, invalidInput2)).toEqual(false);
          });
        });
      });

      test('should return false when given 3 or more parameters', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          expect(FQN.isValid(invalidInput, invalidInput, invalidInput)).toEqual(false);
        });
      });

      test('should return false when given an Immutable object with an invalid namespace', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          expect(FQN.isValid(fromJS({ namespace: invalidInput, name: MOCK_NAME }))).toEqual(false);
        });
      });

      test('should return false when given an Immutable object with an invalid name', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          expect(FQN.isValid(fromJS({ namespace: MOCK_NAMESPACE, name: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an FQN object literal with an invalid namespace', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          expect(FQN.isValid({ namespace: invalidInput, name: MOCK_NAME })).toEqual(false);
        });
      });

      test('should return false when given an FQN object literal with an invalid name', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          expect(FQN.isValid({ namespace: MOCK_NAMESPACE, name: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given a FQN instance with an invalid namespace', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          expect(FQN.isValid(fqn)).toEqual(false);
        });
      });

      test('should return false when given a FQN instance with an invalid name', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          expect(FQN.isValid(fqn)).toEqual(false);
        });
      });

      test('should return false when given more than 63 characters', () => {
        expect(FQN.isValid(`${uuid()}.${uuid()}`)).toEqual(false);
        expect(FQN.isValid(uuid(), uuid())).toEqual(false);
        expect(FQN.isValid({ namespace: uuid(), name: uuid() })).toEqual(false);
        expect(FQN.isValid(fromJS({ namespace: uuid(), name: uuid() }))).toEqual(false);
      });

    });

  });

  describe('FQN.toString()', () => {

    describe('valid', () => {

      test('should return the correct FQN string when given a valid FQN string', () => {
        expect(FQN.toString(MOCK_FQN_STRING)).toEqual(MOCK_FQN_STRING);
      });

      test('should return the correct FQN string when given a valid namespace and a valid name', () => {
        expect(FQN.toString(MOCK_NAMESPACE, MOCK_NAME)).toEqual(MOCK_FQN_STRING);
      });

      test('should return the correct FQN string when given a valid Immutable.Map', () => {
        expect(FQN.toString(fromJS(MOCK_FQN_OBJECT))).toEqual(MOCK_FQN_STRING);
      });

      test('should return the correct FQN string when given a valid FQN object literal', () => {
        expect(FQN.toString(MOCK_FQN_OBJECT)).toEqual(MOCK_FQN_STRING);
      });

      test('should return the correct FQN string when given a valid FQN instance', () => {
        expect(FQN.toString(FQN.of(MOCK_NAMESPACE, MOCK_NAME))).toEqual(MOCK_FQN_STRING);
      });

    });

    describe('invalid', () => {

      test('should return an empty string when not given any parameters', () => {
        expect(FQN.toString()).toEqual('');
      });

      test('should return an empty string when given 1 invalid parameter', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FQN.toString(invalidInput)).toEqual('');
        });
      });

      test('should return an empty string when given 2 invalid parameters', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput1) => {
          INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput2) => {
            expect(FQN.toString(invalidInput1, invalidInput2)).toEqual('');
          });
        });
      });

      test('should return an empty string when given 3 or more parameters', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          expect(FQN.toString(invalidInput, invalidInput, invalidInput)).toEqual('');
        });
      });

      test('should return an empty string when given an Immutable object with an invalid namespace', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          expect(FQN.toString(fromJS({ namespace: invalidInput, name: MOCK_NAME }))).toEqual('');
        });
      });

      test('should return an empty string when given an Immutable object with an invalid name', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          expect(FQN.toString(fromJS({ namespace: MOCK_NAMESPACE, name: invalidInput }))).toEqual('');
        });
      });

      test('should return an empty string when given an FQN object literal with an invalid namespace', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          expect(FQN.toString({ namespace: invalidInput, name: MOCK_NAME })).toEqual('');
        });
      });

      test('should return an empty string when given an FQN object literal with an invalid name', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          expect(FQN.toString({ namespace: MOCK_NAMESPACE, name: invalidInput })).toEqual('');
        });
      });

      test('should return an empty string when given a FQN instance with an invalid namespace', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          expect(FQN.toString(fqn)).toEqual('');
        });
      });

      test('should return an empty string when given a FQN instance with an invalid name', () => {
        INVALID_PARAMS_REQUIRED_STRING.forEach((invalidInput) => {
          const fqn = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          expect(FQN.toString(fqn)).toEqual('');
        });
      });

      test('should return an empty string when given more than 63 characters', () => {
        expect(FQN.toString(`${uuid()}.${uuid()}`)).toEqual('');
        expect(FQN.toString(uuid(), uuid())).toEqual('');
        expect(FQN.toString({ namespace: uuid(), name: uuid() })).toEqual('');
        expect(FQN.toString(fromJS({ namespace: uuid(), name: uuid() }))).toEqual('');
      });

    });

  });

  describe('Immutable.js', () => {

    test('Immutable.Set', () => {

      const setFQN = FQN.of('Immutable.Set');
      const fqn0 = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
      const fqn1 = FQN.of(MOCK_NAMESPACE, MOCK_NAME);

      const testSet = Set()
        .add(fqn0)
        .add(setFQN)
        .add(fqn1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().namespace).toEqual(MOCK_NAMESPACE);
      expect(testSet.first().name).toEqual(MOCK_NAME);

      expect(testSet.last().namespace).toEqual(setFQN.namespace);
      expect(testSet.last().name).toEqual(setFQN.name);
    });

    test('Immutable.Map', () => {

      const mapFQN = FQN.of('Immutable.Map');
      const fqn0 = FQN.of(MOCK_NAMESPACE, MOCK_NAME);
      const fqn1 = FQN.of(MOCK_NAMESPACE, MOCK_NAME);

      const testMap = Map()
        .set(fqn0, 'test_value_1')
        .set(mapFQN, 'test_value_2')
        .set(fqn1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(fqn0)).toEqual('test_value_3');
      expect(testMap.get(mapFQN)).toEqual('test_value_2');
      expect(testMap.get(fqn1)).toEqual('test_value_3');
    });

  });

});
