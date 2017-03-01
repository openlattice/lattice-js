import LinkingEntityType, {
  LinkingEntityTypeBuilder,
  isValid
} from '../../src/models/LinkingEntityType';

import {
  isDefined
} from '../../src/utils/LangUtils';

import {
  INVALID_PARAMS,
  INVALID_PARAMS_BOOLEANS_ALLOWED
} from '../constants/TestConstants';

const MOCK_ENTITY_TYPE = {
  title: 'MyEntity',
  description: 'so this is an EntityType',
  type: { namespace: 'LOOM', name: 'ENTITY_TYPE' },
  schemas: [
    { namespace: 'LOOM', name: 'SCHEMA' }
  ],
  key: [
    '8f79e123-3411-4099-a41f-88e5d22d0e8d'
  ],
  properties: [
    '8f79e123-3411-4099-a41f-88e5d22d0e8d'
  ]
};

const MOCK_ET_IDS = [
  'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
  'fae6af98-2675-45bd-9a5b-1619a87235a8'
];

const MOCK_LET_OBJ = {
  entityType: MOCK_ENTITY_TYPE,
  entityTypeIds: MOCK_ET_IDS,
  deidentified: false
};

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
          builder.setEntityType(MOCK_ENTITY_TYPE);
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
            builder.setEntityTypeIds([...MOCK_ET_IDS, invalidInput]);
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
          builder.setEntityTypeIds(MOCK_ET_IDS);
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
            .setEntityType(MOCK_ENTITY_TYPE)
            .build();
        }).toThrow();

        expect(() => {
          (new LinkingEntityTypeBuilder())
            .setEntityTypeIds(MOCK_ET_IDS)
            .build();
        }).toThrow();
      });

      it('should not throw when an optional property has not been set', () => {

        expect(() => {
          (new LinkingEntityTypeBuilder())
            .setEntityType(MOCK_ENTITY_TYPE)
            .setEntityTypeIds(MOCK_ET_IDS)
            .build();
        }).not.toThrow();
      });

      it('should return a valid instance', () => {

        const linkingEntityType = builder
          .setEntityType(MOCK_ENTITY_TYPE)
          .setEntityTypeIds(MOCK_ET_IDS)
          .setDeidentified(true)
          .build();

        expect(linkingEntityType).toEqual(jasmine.any(LinkingEntityType));

        expect(linkingEntityType.entityType).toBeDefined();
        expect(linkingEntityType.entityType).toEqual(MOCK_ENTITY_TYPE);

        expect(linkingEntityType.entityTypeIds).toBeDefined();
        expect(linkingEntityType.entityTypeIds).toEqual(MOCK_ET_IDS);

        expect(linkingEntityType.deidentified).toBeDefined();
        expect(linkingEntityType.deidentified).toEqual(true);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_LET_OBJ)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new LinkingEntityType(
            MOCK_ENTITY_TYPE, MOCK_ET_IDS, false
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const linkingEntityType = (new LinkingEntityTypeBuilder())
          .setEntityType(MOCK_ENTITY_TYPE)
          .setEntityTypeIds(MOCK_ET_IDS)
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
          expect(isValid(Object.assign({}, MOCK_LET_OBJ, { entityType: invalidInput }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "entityTypeIds" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(Object.assign({}, MOCK_LET_OBJ, { entityTypeIds: invalidInput }))).toEqual(false);
          expect(isValid(Object.assign({}, MOCK_LET_OBJ, { entityTypeIds: [invalidInput] }))).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "deidentified" property', () => {
        INVALID_PARAMS_BOOLEANS_ALLOWED.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(Object.assign({}, MOCK_LET_OBJ, { deidentified: invalidInput }))).toEqual(false);
          }
        });
      });

      it('should return false when given an instance with an invalid "entityType" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingEntityType(
              invalidInput, MOCK_ET_IDS, true
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "entityTypeIds" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingEntityType(
              MOCK_ENTITY_TYPE, invalidInput, true
            )
          )).toEqual(false);
          expect(isValid(
            new LinkingEntityType(
              MOCK_ENTITY_TYPE, [invalidInput], true
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "deidentified" property', () => {
        INVALID_PARAMS_BOOLEANS_ALLOWED.forEach((invalidInput) => {
          if (isDefined(invalidInput)) {
            expect(isValid(
              new LinkingEntityType(
                MOCK_ENTITY_TYPE, MOCK_ET_IDS, invalidInput
              )
            )).toEqual(false);
          }
        });
      });

    });

  });

});
