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
  SecurableTypes,
} from '../../constants/types';
import {
  AccessCheckBuilder,
  AceBuilder,
  AclBuilder,
  AclDataBuilder,
  AppBuilder,
  AppTypeBuilder,
  AssociationTypeBuilder,
  DataGraphBuilder,
  EntityDataKeyBuilder,
  EntitySetBuilder,
  EntityTypeBuilder,
  FQN,
  GrantBuilder,
  OrganizationBuilder,
  PrincipalBuilder,
  PropertyTypeBuilder,
  RoleBuilder,
  SchemaBuilder,
} from '../../models';
import type { PrincipalType } from '../../constants/types';

const PRINCIPAL_MOCK = (new PrincipalBuilder())
  .setId('MockPrincipalId')
  .setType(PrincipalTypes.USER)
  .build();

function genRandomPrincipal(type :?PrincipalType) {
  return (new PrincipalBuilder())
    .setId(genRandomUUID())
    .setType(type || pickRandomValue(PrincipalTypes))
    .build();
}

const ACCESS_CHECK_MOCK = (new AccessCheckBuilder())
  .setAclKey(['69682f1e-6039-44da-8342-522395b43738', '5e4a579a-ad72-4902-991c-027d80dcd590'])
  .setPermissions([PermissionTypes.READ, PermissionTypes.WRITE])
  .build();

function genRandomAccessCheck() {
  return (new AccessCheckBuilder())
    .setAclKey([genRandomUUID(), genRandomUUID()])
    .setPermissions([pickRandomValue(PermissionTypes)])
    .build();
}

const ACE_MOCK = (new AceBuilder())
  .setPermissions([PermissionTypes.READ, PermissionTypes.WRITE])
  .setPrincipal(PRINCIPAL_MOCK)
  .build();

function genRandomAce() {
  return (new AceBuilder())
    .setPermissions([pickRandomValue(PermissionTypes)])
    .setPrincipal(genRandomPrincipal())
    .build();
}

const ACL_MOCK = (new AclBuilder())
  .setAces([ACE_MOCK])
  .setAclKey(['fae6af98-2675-45bd-9a5b-1619a87235a8', 'ae9e1cc3-ba0d-4532-9860-e5e7eaf36e83'])
  .build();

function genRandomAcl() {
  return (new AclBuilder())
    .setAces([genRandomAce(), genRandomAce()])
    .setAclKey([genRandomUUID(), genRandomUUID()])
    .build();
}

const ACL_DATA_MOCK = (new AclDataBuilder())
  .setAcl(ACL_MOCK)
  .setAction(ActionTypes.ADD)
  .build();

function genRandomAclData() {
  return (new AclDataBuilder())
    .setAcl(genRandomAcl())
    .setAction(pickRandomValue(ActionTypes))
    .build();
}

const APP_MOCK = (new AppBuilder())
  .setAppTypeIds(['c3dbd929-91c9-4b48-9545-a634038f34ba'])
  .setDescription('MockAppDescription')
  .setId('53f45e4b-48a4-4089-8932-3655a5b0d50a')
  .setName('MockAppName')
  .setTitle('MockAppTitle')
  .setUrl('https://openlattice.com')
  .build();

function genRandomApp() {
  return (new AppBuilder())
    .setAppTypeIds([genRandomUUID()])
    .setDescription(genRandomString())
    .setId(genRandomUUID())
    .setName(genRandomString())
    .setTitle(genRandomString())
    .setUrl(genRandomString())
    .build();
}

const APP_TYPE_MOCK = (new AppTypeBuilder())
  .setDescription('MockAppTypeDescription')
  .setEntityTypeId('cf411622-8b0e-4352-9bb2-367953fd09a3')
  .setId('27e5b4f0-243a-46c7-8ae3-8516ac0fad6a')
  .setTitle('MockAppTypeTitle')
  .setType(FQN.of('mock.apptype'))
  .build();

