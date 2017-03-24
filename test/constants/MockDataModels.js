/*
 * @flow
 */

import PrincipalTypes from '../../src/constants/types/PrincipalTypes';
import RequestStateTypes from '../../src/constants/types/RequestStateTypes';
import SecurableTypes from '../../src/constants/types/SecurableTypes';

export const MOCK_ACL_KEY :string[] = [
  'ec6865e6-e60e-424b-a071-6a9c1603d735'
];

export const MOCK_DATA_SOURCE_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  title: 'title',
  description: 'description',
  entitySetIds: [
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
    'fae6af98-2675-45bd-9a5b-1619a87235a8'
  ]
};

export const MOCK_ENTITY_SET_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  entityTypeId: '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
  name: 'name',
  title: 'title',
  description: 'description',
  contacts: ['LOOM']
};

export const MOCK_ENTITY_TYPE_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  type: { namespace: 'LOOM', name: 'MockType' },
  title: 'title',
  description: 'description',
  schemas: [{ namespace: 'LOOM', name: 'MockSchema' }],
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

export const MOCK_ORG_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  title: 'title',
  description: 'description',
  members: [{ type: 'USER', id: 'principalId_0' }],
  roles: [{ type: 'ROLE', id: 'principalId_1' }],
  emails: ['kryptnostic.com']
};

export const MOCK_PRINCIPAL_DM :Object = {
  type: PrincipalTypes.USER,
  id: 'mockPrincipalId'
};

export const MOCK_PROPERTY_TYPE_DM :Object = {
  id: 'ec6865e6-e60e-424b-a071-6a9c1603d735',
  type: { namespace: 'LOOM', name: 'MockType' },
  title: 'title',
  description: 'description',
  datatype: 'datatype',
  schemas: [{ namespace: 'LOOM', name: 'MockSchema' }]
};

export const MOCK_REQUEST_DM :Object = {
  aclKey: ['ec6865e6-e60e-424b-a071-6a9c1603d735'],
  permissions: ['READ'],
  reason: 'reason'
};

export const MOCK_REQUEST_STATUS_DM :Object = {
  request: MOCK_REQUEST_DM,
  state: RequestStateTypes.SUBMITTED,
  principal: MOCK_PRINCIPAL_DM
};
