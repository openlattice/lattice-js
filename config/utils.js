/*
 * @flow
 */

function compact(arr :Array<any>) :Array<any> {
  return arr.filter((element :any) => {
    return !!element;
  });
}

function ifElse(condition :boolean) :Function {
  return (isTrue :any, isFalse :any) => {
    return condition ? isTrue : isFalse;
  };
}

export {
  compact,
  ifElse
};
