declare module 'react-native-config' {
  export interface NativeConfig {
    INSTAGRAM_URL: string;
    LINKTREE_URL: string;
    FACEBOOK_URL: string;
    TWITTER_URL: string;
    TIKTOK_URL: string;
    YOUTUBE_URL: string;

    INSTAGRAM_USERNAME: string;
    EMAIL: string;
    APP_NAME: string;
    ADDRESS: string;

    WEB_CLIENT_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
