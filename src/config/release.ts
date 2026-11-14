export interface ReleaseChangelog {
  newFeatures: string[];
  improvements: string[];
  bugFixes: string[];
}

export interface StreamXRelease {
  appName: string;
  version: string;
  releaseDate: string;
  fileSize: string;
  androidCompatibility: string;
  architecture: string;
  apkFileName: string;
  /**
   * Direct download URL for the StreamX APK.
   * Default placeholder points to `/downloads/streamx-latest.apk`.
   * Replace this in `/public/release-manifest.json` (runtime) or here (compile-time)
   * with a hosted APK file path or external release asset URL.
   */
  downloadUrl: string;
  /**
   * Set to false once the real APK binary is uploaded to `downloadUrl`.
   */
  isPlaceholderBuild: boolean;
  whatsNew: ReleaseChangelog;
}

export const DEFAULT_RELEASE: StreamXRelease = {
  appName: 'StreamX',
  version: '1.1.0',
  releaseDate: 'November 14, 2026',
  fileSize: '42.8 MB',
  androidCompatibility: 'Android 8.0+ (API 26+)',
  architecture: 'Universal (arm64-v8a / armeabi-v7a)',
  apkFileName: 'Streamx apk.apk',
  downloadUrl: 'https://www.mediafire.com/file/wap7o1wxly0kxp9/Streamx+apk.apk/file',
  isPlaceholderBuild: false,
  whatsNew: {
    newFeatures: [
      'Added 4K Ultra HD video quality support with sharper adaptive playback.',
      'Integrated EAX 4.1 surround sound audio support for richer 4.1-channel spatial output.',
      'Added smoother UI transitions, fluid screen animations, and responsive player gestures.',
    ],
    improvements: [
      'Upgraded player audio track settings for EAX 4.1 surround sound compatibility.',
      'Smoothed scrolling physics across movie and TV show catalogs on Android phones.',
      'Refined 4K stream buffering and multi-source switching speed.',
    ],
    bugFixes: [
      'Resolved an issue where external subtitle tracks could reset when switching streaming sources.',
      'Fixed occasional playback state loss after rotating between portrait and landscape modes.',
      'Corrected audio channel balance edge cases on wired and Bluetooth audio devices.',
    ],
  },
};

export const EXTENSION_REPOSITORY = {
  name: 'Phisher98 Extensions',
  officialUrl: 'https://github.com/phisher98/cloudstream-extensions-phisher',
  manifestUrl:
    'https://raw.githubusercontent.com/phisher98/cloudstream-extensions-phisher/refs/heads/builds/repo.json',
} as const;
