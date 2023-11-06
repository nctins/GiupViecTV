module.exports = function(api) {
    api.cache(true);
    return {
      plugins: [
        [
          "module-resolver",
          {
            root: ['./'],
            alias: {
              '^~(.+)': './src/\\1',
            },
          },
        ],
      ],
    };
  };
  