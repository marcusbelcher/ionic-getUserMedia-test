# Ionic getUserMedia test
Simple Cordova application which tests JavaScript getUserMedia access from inside a web app viewed from a WebView.

## Known issues
### iOS
- Currently Apple has banned getUserMedia access inside of the WKWebView which Cordova uses as the app browser (this also applies to UIWebView). Outside of the native Safari application no getUserMedia access is allowed until Apple rectifies this. An educated gestimate is iOS 13 in ~September 2019...

### Android
- API level 21 is a must for this to function. 
- onPermissionRequest needs to be overrided on the Chromium webview or permissions management within the application (see Ionic and Cordova plugins)

### All platforms
- Serving any getUserMedia code inside of an iframe will fail security permissions. To get around this you need to use the allow="camera" policy. See HTTPS://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy

# Steps
- ionic start getUserMedia blank
- cd getUserMedia
- ionic cordova plugin add cordova-plugin-android-permissions
- npm install --save @ionic-native/android-permissions
- npm install webrtc-adatper --save
- link to adapter in angular.json scripts (link)
- Add AndroidPermissions to app.module.ts provider (link)
- Create camera access code in home.component.ts (link)
- Add android manifiest permissions to config.xml and AndroidManifest.xml (link)
- ionic cordova platform add android
- ionic cordova platform build android
- ionic cordova platform run android
- Captured screenshot and saved as android_permissions.jpg
- Captured screenshot and saved as android_success.jpg

# Misc
You can also see alternative versions of this for Web, React Native, native Android and Cordova in my GitHub repo list: https://github.com/marcusbelcher


