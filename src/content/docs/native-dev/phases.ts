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
    isOpen: true,
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
      items: [{ name: 'placeholder1' }],
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
