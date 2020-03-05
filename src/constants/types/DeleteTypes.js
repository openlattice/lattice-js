/*
 * @flow
 */

type DeleteTypesEnum = {|
  HARD :'Hard';
  Hard :'Hard';
  SOFT :'Soft';
  Soft :'Soft';
|};

const DeleteTypes :{| ...DeleteTypesEnum |} = Object.freeze({
  HARD: 'Hard',
  Hard: 'Hard',
  SOFT: 'Soft',
  Soft: 'Soft',
});

type DeleteType = $Values<typeof DeleteTypes>;

export default DeleteTypes;
export type { DeleteType };
