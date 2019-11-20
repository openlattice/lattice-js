/*
 * @flow
 */

import {
  genRandomBoolean,
  genRandomInt,
  genRandomString,
  genRandomUUID,
  pickRandomValue,
} from './MockUtils';
import {
  ActionTypes,
  AnalyzerTypes,
  EntitySetFlagTypes,
  GrantTypes,
  IndexTypes,
  PermissionTypes,
  PrincipalTypes,
  RequestStateTypes,
  SecurableTypes,
} from '../../constants/types';
import {
  AccessCheck,
  AccessCheckBuilder,
  Ace,
  AceBuilder,
  Acl,
  AclBuilder,
  AclData,
  AclDataBuilder,
  AssociationType,
  AssociationTypeBuilder,
  EntitySet,
  EntitySetBuilder,
  EntityType,
  EntityTypeBuilder,
  Grant,
  GrantBuilder,
  FullyQualifiedName,
  Organization,
  OrganizationBuilder,
  Principal,
  PrincipalBuilder,
  PropertyType,
  PropertyTypeBuilder,
  Role,
  RoleBuilder,
  Schema,
  SchemaBuilder,
} from '../../models';

const MOCK_NAMESPACE = 'OPENLATTICE';

const MOCK_ACL_KEY :string[] = [
  'ae9e1cc3-ba0d-4532-9860-e5e7eaf36e83',
  '9b93bc80-79c3-44c8-807c-ada1a8d6484f',
];

