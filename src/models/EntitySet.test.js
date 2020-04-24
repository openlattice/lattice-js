/*
 * @flow
 */

import { Map } from 'immutable';

import {
  ENTITY_SET_MOCK,
  EntitySet,
  EntitySetBuilder,
  genRandomEntitySet,
  isValidEntitySet,
} from './EntitySet';

import { EntitySetFlagTypes } from '../constants/types';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  EntitySet,
  EntitySetBuilder,
  ENTITY_SET_MOCK,
  isValidEntitySet,
  genRandomEntitySet,
  {
    setContacts: {
      field: 'contacts',
      isOptional: true,
      validParams: [ENTITY_SET_MOCK.contacts],
    },
    setDescription: {
      field: 'description',
      isOptional: true,
      validParams: [ENTITY_SET_MOCK.description],
    },
    setEntityTypeId: {
      field: 'entityTypeId',
      validParams: [ENTITY_SET_MOCK.entityTypeId],
    },
    setFlags: {
      field: 'flags',
      isOptional: true,
      validParams: [
        ENTITY_SET_MOCK.flags,
        Object.values(EntitySetFlagTypes),
        ...Map(EntitySetFlagTypes).valueSeq().map((type) => [type]).toJS(),
      ],
    },
    setId: {
      field: 'id',
      isOptional: true,
      validParams: [ENTITY_SET_MOCK.id],
    },
    setLinkedEntitySets: {
      field: 'linkedEntitySets',
      isOptional: true,
      validParams: [ENTITY_SET_MOCK.linkedEntitySets],
    },
    setName: {
      field: 'name',
      validParams: [ENTITY_SET_MOCK.name],
    },
    setOrganizationId: {
      field: 'organizationId',
      isOptional: true,
      validParams: [ENTITY_SET_MOCK.organizationId],
    },
    setTitle: {
      field: 'title',
      validParams: [ENTITY_SET_MOCK.title],
    },
  }
);
