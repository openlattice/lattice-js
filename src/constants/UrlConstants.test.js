import { Map, OrderedMap } from 'immutable';

import * as UrlConstants from './UrlConstants';

/* eslint-disable key-spacing */
const EXPECTED = Map({
  ADVANCED_PATH                 : 'advanced',
  ALL_PATH                      : 'all',
  ANALYSIS_PATH                 : 'analysis',
  APP_PATH                      : 'app',
  ASSEMBLE_PATH                 : 'assemble',
  ASSOCIATION_PATH              : 'association',
  ASSOCIATION_TYPE_PATH         : 'association/type',
  AUTHORIZATIONS_PATH           : 'authorizations',
  BINARY_PATH                   : 'binary',
  BULK_PATH                     : 'bulk',
  BY_ID_PATH                    : 'by-id',
  BY_NAME_PATH                  : 'by-name',
  CODEX_PATH                    : 'codex',
  COMPLEX_TYPE_PATH             : 'complex/type',
  CONFIG_PATH                   : 'config',
  CONNECTIONS_PATH              : 'connections',
  CONTACT_PATH                  : 'contact',
  COUNT_PATH                    : 'count',
  CREDENTIAL_PATH               : 'credential',
  CSRF_TOKEN                    : 'csrfToken',
  CURRENT_PATH                  : 'current',
  DATABASE_PATH                 : 'database',
  DATASTORE_PATH                : 'datastore',
  DATASOURCE_PATH               : 'datasource',
  DATA_PATH                     : 'data',
  DB_PATH                       : 'db',
  DESCRIPTION_PATH              : 'description',
  DESTROY_PATH                  : 'destroy',
  DETAILED_PATH                 : 'detailed',
  DIFF_PATH                     : 'diff',
  DST_PATH                      : 'dst',
  EDM_PATH                      : 'edm',
  EMAIL_DOMAINS_PATH            : 'email-domains',
  EMAIL_PATH                    : 'email',
  ENTITY_KEY_IDS_PATH           : 'entityKeyIds',
  ENTITY_SETS_PATH              : 'entity-sets',
  ENTITY_TYPE_PATH              : 'entity/type',
  ENUM_TYPE_PATH                : 'enum/type',
  EXPIRATION_PATH               : 'expiration',
  EXPLAIN_PATH                  : 'explain',
  EXTERNAL_DB_COLUMN_PATH       : 'external-database-column',
  EXTERNAL_DB_TABLE_PATH        : 'external-database-table',
  FEEDS_PATH                    : 'feeds',
  FILE_TYPE                     : 'fileType',
  FORCE_PATH                    : 'force',
  FQN_PATH                      : 'fqn',
  GRANT_PATH                    : 'grant',
  HIERARCHY_PATH                : 'hierarchy',
  IDS_PATH                      : 'ids',
  INSTALL_PATH                  : 'install',
  INTEGRATION_PATH              : 'integration',
  LINKING_PATH                  : 'linking',
  LOOKUP_PATH                   : 'lookup',
  MEMBERS_PATH                  : 'members',
  METADATA_PATH                 : 'metadata',
  NAMESPACE_PATH                : 'namespace',
  NEIGHBORS_PATH                : 'neighbors',
  ORGANIZATIONS_PATH            : 'organizations',
  ORG_DB_PATH                   : 'organization-database',
  PARTIAL                       : 'partial',
  PERMISSIONS_PATH              : 'permissions',
  PERSISTENT_SEARCH_PATH        : 'persistentsearch',
  PRINCIPALS_PATH               : 'principals',
  PROMOTE_PATH                  : 'promote',
  PROPERTIES_PATH               : 'properties',
  PROPERTY_TYPE_PATH            : 'property/type',
  REFRESH_PATH                  : 'refresh',
  REQUESTS_PATH                 : 'requests',
  ROLES_PATH                    : 'roles',
  SCHEMA_PATH                   : 'schema',
  SEARCH_ASSOCIATION_TYPES_PATH : 'association_types',
  SEARCH_ENTITY_SETS_PATH       : 'entity_sets',
  SEARCH_ENTITY_TYPES_PATH      : 'entity_types',
  SEARCH_PATH                   : 'search',
  SEARCH_PROPERTY_TYPES_PATH    : 'property_types',
  SET_ID                        : 'setId',
  SET_PATH                      : 'set',
  SRC_PATH                      : 'src',
  SUBSCRIPTIONS_PATH            : 'subscriptions',
  SYNCHRONIZE_PATH              : 'synchronize',
  SYNC_PATH                     : 'sync',
  TITLE_PATH                    : 'title',
  TRANSPORT_PATH                : 'transport',
  TYPES_PATH                    : 'types',
  TYPE_PATH                     : 'type',
  UPDATE_PATH                   : 'update',
  USERS_PATH                    : 'users',
  VERSION_PATH                  : 'version',
}).sortBy((value, key) => key);
/* eslint-enable */

describe('UrlConstants', () => {

  test('should only export expected constants', () => {
    expect(OrderedMap(UrlConstants)).toEqual(EXPECTED);
  });

  EXPECTED.forEach((value, key) => {
    test(`should export "${key}: ${value}"`, () => {
      expect(UrlConstants).toHaveProperty(key);
      expect(UrlConstants[key]).toEqual(value);
    });
  });

});
