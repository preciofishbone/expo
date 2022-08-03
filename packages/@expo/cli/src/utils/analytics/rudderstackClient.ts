import RudderAnalytics from '@expo/rudder-sdk-node';
import * as ciInfo from 'ci-info';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

import UserSettings from '../../api/user/UserSettings';
import { getUserAsync } from '../../api/user/user';
import { env } from '../env';

const PLATFORM_TO_ANALYTICS_PLATFORM: { [platform: string]: string } = {
  darwin: 'Mac',
  win32: 'Windows',
  linux: 'Linux',
};

let client: RudderAnalytics | null = null;
let identified = false;
let identifyData: {
  userId: string;
  deviceId: string;
  traits: Record<string, any>;
} | null = null;

function getClient(): RudderAnalytics {
  if (client) {
    return client;
  }

  client = new RudderAnalytics(
    env.EXPO_STAGING || env.EXPO_LOCAL
      ? '24TKICqYKilXM480mA7ktgVDdea'
      : '24TKR7CQAaGgIrLTgu3Fp4OdOkI', // expo unified
    'https://cdp.expo.dev/v1/batch',
    {
      flushInterval: 300,
    }
  );

  // Install flush on exit...
  process.on('SIGINT', () => client?.flush?.());
  process.on('SIGTERM', () => client?.flush?.());

  return client;
}

export async function setUserDataAsync(userId: string, traits: Record<string, any>): Promise<void> {
  if (env.EXPO_NO_TELEMETRY) {
    return;
  }

  const deviceId = await UserSettings.getAnonymousIdentifierAsync();

  identifyData = {
    userId,
    deviceId,
    traits,
  };

  ensureIdentified();
}

type Event =
  | 'action'
  | 'Open Url on Device'
  | 'Start Project'
  | 'Serve Manifest'
  | 'Serve Expo Updates Manifest'
  | 'dev client start command'
  | 'dev client run command';

export function logEvent(event: Event, properties: Record<string, any> = {}): void {
  if (env.EXPO_NO_TELEMETRY) {
    return;
  }

  ensureIdentified();

  const { userId, deviceId } = identifyData ?? {};
  const commonEventProperties = { source_version: process.env.__EXPO_VERSION, source: 'expo' };

  const identity = { userId: userId ?? undefined, anonymousId: deviceId ?? uuidv4() };
  getClient().track({
    event,
    properties: { ...properties, ...commonEventProperties },
    ...identity,
    context: getContext(),
  });
}

/** Log event while ensuring the user is identified. */
export async function logEventAsync(
  event: Event,
  properties: Record<string, any> = {}
): Promise<void> {
  if (env.EXPO_NO_TELEMETRY) {
    return;
  }

  await getUserAsync().catch(() => null);
  ensureIdentified();

  const { userId, deviceId } = identifyData ?? {};
  const commonEventProperties = { source_version: process.env.__EXPO_VERSION, source: 'expo' };

  const identity = { userId: userId ?? undefined, anonymousId: deviceId ?? uuidv4() };
  getClient().track({
    event,
    properties: { ...properties, ...commonEventProperties },
    ...identity,
    context: getContext(),
  });
}

function ensureIdentified(): void {
  if (env.EXPO_NO_TELEMETRY || identified || !identifyData) {
    return;
  }

  getClient().identify({
    userId: identifyData.userId,
    anonymousId: identifyData.deviceId,
    traits: identifyData.traits,
  });
  identified = true;
}

/** Exposed for testing only */
export function getContext(): Record<string, any> {
  const platform = PLATFORM_TO_ANALYTICS_PLATFORM[os.platform()] || os.platform();
  return {
    os: { name: platform, version: os.release() },
    device: { type: platform, model: platform },
    app: { name: 'expo', version: process.env.__EXPO_VERSION },
    ci: ciInfo.isCI ? { name: ciInfo.name, isPr: ciInfo.isPR } : undefined,
  };
}
