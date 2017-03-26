import LinkingEntityType, {
  LinkingEntityTypeBuilder,
  isValid
} from '../../src/models/LinkingEntityType';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_BOOLEANS_ALLOWED
} from '../constants/InvalidParams';

import {
  MOCK_LINKING_ENTITY_TYPE_DM
} from '../constants/MockDataModels';

describe('LinkingEntityType', () => {

  describe('LinkingEntityTypeBuilder', () => {

    let builder :LinkingEntityTypeBuilder = null;

    beforeEach(() => {
      builder = new LinkingEntityTypeBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setEntityType()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntityType(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setEntityType();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setEntityType(MOCK_LINKING_ENTITY_TYPE_DM.entityType);
        }).not.toThrow();
      });

    });

    describe('setEntityTypeIds()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntityTypeIds(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setEntityTypeIds([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setEntityTypeIds([...MOCK_LINKING_ENTITY_TYPE_DM.entityTypeIds, invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setEntityTypeIds();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setEntityTypeIds(MOCK_LINKING_ENTITY_TYPE_DM.entityTypeIds);
        }).not.toThrow();
      });

    });

    describe('setDeidentified()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS_BOOLEANS_ALLOWED.forEach((invalidInput) => {
          expect(() => {
            builder.setDeidentified(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setDeidentified();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setDeidentified(true);
        }).not.toThrow();
        expect(() => {
          builder.setDeidentified(false);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

        expect(() => {
          (new LinkingEntityTypeBuilder())
            .setEntityType(MOCK_LINKING_ENTITY_TYPE_DM.entityType)
            .build();
        }).toThrow();

        expect(() => {
          (new LinkingEntityTypeBuilder())
            .setEntityTypeIds(MOCK_LINKING_ENTITY_TYPE_DM.entityTypeIds)
            .build();
        }).toThrow();
      });

      it('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new LinkingEntityTypeBuilder())
            .setEntityType(MOCK_LINKING_ENTITY_TYPE_DM.entityType)
            .setEntityTypeIds(MOCK_LINKING_ENTITY_TYPE_DM.entityTypeIds)
            .build();
        }).not.toThrow();
      });

      it('should return a valid instance', () => {

        const linkingEntityType = builder
          .setEntityType(MOCK_LINKING_ENTITY_TYPE_DM.entityType)
          .setEntityTypeIds(MOCK_LINKING_ENTITY_TYPE_DM.entityTypeIds)
          .setDeidentified(true)
          .build();

        expect(linkingEntityType).toEqual(jasmine.any(LinkingEntityType));

        expect(linkingEntityType.entityType).toBeDefined();
        expect(linkingEntityType.entityType).toEqual(MOCK_LINKING_ENTITY_TYPE_DM.entityType);

        expect(linkingEntityType.entityTypeIds).toBeDefined();
        expect(linkingEntityType.entityTypeIds).toEqual(MOCK_LINKING_ENTITY_TYPE_DM.entityTypeIds);

        expect(linkingEntityType.deidentified).toBeDefined();
        expect(linkingEntityType.deidentified).toEqual(true);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_LINKING_ENTITY_TYPE_DM)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new LinkingEntityType(
            MOCK_LINKING_ENTITY_TYPE_DM.entityType, MOCK_LINKING_ENTITY_TYPE_DM.entityTypeIds, false
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const linkingEntityType = (new LinkingEntityTypeBuilder())
          .setEntityType(MOCK_LINKING_ENTITY_TYPE_DM.entityType)
          .setEntityTypeIds(MOCK_LINKING_ENTITY_TYPE_DM.entityTypeIds)
          .setDeidentified(true)
          .build();

        expect(isValid(linkingEntityType)).toEqual(true);
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

      it('should return false when given an object literal with an invalid "entityType" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_LINKING_ENTITY_TYPE_DM, { entityType: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "entityTypeIds" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(
            isValid(Object.assign({}, MOCK_LINKING_ENTITY_TYPE_DM, { entityTypeIds: invalidInput }))
          ).toEqual(false);
          expect(
            isValid(Object.assign({}, MOCK_LINKING_ENTITY_TYPE_DM, { entityTypeIds: [invalidInput] }))
          ).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "deidentified" property', () => {
        INVALID_PARAMS_BOOLEANS_ALLOWED.forEach((invalidInput) => {
          expect(
            isValid(Object.assign({}, MOCK_LINKING_ENTITY_TYPE_DM, { deidentified: invalidInput }))
          ).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "entityType" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingEntityType(
              invalidInput, MOCK_LINKING_ENTITY_TYPE_DM.entityTypeIds, true
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "entityTypeIds" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingEntityType(
              MOCK_LINKING_ENTITY_TYPE_DM.entityType, invalidInput, true
            )
          )).toEqual(false);
          expect(isValid(
            new LinkingEntityType(
              MOCK_LINKING_ENTITY_TYPE_DM.entityType, [invalidInput], true
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "deidentified" property', () => {
        INVALID_PARAMS_BOOLEANS_ALLOWED.forEach((invalidInput) => {
          expect(isValid(
            new LinkingEntityType(
              MOCK_LINKING_ENTITY_TYPE_DM.entityType, MOCK_LINKING_ENTITY_TYPE_DM.entityTypeIds, invalidInput
            )
          )).toEqual(false);
        });
      });

    });

  });

});
