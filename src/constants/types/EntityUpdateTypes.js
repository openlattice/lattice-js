/*
 * @flow
 */

const EntityUpdateTypes = {
  PartialReplace: 'PartialReplace',
  Replace: 'Replace'
};

export type EntityUpdate = $Keys<typeof EntityUpdateTypes>;

export { EntityUpdateTypes as default };
