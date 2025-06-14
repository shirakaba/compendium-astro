---
title: Codesigning
tableOfContents: false
sidebar:
  label: Codesigning
---

# Identities

```sh
security find-identity -v
```

- darwin
  - development
    - `Apple Development`
  - distribution
    - application
      - `Developer ID Application`
    - installer
      - `Developer ID Installer`
- mas
  - development
    - `Mac Developer`
  - distribution
    - application
      - `Apple Distribution`
      - `3rd Party Mac Developer Application`
    - installer
      - `3rd Party Mac Developer Installer`

# Provisioning profiles

- https://github.com/dotnet/macios/issues/20771
- https://github.com/dotnet/macios-devtools/commit/ce8955d73976b9ea5bcff2a390d5a6ffbfae49a9

```
# Xcode >= 16.x
~/Library/Developer/Xcode/UserData/Provisioning Profiles

# Xcode < 16.x
~/Library/MobileDevice/Provisioning Profiles
```
