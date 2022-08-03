---
title: Creating Development Builds
---

import { Tab, Tabs } from '~/components/plugins/Tabs';
import { Terminal } from '~/ui/components/Snippet';

## With EAS

### Setting up EAS

You can set up your project to use EAS by running:

<Terminal cmd={['$ eas build:configure']} />

If you have not installed EAS CLI yet, you can do so by running `npm install -g eas-cli`.

This command will create an [**eas.json**](/build/eas-json.md) file.
If you have an existing **eas.json** file that does not have a "development" profile already, edit the file to add one:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```

This profile has two options set:

- Setting `developmentClient` to `true` will create a Debug build, which allows the `expo-dev-client` library to allow you to choose the update to load in your app and provide tools to help you develop.
- Setting `distribution` to "internal" will make a build ready for [internal distribution](/build/internal-distribution).

### Running a build

<Tabs tabs={["For Android", "For iOS"]}>

<Tab>

To create and share a development build with your team, you can run the following:

<Terminal cmd={["$ eas build --profile development --platform android"]} cmdCopy="eas build --profile development --platform android" />

To share the build with your team, direct them to the build page in [Expo Dashboard](https://expo.dev/accounts/[account]/projects/[project]/builds). There, they'll be able to download the app directly on their device.

</Tab>
<Tab>

To allow iOS devices to run a build built for internal distribution, you'll have to register each iOS device you'd like to install your development build on.

You can register an iOS device and install a provisioning profile with the following command:
<Terminal cmd={["$ eas device:create"]} />

Once you've registered all iOS devices you'll want to run your development build on, you can run the following to create a build ready for internal distribution:
<Terminal cmd={["$ eas build --profile development --platform ios"]} />

To share the build with your team, direct them to the build page in [Expo Dashboard](https://expo.dev/accounts/[account]/projects/[project]/builds). There, they'll be able to download the app directly on their device.

Note: If you register any new iOS devices, you'll need create a new development build. Learn more about [internal distribution](/build/internal-distribution).

</Tab>
</Tabs>

## Locally with Xcode and Android Studio

If you are comfortable setting up Xcode, Android Studio, and related dependencies, you can build and distribute your app the same as any other iOS or Android app.

The `expo run` commands will create a new build, install it on to your emulator or device, and start running it.

<Tabs tabs={["For Android", "For iOS (macOS Only)"]}>

<Tab>
<br/>

To build and run on an emulator:

<Terminal cmd={["$ expo run:android"]} />

To build and run on a connected device:

<Terminal cmd={["$ expo run:android -d"]} />

</Tab>
<Tab>
<br/>

To build and run on a simulator:

<Terminal cmd={["$ expo run:ios"]} />

To build and run on a connected device:

<Terminal cmd={["$ expo run:ios -d"]} />

</Tab>

</Tabs>
