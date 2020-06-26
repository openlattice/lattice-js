/* eslint-disable no-use-before-define */

import * as EntityDataModelApi from './EntityDataModelApi';

import * as AxiosUtils from '../utils/axios';
import { EDM_API } from '../constants/ApiNames';
import {
  ASSOCIATION_TYPE_PATH,
  DST_PATH,
  ENTITY_TYPE_PATH,
  PROPERTY_TYPE_PATH,
  SCHEMA_PATH,
  SRC_PATH,
} from '../constants/UrlConstants';
import { ActionTypes } from '../constants/types';
import { FQN } from '../models';
import { runTestSuite } from '../utils/testing/APITestSuite';
import {
  ASSOCIATION_TYPE_MOCK,
  ENTITY_TYPE_MOCK,
  PROPERTY_TYPE_MOCK,
  SCHEMA_MOCK,
} from '../utils/testing/MockData';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_FQN = FQN.of('mock.fqn');

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(EDM_API, () => {
  runTestSuite(
    EntityDataModelApi,
    EDM_API,
    {
      addDestinationEntityTypeToAssociationType: {
        '': {
          params: { optional: [false, false], valid: [ASSOCIATION_TYPE_MOCK.entityType.id, ENTITY_TYPE_MOCK.id] }
        },
        '(associationTypeId, entityTypeId)': {
          method: 'put',
          params: {
            axios: [
              `/${ASSOCIATION_TYPE_PATH}/${ASSOCIATION_TYPE_MOCK.entityType.id}/${DST_PATH}/${ENTITY_TYPE_MOCK.id}`
            ],
            valid: [ASSOCIATION_TYPE_MOCK.entityType.id, ENTITY_TYPE_MOCK.id],
          },
        },
      },
      addPropertyTypeToEntityType: {
        '': { params: { optional: [false, false], valid: [ENTITY_TYPE_MOCK.id, PROPERTY_TYPE_MOCK.id] } },
        '(entityTypeId, propertyTypeId)': {
          method: 'put',
          params: {
            axios: [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}/${PROPERTY_TYPE_MOCK.id}`],
            valid: [ENTITY_TYPE_MOCK.id, PROPERTY_TYPE_MOCK.id],
          },
        },
      },
      addSourceEntityTypeToAssociationType: {
        '': {
          params: { optional: [false, false], valid: [ASSOCIATION_TYPE_MOCK.entityType.id, ENTITY_TYPE_MOCK.id] }
        },
        '(associationTypeId, entityTypeId)': {
          method: 'put',
          params: {
            axios: [
              `/${ASSOCIATION_TYPE_PATH}/${ASSOCIATION_TYPE_MOCK.entityType.id}/${SRC_PATH}/${ENTITY_TYPE_MOCK.id}`
            ],
            valid: [ASSOCIATION_TYPE_MOCK.entityType.id, ENTITY_TYPE_MOCK.id],
          },
        },
      },
      createAssociationType: {
        '': { params: { optional: [false], valid: [ASSOCIATION_TYPE_MOCK] } },
        '(associationType)': {
          method: 'post',
          params: {
            axios: [`/${ASSOCIATION_TYPE_PATH}`, ASSOCIATION_TYPE_MOCK],
            valid: [ASSOCIATION_TYPE_MOCK],
          },
        },
      },
      createEntityType: {
        '': { params: { optional: [false], valid: [ENTITY_TYPE_MOCK] } },
        '(entityType)': {
          method: 'post',
          params: {
            axios: [`/${ENTITY_TYPE_PATH}`, ENTITY_TYPE_MOCK],
            valid: [ENTITY_TYPE_MOCK],
          },
        },
      },
      createPropertyType: {
        '': { params: { optional: [false], valid: [PROPERTY_TYPE_MOCK] } },
        '(propertyType)': {
          method: 'post',
          params: {
            axios: [`/${PROPERTY_TYPE_PATH}`, PROPERTY_TYPE_MOCK],
            valid: [PROPERTY_TYPE_MOCK],
          },
        },
      },
      createSchema: {
        '': { params: { optional: [false], valid: [SCHEMA_MOCK] } },
        '(schema)': {
          method: 'post',
          params: {
            axios: [`/${SCHEMA_PATH}`, SCHEMA_MOCK],
            valid: [SCHEMA_MOCK],
          },
        },
      },
      deleteAssociationType: {
        '': { params: { optional: [false], valid: [ASSOCIATION_TYPE_MOCK.entityType.id] } },
        '(associationTypeId)': {
          method: 'delete',
          params: {
            axios: [`/${ASSOCIATION_TYPE_PATH}/${ASSOCIATION_TYPE_MOCK.entityType.id}`],
            valid: [ASSOCIATION_TYPE_MOCK.entityType.id],
          },
        },
      },
      deleteEntityType: {
        '': { params: { optional: [false], valid: [ENTITY_TYPE_MOCK.id] } },
        '(entityTypeId)': {
          method: 'delete',
          params: {
            axios: [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}`],
            valid: [ENTITY_TYPE_MOCK.id],
          },
        },
      },
      deletePropertyType: {
        '': { params: { optional: [false], valid: [PROPERTY_TYPE_MOCK.id] } },
        '(propertyTypeId)': {
          method: 'delete',
          params: {
            axios: [`/${PROPERTY_TYPE_PATH}/${PROPERTY_TYPE_MOCK.id}`],
            valid: [PROPERTY_TYPE_MOCK.id],
          },
        },
      },
      getAllAssociationEntityTypes: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: [`/${ASSOCIATION_TYPE_PATH}/${ENTITY_TYPE_PATH}`],
            valid: [],
          },
        },
      },
      getAllAssociationTypes: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: [`/${ASSOCIATION_TYPE_PATH}`],
            valid: [],
          },
        },
      },
      getAllEntityTypes: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: [`/${ENTITY_TYPE_PATH}`],
            valid: [],
          },
        },
      },
      getAllPropertyTypes: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: [`/${PROPERTY_TYPE_PATH}`],
            valid: [],
          },
        },
      },
      getAllSchemas: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: [`/${SCHEMA_PATH}`],
            valid: [],
          },
        },
      },
      getAssociationType: {
        '': { params: { optional: [false], valid: [ASSOCIATION_TYPE_MOCK.entityType.id] } },
        '(associationTypeId)': {
          method: 'get',
          params: {
            axios: [`/${ASSOCIATION_TYPE_PATH}/${ASSOCIATION_TYPE_MOCK.entityType.id}`],
            valid: [ASSOCIATION_TYPE_MOCK.entityType.id],
          },
        },
      },
      getEntityDataModel: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: ['/'],
            valid: [],
          },
        },
      },
      getEntityDataModelProjection: {
        '': { params: { optional: [false], valid: [[{ id: ENTITY_TYPE_MOCK.id }]] } },
        '(projection)': {
          method: 'post',
          params: {
            axios: ['/', [{ id: ENTITY_TYPE_MOCK.id }]],
            valid: [[{ id: ENTITY_TYPE_MOCK.id }]],
          },
        },
      },
      getEntityType: {
        '': { params: { optional: [false], valid: [ENTITY_TYPE_MOCK.id] } },
        '(entityTypeId)': {
          method: 'get',
          params: {
            axios: [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}`],
            valid: [ENTITY_TYPE_MOCK.id],
          },
        },
      },
      getPropertyType: {
        '': { params: { optional: [false], valid: [PROPERTY_TYPE_MOCK.id] } },
        '(propertyTypeId)': {
          method: 'get',
          params: {
            axios: [`/${PROPERTY_TYPE_PATH}/${PROPERTY_TYPE_MOCK.id}`],
            valid: [PROPERTY_TYPE_MOCK.id],
          },
        },
      },
      getSchema: {
        '': { params: { optional: [false], valid: [SCHEMA_MOCK.fqn] } },
        '(schemaFQN)': {
          method: 'get',
          params: {
            axios: [`/${SCHEMA_PATH}/${SCHEMA_MOCK.fqn.namespace}/${SCHEMA_MOCK.fqn.name}`],
            valid: [SCHEMA_MOCK.fqn],
          },
        },
      },
      removeDestinationEntityTypeFromAssociationType: {
        '': {
          params: { optional: [false, false], valid: [ASSOCIATION_TYPE_MOCK.entityType.id, ENTITY_TYPE_MOCK.id] }
        },
        '(associationTypeId, entityTypeId)': {
          method: 'delete',
          params: {
            axios: [
              `/${ASSOCIATION_TYPE_PATH}/${ASSOCIATION_TYPE_MOCK.entityType.id}/${DST_PATH}/${ENTITY_TYPE_MOCK.id}`
            ],
            valid: [ASSOCIATION_TYPE_MOCK.entityType.id, ENTITY_TYPE_MOCK.id],
          },
        },
      },
      removePropertyTypeFromEntityType: {
        '': { params: { optional: [false], valid: [ENTITY_TYPE_MOCK.id, PROPERTY_TYPE_MOCK.id] } },
        '(entityTypeId, propertyTypeId)': {
          method: 'delete',
          params: {
            axios: [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}/${PROPERTY_TYPE_MOCK.id}`],
            valid: [ENTITY_TYPE_MOCK.id, PROPERTY_TYPE_MOCK.id],
          },
        },
      },
      removeSourceEntityTypeFromAssociationType: {
        '': {
          params: { optional: [false, false], valid: [ASSOCIATION_TYPE_MOCK.entityType.id, ENTITY_TYPE_MOCK.id] }
        },
        '(associationTypeId, entityTypeId)': {
          method: 'delete',
          params: {
            axios: [
              `/${ASSOCIATION_TYPE_PATH}/${ASSOCIATION_TYPE_MOCK.entityType.id}/${SRC_PATH}/${ENTITY_TYPE_MOCK.id}`
            ],
            valid: [ASSOCIATION_TYPE_MOCK.entityType.id, ENTITY_TYPE_MOCK.id],
          },
        },
      },
      updateEntityTypeMetaData: {
        '': { params: { optional: [false, false], valid: [ENTITY_TYPE_MOCK.id, { title: 'NewTitle' }] } },
        '(entityTypeId, metadata - contacts)': {
          method: 'patch',
          params: {
            axios: [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}`, { contacts: ['test@openlattice.com'] }],
            valid: [ENTITY_TYPE_MOCK.id, { contacts: ['test@openlattice.com'] }],
          },
        },
        '(entityTypeId, metadata - description)': {
          method: 'patch',
          params: {
            axios: [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}`, { description: 'NewDescription' }],
            valid: [ENTITY_TYPE_MOCK.id, { description: 'NewDescription' }],
          },
        },
        '(entityTypeId, metadata - name)': {
          method: 'patch',
          params: {
            axios: [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}`, { name: 'NewName' }],
            valid: [ENTITY_TYPE_MOCK.id, { name: 'NewName' }],
          },
        },
        '(entityTypeId, metadata - title)': {
          method: 'patch',
          params: {
            axios: [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}`, { title: 'NewTitle' }],
            valid: [ENTITY_TYPE_MOCK.id, { title: 'NewTitle' }],
          },
        },
        '(entityTypeId, metadata - type)': {
          method: 'patch',
          params: {
            axios: [`/${ENTITY_TYPE_PATH}/${ENTITY_TYPE_MOCK.id}`, { type: MOCK_FQN }],
            valid: [ENTITY_TYPE_MOCK.id, { type: MOCK_FQN }],
          },
        },
      },
      updatePropertyTypeMetaData: {
        '': { params: { optional: [false, false], valid: [PROPERTY_TYPE_MOCK.id, { title: 'NewTitle' }] } },
        '(propertyTypeId, metadata - contacts)': {
          method: 'patch',
          params: {
            axios: [`/${PROPERTY_TYPE_PATH}/${PROPERTY_TYPE_MOCK.id}`, { contacts: ['test@openlattice.com'] }],
            valid: [PROPERTY_TYPE_MOCK.id, { contacts: ['test@openlattice.com'] }],
          },
        },
        '(propertyTypeId, metadata - description)': {
          method: 'patch',
          params: {
            axios: [`/${PROPERTY_TYPE_PATH}/${PROPERTY_TYPE_MOCK.id}`, { description: 'NewDescription' }],
            valid: [PROPERTY_TYPE_MOCK.id, { description: 'NewDescription' }],
          },
        },
        '(propertyTypeId, metadata - name)': {
          method: 'patch',
          params: {
            axios: [`/${PROPERTY_TYPE_PATH}/${PROPERTY_TYPE_MOCK.id}`, { name: 'NewName' }],
            valid: [PROPERTY_TYPE_MOCK.id, { name: 'NewName' }],
          },
        },
        '(propertyTypeId, metadata - title)': {
          method: 'patch',
          params: {
            axios: [`/${PROPERTY_TYPE_PATH}/${PROPERTY_TYPE_MOCK.id}`, { title: 'NewTitle' }],
            valid: [PROPERTY_TYPE_MOCK.id, { title: 'NewTitle' }],
          },
        },
        '(propertyTypeId, metadata - type)': {
          method: 'patch',
          params: {
            axios: [`/${PROPERTY_TYPE_PATH}/${PROPERTY_TYPE_MOCK.id}`, { type: MOCK_FQN }],
            valid: [PROPERTY_TYPE_MOCK.id, { type: MOCK_FQN }],
          },
        },
      },
      updateSchema: {
        '': { params: { optional: [false], valid: [SCHEMA_MOCK] } },
        '(schema)': {
          method: 'patch',
          params: {
            axios: [
              `/${SCHEMA_PATH}/${SCHEMA_MOCK.fqn.namespace}/${SCHEMA_MOCK.fqn.name}`,
              {
                action: ActionTypes.REPLACE,
                entityTypes: [SCHEMA_MOCK.entityTypes[0].id],
                propertyTypes: [SCHEMA_MOCK.propertyTypes[0].id],
              },
            ],
            valid: [SCHEMA_MOCK],
          },
        },
      },
    },
  );
});
