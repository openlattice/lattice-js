import LinkingRequest, { LinkingRequestBuilder, isValidLinkingRequest as isValid } from './LinkingRequest';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_LINKING_REQUEST_DM } from '../utils/testing/MockDataModels';

describe('LinkingRequest', () => {

  describe('LinkingRequestBuilder', () => {

    let builder = null;

    beforeEach(() => {
      builder = new LinkingRequestBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setLinkingEntitySet()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setLinkingEntitySet(invalidInput);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setLinkingEntitySet();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setLinkingEntitySet(MOCK_LINKING_REQUEST_DM.linkingEntitySet);
        }).not.toThrow();
      });

    });

    describe('setPropertyTypeIds()', () => {

      test('should throw when given invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypeIds(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPropertyTypeIds([invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypeIds([...MOCK_LINKING_REQUEST_DM.propertyTypeIds, invalidInput]);
          }).toThrow();
        });
      });

      test('should throw when not given any parameters', () => {
        expect(() => {
          builder.setPropertyTypeIds();
        }).toThrow();
      });

      test('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPropertyTypeIds(MOCK_LINKING_REQUEST_DM.propertyTypeIds);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      test('should throw when a required property has not been set', () => {

        expect(() => {
          (new LinkingRequestBuilder())
            .setLinkingEntitySet(MOCK_LINKING_REQUEST_DM.linkingEntitySet)
            .build();
        }).toThrow();

        expect(() => {
          (new LinkingRequestBuilder())
            .setPropertyTypeIds(MOCK_LINKING_REQUEST_DM.propertyTypeIds)
            .build();
        }).toThrow();
      });

      test('should return a valid instance', () => {

        const linkingRequest = builder
          .setLinkingEntitySet(MOCK_LINKING_REQUEST_DM.linkingEntitySet)
          .setPropertyTypeIds(MOCK_LINKING_REQUEST_DM.propertyTypeIds)
          .build();

        expect(linkingRequest).toBeInstanceOf(LinkingRequest);

        expect(linkingRequest.linkingEntitySet).toBeDefined();
        expect(linkingRequest.linkingEntitySet).toEqual(MOCK_LINKING_REQUEST_DM.linkingEntitySet);

        expect(linkingRequest.propertyTypeIds).toBeDefined();
        expect(linkingRequest.propertyTypeIds).toEqual(MOCK_LINKING_REQUEST_DM.propertyTypeIds);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      test('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_LINKING_REQUEST_DM)).toEqual(true);
      });

      test('should return true when given a valid instance ', () => {
        expect(isValid(
          new LinkingRequest(
            MOCK_LINKING_REQUEST_DM.linkingEntitySet, MOCK_LINKING_REQUEST_DM.propertyTypeIds
          )
        )).toEqual(true);
      });

      test('should return true when given an instance constructed by the builder', () => {

        const linkingRequest = (new LinkingRequestBuilder())
          .setLinkingEntitySet(MOCK_LINKING_REQUEST_DM.linkingEntitySet)
          .setPropertyTypeIds(MOCK_LINKING_REQUEST_DM.propertyTypeIds)
          .build();

        expect(isValid(linkingRequest)).toEqual(true);
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

      test('should return false when given an object literal with an invalid "linkingEntitySet" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(
            isValid({ ...MOCK_LINKING_REQUEST_DM, linkingEntitySet: invalidInput })
          ).toEqual(false);
        });
      });

      test('should return false when given an object literal with an invalid "propertyTypeIds" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(
            isValid({ ...MOCK_LINKING_REQUEST_DM, propertyTypeIds: invalidInput })
          ).toEqual(false);
          expect(
            isValid({ ...MOCK_LINKING_REQUEST_DM, propertyTypeIds: [invalidInput] })
          ).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "linkingEntitySet" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingRequest(
              invalidInput, MOCK_LINKING_REQUEST_DM.propertyTypeIds
            )
          )).toEqual(false);
        });
      });

      test('should return false when given an instance with an invalid "propertyTypeIds" property', () => {
        INVALID_PARAMS_SS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingRequest(
              MOCK_LINKING_REQUEST_DM.linkingEntitySet, invalidInput
            )
          )).toEqual(false);
          expect(isValid(
            new LinkingRequest(
              MOCK_LINKING_REQUEST_DM.linkingEntitySet, [invalidInput]
            )
          )).toEqual(false);
        });
      });

    });

  });

});
