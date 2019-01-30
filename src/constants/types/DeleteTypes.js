/*
 * @flow
 */

const DeleteTypes = {
  Hard: 'Hard',
  Soft: 'Soft'
};

export type DeleteType = $Keys<typeof DeleteTypes>;

export { DeleteTypes as default };
