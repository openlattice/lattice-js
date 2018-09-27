/*
 * @flow
 */

const UpdateTypes = {
  Merge: 'Merge',
  PartialReplace: 'PartialReplace',
  Replace: 'Replace',
};

export type UpdateType = $Keys<typeof UpdateTypes>;

export { UpdateTypes as default };
