module.exports = function(api) {
  api.cache(true); // Cachen bruges til at forbedre byggeydelsen
  return {
    presets: ['babel-preset-expo'], // Bruger Expo's Babel-preset
  };
};