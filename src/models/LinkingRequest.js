/*
 * @flow
 */

import Logger from '../utils/Logger';

import LinkingEntitySet, {
  isValid as isValidLinkingEntitySet
} from '../models/LinkingEntitySet';

import {
  isDefined,
  isNonEmptyArray
} from '../utils/LangUtils';

import {
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('LinkingRequest');

export default class LinkingRequest {

  linkingEntitySet :LinkingEntitySet;
  propertyTypes :UUID[];

  constructor(linkingEntitySet :LinkingEntitySet, propertyTypes :UUID[]) {

    this.linkingEntitySet = linkingEntitySet;
    this.propertyTypes = propertyTypes;
  }
}

export class LinkingRequestBuilder {

  linkingEntitySet :LinkingEntitySet;
  propertyTypes :UUID[];

  setLinkingEntitySet(linkingEntitySet :LinkingEntitySet) :LinkingRequestBuilder {

    if (!isValidLinkingEntitySet(linkingEntitySet)) {
      throw new Error('invalid parameter: linkingEntitySet must be a valid LinkingEntitySet');
    }

    this.linkingEntitySet = linkingEntitySet;
    return this;
  }

  setPropertyTypes(propertyTypes :UUID[]) :LinkingRequestBuilder {

    if (!isNonEmptyArray(propertyTypes)) {
      throw new Error('invalid parameter: propertyTypes must be a non-empty array');
    }

    if (!isValidUuidArray(propertyTypes)) {
      throw new Error('invalid parameter: propertyTypes must be a non-empty array of valid UUIDs');
    }

    this.propertyTypes = propertyTypes;

    return this;
  }

  build() :LinkingRequest {

    if (!this.linkingEntitySet) {
      throw new Error('missing property: linkingEntitySet is a required property');
    }

    if (!this.propertyTypes) {
      throw new Error('missing property: propertyTypes is a required property');
    }

    return new LinkingRequest(
      this.linkingEntitySet,
      this.propertyTypes
    );
  }
}

export function isValid(linkingRequest :any) :boolean {

  if (!isDefined(linkingRequest)) {

    LOG.error('invalid parameter: linkingRequest must be defined', linkingRequest);
    return false;
  }

  try {

    (new LinkingRequestBuilder())
      .setLinkingEntitySet(linkingRequest.linkingEntitySet)
      .setPropertyTypes(linkingRequest.propertyTypes)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, linkingRequest);
    return false;
  }
}
