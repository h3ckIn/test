import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.optical.lock',
  appName: '光学解锁',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
