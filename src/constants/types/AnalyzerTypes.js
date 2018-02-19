/*
 * @flow
 */

const METAPHONE :'METAPHONE' = 'METAPHONE';
const STANDARD :'STANDARD' = 'STANDARD';

const AnalyzerTypes = {
  METAPHONE,
  STANDARD
};

export type Analyzer =
  | typeof METAPHONE
  | typeof STANDARD;

export { AnalyzerTypes as default };
