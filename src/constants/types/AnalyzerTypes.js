/*
 * @flow
 */

type AnalyzerTypeEnum = {|
  METAPHONE :'METAPHONE';
  STANDARD :'STANDARD';
|};

type AnalyzerType = $Values<AnalyzerTypeEnum>;

const AnalyzerTypes :AnalyzerTypeEnum = Object.freeze({
  METAPHONE: 'METAPHONE',
  STANDARD: 'STANDARD',
});

export { AnalyzerTypes as default };
export type { AnalyzerType };
