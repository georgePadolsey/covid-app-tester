if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,n,i)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const t={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return a;case"module":return t;default:return e(s)}}))).then((e=>{const s=i(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-4a677df8"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/covid-test/_next/static/chunks/319.d585f193b42c161d3c5c.js",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/chunks/351-f307af064cd57efe6844.js",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/chunks/framework-c93ed74a065331c4bd75.js",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/chunks/main-3865c5fe0f7206f602e6.js",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/chunks/pages/_app-1366f0b764dedfbe495a.js",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/chunks/pages/index-2e5518dc90db49b2c603.js",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/chunks/webpack-9b1fb7dcf30206e029e6.js",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/css/1d802d0415a1d197b3bf.css",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/css/eb108412bfa613a303ad.css",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/mEnzUGybaahhQSfm930gL/_buildManifest.js",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/_next/static/mEnzUGybaahhQSfm930gL/_ssgManifest.js",revision:"mEnzUGybaahhQSfm930gL"},{url:"/covid-test/android-chrome-192x192.png",revision:"4c1a92a539f9fc374f4d770ebab3d5d9"},{url:"/covid-test/android-chrome-512x512.png",revision:"07120e8df5721c43454f2dd047cd6e0a"},{url:"/covid-test/apple-touch-icon.png",revision:"f963e5ed846c5a6c210dc34ca26ea280"},{url:"/covid-test/favicon-16x16.png",revision:"cd230e188686f0b3a011c310a1ce40ef"},{url:"/covid-test/favicon-32x32.png",revision:"8418f9e7fbb3b5bb4fec83441964b575"},{url:"/covid-test/favicon.ico",revision:"983504dd3acd93b353cfcb88987483d6"},{url:"/covid-test/icon-192x192.png",revision:"321f6c3caa6fb8362a6e19bad021ab83"},{url:"/covid-test/icon-256x256.png",revision:"9ba5c80d316f4ce82ee16f6e73fb3e59"},{url:"/covid-test/icon-384x384.png",revision:"a60fb18ae38b5aa2ff975f155aa3b1c4"},{url:"/covid-test/icon-512x512.png",revision:"506e3a30c663d1aedb2090c8a725bedd"},{url:"/covid-test/logo.png",revision:"eb88f6715f81c93d235c00d764ad5c4a"},{url:"/covid-test/manifest.json",revision:"f41c3f83a35143f931f8a9943623041f"},{url:"/covid-test/maskable_icon.png",revision:"168039f74fbb4d60516fa6b62f6fcc55"},{url:"/covid-test/maskable_icon_x128.png",revision:"abf3b64368e9ecfd7d2193a70cc05a73"},{url:"/covid-test/maskable_icon_x192.png",revision:"d49c4969f542893a64435d73a9f247b9"},{url:"/covid-test/maskable_icon_x384.png",revision:"74ac2b0cb3fd41e1cf0b3dfd05bc3da1"},{url:"/covid-test/maskable_icon_x48.png",revision:"e3057c9a2a7b9e6b57ae3bcb0bcbd1c5"},{url:"/covid-test/maskable_icon_x512.png",revision:"aef05951c85a31b87c227588c50a9aa3"},{url:"/covid-test/maskable_icon_x72.png",revision:"05c14d4e11a520d751c354fed449d113"},{url:"/covid-test/maskable_icon_x96.png",revision:"03f30b1dbced09dcb3eeec0fbf341e70"},{url:"/covid-test/mstile-150x150.png",revision:"72f06d73c325b7c68bc52b1077531861"},{url:"/covid-test/safari-pinned-tab.svg",revision:"6358adf71242689b4726cb8ba4bb84fd"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/covid-test",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
