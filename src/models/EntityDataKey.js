/*
 * @flow
 */

import { Map, fromJS, isImmutable } from 'immutable';

import Logger from '../utils/Logger';
import { isDefined } from '../utils/LangUtils';
import { isValidModel, isValidUUID } from '../utils/ValidationUtils';
import { genRandomUUID } from '../utils/testing/MockUtils';

const LOG = new Logger('EntityDataKey');

type EntityDataKeyObject = {|
  entityKeyId :UUID;
  entitySetId :UUID;
|};

class EntityDataKey {

  entityKeyId :UUID;
  entitySetId :UUID;

  constructor(entityDataKey :{
    entityKeyId :UUID;
    entitySetId :UUID;
  }) {

    this.entityKeyId = entityDataKey.entityKeyId;
    this.entitySetId = entityDataKey.entitySetId;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :EntityDataKeyObject {

    const entityDataKeyObj :EntityDataKeyObject = {
      entityKeyId: this.entityKeyId,
      entitySetId: this.entitySetId,
    };

    return entityDataKeyObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

class EntityDataKeyBuilder {

  entityKeyId :UUID;
  entitySetId :UUID;

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setEntityKeyId(value.get('entityKeyId'));
      this.setEntitySetId(value.get('entitySetId'));
    }
    else if (isDefined(value)) {
      this.setEntityKeyId(value.entityKeyId);
      this.setEntitySetId(value.entitySetId);
    }
  }

  setEntityKeyId(entityKeyId :UUID) :EntityDataKeyBuilder {

    if (!isValidUUID(entityKeyId)) {
      throw new Error('invalid parameter: entityKeyId must be a valid UUID');
    }

    this.entityKeyId = entityKeyId;
    return this;
  }

  setEntitySetId(entitySetId :UUID) :EntityDataKeyBuilder {

    if (!isValidUUID(entitySetId)) {
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

    return new EntityDataKey({
      entityKeyId: this.entityKeyId,
      entitySetId: this.entitySetId,
    });
  }
}

const isValidEntityDataKey = (value :any) :boolean => isValidModel(value, EntityDataKeyBuilder, LOG);

export {
  EntityDataKey,
  EntityDataKeyBuilder,
  isValidEntityDataKey,
};

export type {
  EntityDataKeyObject,
};

/*
 *
 * testing
 *
 */

const ENTITY_DATA_KEY_MOCK = (new EntityDataKeyBuilder())
  .setEntityKeyId('3f8bd01a-e211-4912-90d0-fbd2fefefe24')
  .setEntitySetId('e90e6d9c-d0ed-490b-ba3e-38b30f34a1eb')
  .build();

function genRandomEntityDataKey() {
  return (new EntityDataKeyBuilder())
    .setEntityKeyId(genRandomUUID())
    .setEntitySetId(genRandomUUID())
    .build();
}

export {
  ENTITY_DATA_KEY_MOCK,
  genRandomEntityDataKey,
};
