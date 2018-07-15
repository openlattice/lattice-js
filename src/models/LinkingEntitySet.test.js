import LinkingEntitySet, { LinkingEntitySetBuilder, isValidLinkingEntitySet as isValid } from './LinkingEntitySet';
import { INVALID_PARAMS } from '../utils/testing/Invalid';
import { MOCK_LINKING_ENTITY_SET_DM } from '../utils/testing/MockDataModels';

describe('LinkingEntitySet', () => {

  describe('LinkingEntitySetBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new LinkingEntitySetBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setEntitySet()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntitySet(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setEntitySet();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setEntitySet(MOCK_LINKING_ENTITY_SET_DM.entitySet);
        }).not.toThrow();
      });

    });

    describe('setLinkingProperties()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setLinkingProperties(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setLinkingProperties([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setLinkingProperties([...MOCK_LINKING_ENTITY_SET_DM.linkingProperties, invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setLinkingProperties();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setLinkingProperties(MOCK_LINKING_ENTITY_SET_DM.linkingProperties);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new LinkingEntitySetBuilder())
            .setEntitySet(MOCK_LINKING_ENTITY_SET_DM.entitySet)
            .build();
        }).toThrow();

        expect(() => {
          (new LinkingEntitySetBuilder())
            .setLinkingProperties(MOCK_LINKING_ENTITY_SET_DM.linkingProperties)
            .build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const linkingEntitySet = builder
          .setEntitySet(MOCK_LINKING_ENTITY_SET_DM.entitySet)
          .setLinkingProperties(MOCK_LINKING_ENTITY_SET_DM.linkingProperties)
          .build();

        expect(linkingEntitySet).toBeInstanceOf(LinkingEntitySet);

        expect(linkingEntitySet.entitySet).toBeDefined();
        expect(linkingEntitySet.entitySet).toEqual(MOCK_LINKING_ENTITY_SET_DM.entitySet);

        expect(linkingEntitySet.linkingProperties).toBeDefined();
        expect(linkingEntitySet.linkingProperties).toEqual(MOCK_LINKING_ENTITY_SET_DM.linkingProperties);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_LINKING_ENTITY_SET_DM)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new LinkingEntitySet(
            MOCK_LINKING_ENTITY_SET_DM.entitySet, MOCK_LINKING_ENTITY_SET_DM.linkingProperties
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const linkingEntitySet = (new LinkingEntitySetBuilder())
          .setEntitySet(MOCK_LINKING_ENTITY_SET_DM.entitySet)
          .setLinkingProperties(MOCK_LINKING_ENTITY_SET_DM.linkingProperties)
          .build();

        expect(isValid(linkingEntitySet)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "entitySet" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_LINKING_ENTITY_SET_DM, { entitySet: invalidInput }))).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "linkingProperties" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(
            isValid(Object.assign({}, MOCK_LINKING_ENTITY_SET_DM, { linkingProperties: invalidInput }))
          ).toEqual(false);
          expect(
            isValid(Object.assign({}, MOCK_LINKING_ENTITY_SET_DM, { linkingProperties: [invalidInput] }))
          ).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "entitySet" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingEntitySet(
              invalidInput, MOCK_LINKING_ENTITY_SET_DM.linkingProperties
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "linkingProperties" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingEntitySet(
              MOCK_LINKING_ENTITY_SET_DM.entitySet, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new LinkingEntitySet(
              MOCK_LINKING_ENTITY_SET_DM.entitySet, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