function genRandomAppType() {
  return (new AppTypeBuilder())
    .setDescription(genRandomString())
    .setEntityTypeId(genRandomUUID())
    .setId(genRandomUUID())
    .setTitle(genRandomString())
    .setType(FQN.of(genRandomString(), genRandomString()))
    .build();
}

const ENTITY_TYPE_MOCK = (new EntityTypeBuilder())
  .setBaseType('9a768c9b-b76f-4fa1-be60-0178695cdbc3')
  .setCategory(SecurableTypes.EntityType)
  .setDescription('MockEntityTypeDescription')
  .setId('ec6865e6-e60e-424b-a071-6a9c1603d735')
  .setKey(['8f79e123-3411-4099-a41f-88e5d22d0e8d'])
  .setPropertyTags({
    '8f79e123-3411-4099-a41f-88e5d22d0e8d': ['TAG_0', 'TAG_1'],
    'e39dfdfa-a3e6-4f1f-b54b-646a723c3085': ['TAG_0'],
  })
  .setPropertyTypes(['8f79e123-3411-4099-a41f-88e5d22d0e8d', 'e39dfdfa-a3e6-4f1f-b54b-646a723c3085'])
  .setSchemas([FQN.of('mock.schema')])
  .setTitle('MockEntityTypeTitle')
  .setType(FQN.of('mock.entitytype'))
  .build();

function genRandomEntityType() {
  return (new EntityTypeBuilder())
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
    .setSchemas([FQN.of(genRandomString(), genRandomString())])
    .setTitle(genRandomString())
    .setType(FQN.of(genRandomString(), genRandomString()))
    .build();
}

const ASSOCIATION_TYPE_MOCK = (new AssociationTypeBuilder())
  .setEntityType(ENTITY_TYPE_MOCK)
  .setSourceEntityTypeIds(['c49832e9-8c49-4d24-984a-2221b4fa249b', 'bec4adc8-79dc-48ab-afda-e203c5573ff5'])
  .setDestinationEntityTypeIds(['91385fae-babc-4bd3-ba42-74decb9036f0', 'c1366efe-f619-4f30-bb6a-0b7437966e65'])
  .setBidirectional(false)
  .build();

function genRandomAssociationType() {
  return (new AssociationTypeBuilder())
    .setEntityType(genRandomEntityType())
    .setSourceEntityTypeIds([genRandomUUID(), genRandomUUID()])
    .setDestinationEntityTypeIds([genRandomUUID(), genRandomUUID(), genRandomUUID()])
    .setBidirectional(genRandomBoolean())
    .build();
}

const DATA_GRAPH_MOCK = (new DataGraphBuilder())
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

const ENTITY_DATA_KEY_MOCK = (new EntityDataKeyBuilder())
  .setEntityKeyId('3f8bd01a-e211-4912-90d0-fbd2fefefe24')
  .setEntitySetId('e90e6d9c-d0ed-490b-ba3e-38b30f34a1eb')
  .build();

function genRandomEntityDataKey() {
  return (new EntityDataKeyBuilder())
    .setEntityKeyId(genRandomUUID())
    .setEntitySetId(genRandomUUID())
    .build();
}

const ENTITY_SET_MOCK = (new EntitySetBuilder())
  .setContacts(['OPENLATTICE'])
  .setDescription('MockEntitySetDescription')
  .setEntityTypeId('78ad8735-d5dc-42ab-96d9-677bca55e60f')
  .setFlags([EntitySetFlagTypes.ASSOCIATION])
  .setId('6685abaf-5508-4f34-a3c7-46b687f66ddd')
  .setLinkedEntitySets(['cf72e97f-109c-46a1-bb89-93a8753fd7ac'])
  .setName('MockEntitySetName')
  .setOrganizationId('9b93bc80-79c3-44c8-807c-ada1a8d6484f')
  .setTitle('MockEntitySetTitle')
  .build();

