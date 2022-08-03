---
title: Development and Production Mode
sidebar_title: Development and Production
---

import Video from '~/components/plugins/Video'
import { Terminal } from '~/ui/components/Snippet';

Your project will always run in one of two modes: development or production. By default, running your project locally with `expo start` runs it in development mode, whereas a published project (via `expo publish`), or any standalone apps, will run in production mode.

Production mode [minifies your code](https://www.imperva.com/learn/performance/minification/) and better represents the performance your app will have on end users' devices. Development mode includes useful warnings and gives you access to tools that make development and debugging easier. Let's look at each of these modes more in detail and learn how you can toggle between them.

## Development Mode

React Native includes some very useful tools for development: remote JavaScript debugging in Chrome, live reload, hot reloading, and an element inspector similar to the beloved inspector that you use in Chrome. If you want to see how to use those tools, see our [debugging documentation](debugging.md). Development mode also performs validations while your app is running to give you warnings if, for example, you're using a deprecated property or if you forgot to pass a required property into a component. This video shows the Element Inspector and Performance Monitor in action, on both Android and iOS simulators:

<Video file="dev-prod/devMode.mp4" />

> **This comes at a cost: your app runs slower in development mode.**
>
> You can toggle it on and off with the Expo CLI, see [production mode](#production-mode). When you switch it, just close and re-open your app for the change to take effect. **Any time you are testing the performance of your app, be sure to disable development mode**.

### Showing the Developer Menu

The Developer Menu gives you access to a host of features that make development and debugging much easier. Invoking it depends on the device where you are running your application:

- Terminal UI: Press <kbd>M</kbd> in the terminal to open the menu on connected iOS and Android
- iOS Device: Shake the device a little bit.
- iOS Simulator: Hit <kbd>Ctrl</kbd> + <kbd>Cmd ⌘</kbd> + <kbd>Z</kbd> on a Mac in the emulator to simulate the shake gesture, or press <kbd>Cmd ⌘</kbd> + <kbd>D</kbd>.
- Android Device: Shake the device vertically a little bit.
- Android Emulator: Either hit <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> or <kbd>Ctrl</kbd> + <kbd>M</kbd> or run `adb shell input keyevent 82` in your terminal window.

## Production Mode

Production mode is most useful for two things:

- Testing your app's performance, as Development slows your app down considerably
- Catching bugs that only show up in production

The easiest way to simulate how your project will run on end users' devices is with the command

<Terminal cmd={['$ expo start --no-dev --minify']} />

Besides running in production mode (which tells the Metro bundler to set the `__DEV__` environment variable to `false`, among a few other things) the `--minify` flag will minify your app, meaning it will get rid of any unnecessary data (comments, formatting, unused code). If you're getting an error or crash in your standalone app, running your project with this command can save you a lot of time in finding the root cause.
