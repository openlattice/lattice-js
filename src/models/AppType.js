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
import FullyQualifiedName from './FullyQualifiedName';

const LOG = new Logger('AppType');

/**
 * @class AppType
 * @memberof lattice
 */
export default class AppType {

  description :string;
  entityTypeId :UUID;
  title :string;
  type :FullyQualifiedName;

  constructor(
    description :string,
    entityTypeId :UUID,
    title :string,
    type :FullyQualifiedName,
  ) {

    // required properties
    this.description = description;
    this.entityTypeId = entityTypeId;
    this.title = title;
    this.type = type;

  }
}

/**
 * @class AppTypeBuilder
 * @memberof lattice
 */
export class AppTypeBuilder {

  description :string;
  entityTypeId :UUID;
  title :string;
  type :FullyQualifiedName;

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

  setTitle(title :string) :AppTypeBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setType(appTypeFqn :FullyQualifiedName) :AppTypeBuilder {

    if (!FullyQualifiedName.isValid(appTypeFqn)) {
      throw new Error('invalid parameter: appTypeFqn must be a valid FQN');
    }

    this.type = appTypeFqn;
    return this;
  }

  build() :AppType {

    if (!this.description) {
      throw new Error('missing property: description is a required property');
    }

    if (!this.entityTypeId) {
      throw new Error('missing property: entityTypeId is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }

    if (!this.type) {
      throw new Error('missing property: type is a required property');
    }

    return new AppType(
      this.description,
      this.entityTypeId,
      this.title,
      this.type
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
      .setTitle(appType.title)
      .setType(appType.type)
      .build();

    appTypeBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, appType);
    return false;
  }
}
