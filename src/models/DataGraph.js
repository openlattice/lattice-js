/*
 * @flow
 */

import {
  Map,
  fromJS,
  isCollection,
  isImmutable,
} from 'immutable';

import Logger from '../utils/Logger';
import { isDefined } from '../utils/LangUtils';
import {
  isValidModel,
  isValidMultimap,
  isValidOrEmptyMultimap,
  isValidUUID,
} from '../utils/ValidationUtils';

const LOG = new Logger('DataGraph');

type DataGraphObject = {|
  associations :Object;
  entities :Object;
|};

class DataGraph {

  associations :Object;
  entities :Object;

  constructor(dataGraph :{
    associations :Object;
    entities :Object;
  }) {

    this.associations = dataGraph.associations;
    this.entities = dataGraph.entities;
  }

  toImmutable() :Map<*, *> {

    return fromJS(this.toObject());
  }

  toObject() :DataGraphObject {

    const aceObj :DataGraphObject = {
      associations: this.associations,
      entities: this.entities,
    };

    return aceObj;
  }

  valueOf() :number {

    return this.toImmutable().hashCode();
  }
}

class DataGraphBuilder {

  associations :Object;
  entities :Object;

  constructor(value :any) {

    if (isImmutable(value)) {
      this.setAssociations(value.get('associations'));
      this.setEntities(value.get('entities'));
    }
    else if (isDefined(value)) {
      this.setAssociations(value.associations);
      this.setEntities(value.entities);
    }
  }

  setAssociations(associations :?Object) :DataGraphBuilder {

    if (!isDefined(associations)) {
      return this;
    }

    // TODO: still need to validate that associations are valid DataAssociation objects

    let theAssociations = associations;
    if (isCollection(associations)) {
      // $FlowFixMe
      theAssociations = associations.toJS();
    }

    if (!isValidOrEmptyMultimap(theAssociations, isValidUUID)) {
      throw new Error('invalid parameter: "associations" must be a non-empty object where all values are multimaps');
    }

    this.associations = theAssociations;
    return this;
  }

  setEntities(entities :Object) :DataGraphBuilder {

    // TODO: still need to validate that entities are valid multimap objects

    let theEntities = entities;
    if (isCollection(entities)) {
      theEntities = entities.toJS();
    }

    if (!isValidMultimap(theEntities, isValidUUID)) {
      throw new Error('invalid parameter: "entities" must be a non-empty object where all values are multimaps');
    }

    this.entities = theEntities;
    return this;
  }

  build() :DataGraph {

    if (!this.associations) {
      this.associations = {};
    }

    if (!this.entities) {
      throw new Error('missing property: "entities" is a required property');
    }

    return new DataGraph({
      associations: this.associations,
      entities: this.entities,
    });
  }
}

const isValidDataGraph = (value :any) :boolean => isValidModel(value, DataGraphBuilder, LOG);

export {
  DataGraph,
  DataGraphBuilder,
  isValidDataGraph,
};

export type {
  DataGraphObject,
};
