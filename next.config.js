const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  basePath: "/covid-test",
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});
