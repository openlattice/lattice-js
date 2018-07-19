/*
 * @flow
 */

import { Map, fromJS } from 'immutable';

import EntityDataKey, { isValidEntityDataKey } from './EntityDataKey';
import Logger from '../utils/Logger';
import { isDefined } from '../utils/LangUtils';
import { validateNonEmptyArray } from '../utils/ValidationUtils';

const LOG = new Logger('DataEdgeKey');

export default class DataEdgeKey {

  dst :EntityDataKey;
  edge :EntityDataKey;
  src :EntityDataKey;

  constructor(src :EntityDataKey, dst :EntityDataKey, edge :EntityDataKey) {

    this.dst = dst;
    this.edge = edge;
    this.src = src;
  }

  asImmutable() :Map<string, EntityDataKey> {

    const plainObj = {};

    // required properties
    plainObj.dst = this.dst;
    plainObj.edge = this.edge;
    plainObj.src = this.src;

    return fromJS(plainObj);
  }

  valueOf() :string {

    return JSON.stringify({
      dst: this.dst,
      edge: this.edge,
      src: this.src,
    });
  }
}

export class DataEdgeKeyBuilder {

  dst :EntityDataKey;
  edge :EntityDataKey;
  src :EntityDataKey;

  setDestination(destination :EntityDataKey) :DataEdgeKeyBuilder {

    if (!isValidEntityDataKey(destination)) {
      throw new Error('invalid parameter: destination must be a valid EntityDataKey');
    }

    this.dst = destination;
    return this;
  }

  setEdge(edge :EntityDataKey) :DataEdgeKeyBuilder {

    if (!isValidEntityDataKey(edge)) {
      throw new Error('invalid parameter: edge must be a valid EntityDataKey');
    }

    this.edge = edge;
    return this;
  }

  setSource(source :EntityDataKey) :DataEdgeKeyBuilder {

    if (!isValidEntityDataKey(source)) {
      throw new Error('invalid parameter: source must be a valid EntityDataKey');
    }

    this.src = source;
    return this;
  }

  build() :DataEdgeKey {

    if (!this.dst) {
      throw new Error('missing property: destination is a required property');
    }

    if (!this.edge) {
      throw new Error('missing property: edge is a required property');
    }

    if (!this.src) {
      throw new Error('missing property: source is a required property');
    }

    return new DataEdgeKey(this.src, this.dst, this.edge);
  }
}

export function isValidDataEdgeKey(dataEdgeKey :any) :boolean {

  if (!isDefined(dataEdgeKey)) {

    LOG.error('invalid parameter: dataEdgeKey must be defined', dataEdgeKey);
    return false;
  }

  try {

    (new DataEdgeKeyBuilder())
      .setDestination(dataEdgeKey.dst)
      .setEdge(dataEdgeKey.edge)
      .setSource(dataEdgeKey.src)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, dataEdgeKey);
    return false;
  }
}

export function isValidDataEdgeKeyArray(dataEdgeKeys :any[]) :boolean {

  return validateNonEmptyArray(dataEdgeKeys, (dataEdgeKey :any) => isValidDataEdgeKey(dataEdgeKey));
}
