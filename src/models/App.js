/*
 * @flow
 */

import Immutable from 'immutable';
import has from 'lodash/has';

import Logger from '../utils/Logger';

import {
  isDefined,
  isEmptyString,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('App');

/**
 * @class App
 * @memberof lattice
 */
export default class App {

  appTypeIds :UUID[];
  description :?string;
  id :?UUID;
  name :string;
  title :?string;
  url :?string;


  constructor(
    appTypeIds :UUID[],
    description :?string,
    id :?UUID,
    name :string,
    title :?string,
    url :?string
  ) {

    // required properties
    this.appTypeIds = appTypeIds;
    this.name = name;

    // optional properties
    if (isDefined(id)) {
      this.id = id;
    }

    if (isDefined(description)) {
      this.description = description;
    }

    if (isDefined(title)) {
      this.title = title;
    }

    if (isDefined(url)) {
      this.url = url;
    }
  }
}

/**
 * @class AppBuilder
 * @memberof lattice
 */
export class AppBuilder {

  appTypeIds :UUID[];
  description :string;
  id :?UUID;
  name :string;
  title :string;
  url :string;

  setAppTypeIds(appTypeIds :UUID[]) :AppBuilder {
    if (!isValidUuidArray(appTypeIds)) {
      throw new Error('invalid parameter: appTypeIds must be a valid UUID array');
    }

    this.appTypeIds = Immutable.Set().withMutations((set :Set<UUID>) => {
      appTypeIds.forEach((appTypeId :UUID) => {
        set.add(appTypeId);
      });
    }).toJS();

    return this;
  }

  setDescription(description :?string) :AppBuilder {
    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setId(id :?UUID) :AppBuilder {

    if (!isDefined(id) || isEmptyString(id)) {
      return this;
    }

    if (!isValidUuid(id)) {
      throw new Error('invalid parameter: propertyTypeId must be a valid UUID');
    }

    this.id = id;
    return this;
  }

  setName(name :string) :AppBuilder {

    if (!isNonEmptyString(name)) {
      throw new Error('invalid parameter: name must be a non-empty string');
    }

    this.name = name;
    return this;
  }

  setTitle(title :?string) :AppBuilder {
    if (!isDefined(title) || isEmptyString(title)) {
      return this;
    }

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setUrl(url :?string) :AppBuilder {
    if (!isDefined(url) || isEmptyString(url)) {
      return this;
    }

    if (!isNonEmptyString(url)) {
      throw new Error('invalid parameter: url must be a non-empty string');
    }

    this.url = url;
    return this;
  }

  build() :App {

    if (!this.appTypeIds) {
      throw new Error('missing property: appTypeIds is a required property');
    }

    if (!this.name) {
      throw new Error('missing property: name is a required property');
    }

    return new App(
      this.appTypeIds,
      this.description,
      this.id,
      this.name,
      this.title,
      this.url
    );
  }
}

export function isValid(app :any) :boolean {

  if (!isDefined(app)) {

    LOG.error('invalid parameter: app must be defined', app);
    return false;
  }

  try {

    const appBuilder = new AppBuilder();

    // required properties
    appBuilder
      .setAppTypeIds(app.appTypeIds)
      .setName(app.name)
      .build();

    // optional properties
    if (has(app, 'id')) {
      appBuilder.setId(app.id);
    }

    if (has(app, 'description')) {
      appBuilder.setDescription(app.description);
    }

    if (has(app, 'title')) {
      appBuilder.setTitle(app.title);
    }

    if (has(app, 'url')) {
      appBuilder.setUrl(app.url);
    }


    appBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, app);
    return false;
  }
}
