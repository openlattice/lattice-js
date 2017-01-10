/* eslint-disable no-use-before-define, no-new */

import FullyQualifiedName from '../../src/models/FullyQualifiedName';

/* eslint-disable no-array-constructor, no-new-object */
const INVALID_PARAMS = [
  undefined,
  null,
  [],
  new Array(),
  {},
  new Object(),
  true,
  false,
  -1,
  0,
  1,
  '',
  ' ',
  /regex/
];
/* eslint-enable */

const MOCK_NAMESPACE = 'LOOM';
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

      it('should be an instance of FullyQualifiedName', () => {
        expect(fqn).toEqual(jasmine.any(FullyQualifiedName));
      });

      it('should set the correct namespace', () => {
        expect(fqn.namespace).toEqual(MOCK_NAMESPACE);
        expect(fqn.getNamespace()).toEqual(MOCK_NAMESPACE);
      });

      it('should set the correct name', () => {
        expect(fqn.name).toEqual(MOCK_NAME);
        expect(fqn.getName()).toEqual(MOCK_NAME);
      });

      it('should return the correct FQN string', () => {
        expect(fqn.getFullyQualifiedName()).toEqual(MOCK_FQN_STRING);
        expect(fqn.valueOf()).toEqual(MOCK_FQN_STRING);
      });

    });

    describe('validation', () => {

      it('should throw when not given any parameters', () => {
        expect(() => {
          new FullyQualifiedName();
        }).toThrow();
      });

      it('should throw when given 1 invalid parameter', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            new FullyQualifiedName(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when given 2 invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput1) => {
          INVALID_PARAMS.forEach((invalidInput2) => {
            expect(() => {
              new FullyQualifiedName(invalidInput1, invalidInput2);
            }).toThrow();
          });
        });
      });

      it('should throw when given 3 or more parameters', () => {
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

      it('should return true when given a valid namespace and a valid name', () => {
        expect(FullyQualifiedName.isValid(MOCK_NAMESPACE, MOCK_NAME)).toEqual(true);
      });

      it('should return true when given a valid FQN object literal', () => {
        expect(FullyQualifiedName.isValid({ namespace: MOCK_NAMESPACE, name: MOCK_NAME })).toEqual(true);
      });

      it('should return true when given a valid instance of FullyQualifiedName', () => {
        expect(FullyQualifiedName.isValid(new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME))).toEqual(true);
      });

    });

    describe('invalid', () => {

      it('should return false when not given any parameters', () => {
        expect(FullyQualifiedName.isValid()).toEqual(false);
      });

      it('should return false when given 1 invalid parameter', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.isValid(invalidInput)).toEqual(false);
        });
      });

      it('should return false when given 2 invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput1) => {
          INVALID_PARAMS.forEach((invalidInput2) => {
            expect(FullyQualifiedName.isValid(invalidInput1, invalidInput2)).toEqual(false);
          });
        });
      });

      it('should return false when given 3 or more parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.isValid(invalidInput, invalidInput, invalidInput)).toEqual(false);
        });
      });

      it('should return false when given an FQN object literal with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.isValid({ namespace: invalidInput, name: MOCK_NAME })).toEqual(false);
        });
      });

      it('should return false when given an FQN object literal with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(FullyQualifiedName.isValid({ namespace: MOCK_NAMESPACE, name: invalidInput })).toEqual(false);
        });
      });

      it('should return false when given an instance of FullyQualifiedName with an invalid namespace', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.namespace = invalidInput;
          expect(FullyQualifiedName.isValid(fqn)).toEqual(false);
        });
      });

      it('should return false when given an instance of FullyQualifiedName with an invalid name', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          const fqn = new FullyQualifiedName(MOCK_NAMESPACE, MOCK_NAME);
          fqn.name = invalidInput;
          expect(FullyQualifiedName.isValid(fqn)).toEqual(false);
        });
      });

    });

  });

});
