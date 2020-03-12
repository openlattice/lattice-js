/*
 * @flow
 */

import isArray from 'lodash/isArray';
import {
  Map,
  Set,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import Logger from '../utils/Logger';
import { isDefined, isEmptyString, isNonEmptyString } from '../utils/LangUtils';
import { isValidModel, isValidUUID } from '../utils/ValidationUtils';
import { genRandomString, genRandomUUID } from '../utils/testing/MockUtils';

const LOG = new Logger('App');

type AppObject = {|
  appTypeIds :UUID[];
  description ?:string;
  id ?:UUID;
  name :string;
  title :string;
  url :string;
|};

class App {

  appTypeIds :UUID[];
  description :?string;
  id :?UUID;
  name :string;
  title :string;
  url :string;

  constructor(app :{
    appTypeIds :UUID[];
    description :?string;
    id :?UUID;
    name :string;
    title :string;
    url :string;
  }) {

    // required properties
    this.appTypeIds = app.appTypeIds;
    this.name = app.name;
    this.title = app.title;
    this.url = app.url;

    // optional properties
    if (isDefined(app.id)) {
      this.id = app.id;
    }

    if (isDefined(app.description)) {
      this.description = app.description;
    }
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :AppObject {

    // required properties
    const appObj :AppObject = {
      appTypeIds: this.appTypeIds,
      name: this.name,
      title: this.title,
      url: this.url,
    };

    // optional properties
    if (isDefined(this.id)) {
      appObj.id = this.id;
    }

    if (isDefined(this.description)) {
      appObj.description = this.description;
    }

    return appObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

class AppBuilder {

  appTypeIds :UUID[];
  description :?string;
  id :?UUID;
  name :string;
  title :string;
  url :string;

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setAppTypeIds(value.get('appTypeIds'));
      this.setDescription(value.get('description'));
      this.setId(value.get('id'));
      this.setName(value.get('name'));
      this.setTitle(value.get('title'));
      this.setUrl(value.get('url'));
    }
    else if (isDefined(value)) {
      this.setAppTypeIds(value.appTypeIds);
      this.setDescription(value.description);
      this.setId(value.id);
      this.setName(value.name);
      this.setTitle(value.title);
      this.setUrl(value.url);
    }
  }

  setAppTypeIds(appTypeIds :$ReadOnlyArray<UUID>) :AppBuilder {

    if (!isDefined(appTypeIds)) {
      return this;
    }

    if (!isArray(appTypeIds) && !isCollection(appTypeIds)) {
      throw new Error('invalid parameter: "appTypeIds" must be an array');
    }

    const set = Set(appTypeIds);
    if (set.every(isValidUUID)) {
      this.appTypeIds = set.toJS();
    }
    else {
      throw new Error('invalid parameter: "appTypeIds" must be a non-empty array of UUIDs');
    }

    return this;
  }

  setDescription(description :?string) :AppBuilder {

    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: "description" must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setId(id :?UUID) :AppBuilder {

    if (!isDefined(id) || isEmptyString(id)) {
      return this;
    }

    if (!isValidUUID(id)) {
      throw new Error('invalid parameter: "id" must be a valid UUID');
    }

    this.id = id;
    return this;
  }

  setName(name :string) :AppBuilder {

    if (!isNonEmptyString(name)) {
      throw new Error('invalid parameter: "name" must be a non-empty string');
    }

    this.name = name;
    return this;
  }

  setTitle(title :string) :AppBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: "title" must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setUrl(url :string) :AppBuilder {

    if (!isNonEmptyString(url)) {
      throw new Error('invalid parameter: "url" must be a non-empty string');
    }

    this.url = url;
    return this;
  }

  build() :App {

    if (!this.appTypeIds) {
      this.appTypeIds = [];
    }

    if (!this.name) {
      throw new Error('missing property: "name" is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: "title" is a required property');
    }

    if (!this.url) {
      throw new Error('missing property: "url" is a required property');
    }

    return new App({
      appTypeIds: this.appTypeIds,
      description: this.description,
      id: this.id,
      name: this.name,
      title: this.title,
      url: this.url,
    });
  }
}

const isValidApp = (value :any) :boolean => isValidModel(value, AppBuilder, LOG);

export {
  App,
  AppBuilder,
  isValidApp,
};

export type {
  AppObject,
};

/*
 *
 * testing
 *
 */

const APP_MOCK = (new AppBuilder())
  .setAppTypeIds(['c3dbd929-91c9-4b48-9545-a634038f34ba'])
  .setDescription('MockAppDescription')
  .setId('53f45e4b-48a4-4089-8932-3655a5b0d50a')
  .setName('MockAppName')
  .setTitle('MockAppTitle')
  .setUrl('https://openlattice.com')
  .build();

function genRandomApp() {
  return (new AppBuilder())
    .setAppTypeIds([genRandomUUID()])
    .setDescription(genRandomString())
    .setId(genRandomUUID())
    .setName(genRandomString())
    .setTitle(genRandomString())
    .setUrl(genRandomString())
    .build();
}

export {
  APP_MOCK,
  genRandomApp,
};
