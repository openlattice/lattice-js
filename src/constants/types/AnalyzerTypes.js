/*
 * @flow
 */

type AnalyzerTypeEnum = {|
  METAPHONE :'METAPHONE';
  NONE :'NONE';
  NOT_ANALYZED :'NOT_ANALYZED';
  STANDARD :'STANDARD';
|};

const AnalyzerTypes :{| ...AnalyzerTypeEnum |} = Object.freeze({
  METAPHONE: 'METAPHONE',
  NONE: 'NONE',
  NOT_ANALYZED: 'NOT_ANALYZED',
  STANDARD: 'STANDARD',
});

type AnalyzerType = $Values<typeof AnalyzerTypes>;

export default AnalyzerTypes;
export type { AnalyzerType };
