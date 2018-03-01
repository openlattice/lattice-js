/*
 * @flow
 */

import Logger from '../utils/Logger';
import { isDefined } from '../utils/LangUtils';
import { isValidUuid } from '../utils/ValidationUtils';

const LOG = new Logger('Model');

export default class Model {

  id :UUID;

  constructor(id :UUID) {

    this.id = id;
  }
}

export class ModelBuilder {

  id :UUID;

  setId(id :UUID) :ModelBuilder {

    if (!isValidUuid(id)) {
      throw new Error('invalid parameter: id must be a valid UUID');
    }

    this.id = id;
    return this;
  }

  build() :Model {

    if (!this.id) {
      throw new Error('missing property: id is a required property');
    }

    return new Model(this.id);
  }
}

export function isValid(model :any) :boolean {

  if (!isDefined(model)) {

    LOG.error('invalid parameter: model must be defined', model);
    return false;
  }

  try {

    (new ModelBuilder())
      .setId(model.id)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, model);
    return false;
  }
}
