import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.noor.quran.prayertimes',
  appName: 'نور القرآن ومواقيت الصلاة',
  webDir: 'dist',
  server: { androidScheme: 'https' }
};
export default config;
