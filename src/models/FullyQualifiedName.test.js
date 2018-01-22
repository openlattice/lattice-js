/* eslint-disable no-use-before-define, no-new */
import FullyQualifiedName from './FullyQualifiedName';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_ENTITY_TYPE_DM } from '../utils/testing/MockDataModels';

const MOCK_NAMESPACE = 'LATTICE';
const MOCK_NAME = 'DATA';
const MOCK_FQN_STRING = `${MOCK_NAMESPACE}.${MOCK_NAME}`;

describe('FullyQualifiedName', () => {

  describe('new FullyQualifiedName()', () => {

    describe('construction', () => {

      let fqn = null;

      beforeEach(() => {
        fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
      });

      afterEach(() => {
        fqn = null;
      });

      test('should be an instance of FullyQualifiedName', () => {
        expect(fqn).toEqual(jasmine.any(FullyQualifiedName));
      });

      test('should set the correct namespace', () => {
        expect(fqn.namespace).toEqual(MOCK_NAMESPACE);
        expect(fqn.getNamespace()).toEqual(MOCK_NAMESPACE);
      });

      test('should set the correct name', () => {
        expect(fqn.name).toEqual(MOCK_NAME);
        expect(fqn.getName()).toEqual(MOCK_NAME);
      });

      test('should return the correct FQN string', () => {
        expect(fqn.getFullyQualifiedName()).toEqual(MOCK_FQN_STRING);
        expect(fqn.valueOf()).toEqual(MOCK_FQN_STRING);
      });

    });

    describe('validation', () => {

      test('should throw when not given any parameters', () => {
        expect(() => {
          new FullyQualifiedName();
        }).toThrow();
      });

      test('should throw when given 1 invalid parameter', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            new FullyQualifiedName(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when given 2 invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput1) => {
          INVALID_PARAMS.forEach((invalidInput2) => {
            expect(() => {
              new FullyQualifiedName(invalidInput1, invalidInput2);
            }).toThrow();
          });
        });
      });

      test('should throw when given 3 or more parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            new FullyQualifiedName(invalidInput, invalidInput, invalidInput);
          }).toThrow();
        });
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid namespace and a valid name', () => {
        expect(FullyQualifiedName.isValid(MOCK_NAMESPACE, MOCK_NAME)).toEqual(true);
      });

      test('should return true when given a valid FQN object literal', () => {
        expect(FullyQualifiedName.isValid({ namespace: MOCK_NAMESPACE, name: MOCK_NAME })).toEqual(true);
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

      test('should return false when given an instance of FullyQualifiedName with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          expect(FullyQualifiedName.isValid(fqn)).toEqual(false);
        });
      });

      test('should return false when given an instance of FullyQualifiedName with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          expect(FullyQualifiedName.isValid(fqn)).toEqual(false);
        });
      });

    });

  });

});
