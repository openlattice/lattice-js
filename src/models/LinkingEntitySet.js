/*
 * @flow
 */

import { Map, Set, fromJS } from 'immutable';

import Logger from '../utils/Logger';
import EntitySet, { isValidEntitySet } from './EntitySet';
import { isDefined, isNonEmptyArray } from '../utils/LangUtils';
import { isValidUuid } from '../utils/ValidationUtils';

const LOG = new Logger('LinkingEntitySet');

export default class LinkingEntitySet {

  entitySet :EntitySet;
  linkingProperties :Object[];

  constructor(entitySet :EntitySet, linkingProperties :Object[]) {

    this.entitySet = entitySet;
    this.linkingProperties = linkingProperties;
  }
}

export class LinkingEntitySetBuilder {

  entitySet :EntitySet;
  linkingProperties :Object[];

  setEntitySet(entitySet :EntitySet) :LinkingEntitySetBuilder {

    if (!isValidEntitySet(entitySet)) {
      throw new Error('invalid parameter: entitySet must be a valid EntitySet');
    }

    this.entitySet = entitySet;
    return this;
  }

  setLinkingProperties(linkingProperties :Object[]) :LinkingEntitySetBuilder {

    if (!isNonEmptyArray(linkingProperties)) {
      throw new Error('invalid parameter: linkingProperties must be a non-empty array');
    }

    let errorMsg :string = '';

    const linkingPropertiesSet :Set<Map<UUID, UUID>> = Set().withMutations((set :Set<Map<UUID, UUID>>) => {
      fromJS(linkingProperties).forEach((property :Map<UUID, UUID>) => {

        if (property.entrySeq().isEmpty()) {
          errorMsg = 'invalid parameter: linkingProperties must be a array of non-empty Map<UUID, UUID> objects';
          return;
        }

        const allKeysUuids = property.keySeq().every((key :UUID) => isValidUuid(key));
        const allValuesUuids = property.valueSeq().every((value :UUID) => isValidUuid(value));

        if (!allKeysUuids) {
          errorMsg = 'invalid parameter: linkingProperties entry keys must all be UUIDs';
        }
        else if (!allValuesUuids) {
          errorMsg = 'invalid parameter: linkingProperties entry values must all be UUIDs';
        }
        else {
          set.add(property);
        }
      });
    });

    if (errorMsg) {
      throw new Error(errorMsg);
    }
    else {
      // type casting to "any" to avoid Flow error... I think immutable-js definitions need updates
      this.linkingProperties = (linkingPropertiesSet.toJS() :any);
    }

    return this;
  }

  build() :LinkingEntitySet {

    if (!this.entitySet) {
      throw new Error('missing property: entitySet is a required property');
    }

    if (!this.linkingProperties) {
      throw new Error('missing property: linkingProperties is a required property');
    }

    return new LinkingEntitySet(
      this.entitySet,
      this.linkingProperties
    );
  }
}

export function isValidLinkingEntitySet(linkingEntitySet :any) :boolean {

  if (!isDefined(linkingEntitySet)) {

    LOG.error('invalid parameter: linkingEntitySet must be defined', linkingEntitySet);
    return false;
  }

  try {

    (new LinkingEntitySetBuilder())
      .setEntitySet(linkingEntitySet.entitySet)
      .setLinkingProperties(linkingEntitySet.linkingProperties)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, linkingEntitySet);
    return false;
  }
}
