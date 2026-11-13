StreamX APK Hosting Folder
==========================

To publish a new StreamX APK without rebuilding the website:

1. Upload your signed APK file into this folder as:
   streamx-latest.apk
   (served at /downloads/streamx-latest.apk)

2. Open /release-manifest.json in your deployed root (or /public/release-manifest.json before building) and update:
   - "version": "1.4.1"
   - "releaseDate": "Month DD, YYYY"
   - "fileSize": "XX.X MB"
   - "downloadUrl": "/downloads/streamx-latest.apk" (or an external CDN/GitHub Releases URL)
   - "isPlaceholderBuild": false
   - "whatsNew": { ... }

The website fetches /release-manifest.json at runtime, so your new version metadata and APK link appear immediately without recompiling the frontend bundle.
