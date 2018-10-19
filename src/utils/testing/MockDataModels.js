/*
 * @flow
 */

import {
  PrincipalTypes,
  RequestStateTypes,
  SecurableTypes
} from '../../constants/types';

import { genRandomBoolean, genRandomString, genRandomUUID } from './MockUtils';

const MOCK_NAMESPACE = 'OPENLATTICE';

const MOCK_ACL_KEY :string[] = [
  'ae9e1cc3-ba0d-4532-9860-e5e7eaf36e83',
  '9b93bc80-79c3-44c8-807c-ada1a8d6484f',
];

const MOCK_FQN :Object = {
  namespace: 'LATTICE',
  name: 'Data'
};

const MOCK_ACCESS_CHECK_DM :Object = {
  aclKey: MOCK_ACL_KEY,
  permissions: ['READ']
};

const MOCK_ACE_DM :Object = {
  principal: { type: 'USER', id: 'principalId' },
  permissions: ['READ']
};

const MOCK_ACL_DM :Object = {
  aclKey: MOCK_ACL_KEY,
  aces: [MOCK_ACE_DM]
};

const MOCK_ACL_DATA_DM :Object = {
  acl: MOCK_ACL_DM,
  action: 'ADD'
};

const MOCK_APP_DM :Object = {
  name: 'name',
  title: 'title',
  description: 'description',
  id: 'fae6af98-2675-45bd-9a5b-1619a87235a8',
  appTypeIds: ['ec6865e6-e60e-424b-a071-6a9c1603d735'],
  url: 'test.com'
};

const MOCK_APP_TYPE_DM :Object = {
  type: { namespace: 'LATTICE', name: 'MockType' },
  title: 'title',
  description: 'description',
  id: 'fae6af98-2675-45bd-9a5b-1619a87235a8',
  entityTypeId: 'ec6865e6-e60e-424b-a071-6a9c1603d735'
};

const MOCK_DATA_EDGE_KEY_DM :Object = {
  dst: {
    entityKeyId: 'fd97726d-945e-4dc1-9b99-c49dc55c3e24',
    entitySetId: 'c9cee876-b704-4dda-9fb8-80b03352518e',
  },
  edge: {
    entityKeyId: '51631757-1fac-4e7b-8af6-a716449ffb36',
    entitySetId: 'f717ec83-13c4-4591-86ad-a050e11305da',
  },
  src: {
    entityKeyId: '53f45e4b-48a4-4089-8932-3655a5b0d50a',
    entitySetId: 'c3dbd929-91c9-4b48-9545-a634038f34ba',
  },
};

const MOCK_DATA_EDGE_DM :Object = {
  'a680a1d8-73fb-423c-abd2-fd71965693d2': [{
    data: {
      '6a74d45c-9451-4f88-b8c8-a0e27c08b2a2': ['value_1', 'value_2'],
    },
    dst: {
      entitySetId: '69682f1e-6039-44da-8342-522395b43738',
      entityKeyId: 'cf72e97f-109c-46a1-bb89-93a8753fd7ac'
    },
    src: {
      entitySetId: '5e4a579a-ad72-4902-991c-027d80dcd590',
      entityKeyId: '5e4a579a-ad72-4902-991c-027d80dcd590'
    },
  }]
};

const MOCK_DATA_SOURCE_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  title: 'title',
  description: 'description',
  entitySetIds: [
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
    'fae6af98-2675-45bd-9a5b-1619a87235a8'
  ]
};

const MOCK_ENTITY_DATA_KEY_DM :Object = {
  entityKeyId: 'cd585a31-a532-4e52-9791-59d778e39255',
  entitySetId: 'f74f01b0-3629-4b97-b6ac-0813b9f11551',
};

const MOCK_ENTITY_SET_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  entityTypeId: '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
  name: 'name',
  title: 'title',
  description: 'description',
  contacts: ['LATTICE']
};

