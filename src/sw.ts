const cacheName = 'planexa';
const cacheUrls = [
	'index.html',
];

this.addEventListener('install', (event) => {
// @ts-expect-error ts-migrate(2339) FIXME: Property 'waitUntil' does not exist on type 'Event... Remove this comment to see the full error message
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
	// @ts-expect-error ts-migrate(2550) FIXME: Property 'values' does not exist on type 'ObjectCo... Remove this comment to see the full error message
	Object.values(cacheUrls).forEach((value) => {
		if (value === url) {
			flag = true;
		}
	});
	return flag;
};


this.addEventListener('fetch', (event) => {
	if (!navigator.onLine) {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'request' does not exist on type 'Event'.
		if (checkUrl(event.request.url) && event.request.method === 'GET') {
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'request' does not exist on type 'Event'.
			cacheUrls.push(event.request.url);
			caches.open(cacheName).then((cache) =>{
				// @ts-expect-error ts-migrate(2339) FIXME: Property 'request' does not exist on type 'Event'.
				cache.add(event.request.url);
			});
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'request' does not exist on type 'Event'.
			return fetch(event.request);
		}
	} else {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'respondWith' does not exist on type 'Eve... Remove this comment to see the full error message
		event.respondWith(
			caches
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'request' does not exist on type 'Event'.
				.match(event.request.url)
				.then((cachedResponse) => {
					if (cachedResponse) {
						return cachedResponse;
					} else {
						// @ts-expect-error ts-migrate(2339) FIXME: Property 'request' does not exist on type 'Event'.
						return fetch(event.request);
					}
				})
				.catch((err) => {
					console.error('caches mathes err: ', err);
				}),
		);
	}
});
