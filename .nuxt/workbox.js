async function register() {
  if (!'serviceWorker' in navigator) {
    throw new Error('serviceWorker is not supported in current browser!')
  }

  const { Workbox } = await import('workbox-cdn/workbox/workbox-window.prod.es5.mjs')

  const workbox = new Workbox('/random-jobseeker/sw.js', {
    scope: '/random-jobseeker/'
  })

  await workbox.register()

  return workbox
}

window.$workbox = register()
  .catch(error => {})
