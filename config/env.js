/*
 * @flow
 */

function ifElse(condition :boolean) :Function {
  return (isTrue :any, isFalse :any) => {
    return condition ? isTrue : isFalse;
  };
}

const BUILD :string = process.env.BUILD || 'development';
const MINIMIZE :string = process.env.MINIMIZE || 'false';

const isDev :boolean = BUILD === 'development';
const isProd :boolean = BUILD === 'production';

const ifDev :Function = ifElse(isDev);
const ifProd :Function = ifElse(isProd);

const ifMin :Function = ifElse(MINIMIZE === 'true');

export {
  isDev,
  isProd,
  ifDev,
  ifProd,
  ifMin
};
