// قمنا بتحديث رقم الإصدار لإجبار المتصفح على تحديث الكاش
const CACHE_NAME = 'lira24-v7-fix';

const urlsToCache = [
  './index.html',
  './manifest.json',
  // لاحظ: قمنا بتحديث أسماء الأيقونات هنا لتطابق الموجود في مجلد assets
  './assets/icon-192.png',
  './assets/icon-512.png',
  // تأكد أن هذه الصور موجودة، وإذا لم تكن موجودة احذف هذين السطرين ليعمل التطبيق
  './assets/screenshot1.png',
  './assets/screenshot2.png',
  
  // المكتبات الخارجية
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://html2canvas.hertzen.com/dist/html2canvas.min.js',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // استراتيجية Cache First للملفات الثابتة
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
