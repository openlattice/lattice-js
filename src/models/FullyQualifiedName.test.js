/* eslint-disable no-use-before-define, no-new */
import { fromJS } from 'immutable';

import FullyQualifiedName from './FullyQualifiedName';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';

const MOCK_NAMESPACE = 'LATTICE';
const MOCK_NAME = 'DATA';
const MOCK_FQN_STRING = `${MOCK_NAMESPACE}.${MOCK_NAME}`;
const MOCK_FQN_OBJECT = {
  namespace: MOCK_NAMESPACE,
  name: MOCK_NAME
};

describe('FullyQualifiedName', () => {

  describe('new FullyQualifiedName()', () => {

    describe('construction', () => {

      test('should be a FullyQualifiedName instance', () => {
        const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
        expect(fqn).toBeInstanceOf(FullyQualifiedName);
      });

      test('should set the correct namespace', () => {
        const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
        expect(fqn.namespace).toEqual(MOCK_NAMESPACE);
        expect(fqn.getNamespace()).toEqual(MOCK_NAMESPACE);
      });

      test('should set the correct name', () => {
        const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
        expect(fqn.name).toEqual(MOCK_NAME);
        expect(fqn.getName()).toEqual(MOCK_NAME);
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          new FullyQualifiedName();
        }).toThrow('invalid parameter count: FullyQualifiedName takes only 1 or 2 parameters, got 0');
      });

      test('should throw when given 1 invalid parameter', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            new FullyQualifiedName(invalidInput);
          }).toThrow('invalid FQN: namespace must be a non-empty string');
        });
      });

      test('should throw when given 2 invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput1) => {
          INVALID_PARAMS.forEach((invalidInput2) => {
            expect(() => {
              new FullyQualifiedName(invalidInput1, invalidInput2);
            }).toThrow('invalid FQN: namespace must be a non-empty string');
          });
        });
      });

      test('should throw when given 3 or more parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            new FullyQualifiedName(invalidInput, invalidInput, invalidInput);
          }).toThrow('invalid parameter count: FullyQualifiedName takes only 1 or 2 parameters, got 3');
        });
      });

      test('should throw when given an Immutable object with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            new FullyQualifiedName(fromJS({ namespace: invalidInput, name: MOCK_NAME }));
          }).toThrow('invalid FQN: namespace must be a non-empty string');
        });
      });

      test('should throw when given an Immutable object with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            new FullyQualifiedName(fromJS({ namespace: MOCK_NAMESPACE, name: invalidInput }));
          }).toThrow('invalid FQN: name must be a non-empty string');
        });
      });

      test('should throw when given an FQN object literal with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            new FullyQualifiedName({ namespace: invalidInput, name: MOCK_NAME });
          }).toThrow('invalid FQN: namespace must be a non-empty string');
        });
      });

      test('should throw when given an FQN object literal with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            new FullyQualifiedName({ namespace: MOCK_NAMESPACE, name: invalidInput });
          }).toThrow('invalid FQN: name must be a non-empty string');
        });
      });

      test('should throw when given a FullyQualifiedName instance with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
            fqn.namespace = invalidInput;
            new FullyQualifiedName(fqn);
          }).toThrow('invalid FQN: namespace must be a non-empty string');
        });
      });

      test('should throw when given a FullyQualifiedName instance with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
            fqn.name = invalidInput;
            new FullyQualifiedName(fqn);
          }).toThrow('invalid FQN: name must be a non-empty string');
        });
      });

    });

    describe('toObject()', () => {

      test('should return the correct FQN object literal', () => {
        const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
        expect(fqn.toObject()).toEqual(MOCK_FQN_OBJECT);
      });

      test('should return an empty object literal if namespace was changed to an invalid value', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          expect(fqn.toObject()).toEqual({ namespace: '', name: '' });
        });
      });

      test('should return an empty object literal if name was changed to an invalid value', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          expect(fqn.toObject()).toEqual({ namespace: '', name: '' });
        });
      });

    });

    describe('toString()', () => {

      test('should return the correct FQN string', () => {
        const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
        expect(fqn.getFullyQualifiedName()).toEqual(MOCK_FQN_STRING);
        expect(fqn.toString()).toEqual(MOCK_FQN_STRING);
        expect(fqn.valueOf()).toEqual(MOCK_FQN_STRING);
      });

      test('should return empty string if namespace was changed to an invalid value', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          expect(fqn.getFullyQualifiedName()).toEqual('');
          expect(fqn.toString()).toEqual('');
          expect(fqn.valueOf()).toEqual('');
        });
      });

      test('should return empty string if name was changed to an invalid value', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          expect(fqn.getFullyQualifiedName()).toEqual('');
          expect(fqn.toString()).toEqual('');
          expect(fqn.valueOf()).toEqual('');
        });
      });

    });

  });

  describe('FullyQualifiedName.isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid FQN string', () => {
        expect(FullyQualifiedName.isValid(MOCK_FQN_STRING)).toEqual(true);
      });

      test('should return true when given a valid namespace and a valid name', () => {
        expect(FullyQualifiedName.isValid(MOCK_NAMESPACE, MOCK_NAME)).toEqual(true);
      });

      test('should return true when given a valid Immutable.Map', () => {
        expect(FullyQualifiedName.isValid(fromJS(MOCK_FQN_OBJECT))).toEqual(true);
      });

      test('should return true when given a valid FQN object literal', () => {
        expect(FullyQualifiedName.isValid(MOCK_FQN_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid FullyQualifiedName instance', () => {
        expect(FullyQualifiedName.isValid(new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME))).toEqual(true);
      });

    });

    describe('invalid', () => {

      test('should return false when not given any parameters', () => {
        expect(FullyQualifiedName.isValid()).toEqual(false);
      });

      test('should return false when given 1 invalid parameter', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(FullyQualifiedName.isValid(invalidInput)).toEqual(false);
        });
      });

      test('should return false when given 2 invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput1) => {
          INVALID_PARAMS.forEach((invalidInput2) => {
            expect(FullyQualifiedName.isValid(invalidInput1, invalidInput2)).toEqual(false);
          });
        });
      });

      test('should return false when given 3 or more parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.isValid(invalidInput, invalidInput, invalidInput)).toEqual(false);
        });
      });

      test('should return false when given an Immutable object with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.isValid(fromJS({ namespace: invalidInput, name: MOCK_NAME }))).toEqual(false);
        });
      });

      test('should return false when given an Immutable object with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.isValid(fromJS({ namespace: MOCK_NAMESPACE, name: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an FQN object literal with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.isValid({ namespace: invalidInput, name: MOCK_NAME })).toEqual(false);
        });
      });

      test('should return false when given an FQN object literal with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.isValid({ namespace: MOCK_NAMESPACE, name: invalidInput })).toEqual(false);
        });
      });

      test('should return false when given a FullyQualifiedName instance with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          expect(FullyQualifiedName.isValid(fqn)).toEqual(false);
        });
      });

      test('should return false when given a FullyQualifiedName instance with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          expect(FullyQualifiedName.isValid(fqn)).toEqual(false);
        });
      });

    });

  });

  describe('FullyQualifiedName.toString()', () => {

    describe('valid', () => {

      test('should return the correct FQN string when given a valid FQN string', () => {
        expect(FullyQualifiedName.toString(MOCK_FQN_STRING)).toEqual(MOCK_FQN_STRING);
      });

      test('should return the correct FQN string when given a valid namespace and a valid name', () => {
        expect(FullyQualifiedName.toString(MOCK_NAMESPACE, MOCK_NAME)).toEqual(MOCK_FQN_STRING);
      });

      test('should return the correct FQN string when given a valid Immutable.Map', () => {
        expect(FullyQualifiedName.toString(fromJS(MOCK_FQN_OBJECT))).toEqual(MOCK_FQN_STRING);
      });

      test('should return the correct FQN string when given a valid FQN object literal', () => {
        expect(FullyQualifiedName.toString(MOCK_FQN_OBJECT)).toEqual(MOCK_FQN_STRING);
      });

      test('should return the correct FQN string when given a valid FullyQualifiedName instance', () => {
        expect(FullyQualifiedName.toString(new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME))).toEqual(MOCK_FQN_STRING);
      });

    });

    describe('invalid', () => {

      test('should return an empty string when not given any parameters', () => {
        expect(FullyQualifiedName.toString()).toEqual('');
      });

      test('should return an empty string when given 1 invalid parameter', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(FullyQualifiedName.toString(invalidInput)).toEqual('');
        });
      });

      test('should return an empty string when given 2 invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput1) => {
          INVALID_PARAMS.forEach((invalidInput2) => {
            expect(FullyQualifiedName.toString(invalidInput1, invalidInput2)).toEqual('');
          });
        });
      });

      test('should return an empty string when given 3 or more parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.toString(invalidInput, invalidInput, invalidInput)).toEqual('');
        });
      });

      test('should return an empty string when given an Immutable object with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.toString(fromJS({ namespace: invalidInput, name: MOCK_NAME }))).toEqual('');
        });
      });

      test('should return an empty string when given an Immutable object with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.toString(fromJS({ namespace: MOCK_NAMESPACE, name: invalidInput }))).toEqual('');
        });
      });

      test('should return an empty string when given an FQN object literal with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.toString({ namespace: invalidInput, name: MOCK_NAME })).toEqual('');
        });
      });

      test('should return an empty string when given an FQN object literal with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.toString({ namespace: MOCK_NAMESPACE, name: invalidInput })).toEqual('');
        });
      });

      test('should return an empty string when given a FullyQualifiedName instance with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          expect(FullyQualifiedName.toString(fqn)).toEqual('');
        });
      });

      test('should return an empty string when given a FullyQualifiedName instance with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          expect(FullyQualifiedName.toString(fqn)).toEqual('');
        });
      });

    });

  });

});
