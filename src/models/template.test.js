import { Map, Set } from 'immutable';

import Model, { ModelBuilder, isValidModel as isValid } from './template';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { genRandomUUID } from '../utils/testing/MockUtils';

const MOCK_DM = {
  id: 'e39dfdfa-a3e6-4f1f-b54b-646a723c3085'
};

describe('Model', () => {

  describe('ModelBuilder', () => {

    describe('setId()', () => {

      // test('should throw when given invalid parameters', () => {});
      // test('should throw when not given any parameters', () => {});
      // test('should throw when given a mix of valid and invalid parameters', () => {});
      // test('should not throw when not given any parameters', () => {});
      // test('should not throw when given valid parameters', () => {});

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new ModelBuilder()).setId();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new ModelBuilder()).setId(MOCK_DM.id);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      // test('should throw when a required property has not been set', () => {});
      // test('should not throw when an optional property has not been set', () => {});
      // test('should set required properties that are allowed to be empty', () => {});
      // test('should return a valid instance', () => {});

      test('should return a valid instance', () => {

        const model = (new ModelBuilder()).setId(MOCK_DM.id).build();
        expect(model).toBeInstanceOf(Model);
        expect(model.id).toBeDefined();
        expect(model.id).toEqual(MOCK_DM.id);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_DM)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new Model(
            MOCK_DM.id
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const model = (new ModelBuilder())
          .setId(MOCK_DM.id)
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
          expect(isValid(Object.assign({}, MOCK_DM, { id: invalidInput }))).toEqual(false);
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

  describe('equality', () => {

    test('valueOf()', () => {
      const model = new Model(MOCK_DM.id);
      expect(model.valueOf()).toEqual(JSON.stringify({
        id: MOCK_DM.id
      }));
    });

    test('Immutable.Set', () => {

      const randomId = genRandomUUID();
      const testSet = Set().withMutations((mutableSet) => {
        mutableSet.add(new Model(MOCK_DM.id));
        mutableSet.add(new Model(randomId));
        mutableSet.add(new Model(MOCK_DM.id));
      });
      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);
      expect(testSet.first().id).toEqual(MOCK_DM.id);
      expect(testSet.last().id).toEqual(randomId);
    });

    test('Immutable.Map', () => {

      const model0 = new Model(MOCK_DM.id);
      const model1 = new Model(genRandomUUID());
      const model2 = new Model(MOCK_DM.id);
      const testMap = Map().withMutations((mutableMap) => {
        mutableMap.set(model0, 'test_value_1');
        mutableMap.set(model1, 'test_value_2');
        mutableMap.set(model2, 'test_value_3');
      });
      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(model0)).toEqual('test_value_3');
      expect(testMap.get(model1)).toEqual('test_value_2');
      expect(testMap.get(model2)).toEqual('test_value_3');
    });

  });

});
