/*
 * @flow
 */

import Immutable from 'immutable';
import Logger from '../utils/Logger';

import {
  isDefined,
  isNonEmptyString
} from '../utils/LangUtils';

import { isValidUuidArray } from '../utils/ValidationUtils';

const LOG = new Logger('App');

/**
 * @class App
 * @memberof lattice
 */
export default class App {

  appTypeIds :UUID[];
  description :string;
  name :string;
  title :string;
  url :string;


  constructor(
    appTypeIds :UUID[],
    description :string,
    name :string,
    title :string,
    url :string
  ) {

    // required properties
    this.appTypeIds = appTypeIds;
    this.description = description;
    this.name = name;
    this.title = title;
    this.url = url;

  }
}

/**
 * @class AppBuilder
 * @memberof lattice
 */
export class AppBuilder {

  appTypeIds :UUID[];
  description :string;
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

  setDescription(description :string) :AppBuilder {

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setName(name :string) :AppBuilder {

    if (!isNonEmptyString(name)) {
      throw new Error('invalid parameter: name must be a non-empty string');
    }

    this.name = name;
    return this;
  }

  setTitle(title :string) :AppBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setUrl(url :string) :AppBuilder {

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

    if (!this.description) {
      throw new Error('missing property: description is a required property');
    }

    if (!this.name) {
      throw new Error('missing property: name is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }
    if (!this.url) {
      throw new Error('missing property: url is a required property');
    }

    return new App(
      this.appTypeIds,
      this.description,
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
      .setDescription(app.description)
      .setName(app.name)
      .setTitle(app.title)
      .setUrl(app.url)
      .build();

    appBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, app);
    return false;
  }
}
