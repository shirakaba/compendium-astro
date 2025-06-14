import type { BuildPhaseState } from '../../../../src/components/xcode/settings-detail-view';

export const phasesIosApp: Array<BuildPhaseState> = [
  {
    title: 'Target Dependencies',
    contents: { type: 'Target Dependencies', items: [] },
  },
  {
    title: 'Run Build Tool Plug-ins',
    contents: { type: 'Run Build Tool Plug-ins', items: [] },
  },
  {
    title: 'Compile Sources',
    contents: {
      type: 'Compile Sources',
      items: [
        { name: 'ViewController.swift' },
        { name: 'AppDelegate.swift' },
        { name: 'SceneDelegate.swift' },
      ],
    },
  },
  {
    title: 'Link Binary With Libraries',
    contents: {
      type: 'Link Binary With Libraries',
      items: [{ name: 'libPods-compendium.a' }],
    },
  },
  {
    title: 'Copy Bundle Resources',
    contents: {
      type: 'Copy Bundle Resources',
      items: [
        { name: 'LaunchScreen.storyboard' },
        { name: 'Assets.xcassets' },
        { name: 'Main.storyboard' },
      ],
    },
  },
];

export const phasesExpoApp: Array<BuildPhaseState> = [
  {
    title: 'Target Dependencies',
    contents: { type: 'Target Dependencies', items: [] },
  },
  {
    title: 'Run Build Tool Plug-ins',
    contents: { type: 'Run Build Tool Plug-ins', items: [] },
  },
  {
    title: '[CP] Check Pods Manifest.lock',
    contents: { type: 'Target Dependencies', items: [] },
  },
  {
    title: '[Expo] Configure project',
    contents: { type: 'Target Dependencies', items: [] },
  },
  {
    title: 'Compile Sources',
    contents: {
      type: 'Compile Sources',
      items: [
        { name: 'AppDelegate.mm' },
        { name: 'main.m' },
        { name: 'ExpoModulesProvider.swift' },
        { name: 'noop-file.swift' },
      ],
    },
  },
  {
    title: 'Link Binary With Libraries',
    contents: {
      type: 'Link Binary With Libraries',
      items: [{ name: 'libPods-compendium.a' }],
    },
  },
  {
    title: 'Copy Bundle Resources',
    contents: {
      type: 'Copy Bundle Resources',
      items: [
        { name: 'Expo.plist' },
        { name: 'Images.xcassets' },
        { name: 'SplashScreen.storyboard' },
        { name: 'PrivacyInfo.xcprivacy' },
      ],
    },
  },
  {
    title: 'Bundle React Native code and images',
    contents: {
      type: 'Run Script',
      shell: '/bin/sh',
      shellScript: `
if [[ -f "$PODS_ROOT/../.xcode.env" ]]; then
  source "$PODS_ROOT/../.xcode.env"
fi
if [[ -f "$PODS_ROOT/../.xcode.env.local" ]]; then
  source "$PODS_ROOT/../.xcode.env.local"
fi

# The project root by default is one level up from the ios directory
export PROJECT_ROOT="$PROJECT_DIR"/..

if [[ "$CONFIGURATION" = *Debug* ]]; then
  export SKIP_BUNDLING=1
fi
if [[ -z "$ENTRY_FILE" ]]; then
  # Set the entry JS file using the bundler's entry resolution.
  export ENTRY_FILE="$("$NODE_BINARY" -e "require('expo/scripts/resolveAppEntry')" "$PROJECT_ROOT" ios absolute | tail -n 1)"
fi

if [[ -z "$CLI_PATH" ]]; then
  # Use Expo CLI
  export CLI_PATH="$("$NODE_BINARY" --print "require.resolve('@expo/cli', { paths: [require.resolve('expo/package.json')] })")"
fi
if [[ -z "$BUNDLE_COMMAND" ]]; then
  # Default Expo CLI command for bundling
  export BUNDLE_COMMAND="export:embed"
fi

# Source .xcode.env.updates if it exists to allow
# SKIP_BUNDLING to be unset if needed
if [[ -f "$PODS_ROOT/../.xcode.env.updates" ]]; then
  source "$PODS_ROOT/../.xcode.env.updates"
fi
# Source local changes to allow overrides
# if needed
if [[ -f "$PODS_ROOT/../.xcode.env.local" ]]; then
  source "$PODS_ROOT/../.xcode.env.local"
fi

\`"$NODE_BINARY" --print "require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/react-native-xcode.sh'"\`
`.trim(),
    },
  },
  {
    title: '[CP] Copy Pods Resources',
    contents: { type: 'Target Dependencies', items: [] },
  },
  {
    title: '[CP] Embed Pods Frameworks',
    contents: { type: 'Target Dependencies', items: [] },
  },
];
