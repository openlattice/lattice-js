/*
 * @flow
 */
import { Map, fromJS } from 'immutable';

import Logger from '../utils/Logger';
import { isDefined } from '../utils/LangUtils';
import { isValidMultimap, isValidOrEmptyMultimap, isValidUUID } from '../utils/ValidationUtils';


const LOG = new Logger('DataGraph');

/**
 * @class DataGraph
 * @memberof lattice
 */
export default class DataGraph {

  associations :Object;
  entities :Object;

  constructor(associations :Object, entities :Object) {

    // required properties
    this.associations = associations;
    this.entities = entities;
  }

  asImmutable() :Map<string, Object> {

    const plainObj = {};

    // required properties
    plainObj.associations = this.associations;
    plainObj.entities = this.entities;

    return fromJS(plainObj);
  }

  valueOf() {
    return JSON.stringify({
      associations: this.associations,
      entities: this.entities,
    });
  }
}

/**
 * @class DataGraphBuilder
 * @memberof lattice
 */
export class DataGraphBuilder {

  associations :Object; // ListMultimap<UUID, DataAssociation>
  entities :Object; // ListMultimap<UUID, SetMultimap<UUID, Object>>

  setAssociations(associations :Object) :DataGraphBuilder {

    if (!isValidOrEmptyMultimap(associations, isValidUUID)) {
      throw new Error('invalid parameter: associations must be a non-empty object where all values are multimaps');
    }

    // TODO: still need to validate that values are valid DataAssociation objects

    this.associations = associations;
    return this;
  }

  setEntities(entities :Object) :DataGraphBuilder {

    if (!isValidMultimap(entities, isValidUUID)) {
      throw new Error('invalid parameter: entities must be a non-empty object where all values are multimaps');
    }

    // TODO: still need to validate that values are valid multimap objects

    this.entities = entities;
    return this;
  }

  build() :DataGraph {

    if (!this.associations) {
      throw new Error('missing property: associations is a required property');
    }

    if (!this.entities) {
      throw new Error('missing property: entities is a required property');
    }

    return new DataGraph(this.associations, this.entities);
  }
}

export function isValidDataGraph(data :any) :boolean {

  if (!isDefined(data)) {

    LOG.error('invalid parameter: data must be defined', data);
    return false;
  }

  try {

    (new DataGraphBuilder())
      .setAssociations(data.associations)
      .setEntities(data.entities)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, data);
    return false;
  }
}
