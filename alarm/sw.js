'use strict';

const MESSAGE_TYPE = 'time-tools-alarm-notification';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  const data = event.data;

  if (!data || data.type !== MESSAGE_TYPE || data.action !== 'close-all') return;

  event.waitUntil(
    self.registration
      .getNotifications()
      .then((notifications) => {
        notifications.forEach((notification) => notification.close());
      })
      .catch(() => {})
  );
});

self.addEventListener('notificationclick', (event) => {
  const action = event.action === 'snooze' ? 'snooze' : 'stop';
  const data = event.notification.data || {};
  const targetUrl = typeof data.url === 'string' ? data.url : self.registration.scope;

  event.notification.close();

  event.waitUntil((async () => {
    const windowClients = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });

    let targetClient = windowClients.find(
      (client) => client.url.startsWith(self.registration.scope)
    ) || null;

    if (targetClient) {
      const focusedClient = await targetClient.focus();
      if (focusedClient) targetClient = focusedClient;
    } else {
      targetClient = await self.clients.openWindow(targetUrl);
    }

    if (targetClient) {
      targetClient.postMessage({ type: MESSAGE_TYPE, action });
    }
  })());
});
