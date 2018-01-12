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

const LOG = new Logger('DataSource');

export default class DataSource {

  id :?UUID;
  title :string;
  description :?string;
  entitySetIds :UUID[];

  constructor(
    id :?UUID,
    title :string,
    description :?string,
    entitySetIds :UUID[]
  ) {

    // required properties
    this.title = title;
    this.entitySetIds = entitySetIds;

    // optional properties
    if (isDefined(id)) {
      this.id = id;
    }

    if (isDefined(description)) {
      this.description = description;
    }
  }
}

export class DataSourceBuilder {

  id :?UUID;
  title :string;
  description :?string;
  entitySetIds :UUID[];

  setId(id :?UUID) :DataSourceBuilder {

    if (!isDefined(id) || isEmptyString(id)) {
      return this;
    }

    if (!isValidUuid(id)) {
      throw new Error('invalid parameter: id must be a valid UUID');
    }

    this.id = id;
    return this;
  }

  setTitle(title :string) :DataSourceBuilder {

    if (!isNonEmptyString(title)) {
      throw new Error('invalid parameter: title must be a non-empty string');
    }

    this.title = title;
    return this;
  }

  setDescription(description :?string) :DataSourceBuilder {

    if (!isDefined(description) || isEmptyString(description)) {
      return this;
    }

    if (!isNonEmptyString(description)) {
      throw new Error('invalid parameter: description must be a non-empty string');
    }

    this.description = description;
    return this;
  }

  setEntitySetIds(entitySetIds :UUID[]) :DataSourceBuilder {

    if (!isValidUuidArray(entitySetIds)) {
      throw new Error('invalid parameter: entitySetIds must be an array of valid UUIDs');
    }

    this.entitySetIds = Immutable.Set().withMutations((set :Set<UUID>) => {
      entitySetIds.forEach((entitySetId :UUID) => {
        set.add(entitySetId);
      });
    }).toJS();

    return this;
  }

  build() :DataSource {

    if (!this.id) {
      throw new Error('missing property: id is a required property');
    }

    if (!this.title) {
      throw new Error('missing property: title is a required property');
    }

    if (!this.entitySetIds) {
      throw new Error('missing property: entitySetIds is a required property');
    }

    return new DataSource(
      this.id,
      this.title,
      this.description,
      this.entitySetIds
    );
  }
}

export function isValid(dataSource :any) :boolean {

  if (!isDefined(dataSource)) {

    LOG.error('invalid parameter: dataSource must be defined', dataSource);
    return false;
  }

  try {

    const dataSourceBuilder = new DataSourceBuilder();

    // required properties
    dataSourceBuilder
      .setTitle(dataSource.title)
      .setEntitySetIds(dataSource.entitySetIds);

    // optional properties
    if (has(dataSource, 'id')) {
      dataSourceBuilder.setId(dataSource.id);
    }

    if (has(dataSource, 'description')) {
      dataSourceBuilder.setDescription(dataSource.description);
    }

    dataSourceBuilder.build();

    return true;
  }
  catch (e) {

    LOG.error(e, dataSource);
    return false;
  }
}
