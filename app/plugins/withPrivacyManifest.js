/**
 * Expo config plugin — copies PrivacyInfo.xcprivacy into the iOS project
 * during prebuild so App Store Connect receives the privacy manifest even
 * if privacyManifests in app.json are incomplete for a given SDK.
 */
const {
  withDangerousMod,
  IOSConfig,
} = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

function withPrivacyManifest(config) {
  return withDangerousMod(config, [
    "ios",
    async (cfg) => {
      const projectRoot = cfg.modRequest.projectRoot;
      const source = path.join(projectRoot, "PrivacyInfo.xcprivacy");
      if (!fs.existsSync(source)) return cfg;

      const iosProjectRoot = cfg.modRequest.platformProjectRoot;
      const projectName = IOSConfig.XcodeUtils.getProjectName(projectRoot);
      const destDir = path.join(iosProjectRoot, projectName);
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(source, path.join(destDir, "PrivacyInfo.xcprivacy"));
      return cfg;
    },
  ]);
}

module.exports = withPrivacyManifest;
