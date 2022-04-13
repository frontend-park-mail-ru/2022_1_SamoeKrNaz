const cacheName = 'planexa';
const cacheUrls = [
	'index.html',
];

this.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName)
			.then((cache) => {
				return cache.addAll(cacheUrls);
			})
			.catch((err) => {
				console.error('caches open err: ', err);
			}),
	);
});

const checkUrl = (url) => {
	let flag = false;
	Object.values(cacheUrls).forEach((value) => {
		if (value === url) {
			flag = true;
		}
	});
	return flag;
};


this.addEventListener('fetch', (event) => {
	if (!navigator.onLine) {
		if (checkUrl(event.request.url) && event.request.method === 'GET') {
			cacheUrls.push(event.request.url);
			caches.open(cacheName).then((cache) =>{
				cache.add(event.request.url);
			});
			return fetch(event.request);
		}
	} else {
		event.respondWith(
			caches
				.match(event.request.url)
				.then((cachedResponse) => {
					if (cachedResponse) {
						return cachedResponse;
					} else {
						return fetch(event.request);
					}
				})
				.catch((err) => {
					console.error('caches mathes err: ', err);
				}),
		);
	}
});
