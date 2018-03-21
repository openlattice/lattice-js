/*
 * @flow
 */

import 'immutable';
import Logger from '../utils/Logger';

import {
  isDefined,
  isNonEmptyString
} from '../utils/LangUtils';

import { isValidUuid } from '../utils/ValidationUtils';

const LOG = new Logger('AppType');

/**
 * @class AppType
 * @memberof lattice
 */
export default class AppType {

  description :string;
  entityTypeId :UUID;
  name :string;
  namespace :string;
  title :string;

  constructor(
    description :string,
    entityTypeId :UUID,
    name :string,
    namespace :string,
    title :string,
  ) {

    // required properties
    this.description = description;
    this.entityTypeId = entityTypeId;
    this.name = name;
    this.namespace = namespace;
    this.title = title;

    // optional properties
    // if (isDefined(description)) {
    //   this.description = description;
    // }
  }
}

/**
 * @class AppTypeBuilder
 * @memberof lattice
 */
export class AppTypeBuilder {

  description :string;
  entityTypeId :UUID;
  name :string;
  namespace :string;
  title :string;

  setDescription(description :string) :AppTypeBuilder {

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setEntityTypeId(entityTypeId :UUID) :AppTypeBuilder {

    if (!isValidUuid(entityTypeId)) {
      throw new Error('invalid parameter: entityTypeId must be a valid UUID');
    }

    this.entityTypeId = entityTypeId;
    return this;
  }

  setName(name :string) :AppTypeBuilder {

    if (!isNonEmptyString(name)) {
      throw new Error('invalid parameter: name must be a non-empty string');
    }

    this.name = name;
    return this;
  }

  setNamespace(namespace :string) :AppTypeBuilder {

    if (!isNonEmptyString(namespace)) {
      throw new Error('invalid parameter: namespace must be a non-empty string');
    }

    this.namespace = namespace;
    return this;
  }

  setTitle(title :string) :AppTypeBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  build() :AppType {

    if (!this.description) {
      throw new Error('missing property: description is a required property');
    }

    if (!this.entityTypeId) {
      throw new Error('missing property: entityTypeId is a required property');
    }

    if (!this.name) {
      throw new Error('missing property: name is a required property');
    }

    if (!this.namespace) {
      throw new Error('missing property: namespace is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }

    return new AppType(
      this.description,
      this.entityTypeId,
      this.title,
      // 'type': {this.namespace, this.name} USE FQN Builder?
    );
  }
}

export function isValid(appType :any) :boolean {

  if (!isDefined(appType)) {

    LOG.error('invalid parameter: appType must be defined', appType);
    return false;
  }

  try {

    const appTypeBuilder = new AppTypeBuilder();

    // required properties
    appTypeBuilder
      .setEntityTypeId(appType.entityTypeId)
      .setDescription(appType.description)
      .setName(appType.name)
      .setNamespace(appType.namespace)
      .setTitle(appType.title)
      .build();

    // optional properties
    // if (has(appType, 'description')) {
    //   appTypeBuilder.setDescription(appType.description);
    // }

    appTypeBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, appType);
    return false;
  }
}
