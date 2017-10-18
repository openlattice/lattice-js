/*
 * @flow
 */

import Immutable from 'immutable';
import isBoolean from 'lodash/isBoolean';

import Logger from '../utils/Logger';

import EntityType, {
  isValid as isValidEntityType
} from '../models/EntityType';

import { isDefined, isEmptyArray } from '../utils/LangUtils';
import { isValidUuidArray } from '../utils/ValidationUtils';

const LOG = new Logger('AssociationType');

/**
 * @class AssociationType
 * @memberof lattice
 */
export default class AssociationType {

  entityType :EntityType;
  src :UUID[];
  dst :UUID[];
  bidirectional :boolean;

  constructor(
      entityType :EntityType,
      sourceEntityTypeIds :UUID[],
      destinationEntityTypeIds :UUID[],
      bidirectional :boolean
  ) {

    // required properties
    this.entityType = entityType;
    this.src = sourceEntityTypeIds;
    this.dst = destinationEntityTypeIds;
    this.bidirectional = bidirectional;
  }

  asImmutable() {

    const associationTypeObj = {};

    // required properties
    associationTypeObj.entityType = this.entityType.asImmutable();
    associationTypeObj.src = this.src;
    associationTypeObj.dst = this.dst;
    associationTypeObj.bidirectional = this.bidirectional;

    return Immutable.fromJS(associationTypeObj);
  }
}

/**
 * @class AssociationTypeBuilder
 * @memberof lattice
 */
export class AssociationTypeBuilder {

  entityType :EntityType;
  sourceEntityTypeIds :UUID[];
  destinationEntityTypeIds :UUID[];
  bidirectional :boolean;

  setEntityType(entityType :EntityType) :AssociationTypeBuilder {

    if (!isValidEntityType(entityType)) {
      throw new Error('invalid parameter: entityType must be a valid EntityType');
    }

    this.entityType = entityType;
    return this;
  }

  setSourceEntityTypeIds(sourceEntityTypeIds :UUID[]) :AssociationTypeBuilder {

    if (!isDefined(sourceEntityTypeIds) || isEmptyArray(sourceEntityTypeIds)) {
      return this;
    }

    if (!isValidUuidArray(sourceEntityTypeIds)) {
      throw new Error('invalid parameter: sourceEntityTypeIds must be an array of valid UUIDs');
    }

    this.sourceEntityTypeIds = Immutable.Set().withMutations((set :Set<UUID>) => {
      sourceEntityTypeIds.forEach((entityTypeId :UUID) => {
        set.add(entityTypeId);
      });
    }).toJS();

    return this;
  }

  setDestinationEntityTypeIds(destinationEntityTypeIds :UUID[]) :AssociationTypeBuilder {

    if (!isDefined(destinationEntityTypeIds) || isEmptyArray(destinationEntityTypeIds)) {
      return this;
    }

    if (!isValidUuidArray(destinationEntityTypeIds)) {
      throw new Error('invalid parameter: destinationEntityTypeIds must be an array of valid UUIDs');
    }

    this.destinationEntityTypeIds = Immutable.Set().withMutations((set :Set<UUID>) => {
      destinationEntityTypeIds.forEach((entityTypeId :UUID) => {
        set.add(entityTypeId);
      });
    }).toJS();

    return this;
  }

  setBidirectional(bidirectional :boolean) :AssociationTypeBuilder {

    if (!isBoolean(bidirectional)) {
      throw new Error('invalid parameter: bidirectional must be a boolean');
    }

    this.bidirectional = bidirectional;
    return this;
  }

  build() :AssociationType {

    let errorMsg :string = '';

    if (!this.entityType) {
      errorMsg = 'missing property: entityType is a required property';
    }

    if (this.bidirectional === null || this.bidirectional === undefined) {
      errorMsg = 'missing property: bidirectional is a required property';
    }

    if (errorMsg) {
      LOG.error(errorMsg);
      throw new Error(errorMsg);
    }

    if (!this.sourceEntityTypeIds) {
      this.sourceEntityTypeIds = [];
    }

    if (!this.destinationEntityTypeIds) {
      this.destinationEntityTypeIds = [];
    }

    return new AssociationType(
      this.entityType,
      this.sourceEntityTypeIds,
      this.destinationEntityTypeIds,
      this.bidirectional
    );
  }
}

export function isValid(associationType :any) :boolean {

  if (!isDefined(associationType)) {

    LOG.error('invalid parameter: associationType must be defined', associationType);
    return false;
  }

  try {

    const associationTypeBuilder = new AssociationTypeBuilder();

    // required properties
    associationTypeBuilder
      .setEntityType(associationType.entityType)
      .setSourceEntityTypeIds(associationType.sourceEntityTypeIds)
      .setDestinationEntityTypeIds(associationType.destinationEntityTypeIds)
      .setBidirectional(associationType.bidirectional);

    associationTypeBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, associationType);
    return false;
  }
}
