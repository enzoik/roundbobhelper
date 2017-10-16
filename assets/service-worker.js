// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// 'use strict';

var SWversion = 'v9';
var SWdebug = false;
var dataCacheName = 'roundbobData-' + SWversion;
var cacheName = 'roundbobPWA-' + SWversion;
var filesToCache = [
  '',
  'source.min.js',
  // 'source.min.js.map',
  'css/bootstrap.min.css',
  'css/bootstrap-theme.min.css',
  'css/fontello.css',
  'css/style.css'
];

self.addEventListener('install', function(e) {
  if(SWdebug) console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      if(SWdebug) console.log('[ServiceWorker] Caching app shell');
      if(SWdebug) console.log('[SWversion]', SWversion);
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  if(SWdebug) console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          if(SWdebug) console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * The code below essentially lets you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if(SWdebug) console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
