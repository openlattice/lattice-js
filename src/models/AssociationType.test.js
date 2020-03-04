import { Map, Set, fromJS } from 'immutable';

import {
  MOCK_ASSOCIATION_TYPE,
  MOCK_ASSOCIATION_TYPE_OBJECT,
  AssociationType,
  AssociationTypeBuilder,
  genRandomAssociationType,
  isValidAssociationType as isValid,
} from './AssociationType';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_FOR_REQUIRED_BOOLEAN,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

function expectValidInstance(value) {

  expect(value).toBeInstanceOf(AssociationType);

  expect(value.bidirectional).toBeDefined();
  expect(value.dst).toBeDefined();
  expect(value.entityType).toBeDefined();
  expect(value.src).toBeDefined();

  expect(value.bidirectional).toEqual(MOCK_ASSOCIATION_TYPE.bidirectional);
  expect(value.dst).toEqual(MOCK_ASSOCIATION_TYPE.dst);
  expect(value.entityType).toEqual(MOCK_ASSOCIATION_TYPE.entityType);
  expect(value.src).toEqual(MOCK_ASSOCIATION_TYPE.src);
}

describe('AssociationType', () => {

  describe('AssociationTypeBuilder', () => {

    describe('constructor()', () => {

      test('should construct given an instance', () => {
        expectValidInstance(
          (new AssociationTypeBuilder(MOCK_ASSOCIATION_TYPE)).build()
        );
      });

      test('should construct given an object literal', () => {
        expectValidInstance(
          (new AssociationTypeBuilder({ ...MOCK_ASSOCIATION_TYPE })).build()
        );
        expectValidInstance(
          (new AssociationTypeBuilder(MOCK_ASSOCIATION_TYPE_OBJECT)).build()
        );
      });

      test('should construct given an immutable object', () => {
        expectValidInstance(
          (new AssociationTypeBuilder(MOCK_ASSOCIATION_TYPE.toImmutable())).build()
        );
        expectValidInstance(
          (new AssociationTypeBuilder(fromJS({ ...MOCK_ASSOCIATION_TYPE }))).build()
        );
        expectValidInstance(
          (new AssociationTypeBuilder(fromJS(MOCK_ASSOCIATION_TYPE_OBJECT))).build()
        );
      });

    });

    describe('setBidirectional()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setBidirectional();
        }).toThrow();
        INVALID_PARAMS_FOR_REQUIRED_BOOLEAN.forEach((invalidInput) => {
          expect(() => {
            (new AssociationTypeBuilder()).setBidirectional(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setBidirectional(MOCK_ASSOCIATION_TYPE.bidirectional);
        }).not.toThrow();
      });

    });

    describe('setEntityType()', () => {

      test('should throw when given invalid parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setEntityType();
        }).toThrow();
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new AssociationTypeBuilder()).setEntityType(invalidInput);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setEntityType(MOCK_ASSOCIATION_TYPE.entityType);
        }).not.toThrow();
      });

    });

    describe('setDestinationEntityTypeIds()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AssociationTypeBuilder()).setDestinationEntityTypeIds(invalidInput);
          }).toThrow();
          expect(() => {
            (new AssociationTypeBuilder()).setDestinationEntityTypeIds([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new AssociationTypeBuilder()).setDestinationEntityTypeIds([...MOCK_ASSOCIATION_TYPE.dst, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setDestinationEntityTypeIds();
        }).not.toThrow();
        expect(() => {
          (new AssociationTypeBuilder()).setDestinationEntityTypeIds(MOCK_ASSOCIATION_TYPE.dst);
        }).not.toThrow();
      });

    });

    describe('setSourceEntityTypeIds()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(() => {
            (new AssociationTypeBuilder()).setSourceEntityTypeIds(invalidInput);
          }).toThrow();
          expect(() => {
            (new AssociationTypeBuilder()).setSourceEntityTypeIds([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            (new AssociationTypeBuilder()).setSourceEntityTypeIds([...MOCK_ASSOCIATION_TYPE.src, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setSourceEntityTypeIds();
        }).not.toThrow();
        expect(() => {
          (new AssociationTypeBuilder()).setSourceEntityTypeIds(MOCK_ASSOCIATION_TYPE.src);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {
        expect(() => {
          // omitting setBidirectional()
          (new AssociationTypeBuilder())
            .setDestinationEntityTypeIds(MOCK_ASSOCIATION_TYPE.dst)
            .setEntityType(MOCK_ASSOCIATION_TYPE.entityType)
            .setSourceEntityTypeIds(MOCK_ASSOCIATION_TYPE.src)
            .build();
        }).toThrow();
        expect(() => {
          // omitting setEntityType()
          (new AssociationTypeBuilder())
            .setBidirectional(MOCK_ASSOCIATION_TYPE.bidirectional)
            .setDestinationEntityTypeIds(MOCK_ASSOCIATION_TYPE.dst)
            .setSourceEntityTypeIds(MOCK_ASSOCIATION_TYPE.src)
            .build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {
        expect(() => {
          // omitting setDestinationEntityTypeIds()
          (new AssociationTypeBuilder())
            .setBidirectional(MOCK_ASSOCIATION_TYPE.bidirectional)
            .setEntityType(MOCK_ASSOCIATION_TYPE.entityType)
            .setSourceEntityTypeIds(MOCK_ASSOCIATION_TYPE.src)
            .build();
        }).not.toThrow();
        expect(() => {
          // omitting setSourceEntityTypeIds()
          (new AssociationTypeBuilder())
            .setBidirectional(MOCK_ASSOCIATION_TYPE.bidirectional)
            .setDestinationEntityTypeIds(MOCK_ASSOCIATION_TYPE.dst)
            .setEntityType(MOCK_ASSOCIATION_TYPE.entityType)
            .build();
        }).not.toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const associationType = (new AssociationTypeBuilder())
          .setBidirectional(MOCK_ASSOCIATION_TYPE.bidirectional)
          .setEntityType(MOCK_ASSOCIATION_TYPE.entityType)
          .build();

        expect(associationType.dst).toEqual([]);
        expect(associationType.src).toEqual([]);
      });

      test('should return a valid instance', () => {

        const associationType = (new AssociationTypeBuilder())
          .setBidirectional(MOCK_ASSOCIATION_TYPE.bidirectional)
          .setDestinationEntityTypeIds(MOCK_ASSOCIATION_TYPE.dst)
          .setEntityType(MOCK_ASSOCIATION_TYPE.entityType)
          .setSourceEntityTypeIds(MOCK_ASSOCIATION_TYPE.src)
          .build();

        expectValidInstance(associationType);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ASSOCIATION_TYPE_OBJECT)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(MOCK_ASSOCIATION_TYPE)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "bidirectional" property', () => {
        INVALID_PARAMS_FOR_REQUIRED_BOOLEAN.forEach((invalidInput) => {
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE_OBJECT, bidirectional: invalidInput })
          ).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "entityType" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE_OBJECT, entityType: invalidInput })
          ).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "dst" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE_OBJECT, dst: invalidInput })
          ).toEqual(false);
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE_OBJECT, dst: [invalidInput] })
          ).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "src" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE_OBJECT, src: invalidInput })
          ).toEqual(false);
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE_OBJECT, src: [invalidInput] })
          ).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "bidirectional" property', () => {
        INVALID_PARAMS_FOR_REQUIRED_BOOLEAN.forEach((invalidInput) => {
          expect(isValid(
            new AssociationType({
              bidirectional: invalidInput,
              destinationEntityTypeIds: MOCK_ASSOCIATION_TYPE.dst,
              entityType: MOCK_ASSOCIATION_TYPE.entityType,
              sourceEntityTypeIds: MOCK_ASSOCIATION_TYPE.src,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entityType" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AssociationType({
              bidirectional: MOCK_ASSOCIATION_TYPE.bidirectional,
              destinationEntityTypeIds: MOCK_ASSOCIATION_TYPE.dst,
              entityType: invalidInput,
              sourceEntityTypeIds: MOCK_ASSOCIATION_TYPE.src,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "dst" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new AssociationType({
              bidirectional: MOCK_ASSOCIATION_TYPE.bidirectional,
              destinationEntityTypeIds: invalidInput,
              entityType: MOCK_ASSOCIATION_TYPE.entityType,
              sourceEntityTypeIds: MOCK_ASSOCIATION_TYPE.src,
            })
          )).toEqual(false);
          expect(isValid(
            new AssociationType({
              bidirectional: MOCK_ASSOCIATION_TYPE.bidirectional,
              destinationEntityTypeIds: [invalidInput],
              entityType: MOCK_ASSOCIATION_TYPE.entityType,
              sourceEntityTypeIds: MOCK_ASSOCIATION_TYPE.src,
            })
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "src" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new AssociationType({
              bidirectional: MOCK_ASSOCIATION_TYPE.bidirectional,
              destinationEntityTypeIds: MOCK_ASSOCIATION_TYPE.dst,
              entityType: MOCK_ASSOCIATION_TYPE.entityType,
              sourceEntityTypeIds: invalidInput,
            })
          )).toEqual(false);
          expect(isValid(
            new AssociationType({
              bidirectional: MOCK_ASSOCIATION_TYPE.bidirectional,
              destinationEntityTypeIds: MOCK_ASSOCIATION_TYPE.dst,
              entityType: MOCK_ASSOCIATION_TYPE.entityType,
              sourceEntityTypeIds: [invalidInput],
            })
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      expect(MOCK_ASSOCIATION_TYPE.valueOf()).toEqual(
        fromJS({
          bidirectional: MOCK_ASSOCIATION_TYPE.bidirectional,
          dst: MOCK_ASSOCIATION_TYPE.dst,
          entityType: MOCK_ASSOCIATION_TYPE.entityType.toObject(),
          src: MOCK_ASSOCIATION_TYPE.src,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomAssociationType = genRandomAssociationType();
      const associationType0 = (new AssociationTypeBuilder(MOCK_ASSOCIATION_TYPE)).build();
      const associationType1 = (new AssociationTypeBuilder(MOCK_ASSOCIATION_TYPE)).build();

      const testSet = Set()
        .add(associationType0)
        .add(randomAssociationType)
        .add(associationType1);

      expect(testSet.size).toEqual(2);
      expect(testSet.count()).toEqual(2);

      expect(testSet.first().bidirectional).toEqual(MOCK_ASSOCIATION_TYPE.bidirectional);
      expect(testSet.first().dst).toEqual(MOCK_ASSOCIATION_TYPE.dst);
      expect(testSet.first().entityType).toEqual(MOCK_ASSOCIATION_TYPE.entityType);
      expect(testSet.first().src).toEqual(MOCK_ASSOCIATION_TYPE.src);

      expect(testSet.last().bidirectional).toEqual(randomAssociationType.bidirectional);
      expect(testSet.last().dst).toEqual(randomAssociationType.dst);
      expect(testSet.last().entityType).toEqual(randomAssociationType.entityType);
      expect(testSet.last().src).toEqual(randomAssociationType.src);
    });

    test('Immutable.Map', () => {

      const randomAssociationType = genRandomAssociationType();
      const associationType0 = (new AssociationTypeBuilder(MOCK_ASSOCIATION_TYPE)).build();
      const associationType1 = (new AssociationTypeBuilder(MOCK_ASSOCIATION_TYPE)).build();

      const testMap = Map()
        .set(associationType0, 'test_value_1')
        .set(randomAssociationType, 'test_value_2')
        .set(associationType1, 'test_value_3');

      expect(testMap.size).toEqual(2);
      expect(testMap.count()).toEqual(2);
      expect(testMap.get(associationType0)).toEqual('test_value_3');
      expect(testMap.get(randomAssociationType)).toEqual('test_value_2');
      expect(testMap.get(associationType1)).toEqual('test_value_3');
    });

  });

});
