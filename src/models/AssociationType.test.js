import { Map, Set, fromJS } from 'immutable';

import AssociationType, { AssociationTypeBuilder, isValidAssociationType as isValid } from './AssociationType';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_REQUIRED_BOOLEAN,
  INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';

import {
  MOCK_ASSOCIATION_TYPE,
  genRandomAssociationType,
} from '../utils/testing/MockData';

const {
  bidirectional: mockBidi,
  dst: mockDstEntityTypeIds,
  entityType: mockEntityType,
  src: mockSrcEntityTypeIds,
} = MOCK_ASSOCIATION_TYPE;

describe('AssociationType', () => {

  describe('AssociationTypeBuilder', () => {

    describe('setEntityType()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            (new AssociationTypeBuilder()).setEntityType(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setEntityType();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setEntityType(mockEntityType);
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
            (new AssociationTypeBuilder()).setSourceEntityTypeIds([...mockSrcEntityTypeIds, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setSourceEntityTypeIds();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setSourceEntityTypeIds(mockSrcEntityTypeIds);
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
            (new AssociationTypeBuilder()).setDestinationEntityTypeIds([...mockDstEntityTypeIds, invalidInput]);
          }).toThrow();
        });
      });

      test('should not throw when not given any parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setDestinationEntityTypeIds();
        }).not.toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setDestinationEntityTypeIds(mockDstEntityTypeIds);
        }).not.toThrow();
      });

    });

    describe('setBidirectional()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_FOR_REQUIRED_BOOLEAN.forEach((invalidInput) => {
          expect(() => {
            (new AssociationTypeBuilder()).setBidirectional(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setBidirectional();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          (new AssociationTypeBuilder()).setBidirectional(mockBidi);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {
        expect(() => {
          (new AssociationTypeBuilder())
            .setEntityType(mockEntityType)
            .build();
        }).toThrow();
        expect(() => {
          (new AssociationTypeBuilder())
            .setBidirectional(mockBidi)
            .build();
        }).toThrow();
      });

      test('should not throw when an optional property has not been set', () => {
        expect(() => {
          (new AssociationTypeBuilder())
            // required
            .setBidirectional(mockBidi)
            .setEntityType(mockEntityType)
            // optional
            .setSourceEntityTypeIds(mockSrcEntityTypeIds)
            .build();
        }).not.toThrow();
        expect(() => {
          (new AssociationTypeBuilder())
            // required
            .setBidirectional(mockBidi)
            .setEntityType(mockEntityType)
            // optional
            .setDestinationEntityTypeIds(mockDstEntityTypeIds)
            .build();
        }).not.toThrow();
      });

      test('should set required properties that are allowed to be empty', () => {

        const associationType = (new AssociationTypeBuilder())
          .setBidirectional(mockBidi)
          .setEntityType(mockEntityType)
          .build();

        expect(associationType.dst).toEqual([]);
        expect(associationType.src).toEqual([]);
      });

      test('should return a valid instance', () => {

        const associationType = (new AssociationTypeBuilder())
          .setBidirectional(mockBidi)
          .setDestinationEntityTypeIds(mockDstEntityTypeIds)
          .setEntityType(mockEntityType)
          .setSourceEntityTypeIds(mockSrcEntityTypeIds)
          .build();

        expect(associationType).toBeInstanceOf(AssociationType);
        expect(associationType.bidirectional).toEqual(mockBidi);
        expect(associationType.dst).toEqual(mockDstEntityTypeIds);
        expect(associationType.entityType).toEqual(mockEntityType);
        expect(associationType.src).toEqual(mockSrcEntityTypeIds);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_ASSOCIATION_TYPE)).toEqual(true);
      });

      test('should return true when given a valid object instance ', () => {
        expect(isValid(
          new AssociationType(
            mockEntityType, mockSrcEntityTypeIds, mockDstEntityTypeIds, mockBidi
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const associationType = (new AssociationTypeBuilder())
          .setBidirectional(mockBidi)
          .setDestinationEntityTypeIds(mockDstEntityTypeIds)
          .setEntityType(mockEntityType)
          .setSourceEntityTypeIds(mockSrcEntityTypeIds)
          .build();

        expect(isValid(associationType)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "entityType" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE.toObject(), entityType: invalidInput })
          ).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "sourceEntityTypeIds" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE.toObject(), sourceEntityTypeIds: invalidInput })
          ).toEqual(false);
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE.toObject(), sourceEntityTypeIds: [invalidInput] })
          ).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "dstEntityTypeIds" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE.toObject(), destinationEntityTypeIds: invalidInput })
          ).toEqual(false);
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE.toObject(), destinationEntityTypeIds: [invalidInput] })
          ).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "bidirectional" property', () => {
        INVALID_PARAMS_FOR_REQUIRED_BOOLEAN.forEach((invalidInput) => {
          expect(
            isValid({ ...MOCK_ASSOCIATION_TYPE.toObject(), bidirectional: invalidInput })
          ).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entityType" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new AssociationType(
              invalidInput, mockSrcEntityTypeIds, mockDstEntityTypeIds, mockBidi
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "sourceEntityTypeIds" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new AssociationType(
              mockEntityType, invalidInput, mockDstEntityTypeIds, mockBidi
            )
          )).toEqual(false);
          expect(isValid(
            new AssociationType(
              mockEntityType, [invalidInput], mockDstEntityTypeIds, mockBidi
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "destinationEntityTypeIds" property', () => {
        INVALID_PARAMS_FOR_OPTIONAL_SS_ARRAY.forEach((invalidInput) => {
          expect(isValid(
            new AssociationType(
              mockEntityType, mockSrcEntityTypeIds, invalidInput, mockBidi
            )
          )).toEqual(false);
          expect(isValid(
            new AssociationType(
              mockEntityType, mockSrcEntityTypeIds, [invalidInput], mockBidi
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "bidirectional" property', () => {
        INVALID_PARAMS_FOR_REQUIRED_BOOLEAN.forEach((invalidInput) => {
          expect(isValid(
            new AssociationType(
              mockEntityType, mockSrcEntityTypeIds, mockDstEntityTypeIds, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

  describe('equality', () => {

    test('valueOf()', () => {
      const associationType = new AssociationType(
        mockEntityType, mockSrcEntityTypeIds, mockDstEntityTypeIds, mockBidi
      );
      expect(associationType.valueOf()).toEqual(
        fromJS({
          bidirectional: mockBidi,
          dst: mockDstEntityTypeIds,
          entityType: mockEntityType.toObject(),
          src: mockSrcEntityTypeIds,
        }).hashCode()
      );
    });

    test('Immutable.Set', () => {

      const randomAssociationType = genRandomAssociationType();
      const associationType0 = new AssociationType(
        MOCK_ASSOCIATION_TYPE.entityType,
        MOCK_ASSOCIATION_TYPE.src,
        MOCK_ASSOCIATION_TYPE.dst,
        MOCK_ASSOCIATION_TYPE.bidirectional,
      );
      const associationType1 = new AssociationType(
        MOCK_ASSOCIATION_TYPE.entityType,
        MOCK_ASSOCIATION_TYPE.src,
        MOCK_ASSOCIATION_TYPE.dst,
        MOCK_ASSOCIATION_TYPE.bidirectional,
      );

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
      const associationType0 = new AssociationType(
        MOCK_ASSOCIATION_TYPE.entityType,
        MOCK_ASSOCIATION_TYPE.src,
        MOCK_ASSOCIATION_TYPE.dst,
        MOCK_ASSOCIATION_TYPE.bidirectional,
      );
      const associationType1 = new AssociationType(
        MOCK_ASSOCIATION_TYPE.entityType,
        MOCK_ASSOCIATION_TYPE.src,
        MOCK_ASSOCIATION_TYPE.dst,
        MOCK_ASSOCIATION_TYPE.bidirectional,
      );

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
