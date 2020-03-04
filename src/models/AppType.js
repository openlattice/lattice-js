/*
 * @flow
 */

import { Map, fromJS, isImmutable } from 'immutable';

import FullyQualifiedName from './FullyQualifiedName';
import type { FQN, FQNObject } from './FullyQualifiedName';

import Logger from '../utils/Logger';
import { isDefined, isEmptyString, isNonEmptyString } from '../utils/LangUtils';
import { isValidUUID, validateNonEmptyArray } from '../utils/ValidationUtils';
import { genRandomString, genRandomUUID } from '../utils/testing/MockUtils';

const LOG = new Logger('AppType');

type AppTypeObject = {|
  description ?:string;
  entityTypeId :UUID;
  id ?:UUID;
  title :string;
  type :FQNObject;
|};

class AppType {

  description :?string;
  entityTypeId :UUID;
  id :?UUID;
  title :string;
  type :FQN;

  constructor(appType :{
    description :?string;
    entityTypeId :UUID;
    id :?UUID;
    title :string;
    type :FQN;
  }) {

    // required properties
    this.entityTypeId = appType.entityTypeId;
    this.title = appType.title;
    this.type = appType.type;

    // optional properties
    if (isDefined(appType.description)) {
      this.description = appType.description;
    }

    if (isDefined(appType.id)) {
      this.id = appType.id;
    }
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :AppTypeObject {

    // required properties
    const appTypeObj :AppTypeObject = {
      entityTypeId: this.entityTypeId,
      title: this.title,
      type: this.type.toObject(),
    };

    // optional properties
    if (isDefined(this.description)) {
      appTypeObj.description = this.description;
    }

    if (isDefined(this.id)) {
      appTypeObj.id = this.id;
    }

    return appTypeObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

class AppTypeBuilder {

  description :?string;
  entityTypeId :UUID;
  id :?UUID;
  title :string;
  type :FullyQualifiedName;

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setDescription(value.get('description'));
      this.setEntityTypeId(value.get('entityTypeId'));
      this.setId(value.get('id'));
      this.setTitle(value.get('title'));
      this.setType(value.get('type'));
    }
    else if (isDefined(value)) {
      this.setDescription(value.description);
      this.setEntityTypeId(value.entityTypeId);
      this.setId(value.id);
      this.setTitle(value.title);
      this.setType(value.type);
    }
  }

  setDescription(description :?string) :AppTypeBuilder {

    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: "description" must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setEntityTypeId(entityTypeId :UUID) :AppTypeBuilder {

    if (!isValidUUID(entityTypeId)) {
      throw new Error('invalid parameter: "entityTypeId" must be a valid UUID');
    }

    this.entityTypeId = entityTypeId;
    return this;
  }

  setId(appTypeId :?UUID) :AppTypeBuilder {

    if (!isDefined(appTypeId) || isEmptyString(appTypeId)) {
      return this;
    }

    if (!isValidUUID(appTypeId)) {
      throw new Error('invalid parameter: "appTypeId" must be a valid UUID');
    }

    this.id = appTypeId;
    return this;
  }

  setTitle(title :string) :AppTypeBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: "title" must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setType(appTypeFQN :FQN) :AppTypeBuilder {

    this.type = FullyQualifiedName.of(appTypeFQN);
    return this;
  }

  build() :AppType {

    if (!this.entityTypeId) {
      throw new Error('missing property: "entityTypeId" is a required property');
    }

    if (!this.type) {
      throw new Error('missing property: "type" is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: "title" is a required property');
    }

    return new AppType({
      description: this.description,
      entityTypeId: this.entityTypeId,
      id: this.id,
      title: this.title,
      type: this.type,
    });
  }
}

function isValidAppType(value :any) :boolean {

  if (!isDefined(value)) {
    LOG.error('invalid parameter: "value" is not defined');
    return false;
  }

  try {
    (new AppTypeBuilder(value)).build();
    return true;
  }
  catch (e) {
    LOG.error(e.message, value);
    return false;
  }
}

function isValidAppTypeArray(values :$ReadOnlyArray<any>) :boolean {

  return validateNonEmptyArray(values, isValidAppType);
}

export {
  AppType,
  AppTypeBuilder,
  isValidAppType,
  isValidAppTypeArray,
};

export type {
  AppTypeObject,
};

/*
 *
 * testing
 *
 */

const MOCK_APP_TYPE = (new AppTypeBuilder())
  .setDescription('MockAppTypeDescription')
  .setEntityTypeId('cf411622-8b0e-4352-9bb2-367953fd09a3')
  .setId('27e5b4f0-243a-46c7-8ae3-8516ac0fad6a')
  .setTitle('MockAppTypeTitle')
  .setType(FullyQualifiedName.of('mock.apptype'))
  .build();

const MOCK_APP_TYPE_OBJECT = MOCK_APP_TYPE.toObject();

function genRandomAppType() {
  return (new AppTypeBuilder())
    .setDescription(genRandomString())
    .setEntityTypeId(genRandomUUID())
    .setId(genRandomUUID())
    .setTitle(genRandomString())
    .setType(FullyQualifiedName.of(genRandomString(), genRandomString()))
    .build();
}

export {
  MOCK_APP_TYPE,
  MOCK_APP_TYPE_OBJECT,
  genRandomAppType,
};