const MOCK_ENTITY_TYPE_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  type: { namespace: 'LATTICE', name: 'MockType' },
  title: 'title',
  description: 'description',
  schemas: [{ namespace: 'LATTICE', name: 'MockSchema' }],
  key: [
    '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
    '4b08e1f9-4a00-4169-92ea-10e377070220'
  ],
  properties: [
    '8f79e123-3411-4099-a41f-88e5d22d0e8d',
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
    'fae6af98-2675-45bd-9a5b-1619a87235a8'
  ],
  baseType: '9a768c9b-b76f-4fa1-be60-0178695cdbc3',
  category: SecurableTypes.EntityType
};

function genRandomEntityType() :Object {
  return {
    id: genRandomUUID(),
    type: { namespace: genRandomString(), name: genRandomString() },
    title: genRandomString(),
    description: genRandomString(),
    schemas: [{ namespace: genRandomString(), name: genRandomString() }],
    key: [genRandomUUID(), genRandomUUID()],
    properties: [genRandomUUID(), genRandomUUID(), genRandomUUID()],
    baseType: genRandomUUID(),
    category: SecurableTypes.EntityType
  };
}

const MOCK_ASSOCIATION_TYPE_DM :Object = {
  bidirectional: false,
  dst: ['3d46c10d-c20c-4126-a88f-af72347b24ff'],
  entityType: MOCK_ENTITY_TYPE_DM,
  src: ['5f02c387-6e68-4c3c-9d13-84c05a9aedac'],
};

function genRandomAssociationType() :Object {
  return {
    bidirectional: genRandomBoolean(),
    dst: [genRandomUUID(), genRandomUUID()],
    entityType: genRandomEntityType(),
    src: [genRandomUUID()],
  };
}

const MOCK_LINKING_ENTITY_SET_DM :Object = {
  entitySet: MOCK_ENTITY_SET_DM,
  linkingProperties: [
    {
      '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e': '4b08e1f9-4a00-4169-92ea-10e377070220',
      'e39dfdfa-a3e6-4f1f-b54b-646a723c3085': 'ec6865e6-e60e-424b-a071-6a9c1603d735'
    },
    {
      'fae6af98-2675-45bd-9a5b-1619a87235a8': '8f79e123-3411-4099-a41f-88e5d22d0e8d'
    }
  ]
};

const MOCK_LINKING_ENTITY_TYPE_DM :Object = {
  entityType: MOCK_ENTITY_TYPE_DM,
  entityTypeIds: [
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
    'fae6af98-2675-45bd-9a5b-1619a87235a8'
  ],
  deidentified: false
};

const MOCK_LINKING_REQUEST_DM :Object = {
  linkingEntitySet: MOCK_LINKING_ENTITY_SET_DM,
  propertyTypeIds: [
    '4b08e1f9-4a00-4169-92ea-10e377070220',
    'ec6865e6-e60e-424b-a071-6a9c1603d735'
  ]
};

const MOCK_ORGANIZATION_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  title: 'title',
  description: 'description',
  principal: { type: 'ORGANIZATION', id: 'orgid' },
  members: [{ type: 'USER', id: 'principalId_0' }],
  roles: [{ type: 'ROLE', id: 'principalId_1' }],
  emails: ['openlattice.com'],
  apps: [
    '4b08e1f9-4a00-4169-92ea-10e377070220',
    'ec6865e6-e60e-424b-a071-6a9c1603d735'
  ]
};

const MOCK_PRINCIPAL_DM :Object = {
  type: PrincipalTypes.USER,
  id: 'mockPrincipalId'
};

const MOCK_PROPERTY_TYPE_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  type: { namespace: 'LATTICE', name: 'MockType' },
  title: 'title',
  description: 'description',
  datatype: 'datatype',
  schemas: [{ namespace: 'LATTICE', name: 'MockSchema' }]
};

const MOCK_REQUEST_DM :Object = {
  aclKey: MOCK_ACL_KEY,
  permissions: ['READ'],
  reason: 'reason'
};

