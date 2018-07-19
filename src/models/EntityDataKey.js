/*
 * @flow
 */

import { Map, fromJS } from 'immutable';

import Logger from '../utils/Logger';
import { isValidUuid } from '../utils/ValidationUtils';
import { isDefined } from '../utils/LangUtils';

const LOG = new Logger('EntityDataKey');

/**
 * @class EntityDataKey
 * @memberof lattice
 */
export default class EntityDataKey {

  entityKeyId :UUID;
  entitySetId :UUID;

  constructor(entitySetId :UUID, entityKeyId :UUID) {

    this.entityKeyId = entityKeyId;
    this.entitySetId = entitySetId;
  }

  asImmutable() :Map<string, UUID> {

    const plainObj = {};

    // required properties
    plainObj.entityKeyId = this.entityKeyId;
    plainObj.entitySetId = this.entitySetId;

    return fromJS(plainObj);
  }

  // equals(value :any) :boolean {
  //
  //   return value
  //     && value.entityKeyId === this.entityKeyId
  //     && value.entitySetId === this.entitySetId;
  // }
  //
  // hashCode() :number {
  //
  //   return this.asImmutable().hashCode();
  // }

  valueOf() :string {

    return JSON.stringify({
      entityKeyId: this.entityKeyId,
      entitySetId: this.entitySetId,
    });
  }
}

/**
 * @class EntityDataKeyBuilder
 * @memberof lattice
 */
export class EntityDataKeyBuilder {

  entityKeyId :UUID;
  entitySetId :UUID;

  setEntityKeyId(entityKeyId :UUID) :EntityDataKeyBuilder {

    if (!isValidUuid(entityKeyId)) {
      throw new Error('invalid parameter: entityKeyId must be a valid UUID');
    }

    this.entityKeyId = entityKeyId;
    return this;
  }

  setEntitySetId(entitySetId :UUID) :EntityDataKeyBuilder {

    if (!isValidUuid(entitySetId)) {
      throw new Error('invalid parameter: entitySetId must be a valid UUID');
    }

    this.entitySetId = entitySetId;
    return this;
  }

  build() :EntityDataKey {

    if (!this.entityKeyId) {
      throw new Error('missing property: entityKeyId is a required property');
    }

    if (!this.entitySetId) {
      throw new Error('missing property: entitySetId is a required property');
    }

    return new EntityDataKey(this.entitySetId, this.entityKeyId);
  }
}

export function isValidEntityDataKey(entityDataKey :any) :boolean {

  if (!isDefined(entityDataKey)) {

    LOG.error('invalid parameter: entityDataKey must be defined', entityDataKey);
    return false;
  }

  try {

    (new EntityDataKeyBuilder())
      .setEntityKeyId(entityDataKey.entityKeyId)
      .setEntitySetId(entityDataKey.entitySetId)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, entityDataKey);
    return false;
  }
}
