module.exports = {
  plugins: [
    ['@babel/plugin-transform-runtime', {
      corejs: 3,
    }],
    '@babel/plugin-proposal-class-properties',
  ],
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: false,
    }],
    '@babel/preset-flow',
  ],
};
