import type { BuildPhaseState } from '../../../../src/components/xcode/settings-detail-view';

export const phasesIosApp: Array<BuildPhaseState> = [
  {
    title: 'Target Dependencies',
    contents: { type: 'Target Dependencies', items: [] },
  },
  {
    title: 'Run Build Tool Plug-ins',
    contents: { type: 'Target Dependencies', items: [] },
  },
  {
    title: 'Compile Sources',
    contents: {
      type: 'Target Dependencies',
      items: [
        'ViewController.swift',
        'AppDelegate.swift',
        'SceneDelegate.swift',
      ],
    },
  },
  {
    title: 'Link Binary With Libraries',
    contents: { type: 'Target Dependencies', items: ['placeholder1'] },
  },
  {
    title: 'Copy Bundle Resources',
    contents: {
      type: 'Target Dependencies',
      items: ['LaunchScreen.storyboard', 'Assets.xcassets', 'Main.storyboard'],
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
    contents: { type: 'Target Dependencies', items: [] },
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
      type: 'Target Dependencies',
      items: [
        'AppDelegate.mm',
        'main.m',
        'ExpoModulesProvider.swift',
        'noop-file.swift',
      ],
    },
  },
  {
    title: 'Link Binary With Libraries',
    contents: { type: 'Target Dependencies', items: ['libPods-compendium.a'] },
  },
  {
    title: 'Copy Bundle Resources',
    contents: {
      type: 'Target Dependencies',
      items: [
        'Expo.plist',
        'Images.xcassets',
        'SplashScreen.storyboard',
        'PrivacyInfo.xcprivacy',
      ],
    },
  },
  {
    title: 'Bundle React Native code and images',
    isOpen: true,
    contents: { type: 'Run Script', shell: '/bin/sh' },
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
