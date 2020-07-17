/*
 * @flow
 */

type UUID = string;

type EntityKey = {|
  entityId :string;
  entitySetId :UUID;
|};

export type {
  UUID,
  EntityKey,
};
