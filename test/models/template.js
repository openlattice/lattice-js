import Model, {
  ModelBuilder,
  isValid
} from '../../src/models/template';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

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

      // it('should throw when given invalid parameters', () => {});
      // it('should throw when not given any parameters', () => {});
      // it('should throw when given a mix of valid and invalid parameters', () => {});
      // it('should not throw when not given any parameters', () => {});
      // it('should not throw when given valid parameters', () => {});

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setId();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setId(MOCK_MODEL_DM.id);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      // it('should throw when a required property has not been set', () => {});
      // it('should not throw when an optional property has not been set', () => {});
      // it('should set required properties that are allowed to be empty', () => {});
      // it('should return a valid instance', () => {});

      it('should return a valid instance', () => {

        const org = builder.setId(MOCK_MODEL_DM.id).build();
        expect(org).toEqual(jasmine.any(Model));
        expect(org.id).toBeDefined();
        expect(org.id).toEqual(MOCK_MODEL_DM.id);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_MODEL_DM)).toEqual(true);
      });

      it('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Model(
            MOCK_MODEL_DM.id
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const model = (new ModelBuilder())
          .setId(MOCK_MODEL_DM.id)
          .build();

        expect(isValid(model)).toEqual(true);
      });

    });

    describe('invalid', () => {

      it('should return false when not given any parameters', () => {
        expect(isValid()).toEqual(false);
      });

      it('should return false when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(invalidInput)).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "id" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_MODEL_DM, { id: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "id" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
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
