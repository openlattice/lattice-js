import Model, { ModelBuilder, isValid } from './template';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';

const MOCK_MODEL_DM = {
  id: 'e39dfdfa-a3e6-4f1f-b54b-646a723c3085'
};

describe('Model', () => {

  describe('ModelBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new ModelBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setId()', () => {

      // test('should throw when given invalid parameters', () => {});
      // test('should throw when not given any parameters', () => {});
      // test('should throw when given a mix of valid and invalid parameters', () => {});
      // test('should not throw when not given any parameters', () => {});
      // test('should not throw when given valid parameters', () => {});

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setId();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setId(MOCK_MODEL_DM.id);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      // test('should throw when a required property has not been set', () => {});
      // test('should not throw when an optional property has not been set', () => {});
      // test('should set required properties that are allowed to be empty', () => {});
      // test('should return a valid instance', () => {});

      test('should return a valid instance', () => {

        const model = builder.setId(MOCK_MODEL_DM.id).build();
        expect(model).toBeInstanceOf(Model);
        expect(model.id).toBeDefined();
        expect(model.id).toEqual(MOCK_MODEL_DM.id);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_MODEL_DM)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Model(
            MOCK_MODEL_DM.id
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const model = (new ModelBuilder())
          .setId(MOCK_MODEL_DM.id)
          .build();

        expect(isValid(model)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_MODEL_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "id" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new Model(
              invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
