const cacheName = 'planexa'
const cacheUrls = [
	'/noNetwork',
];

this.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName)
			.then((cache) => {
				return cache.addAll(cacheUrls);
			})
			.catch((err) => {
				console.error('smth went wrong with caches.open: ', err);
			})
	);
});


this.addEventListener('fetch', (event) => {
	if (navigator.onLine) {
		if (cacheUrls.find(event.request.url) == undefined) {
			cacheUrls.push(event.request.url);
			caches.open(cacheUrls).then((cache) =>{
				cache.add(event.request.url);
			})
		}
		return fetch(event.request);
	}

	event.respondWith(
		caches
			.match(event.request)
			.then((cachedResponse) => {
				if (cachedResponse) {
					return cachedResponse;
				}
				return fetch(event.request);
			})
			.catch((err) => {
				console.error('smth went wrong with caches.match: ', err);
			})
	);
});