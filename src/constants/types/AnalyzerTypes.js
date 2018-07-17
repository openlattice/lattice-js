/*
 * @flow
 */

const AnalyzerTypes = {
  METAPHONE: 'METAPHONE',
  STANDARD: 'STANDARD',
};

export type Analyzer = $Keys<typeof AnalyzerTypes>;

export { AnalyzerTypes as default };
