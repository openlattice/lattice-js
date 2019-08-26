/*
 * @flow
 */

import has from 'lodash/has';
import isBoolean from 'lodash/isBoolean';
import { Map, Set, fromJS } from 'immutable';

import Logger from '../utils/Logger';
import EntityType, { EntityTypeBuilder, isValidEntityType } from './EntityType';
import { isDefined, isEmptyArray } from '../utils/LangUtils';
import { isValidUuidArray } from '../utils/ValidationUtils';
import type { EntityTypeObject } from './EntityType';

const LOG = new Logger('AssociationType');

type AssociationTypeObject = {|
  bidirectional :boolean;
  dst :UUID[];
  entityType :EntityTypeObject;
  src :UUID[];
|};

/**
 * @class AssociationType
 * @memberof lattice
 */
export default class AssociationType {

  bidirectional :boolean;
  dst :UUID[];
  entityType :EntityType;
  src :UUID[];

  constructor(
    entityType :EntityType,
    sourceEntityTypeIds :UUID[],
    destinationEntityTypeIds :UUID[],
    bidirectional :boolean,
  ) {

    // required properties
    this.entityType = entityType;
    this.src = sourceEntityTypeIds;
    this.dst = destinationEntityTypeIds;
    this.bidirectional = bidirectional;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :AssociationTypeObject {

    // required properties
    const associationTypeObj :AssociationTypeObject = {
      bidirectional: this.bidirectional,
      dst: this.dst,
      entityType: this.entityType.toObject(),
      src: this.src,
    };

    return associationTypeObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

/**
 * @class AssociationTypeBuilder
 * @memberof lattice
 */
export class AssociationTypeBuilder {

  bidirectional :boolean;
  destinationEntityTypeIds :UUID[];
  entityType :EntityType;
  sourceEntityTypeIds :UUID[];

  setEntityType(entityType :EntityType) :AssociationTypeBuilder {

    if (!isValidEntityType(entityType)) {
      throw new Error('invalid parameter: entityType must be a valid EntityType');
    }

    this.entityType = new EntityTypeBuilder()
      .setBaseType(entityType.baseType)
      .setCategory(entityType.category)
      .setDescription(entityType.description)
      .setId(entityType.id)
      .setKey(entityType.key)
      .setPropertyTypes(entityType.properties)
      .setSchemas(entityType.schemas)
      .setTitle(entityType.title)
      .setType(entityType.type)
      .build();
    return this;
  }

  setSourceEntityTypeIds(sourceEntityTypeIds :UUID[]) :AssociationTypeBuilder {

    if (!isDefined(sourceEntityTypeIds) || isEmptyArray(sourceEntityTypeIds)) {
      return this;
    }

    if (!isValidUuidArray(sourceEntityTypeIds)) {
      throw new Error('invalid parameter: sourceEntityTypeIds must be an array of valid UUIDs');
    }

    this.sourceEntityTypeIds = Set().withMutations((set :Set<UUID>) => {
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

    this.destinationEntityTypeIds = Set().withMutations((set :Set<UUID>) => {
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

export function isValidAssociationType(associationType :any) :boolean {

  if (!isDefined(associationType)) {
    LOG.error('invalid parameter: associationType must be defined', associationType);
    return false;
  }

  try {

    // required properties
    let builder = (new AssociationTypeBuilder())
      .setBidirectional(associationType.bidirectional)
      .setEntityType(associationType.entityType);

    // optional properties
    if (has(associationType, 'destinationEntityTypeIds')) {
      builder = builder.setDestinationEntityTypeIds(associationType.destinationEntityTypeIds);
    }
    else if (has(associationType, 'dst')) {
      builder = builder.setDestinationEntityTypeIds(associationType.dst);
    }

    if (has(associationType, 'sourceEntityTypeIds')) {
      builder = builder.setSourceEntityTypeIds(associationType.sourceEntityTypeIds);
    }
    else if (has(associationType, 'src')) {
      builder = builder.setSourceEntityTypeIds(associationType.src);
    }

    builder.build();

    return true;
  }
  catch (e) {
    LOG.error(`invalid AssociationType: ${e.message}`, associationType);
    return false;
  }
}

export type {
  AssociationTypeObject,
};