function genRandomEntitySet() {
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

const GRANT_MOCK = (new GrantBuilder())
  .setAttribute('attribute')
  .setGrantType(GrantTypes.MANUAL)
  .setMappings(['MAPPING_1', 'MAPPING_2'])
  .build();

function genRandomGrant() {
  return (new GrantBuilder())
    .setAttribute(genRandomString())
    .setGrantType(pickRandomValue(GrantTypes))
    .setMappings([genRandomString()])
    .build();
}

const ROLE_MOCK = (new RoleBuilder())
  .setDescription('MockOrgRoleDescription')
  .setId('66da9306-3d1d-49d7-a8ee-8515c9c28434')
  .setOrganizationId('a77a0f9a-0e6f-4a98-a169-4d1e122b39a3')
  .setPrincipal((new PrincipalBuilder()).setId('MockOrgRolePrincipalId').setType(PrincipalTypes.ROLE).build())
  .setTitle('MockOrgRoleTitle')
  .build();

function genRandomRole() {
  return (new RoleBuilder())
    .setDescription(genRandomString())
    .setId(genRandomUUID())
    .setOrganizationId(genRandomUUID())
    .setPrincipal(genRandomPrincipal())
    .setTitle(genRandomString())
    .build();
}

const ORGANIZATION_MOCK = (new OrganizationBuilder())
  .setApps(['cdf67221-9bdc-4196-94db-d64915298b3e', 'd5ce57c3-9a1f-4842-bd2f-bec2b63c1ea8'])
  .setConnections(['CONNECTION_0', 'CONNECTION_1'])
  .setDescription('MockOrgDescription')
  .setEmailDomains(['openlattice.com'])
  .setGrants({
    'b95d538b-4358-45fe-9fa5-de7987fbc502': {
      [GrantTypes.MANUAL]: (new GrantBuilder())
        .setGrantType(GrantTypes.MANUAL)
        .setMappings(['MAPPING_1', 'MAPPING_2'])
        .build(),
      [GrantTypes.ROLES]: (new GrantBuilder())
        .setGrantType(GrantTypes.ROLES)
        .setMappings(['MAPPING_3', 'MAPPING_4'])
        .build(),
    }
  })
  .setId('5e5da17a-1b9a-4ef3-9798-8dab02fa6c8a')
  .setMembers([
    (new PrincipalBuilder())
      .setId('MockOrgMemberPrincipal')
      .setType(PrincipalTypes.USER)
      .build()
  ])
  .setMetaDataEntitySetIds({
    columns: 'd505b4f6-8094-46a4-8cf1-6396924392be',
    datasets: '109cd2fe-621e-49a6-8e0d-608190460a4f',
    organization: '8f52d20b-f082-442f-9156-5ec4aecee308',
  })
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
      .setId('9f13d087-dc12-4cb0-8033-abcf70584846')
      .setOrganizationId('5e5da17a-1b9a-4ef3-9798-8dab02fa6c8a')
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

function genRandomOrganization() {
  return (new OrganizationBuilder())
    .setApps([genRandomUUID(), genRandomUUID()])
    .setConnections([genRandomString(), genRandomString()])
    .setDescription(genRandomString())
    .setEmailDomains([`${genRandomString()}.com`])
    .setGrants({
      [genRandomUUID()]: {
        [GrantTypes.AUTOMATIC]: (new GrantBuilder())
          .setGrantType(GrantTypes.AUTOMATIC)
          .setMappings([genRandomString(), genRandomString()])
          .build(),
      },
      [genRandomUUID()]: {
        [GrantTypes.GROUPS]: (new GrantBuilder())
          .setGrantType(GrantTypes.GROUPS)
          .setMappings([genRandomString(), genRandomString()])
          .build(),
      },
    })
    .setId(genRandomUUID())
    .setMembers([
      genRandomPrincipal(PrincipalTypes.USER), // 0
      genRandomPrincipal(PrincipalTypes.USER), // 1
      genRandomPrincipal(PrincipalTypes.USER), // 2
      genRandomPrincipal(PrincipalTypes.USER), // 3
      genRandomPrincipal(PrincipalTypes.USER), // 4
      genRandomPrincipal(PrincipalTypes.USER), // 5
      genRandomPrincipal(PrincipalTypes.USER), // 6
      genRandomPrincipal(PrincipalTypes.USER), // 7
      genRandomPrincipal(PrincipalTypes.USER), // 8 - https://github.com/immutable-js/immutable-js/issues/1643
      genRandomPrincipal(PrincipalTypes.USER), // 9
    ])
    .setMetaDataEntitySetIds({
      columns: genRandomUUID(),
      datasets: genRandomUUID(),
      organization: genRandomUUID(),
    })
    .setPartitions([genRandomInt()])
    .setPrincipal(
      (new PrincipalBuilder())
        .setId(genRandomString())
        .setType(PrincipalTypes.ORGANIZATION)
        .build()
    )
    .setRoles([genRandomRole(), genRandomRole()])
    .setTitle(genRandomString())
    .build();
}

const PROPERTY_TYPE_MOCK = (new PropertyTypeBuilder())
  .setAnalyzer(AnalyzerTypes.STANDARD)
  .setDataType('String')
  .setDescription('MockPropertyTypeDescription')
  .setEnumValues(['ENUM_1', 'ENUM_2'])
  .setId('3771c28a-cdee-403b-9cea-48845210f8ab')
  .setIndexType(IndexTypes.BTREE)
  .setMultiValued(true)
  .setPII(false)
  .setSchemas([FQN.of('mock.schema')])
  .setTitle('MockPropertyTypeTitle')
  .setType(FQN.of('mock.propertytype'))
  .build();

function genRandomPropertyType() {
  return new PropertyTypeBuilder()
    .setAnalyzer(AnalyzerTypes.STANDARD)
    .setDataType('String')
    .setDescription(genRandomString())
    .setEnumValues([genRandomString(), genRandomString()])
    .setId(genRandomUUID())
    .setIndexType(IndexTypes.HASH)
    .setMultiValued(genRandomBoolean())
    .setPII(genRandomBoolean())
    .setSchemas([FQN.of(genRandomString(), genRandomString())])
    .setTitle(genRandomString())
    .setType(FQN.of(genRandomString(), genRandomString()))
    .build();
}

const SCHEMA_MOCK = (new SchemaBuilder())
  .setEntityTypes([ENTITY_TYPE_MOCK])
  .setFQN(FQN.of('mock.schema'))
  .setPropertyTypes([PROPERTY_TYPE_MOCK])
  .build();

function genRandomSchema() {
  return (new SchemaBuilder())
    .setEntityTypes([genRandomEntityType()])
    .setFQN(FQN.of(genRandomString(), genRandomString()))
    .setPropertyTypes([genRandomPropertyType(), genRandomPropertyType()])
    .build();
}

export {
  ACCESS_CHECK_MOCK,
  ACE_MOCK,
  ACL_DATA_MOCK,
  ACL_MOCK,
  APP_MOCK,
  APP_TYPE_MOCK,
  ASSOCIATION_TYPE_MOCK,
  DATA_GRAPH_MOCK,
  ENTITY_DATA_KEY_MOCK,
  ENTITY_SET_MOCK,
  ENTITY_TYPE_MOCK,
  GRANT_MOCK,
  ORGANIZATION_MOCK,
  PRINCIPAL_MOCK,
  PROPERTY_TYPE_MOCK,
  ROLE_MOCK,
  SCHEMA_MOCK,
  genRandomAccessCheck,
  genRandomAce,
  genRandomAcl,
  genRandomAclData,
  genRandomApp,
  genRandomAppType,
  genRandomAssociationType,
  genRandomDataGraph,
  genRandomEntityDataKey,
  genRandomEntitySet,
  genRandomEntityType,
  genRandomGrant,
  genRandomOrganization,
  genRandomPrincipal,
  genRandomPropertyType,
  genRandomRole,
  genRandomSchema,
};
