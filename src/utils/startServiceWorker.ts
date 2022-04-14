/* eslint-disable */

export default function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      // .register('/service-worker.js')
      // .then((registration) => {
      //   console.log('ServiceWorker registration successful with scope: ', registration.scope);
      // })
      // .catch((error: string) => {
      //   console.log('ServiceWorker registration failed: ', error);
      // });
    });
  }

  // .then(registrations => {
  //   registrations.forEach(registration => {
  //     registration.unregister();
  //   })
  // });

  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}
