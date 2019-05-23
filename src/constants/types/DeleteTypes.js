/*
 * @flow
 */

type DeleteTypesEnum = {|
  HARD :'Hard';
  Hard :'Hard';
  SOFT :'Soft';
  Soft :'Soft';
|};

type DeleteType = $Values<DeleteTypesEnum>;

const DeleteTypes :{| ...DeleteTypesEnum |} = Object.freeze({
  HARD: 'Hard',
  Hard: 'Hard',
  SOFT: 'Soft',
  Soft: 'Soft',
});

export default DeleteTypes;
export type { DeleteType };
