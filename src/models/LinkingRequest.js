/*
 * @flow
 */

import Logger from '../utils/Logger';
import LinkingEntitySet, { isValidLinkingEntitySet } from './LinkingEntitySet';
import { isDefined } from '../utils/LangUtils';
import { isValidUuidArray } from '../utils/ValidationUtils';

const LOG = new Logger('LinkingRequest');

export default class LinkingRequest {

  linkingEntitySet :LinkingEntitySet;
  propertyTypeIds :UUID[];

  constructor(linkingEntitySet :LinkingEntitySet, propertyTypeIds :UUID[]) {

    this.linkingEntitySet = linkingEntitySet;
    this.propertyTypeIds = propertyTypeIds;
  }
}

export class LinkingRequestBuilder {

  linkingEntitySet :LinkingEntitySet;
  propertyTypeIds :UUID[];

  setLinkingEntitySet(linkingEntitySet :LinkingEntitySet) :LinkingRequestBuilder {

    if (!isValidLinkingEntitySet(linkingEntitySet)) {
      throw new Error('invalid parameter: linkingEntitySet must be a valid LinkingEntitySet');
    }

    this.linkingEntitySet = linkingEntitySet;
    return this;
  }

  setPropertyTypeIds(propertyTypeIds :UUID[]) :LinkingRequestBuilder {

    if (!isValidUuidArray(propertyTypeIds)) {
      throw new Error('invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs');
    }

    this.propertyTypeIds = propertyTypeIds;

    return this;
  }

  build() :LinkingRequest {

    if (!this.linkingEntitySet) {
      throw new Error('missing property: linkingEntitySet is a required property');
    }

    if (!this.propertyTypeIds) {
      throw new Error('missing property: propertyTypeIds is a required property');
    }

    return new LinkingRequest(
      this.linkingEntitySet,
      this.propertyTypeIds
    );
  }
}

export function isValidLinkingRequest(linkingRequest :any) :boolean {

  if (!isDefined(linkingRequest)) {

    LOG.error('invalid parameter: linkingRequest must be defined', linkingRequest);
    return false;
  }

  try {

    (new LinkingRequestBuilder())
      .setLinkingEntitySet(linkingRequest.linkingEntitySet)
      .setPropertyTypeIds(linkingRequest.propertyTypeIds)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, linkingRequest);
    return false;
  }
}
