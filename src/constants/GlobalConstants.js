/*
 * @flow
 */

import FullyQualifiedName from '../models/FullyQualifiedName';

export const AT_CLASS :string = '@class';
export const AT_ID :string = '@id';
export const DESTINATION :string = 'dst';
export const DESTINATION_ES_IDS = 'destinationEntitySetIds';
export const EDGE :string = 'edge';
export const EDGE_ES_IDS = 'edgeEntitySetIds';
export const ENTITY_KEY_IDS :string = 'entityKeyIds';
export const ENTITY_TYPE_ID :string = 'entityTypeId';
export const FUZZY :string = 'fuzzy';
export const KEYWORD :string = 'kw';
export const MAX_HITS :string = 'maxHits';
export const NAME :string = 'name';
export const NAMESPACE :string = 'namespace';
export const OPENLATTICE_ID_FQN :string = FullyQualifiedName.toString('openlattice', AT_ID);
export const PROPERTY_TYPE_IDS :string = 'pid';
export const ROLE_PKG :string = 'com.openlattice.organization.roles.Role';
export const SEARCH_FIELDS :string = 'searchFields';
export const SEARCH_TERM :string = 'searchTerm';
export const SOURCE :string = 'src';
export const SOURCE_ES_IDS = 'sourceEntitySetIds';
export const START :string = 'start';
