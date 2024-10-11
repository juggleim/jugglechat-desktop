require("dotenv").config();
const { notarize } = require("@electron/notarize");

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  console.log("electronPlatformName = ", electronPlatformName);
  console.log("appOutDir = ", appOutDir);
  if (electronPlatformName !== "darwin") {
    return;
  }
  const appName = context.packager.appInfo.productFilename;
  return await notarize({
    appPath: `${appOutDir}/${appName}.app`,
    appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
    appBundleId: process.env.APPLE_BOUDLE_ID,
    teamId: process.env.APPLE_TEAM_ID,
    appleId: process.env.APPLE_ID,
  });
};