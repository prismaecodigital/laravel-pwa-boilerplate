import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        const updateSW = registerSW({
            onNeedRefresh() {
                updateSW(true);
            },
            onOfflineReady() {
                // Show a notification that the app is ready for offline use
                console.log('App is ready for offline use.');
            },
            onRegisteredSW(_swUrl, registration) {
                if (!registration) return;

                registration.addEventListener('updatefound', () => {
                    const installing = registration.installing;
                    if (!installing) return;

                    installing.addEventListener('statechange', () => {
                        if (installing.state === 'activated') {
                            if (navigator.serviceWorker.controller) {
                                window.location.reload();
                            }
                        }
                    });
                });
            },
            // Enable immediate claiming to ensure the service worker
            // takes control of the page immediately
            immediate: true
        });
    }
}