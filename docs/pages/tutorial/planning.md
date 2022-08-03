---
title: First steps
---

import { YesIcon, NoIcon } from '~/ui/components/DocIcons';
import { Terminal } from '~/ui/components/Snippet';

In this tutorial we are going to build an app for iOS, and Android that allows you to share photos with your friends! Of course there are already plenty of apps that let you share photos from your phone, you just can't do it with _your own app_. Let's remedy that.

## Before we get started

- <YesIcon />{' '}

  **This tutorial assumes that you have installed Expo CLI and the Expo Go app**, and that you have initialized and run a simple app successfully. If this is you, please continue reading this page!

- <NoIcon />{' '}

  **If you don't have a "Hello, world!" app running on your machine yet**, please refer back to the ["Installation"](/get-started/installation) and ["Create a new app"](/get-started/create-a-new-app) guides.

## Initialize a new app

Inside your preferred directory for storing your software projects, run the command:

<Terminal cmd={[
'# Create a project named ImageShare',
'$ npx create-expo-app ImageShare',
'',
'# Navigate to the project directory',
'$ cd ImageShare'
]} cmdCopy="npx create-expo-app ImageShare && cd ImageShare" />

This will create a new project for the app that we will call "Image Share". Navigate to the directory and run `expo start` in it, open the project on your device, and open the code in your code editor of choice.

- If you have any trouble with this, please refer back to the ["Create a new app" page](/get-started/create-a-new-app).
- If your app is up and running, it is time to [continue to the next step](/tutorial/text).
