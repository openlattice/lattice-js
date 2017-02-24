import LinkingEntitySet, {
  LinkingEntitySetBuilder,
  isValid
} from '../../src/models/LinkingEntitySet';

import {
  INVALID_PARAMS
} from '../constants/TestConstants';

const MOCK_ENTITY_SET = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  entityTypeId: '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
  name: 'name',
  title: 'title',
  description: 'description'
};

const MOCK_LINKING_PROPERTIES = [
  {
    '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e': '4b08e1f9-4a00-4169-92ea-10e377070220',
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085': 'ec6865e6-e60e-424b-a071-6a9c1603d735'
  },
  { 'fae6af98-2675-45bd-9a5b-1619a87235a8': '8f79e123-3411-4099-a41f-88e5d22d0e8d' }
];

const MOCK_LES_OBJ = {
  entitySet: MOCK_ENTITY_SET,
  linkingProperties: MOCK_LINKING_PROPERTIES
};

fdescribe('LinkingEntitySet', () => {

  describe('LinkingEntitySetBuilder', () => {

    let builder :LinkingEntitySetBuilder = null;

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
          builder.setEntitySet(MOCK_ENTITY_SET);
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
            builder.setLinkingProperties([...MOCK_LINKING_PROPERTIES, invalidInput]);
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
          builder.setLinkingProperties(MOCK_LINKING_PROPERTIES);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new LinkingEntitySetBuilder())
            .setEntitySet(MOCK_ENTITY_SET)
            .build();
        }).toThrow();

        expect(() => {
          (new LinkingEntitySetBuilder())
            .setLinkingProperties(MOCK_LINKING_PROPERTIES)
            .build();
        }).toThrow();
      });

      it('should return a valid instance', () => {

        const linkingEntitySet = builder
          .setEntitySet(MOCK_ENTITY_SET)
          .setLinkingProperties(MOCK_LINKING_PROPERTIES)
          .build();

        expect(linkingEntitySet).toEqual(jasmine.any(LinkingEntitySet));

        expect(linkingEntitySet.entitySet).toBeDefined();
        expect(linkingEntitySet.entitySet).toEqual(MOCK_ENTITY_SET);

        expect(linkingEntitySet.linkingProperties).toBeDefined();
        expect(linkingEntitySet.linkingProperties).toEqual(MOCK_LINKING_PROPERTIES);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_LES_OBJ)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new LinkingEntitySet(
            MOCK_ENTITY_SET, MOCK_LINKING_PROPERTIES
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const linkingEntitySet = (new LinkingEntitySetBuilder())
          .setEntitySet(MOCK_ENTITY_SET)
          .setLinkingProperties(MOCK_LINKING_PROPERTIES)
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
          expect(isValid(Object.assign({}, MOCK_LES_OBJ, { entitySet: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "linkingProperties" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_LES_OBJ, { linkingProperties: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_LES_OBJ, { linkingProperties: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "entitySet" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingEntitySet(
              invalidInput, MOCK_LINKING_PROPERTIES
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "linkingProperties" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingEntitySet(
              MOCK_ENTITY_SET, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new LinkingEntitySet(
              MOCK_ENTITY_SET, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
