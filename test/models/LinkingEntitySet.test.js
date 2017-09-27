import LinkingEntitySet, {
  LinkingEntitySetBuilder,
  isValid
} from '../../src/models/LinkingEntitySet';

import {
  INVALID_PARAMS
} from '../constants/InvalidParams';

import {
  MOCK_LINKING_ENTITY_SET_DM
} from '../constants/MockDataModels';

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

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntitySet(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setEntitySet();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setEntitySet(MOCK_LINKING_ENTITY_SET_DM.entitySet);
        }).not.toThrow();
      });

    });

    describe('setLinkingProperties()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setLinkingProperties(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setLinkingProperties([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setLinkingProperties([...MOCK_LINKING_ENTITY_SET_DM.linkingProperties, invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setLinkingProperties();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setLinkingProperties(MOCK_LINKING_ENTITY_SET_DM.linkingProperties);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

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

      it('should return a valid instance', () => {

        const linkingEntitySet = builder
          .setEntitySet(MOCK_LINKING_ENTITY_SET_DM.entitySet)
          .setLinkingProperties(MOCK_LINKING_ENTITY_SET_DM.linkingProperties)
          .build();

        expect(linkingEntitySet).toEqual(jasmine.any(LinkingEntitySet));

        expect(linkingEntitySet.entitySet).toBeDefined();
        expect(linkingEntitySet.entitySet).toEqual(MOCK_LINKING_ENTITY_SET_DM.entitySet);

        expect(linkingEntitySet.linkingProperties).toBeDefined();
        expect(linkingEntitySet.linkingProperties).toEqual(MOCK_LINKING_ENTITY_SET_DM.linkingProperties);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_LINKING_ENTITY_SET_DM)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new LinkingEntitySet(
            MOCK_LINKING_ENTITY_SET_DM.entitySet, MOCK_LINKING_ENTITY_SET_DM.linkingProperties
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const linkingEntitySet = (new LinkingEntitySetBuilder())
          .setEntitySet(MOCK_LINKING_ENTITY_SET_DM.entitySet)
          .setLinkingProperties(MOCK_LINKING_ENTITY_SET_DM.linkingProperties)
          .build();

        expect(isValid(linkingEntitySet)).toEqual(true);
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

      it('should return false when given an object literal with an invalid "entitySet" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_LINKING_ENTITY_SET_DM, { entitySet: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "linkingProperties" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(
            isValid(Object.assign({}, MOCK_LINKING_ENTITY_SET_DM, { linkingProperties: invalidInput }))
          ).toEqual(false);
          expect(
            isValid(Object.assign({}, MOCK_LINKING_ENTITY_SET_DM, { linkingProperties: [invalidInput] }))
          ).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "entitySet" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingEntitySet(
              invalidInput, MOCK_LINKING_ENTITY_SET_DM.linkingProperties
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "linkingProperties" property', () => {
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
