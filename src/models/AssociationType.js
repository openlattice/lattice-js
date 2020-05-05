/*
 * @flow
 */

import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import {
  Map,
  Set,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import {
  ENTITY_TYPE_MOCK,
  EntityType,
  EntityTypeBuilder,
  genRandomEntityType,
} from './EntityType';
import type { EntityTypeObject } from './EntityType';

import Logger from '../utils/Logger';
import { isDefined } from '../utils/LangUtils';
import { isValidUUID, isValidModel } from '../utils/ValidationUtils';
import { genRandomBoolean, genRandomUUID } from '../utils/testing/MockUtils';

const LOG = new Logger('AssociationType');

type AssociationTypeObject = {|
  bidirectional :boolean;
  dst :UUID[];
  entityType :EntityTypeObject;
  src :UUID[];
|};

class AssociationType {

  bidirectional :boolean;
  dst :UUID[];
  entityType :EntityType;
  src :UUID[];

  constructor(associationType :{
    bidirectional :boolean;
    dst :UUID[];
    entityType :EntityType;
    src :UUID[];
  }) {

    // required properties
    this.bidirectional = associationType.bidirectional;
    this.entityType = associationType.entityType;
    this.dst = associationType.dst;
    this.src = associationType.src;
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

class AssociationTypeBuilder {

  bidirectional :boolean;
  destinationEntityTypeIds :UUID[];
  entityType :EntityType;
  sourceEntityTypeIds :UUID[];

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setBidirectional(value.get('bidirectional'));
      this.setDestinationEntityTypeIds(value.get('dst'));
      this.setEntityType(value.get('entityType'));
      this.setSourceEntityTypeIds(value.get('src'));
    }
    else if (isDefined(value)) {
      this.setBidirectional(value.bidirectional);
      this.setDestinationEntityTypeIds(value.dst);
      this.setEntityType(value.entityType);
      this.setSourceEntityTypeIds(value.src);
    }
  }

  setBidirectional(bidirectional :boolean) :AssociationTypeBuilder {

    if (!isBoolean(bidirectional)) {
      throw new Error('invalid parameter: "bidirectional" must be a boolean');
    }

    this.bidirectional = bidirectional;
    return this;
  }

  setEntityType(entityType :EntityType) :AssociationTypeBuilder {

    this.entityType = (new EntityTypeBuilder(entityType)).build();
    return this;
  }

  setDestinationEntityTypeIds(destinationEntityTypeIds :$ReadOnlyArray<UUID>) :AssociationTypeBuilder {

    if (!isDefined(destinationEntityTypeIds)) {
      return this;
    }

    if (!isArray(destinationEntityTypeIds) && !isCollection(destinationEntityTypeIds)) {
      throw new Error('invalid parameter: "destinationEntityTypeIds" must be an array');
    }

    const set = Set(destinationEntityTypeIds);
    if (set.every(isValidUUID)) {
      this.destinationEntityTypeIds = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "destinationEntityTypeIds" must be a non-empty array of UUIDs');
    }

    return this;
  }

  setSourceEntityTypeIds(sourceEntityTypeIds :$ReadOnlyArray<UUID>) :AssociationTypeBuilder {

    if (!isDefined(sourceEntityTypeIds)) {
      return this;
    }

    if (!isArray(sourceEntityTypeIds) && !isCollection(sourceEntityTypeIds)) {
      throw new Error('invalid parameter: "sourceEntityTypeIds" must be an array');
    }

    const set = Set(sourceEntityTypeIds);
    if (set.every(isValidUUID)) {
      this.sourceEntityTypeIds = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "sourceEntityTypeIds" must be a non-empty array of UUIDs');
    }

    return this;
  }

  build() :AssociationType {

    if (this.bidirectional === null || this.bidirectional === undefined) {
      throw new Error('missing property: "bidirectional" is a required property');
    }

    if (!this.entityType) {
      throw new Error('missing property: "entityType" is a required property');
    }

    if (!this.destinationEntityTypeIds) {
      this.destinationEntityTypeIds = [];
    }

    if (!this.sourceEntityTypeIds) {
      this.sourceEntityTypeIds = [];
    }

    return new AssociationType({
      bidirectional: this.bidirectional,
      dst: this.destinationEntityTypeIds,
      entityType: this.entityType,
      src: this.sourceEntityTypeIds,
    });
  }
}

const isValidAssociationType = (value :any) :boolean => isValidModel(value, AssociationTypeBuilder, LOG);

export {
  AssociationType,
  AssociationTypeBuilder,
  isValidAssociationType,
};

export type {
  AssociationTypeObject,
};

/*
 *
 * testing
 *
 */

const ASSOCIATION_TYPE_MOCK = (new AssociationTypeBuilder())
  .setEntityType(ENTITY_TYPE_MOCK)
  .setSourceEntityTypeIds(['c49832e9-8c49-4d24-984a-2221b4fa249b', 'bec4adc8-79dc-48ab-afda-e203c5573ff5'])
  .setDestinationEntityTypeIds(['91385fae-babc-4bd3-ba42-74decb9036f0', 'c1366efe-f619-4f30-bb6a-0b7437966e65'])
  .setBidirectional(false)
  .build();

function genRandomAssociationType() {
  return (new AssociationTypeBuilder())
    .setEntityType(genRandomEntityType())
    .setSourceEntityTypeIds([genRandomUUID(), genRandomUUID()])
    .setDestinationEntityTypeIds([genRandomUUID(), genRandomUUID(), genRandomUUID()])
    .setBidirectional(genRandomBoolean())
    .build();
}

export {
  ASSOCIATION_TYPE_MOCK,
  genRandomAssociationType,
};
