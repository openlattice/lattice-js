import LinkingRequest, {
  LinkingRequestBuilder,
  isValid
} from '../../src/models/LinkingRequest';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

import {
  MOCK_LINKING_REQUEST_DM
} from '../constants/MockDataModels';

describe('LinkingRequest', () => {

  describe('LinkingRequestBuilder', () => {

    let builder :LinkingRequestBuilder = null;

    beforeEach(() => {
      builder = new LinkingRequestBuilder();
    });

    afterEach(() => {
      builder = null;
    });

    describe('setLinkingEntitySet()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setLinkingEntitySet(invalidInput);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setLinkingEntitySet();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setLinkingEntitySet(MOCK_LINKING_REQUEST_DM.linkingEntitySet);
        }).not.toThrow();
      });

    });

    describe('setPropertyTypeIds()', () => {

      it('should throw when given invalid parameters', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypeIds(invalidInput);
          }).toThrow();
          expect(() => {
            builder.setPropertyTypeIds([invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when given a mix of valid and invalid parameters', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(() => {
            builder.setPropertyTypeIds([...MOCK_LINKING_REQUEST_DM.propertyTypeIds, invalidInput]);
          }).toThrow();
        });
      });

      it('should throw when not given any parameters', () => {
        expect(() => {
          builder.setPropertyTypeIds();
        }).toThrow();
      });

      it('should not throw when given valid parameters', () => {
        expect(() => {
          builder.setPropertyTypeIds(MOCK_LINKING_REQUEST_DM.propertyTypeIds);
        }).not.toThrow();
      });

    });

    describe('build()', () => {

      it('should throw when a required property has not been set', () => {

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

      it('should return a valid instance', () => {

        const linkingRequest = builder
          .setLinkingEntitySet(MOCK_LINKING_REQUEST_DM.linkingEntitySet)
          .setPropertyTypeIds(MOCK_LINKING_REQUEST_DM.propertyTypeIds)
          .build();

        expect(linkingRequest).toEqual(jasmine.any(LinkingRequest));

        expect(linkingRequest.linkingEntitySet).toBeDefined();
        expect(linkingRequest.linkingEntitySet).toEqual(MOCK_LINKING_REQUEST_DM.linkingEntitySet);

        expect(linkingRequest.propertyTypeIds).toBeDefined();
        expect(linkingRequest.propertyTypeIds).toEqual(MOCK_LINKING_REQUEST_DM.propertyTypeIds);
      });

    });

  });

  describe('isValid()', () => {

    describe('valid', () => {

      it('should return true when given a valid object literal', () => {
        expect(isValid(MOCK_LINKING_REQUEST_DM)).toEqual(true);
      });

      it('should return true when given a valid instance ', () => {
        expect(isValid(
          new LinkingRequest(
            MOCK_LINKING_REQUEST_DM.linkingEntitySet, MOCK_LINKING_REQUEST_DM.propertyTypeIds
          )
        )).toEqual(true);
      });

      it('should return true when given an instance constructed by the builder', () => {

        const linkingRequest = (new LinkingRequestBuilder())
          .setLinkingEntitySet(MOCK_LINKING_REQUEST_DM.linkingEntitySet)
          .setPropertyTypeIds(MOCK_LINKING_REQUEST_DM.propertyTypeIds)
          .build();

        expect(isValid(linkingRequest)).toEqual(true);
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

      it('should return false when given an object literal with an invalid "linkingEntitySet" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(
            isValid(Object.assign({}, MOCK_LINKING_REQUEST_DM, { linkingEntitySet: invalidInput }))
          ).toEqual(false);
        });
      });

      it('should return false when given an object literal with an invalid "propertyTypeIds" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
          expect(
            isValid(Object.assign({}, MOCK_LINKING_REQUEST_DM, { propertyTypeIds: invalidInput }))
          ).toEqual(false);
          expect(
            isValid(Object.assign({}, MOCK_LINKING_REQUEST_DM, { propertyTypeIds: [invalidInput] }))
          ).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "linkingEntitySet" property', () => {
        INVALID_PARAMS.forEach((invalidInput) => {
          expect(isValid(
            new LinkingRequest(
              invalidInput, MOCK_LINKING_REQUEST_DM.propertyTypeIds
            )
          )).toEqual(false);
        });
      });

      it('should return false when given an instance with an invalid "propertyTypeIds" property', () => {
        INVALID_SS_PARAMS.forEach((invalidInput) => {
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
