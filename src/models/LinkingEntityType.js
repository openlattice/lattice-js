/*
 * @flow
 */

import has from 'lodash/has';
import isBoolean from 'lodash/isBoolean';
import { Set } from 'immutable';

import Logger from '../utils/Logger';
import EntityType, { isValidEntityType } from './EntityType';
import { isDefined } from '../utils/LangUtils';
import { isValidUuidArray } from '../utils/ValidationUtils';

const LOG = new Logger('LinkingEntityType');

/**
 * @class LinkingEntityType
 * @memberof lattice
 */
export default class LinkingEntityType {

  entityType :EntityType;
  entityTypeIds :UUID[];
  deidentified :?boolean;

  constructor(entityType :EntityType, entityTypeIds :UUID[], deidentified :?boolean) {

    this.entityType = entityType;
    this.entityTypeIds = entityTypeIds;
    this.deidentified = deidentified;
  }
}

/**
 * @class LinkingEntityTypeBuilder
 * @memberof lattice
 */
export class LinkingEntityTypeBuilder {

  entityType :EntityType;
  entityTypeIds :UUID[];
  deidentified :?boolean;

  setEntityType(entityType :EntityType) :LinkingEntityTypeBuilder {

    if (!isValidEntityType(entityType)) {
      throw new Error('invalid parameter: entityType must be a valid EntityType');
    }

    this.entityType = entityType;
    return this;
  }

  setEntityTypeIds(entityTypeIds :UUID[]) :LinkingEntityTypeBuilder {

    if (!isValidUuidArray(entityTypeIds)) {
      throw new Error('invalid parameter: entityTypeIds must be an array of valid UUIDs');
    }

    this.entityTypeIds = Set().withMutations((set :Set<UUID>) => {
      entityTypeIds.forEach((entityTypeId :UUID) => {
        set.add(entityTypeId);
      });
    }).toJS();

    return this;
  }

  setDeidentified(deidentified :?boolean) :LinkingEntityTypeBuilder {

    if (!isBoolean(deidentified)) {
      throw new Error('invalid parameter: deidentified must be a boolean');
    }

    this.deidentified = deidentified;
    return this;
  }

  build() :LinkingEntityType {

    if (!this.entityType) {
      throw new Error('missing property: entityType is a required property');
    }

    if (!this.entityTypeIds) {
      throw new Error('missing property: entityTypeIds is a required property');
    }

    return new LinkingEntityType(
      this.entityType,
      this.entityTypeIds,
      this.deidentified
    );
  }
}

export function isValidLinkingEntityType(linkingEntityType :any) :boolean {

  if (!isDefined(linkingEntityType)) {

    LOG.error('invalid parameter: linkingEntityType must be defined', linkingEntityType);
    return false;
  }

  try {

    const linkingEntityTypeBuilder = new LinkingEntityTypeBuilder();

    // required properties
    linkingEntityTypeBuilder
      .setEntityType(linkingEntityType.entityType)
      .setEntityTypeIds(linkingEntityType.entityTypeIds);

    // optional properties
    if (has(linkingEntityType, 'deidentified')) {
      linkingEntityTypeBuilder.setDeidentified(linkingEntityType.deidentified);
    }

    linkingEntityTypeBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, linkingEntityType);
    return false;
  }
}