const MOCK_FQN :Object = {
  namespace: 'LATTICE',
  name: 'Data'
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

const MOCK_ENTITY_SET :EntitySet = new EntitySetBuilder()
  .setContacts(['OPENLATTICE'])
  .setDescription('MockEntitySetDescription')
  .setEntityTypeId('78ad8735-d5dc-42ab-96d9-677bca55e60f')
  .setFlags([EntitySetFlagTypes.LINKING])
  .setId('6685abaf-5508-4f34-a3c7-46b687f66ddd')
  .setLinkedEntitySets(['cf72e97f-109c-46a1-bb89-93a8753fd7ac'])
  .setName('MockEntitySet')
  .setOrganizationId('9b93bc80-79c3-44c8-807c-ada1a8d6484f')
  .setTitle('MockEntitySetTitle')
  .build();

function genRandomEntitySet() :EntitySet {
  return new EntitySetBuilder()
    .setContacts([genRandomString()])
    .setDescription(genRandomString())
    .setEntityTypeId(genRandomUUID())
    .setFlags([pickRandomValue(EntitySetFlagTypes)])
    .setId(genRandomUUID())
    .setLinkedEntitySets([genRandomUUID(), genRandomUUID()])
    .setName(genRandomString())
    .setOrganizationId(genRandomUUID())
    .setTitle(genRandomString())
    .build();
}

const MOCK_ENTITY_TYPE :EntityType = new EntityTypeBuilder()
  .setBaseType('9a768c9b-b76f-4fa1-be60-0178695cdbc3')
  .setCategory(SecurableTypes.EntityType)
  .setDescription('description')
  .setId('ec6865e6-e60e-424b-a071-6a9c1603d735')
  .setKey([
    '0c8be4b7-0bd5-4dd1-a623-da78871c9d0e',
    '4b08e1f9-4a00-4169-92ea-10e377070220',
  ])
  .setPropertyTags({
    '11f65a3c-158e-4bea-9e6d-dc7ff2396ef0': ['TAG_0', 'TAG_1'],
    '5993e81e-1265-4d00-8b25-9dafb5261bd4': ['TAG_0'],
  })
  .setPropertyTypes([
    '8f79e123-3411-4099-a41f-88e5d22d0e8d',
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085',
    'fae6af98-2675-45bd-9a5b-1619a87235a8',
  ])
  .setSchemas([new FullyQualifiedName('OL', 'MockSchema')])
  .setShards(1)
  .setTitle('title')
  .setType(new FullyQualifiedName('OL', 'MockEntityType'))
  .build();

function genRandomEntityType() :EntityType {
  return new EntityTypeBuilder()
    .setBaseType(genRandomUUID())
    .setCategory(SecurableTypes.EntityType)
    .setDescription(genRandomString())
    .setId(genRandomUUID())
    .setKey([genRandomUUID(), genRandomUUID()])
    .setPropertyTags({
      [genRandomUUID()]: [genRandomString(), genRandomString()],
      [genRandomUUID()]: [genRandomString()],
    })
    .setPropertyTypes([genRandomUUID(), genRandomUUID(), genRandomUUID()])
    .setSchemas([new FullyQualifiedName(genRandomString(), genRandomString())])
    .setShards(1)
    .setTitle(genRandomString())
    .setType(new FullyQualifiedName(genRandomString(), genRandomString()))
    .build();
}

const MOCK_ASSOCIATION_TYPE :AssociationType = new AssociationTypeBuilder()
  .setEntityType(MOCK_ENTITY_TYPE)
  .setSourceEntityTypeIds([
    'c49832e9-8c49-4d24-984a-2221b4fa249b',
    'bec4adc8-79dc-48ab-afda-e203c5573ff5',
  ])
  .setDestinationEntityTypeIds([
    '91385fae-babc-4bd3-ba42-74decb9036f0',
    '80630df9-f6a4-4213-bbcb-b89826cf14a6',
    'c1366efe-f619-4f30-bb6a-0b7437966e65',
  ])
  .setBidirectional(false)
  .build();

function genRandomAssociationType() :AssociationType {
  return new AssociationTypeBuilder()
    .setEntityType(genRandomEntityType())
    .setSourceEntityTypeIds([genRandomUUID(), genRandomUUID()])
    .setDestinationEntityTypeIds([genRandomUUID(), genRandomUUID(), genRandomUUID()])
    .setBidirectional(genRandomBoolean())
    .build();
}

const MOCK_PRINCIPAL :Principal = new PrincipalBuilder()
  .setId('MockPrincipalId')
  .setType(PrincipalTypes.USER)
  .build();

function genRandomPrincipal() :Principal {
  return new PrincipalBuilder()
    .setId(genRandomUUID())
    .setType(pickRandomValue(PrincipalTypes))
    .build();
}

const MOCK_PROPERTY_TYPE :PropertyType = new PropertyTypeBuilder()
  .setAnalyzer(AnalyzerTypes.STANDARD)
  .setDataType('String')
  .setDescription('description')
  .setEnumValues(['ENUM_1', 'ENUM_2'])
  .setId('3771c28a-cdee-403b-9cea-48845210f8ab')
  .setIndexType(IndexTypes.BTREE)
  .setMultiValued(false)
  .setPii(false)
  .setSchemas([new FullyQualifiedName('OL', 'MockSchema')])
  .setTitle('title')
  .setType(new FullyQualifiedName('OL', 'MockPropertyType'))
  .build();

function genRandomPropertyType() :PropertyType {
  return new PropertyTypeBuilder()
    .setAnalyzer(AnalyzerTypes.STANDARD)
    .setDataType('String')
    .setDescription(genRandomString())
    .setEnumValues([genRandomString(), genRandomString()])
    .setId(genRandomUUID())
    .setIndexType(IndexTypes.HASH)
    .setMultiValued(genRandomBoolean())
    .setPii(genRandomBoolean())
    .setSchemas([new FullyQualifiedName(genRandomString(), genRandomString())])
    .setTitle(genRandomString())
    .setType(new FullyQualifiedName(genRandomString(), genRandomString()))
    .build();
}

const MOCK_ROLE :Role = new RoleBuilder()
  .setDescription('description')
  .setId('ec6865e6-e60e-424b-a071-6a9c1603d735')
  .setOrganizationId('80630df9-f6a4-4213-bbcb-b89826cf14a6')
  .setPrincipal(MOCK_PRINCIPAL)
  .setTitle('title')
  .build();

function genRandomRole() :Role {
  return new RoleBuilder()
    .setDescription(genRandomString())
    .setId(genRandomUUID())
    .setOrganizationId(genRandomUUID())
    .setPrincipal(genRandomPrincipal())
    .setTitle(genRandomString())
    .build();
}

const MOCK_LINKING_ENTITY_SET_DM :Object = {
  entitySet: MOCK_ENTITY_SET,
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
  entityType: MOCK_ENTITY_TYPE,
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

const MOCK_REQUEST_DM :Object = {
  aclKey: MOCK_ACL_KEY,
  permissions: ['READ'],
  reason: 'reason'
};

const MOCK_REQUEST_STATUS_DM :Object = {
  request: MOCK_REQUEST_DM,
  state: RequestStateTypes.SUBMITTED,
  principal: MOCK_PRINCIPAL.toObject()
};

const MOCK_SCHEMA :Schema = new SchemaBuilder()
  .setEntityTypes([MOCK_ENTITY_TYPE])
  .setFullyQualifiedName(new FullyQualifiedName('OL', 'MockSchema'))
  .setPropertyTypes([MOCK_PROPERTY_TYPE])
  .build();

function genRandomSchema() :Schema {
  return new SchemaBuilder()
    .setEntityTypes([genRandomEntityType()])
    .setFullyQualifiedName(new FullyQualifiedName(genRandomString(), genRandomString()))
    .setPropertyTypes([genRandomPropertyType(), genRandomPropertyType()])
    .build();
}

const MOCK_EDM_DM :Object = {
  associationTypes: [MOCK_ASSOCIATION_TYPE],
  entityTypes: [MOCK_ENTITY_TYPE],
  namespaces: [MOCK_NAMESPACE],
  propertyTypes: [MOCK_PROPERTY_TYPE],
  schemas: [MOCK_SCHEMA],
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

const MOCK_ACCESS_CHECK :AccessCheck = (new AccessCheckBuilder())
  .setAclKey(MOCK_ACL_KEY)
  .setPermissions([PermissionTypes.READ])
  .build();

function genRandomAccessCheck() :AccessCheck {
  return new AccessCheckBuilder()
    .setAclKey([genRandomUUID(), genRandomUUID()])
    .setPermissions([pickRandomValue(PermissionTypes)])
    .build();
}

const MOCK_ACE :Ace = (new AceBuilder())
  .setPermissions([PermissionTypes.READ, PermissionTypes.WRITE])
  .setPrincipal(MOCK_PRINCIPAL)
  .build();

function genRandomAce() :Ace {
  return new AceBuilder()
    .setPermissions([pickRandomValue(PermissionTypes)])
    .setPrincipal(genRandomPrincipal())
    .build();
}

const MOCK_ACL :Acl = (new AclBuilder())
  .setAces([MOCK_ACE])
  .setAclKey(MOCK_ACL_KEY)
  .build();

function genRandomAcl() :Acl {
  return new AclBuilder()
    .setAces([genRandomAce(), genRandomAce()])
    .setAclKey([genRandomUUID(), genRandomUUID()])
    .build();
}

const MOCK_ACL_DATA :AclData = (new AclDataBuilder())
  .setAcl(MOCK_ACL)
  .setAction(ActionTypes.ADD)
  .build();

function genRandomAclData() :AclData {
  return new AclDataBuilder()
    .setAcl(genRandomAcl())
    .setAction(pickRandomValue(ActionTypes))
    .build();
}

const MOCK_ORGANIZATION :Organization = (new OrganizationBuilder())
  .setApps([genRandomUUID(), genRandomUUID()])
  .setAutoApprovedEmails(['openlattice.com'])
  .setDescription('MockOrgDescription')
  .setEnrollments([genRandomString(), genRandomString()])
  .setGrants({
    [genRandomUUID()]: (new GrantBuilder())
      .setGrantType(GrantTypes.AUTO)
      .setMappings([genRandomString()])
      .build()
  })
  .setId('ec6865e6-e60e-424b-a071-6a9c1603d735')
  .setMembers([
    (new PrincipalBuilder())
      .setId('MockOrgMemberPrincipal')
      .setType(PrincipalTypes.USER)
      .build()
  ])
  .setPartitions([128])
  .setPrincipal(
    (new PrincipalBuilder())
      .setId('MockOrgPrincipalId')
      .setType(PrincipalTypes.ORGANIZATION)
      .build()
  )
  .setRoles([
    (new RoleBuilder())
      .setDescription('MockOrgRoleDescription')
      .setId('4b08e1f9-4a00-4169-92ea-10e377070220')
      .setOrganizationId('ec6865e6-e60e-424b-a071-6a9c1603d735')
      .setPrincipal(
        (new PrincipalBuilder())
          .setId('MockOrgRolePrincipalId')
          .setType(PrincipalTypes.ROLE)
          .build()
      )
      .setTitle('MockOrgRoleTitle')
      .build()
  ])
  .setTitle('MockOrgTitle')
  .build();

function genRandomOrganization() :Organization {
  return new OrganizationBuilder()
    .setApps([genRandomUUID(), genRandomUUID()])
    .setAutoApprovedEmails([`${genRandomString()}.com`])
    .setDescription(genRandomString())
    .setId(genRandomUUID())
    .setMembers([
      (new PrincipalBuilder())
        .setId(genRandomString())
        .setType(PrincipalTypes.USER)
        .build()
    ])
    .setPartitions([genRandomInt()])
    .setPrincipal(
      (new PrincipalBuilder())
        .setId(genRandomString())
        .setType(PrincipalTypes.ORGANIZATION)
        .build()
    )
    .setRoles([
      (new RoleBuilder())
        .setDescription(genRandomString())
        .setId(genRandomUUID())
        .setOrganizationId(genRandomUUID())
        .setPrincipal(
          (new PrincipalBuilder())
            .setId(genRandomString())
            .setType(PrincipalTypes.ROLE)
            .build()
        )
        .setTitle(genRandomString())
        .build()
    ])
    .setTitle(genRandomString())
    .build();
}

const MOCK_GRANT :Grant = (new GrantBuilder())
  .setGrantType(GrantTypes.AUTO)
  .setMappings(['mapping1', 'mapping2'])
  .build();

function genRandomGrant() :Grant {
  return new GrantBuilder()
    .setGrantType(pickRandomValue(GrantTypes))
    .setMappings([genRandomString()])
    .build();
}

export {
  MOCK_ACCESS_CHECK,
  MOCK_ACE,
  MOCK_ACL,
  MOCK_ACL_DATA,
  MOCK_ACL_KEY,
  MOCK_APP_DM,
  MOCK_APP_TYPE_DM,
  MOCK_ASSOCIATION_TYPE,
  MOCK_DATA_EDGE_DM,
  MOCK_DATA_EDGE_KEY_DM,
  MOCK_DATA_GRAPH_DM,
  MOCK_DATA_SOURCE_DM,
  MOCK_EDM_DM,
  MOCK_ENTITY_DATA_KEY_DM,
  MOCK_ENTITY_SET,
  MOCK_ENTITY_TYPE,
  MOCK_FQN,
  MOCK_GRANT,
  MOCK_LINKING_ENTITY_SET_DM,
  MOCK_LINKING_ENTITY_TYPE_DM,
  MOCK_LINKING_REQUEST_DM,
  MOCK_NAMESPACE,
  MOCK_ORGANIZATION,
  MOCK_PRINCIPAL,
  MOCK_PROPERTY_TYPE,
  MOCK_REQUEST_DM,
  MOCK_REQUEST_STATUS_DM,
  MOCK_ROLE,
  MOCK_SCHEMA,
  genRandomAccessCheck,
  genRandomAce,
  genRandomAcl,
  genRandomAclData,
  genRandomAssociationType,
  genRandomDataGraph,
  genRandomEntitySet,
  genRandomEntityType,
  genRandomGrant,
  genRandomOrganization,
  genRandomPrincipal,
  genRandomPropertyType,
  genRandomRole,
  genRandomSchema,
};
