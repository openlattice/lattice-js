/*
 * @flow
 *
 * since Babel supports Flow syntax, and ESLint is using the babel-eslint parser, ESLint will happily accept the
 * "declare" keyword, which means it won't complain about __VERSION__ being undefined, which makes us happy :)
 *
 * http://flowtype.org/docs/declarations.html
 */
declare var __VERSION__;

export default {
  __VERSION__
};
