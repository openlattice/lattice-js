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
import { isValidMultimap, isValidOrEmptyMultimap, isValidUUID } from '../utils/ValidationUtils';
import { genRandomString, genRandomUUID } from '../utils/testing/MockUtils';

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

  setAssociations(associations :Object) :DataGraphBuilder {

    // TODO: still need to validate that associations are valid DataAssociation objects

    let theAssociations = associations;
    if (isCollection(associations)) {
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
      throw new Error('missing property: "associations" is a required property');
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

function isValidDataGraph(value :any) :boolean {

  if (!isDefined(value)) {
    LOG.error('invalid parameter: "value" is not defined');
    return false;
  }

  try {
    (new DataGraphBuilder(value)).build();
    return true;
  }
  catch (e) {
    LOG.error(e.message, value);
    return false;
  }
}

export {
  DataGraph,
  DataGraphBuilder,
  isValidDataGraph,
};

export type {
  DataGraphObject,
};

/*
 *
 * testing
 *
 */

const MOCK_DATA_GRAPH = (new DataGraphBuilder())
  .setAssociations({
    'f914f31a-6486-4717-929d-dccecab05c47': [{
      data: {
        '87f38161-9c95-4166-9721-8514882dac22': ['2020-02-02']
      },
      dstEntityKeyId: 'ff0e0000-0000-0000-8000-00000000fc5e',
      dstEntitySetId: 'ccdaba20-f6ba-401c-a63d-17c6578ffb67',
      srcEntityIndex: 0,
      srcEntitySetId: 'd6760122-eaf7-42e6-9339-923df3f4790a',
    }]
  })
  .setEntities({
    'd6760122-eaf7-42e6-9339-923df3f4790a': [{
      'a791ca8d-b433-4a2b-be04-43d43cea14a7': ['VALUE_1'],
      '2a45205e-703c-43eb-a060-921bf7245f6a': ['VALUE_2', 'VALUE_3'],
    }],
  })
  .build();

const MOCK_DATA_GRAPH_OBJECT = MOCK_DATA_GRAPH.toObject();

function genRandomDataGraph() {
  return (new DataGraphBuilder())
    .setAssociations({
      [genRandomUUID()]: [{
        dstEntityIndex: 2,
        dstEntityKeyId: genRandomUUID(),
        dstEntitySetId: genRandomUUID(),
        srcEntityIndex: 4,
        srcEntityKeyId: genRandomUUID(),
        srcEntitySetId: genRandomUUID(),
      }],
    })
    .setEntities({
      [genRandomUUID()]: [{
        [genRandomUUID()]: [genRandomString()],
        [genRandomUUID()]: [genRandomString(), genRandomString()],
      }],
      [genRandomUUID()]: [{
        [genRandomUUID()]: [genRandomString()],
      }],
    })
    .build();
}

export {
  MOCK_DATA_GRAPH,
  MOCK_DATA_GRAPH_OBJECT,
  genRandomDataGraph,
};
