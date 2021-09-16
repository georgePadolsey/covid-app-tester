const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  // If you want to change the base directory the nextjs website should server from
  basePath: "/covid-test",
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});
