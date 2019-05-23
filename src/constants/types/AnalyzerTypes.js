/*
 * @flow
 */

type AnalyzerTypeEnum = {|
  METAPHONE :'METAPHONE';
  NONE :'NONE';
  NOT_ANALYZED :'NOT_ANALYZED';
  STANDARD :'STANDARD';
|};

type AnalyzerType = $Values<AnalyzerTypeEnum>;

const AnalyzerTypes :{| ...AnalyzerTypeEnum |} = Object.freeze({
  METAPHONE: 'METAPHONE',
  NONE: 'NONE',
  NOT_ANALYZED: 'NOT_ANALYZED',
  STANDARD: 'STANDARD',
});

export default AnalyzerTypes;
export type { AnalyzerType };
