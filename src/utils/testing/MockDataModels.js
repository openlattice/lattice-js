/*
 * @flow
 */

import {
  PrincipalTypes,
  RequestStateTypes,
  SecurableTypes
} from '../../constants/types';

import { genRandomUUID } from './MockUtils';

const MOCK_NAMESPACE = 'OPENLATTICE';

export const MOCK_ACL_KEY :string[] = [
  genRandomUUID(),
  genRandomUUID(),
];

export const MOCK_FQN :Object = {
  namespace: 'LATTICE',
  name: 'Data'
};

export const MOCK_ACCESS_CHECK_DM :Object = {
  aclKey: MOCK_ACL_KEY,
  permissions: ['READ']
};

export const MOCK_ACE_DM :Object = {
  principal: { type: 'USER', id: 'principalId' },
  permissions: ['READ']
};

export const MOCK_ACL_DM :Object = {
  aclKey: MOCK_ACL_KEY,
  aces: [MOCK_ACE_DM]
};

export const MOCK_ACL_DATA_DM :Object = {
  acl: MOCK_ACL_DM,
  action: 'ADD'
};

export const MOCK_APP_DM :Object = {
  name: 'name',
  title: 'title',
  description: 'description',
  id: 'fae6af98-2675-45bd-9a5b-1619a87235a8',
  appTypeIds: ['ec6865e6-e60e-424b-a071-6a9c1603d735'],
  url: 'test.com'
};

export const MOCK_APP_TYPE_DM :Object = {
  type: { namespace: 'LATTICE', name: 'MockType' },
  title: 'title',
  description: 'description',
  id: 'fae6af98-2675-45bd-9a5b-1619a87235a8',
  entityTypeId: 'ec6865e6-e60e-424b-a071-6a9c1603d735'
};

export const MOCK_DATA_EDGE_KEY_DM :Object = {
  dst: {
    entityKeyId: genRandomUUID(),
    entitySetId: genRandomUUID(),
  },
  edge: {
    entityKeyId: genRandomUUID(),
    entitySetId: genRandomUUID(),
  },
  src: {
    entityKeyId: genRandomUUID(),
    entitySetId: genRandomUUID(),
  },
};

export const MOCK_DATA_SOURCE_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  title: 'title',
  description: 'description',
  entitySetIds: [
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
    'fae6af98-2675-45bd-9a5b-1619a87235a8'
  ]
};

export const MOCK_ENTITY_DATA_KEY_DM :Object = {
  entityKeyId: genRandomUUID(),
  entitySetId: genRandomUUID(),
};

export const MOCK_ENTITY_SET_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  entityTypeId: '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
  name: 'name',
  title: 'title',
  description: 'description',
  contacts: ['LATTICE']
};

export const MOCK_ENTITY_TYPE_DM :Object = {
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

export const MOCK_ASSOCIATION_TYPE_DM :Object = {
  bidirectional: false,
  dst: [genRandomUUID()],
  entityType: MOCK_ENTITY_TYPE_DM,
  src: [genRandomUUID()],
};

export const MOCK_LINKING_ENTITY_SET_DM :Object = {
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

export const MOCK_LINKING_ENTITY_TYPE_DM :Object = {
  entityType: MOCK_ENTITY_TYPE_DM,
  entityTypeIds: [
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
    'fae6af98-2675-45bd-9a5b-1619a87235a8'
  ],
  deidentified: false
};

export const MOCK_LINKING_REQUEST_DM :Object = {
  linkingEntitySet: MOCK_LINKING_ENTITY_SET_DM,
  propertyTypeIds: [
    '4b08e1f9-4a00-4169-92ea-10e377070220',
    'ec6865e6-e60e-424b-a071-6a9c1603d735'
  ]
};

export const MOCK_ORGANIZATION_DM :Object = {
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

export const MOCK_PRINCIPAL_DM :Object = {
  type: PrincipalTypes.USER,
  id: 'mockPrincipalId'
};

export const MOCK_PROPERTY_TYPE_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  type: { namespace: 'LATTICE', name: 'MockType' },
  title: 'title',
  description: 'description',
  datatype: 'datatype',
  schemas: [{ namespace: 'LATTICE', name: 'MockSchema' }]
};

export const MOCK_REQUEST_DM :Object = {
  aclKey: MOCK_ACL_KEY,
  permissions: ['READ'],
  reason: 'reason'
};

export const MOCK_REQUEST_STATUS_DM :Object = {
  request: MOCK_REQUEST_DM,
  state: RequestStateTypes.SUBMITTED,
  principal: MOCK_PRINCIPAL_DM
};

export const MOCK_ROLE_DM :Object = {
  id: 'fae6af98-2675-45bd-9a5b-1619a87235a8',
  organizationId: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  title: 'title',
  description: 'description',
  principal: { type: 'ROLE', id: 'roleid' }
};

export const MOCK_SCHEMA_DM :Object = {
  fqn: MOCK_FQN,
  entityTypes: [MOCK_ENTITY_TYPE_DM],
  propertyTypes: [MOCK_PROPERTY_TYPE_DM]
};

export const MOCK_EDM_DM :Object = {
  associationTypes: [MOCK_ASSOCIATION_TYPE_DM],
  entityTypes: [MOCK_ENTITY_TYPE_DM],
  namespaces: [MOCK_NAMESPACE],
  propertyTypes: [MOCK_PROPERTY_TYPE_DM],
  schemas: [MOCK_SCHEMA_DM],
  version: genRandomUUID(),
};
