const offlineUrl = "./index.html";
const logoUrl = "./img/logo/logo.png"
this.addEventListener("install", event => {
  event.waitUntil(
    caches.open("offline-cache").then(function(cache) {
      return cache.addAll([offlineUrl, logoUrl]);
    })
  );
});
this.addEventListener("fetch", event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (
    event.request.mode === "navigate" ||
    (event.request.method === "GET" &&
      event.request.headers.get("accept").includes("text/html"))
  ) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        // Return the offline page
        return caches.match(offlineUrl);
      })
    );
  } else {
    // Respond with everything else if we can
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});