const MOCK_REQUEST_STATUS_DM :Object = {
  request: MOCK_REQUEST_DM,
  state: RequestStateTypes.SUBMITTED,
  principal: MOCK_PRINCIPAL_DM
};

const MOCK_ROLE_DM :Object = {
  id: 'fae6af98-2675-45bd-9a5b-1619a87235a8',
  organizationId: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  title: 'title',
  description: 'description',
  principal: { type: 'ROLE', id: 'roleid' }
};

const MOCK_SCHEMA_DM :Object = {
  fqn: MOCK_FQN,
  entityTypes: [MOCK_ENTITY_TYPE_DM],
  propertyTypes: [MOCK_PROPERTY_TYPE_DM]
};

const MOCK_EDM_DM :Object = {
  associationTypes: [MOCK_ASSOCIATION_TYPE_DM],
  entityTypes: [MOCK_ENTITY_TYPE_DM],
  namespaces: [MOCK_NAMESPACE],
  propertyTypes: [MOCK_PROPERTY_TYPE_DM],
  schemas: [MOCK_SCHEMA_DM],
  version: 'd7553374-4ab8-4954-ae50-857948f5265f',
};

const MOCK_DATA_GRAPH_DM :Object = {
  associations: {
    'a680a1d8-73fb-423c-abd2-fd71965693d2': [{
      dstEntityIndex: 2,
      dstEntityKeyId: 'cf72e97f-109c-46a1-bb89-93a8753fd7ac',
      dstEntitySetId: '69682f1e-6039-44da-8342-522395b43738',
      srcEntityIndex: 4,
      srcEntityKeyId: '5e4a579a-ad72-4902-991c-027d80dcd590',
      srcEntitySetId: 'd66c4c7d-0aa9-43f3-bb80-9ebcbd5e21ea',
    }]
  },
  entities: {
    'c92f4318-9f93-4f88-94c1-0ca5b3b278ab': [{
      '6a74d45c-9451-4f88-b8c8-a0e27c08b2a2': ['value_1', 'value_2'],
    }]
  },
};

function genRandomDataGraph() :Object {
  return {
    associations: {
      [genRandomUUID()]: [{
        dstEntityIndex: 2,
        dstEntityKeyId: genRandomUUID(),
        dstEntitySetId: genRandomUUID(),
        srcEntityIndex: 4,
        srcEntityKeyId: genRandomUUID(),
        srcEntitySetId: genRandomUUID(),
      }]
    },
    entities: {
      [genRandomUUID()]: [{
        [genRandomUUID()]: [genRandomString()],
        [genRandomUUID()]: [genRandomString(), genRandomString()],
      }]
    },
  };
}

export {
  MOCK_ACCESS_CHECK_DM,
  MOCK_ACE_DM,
  MOCK_ACL_DATA_DM,
  MOCK_ACL_DM,
  MOCK_ACL_KEY,
  MOCK_APP_DM,
  MOCK_APP_TYPE_DM,
  MOCK_ASSOCIATION_TYPE_DM,
  MOCK_DATA_EDGE_KEY_DM,
  MOCK_DATA_EDGE_DM,
  MOCK_DATA_GRAPH_DM,
  MOCK_DATA_SOURCE_DM,
  MOCK_EDM_DM,
  MOCK_ENTITY_DATA_KEY_DM,
  MOCK_ENTITY_SET_DM,
  MOCK_ENTITY_TYPE_DM,
  MOCK_FQN,
  MOCK_LINKING_ENTITY_SET_DM,
  MOCK_LINKING_ENTITY_TYPE_DM,
  MOCK_LINKING_REQUEST_DM,
  MOCK_NAMESPACE,
  MOCK_ORGANIZATION_DM,
  MOCK_PRINCIPAL_DM,
  MOCK_PROPERTY_TYPE_DM,
  MOCK_REQUEST_DM,
  MOCK_REQUEST_STATUS_DM,
  MOCK_ROLE_DM,
  MOCK_SCHEMA_DM,
  genRandomAssociationType,
  genRandomDataGraph,
  genRandomEntityType,
};
