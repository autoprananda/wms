/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
/* eslint-disable no-undef */
/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
this.addEventListener('fetch', function(event) {
    // it can be empty if you just want to get rid of that error
  })
  
  workbox.core.skipWaiting()
  
  workbox.core.clientsClaim()
  
  self.addEventListener('notificationclick', event => {
    const notification = event.notification
    const action = event.action
  
    if (action === 'explore') {
      clients.openWindow('http://localhost:8080')
      notification.close()
    } else {
      notification.close()
    }
  
    // TODO 5.3 - close all notifications when one is clicked
  })
  
  self.addEventListener('push', event => {
    const eventdata = event.data.json()
  
    // setTimeout(function afterTwoSeconds() {
    //   eventdata = event.data.json()
    // }, 2000)
    console.log(eventdata, 'data push')
  
    const promiseChain = registration
      .getNotifications()
      .then(notifications => {
        console.log(notifications, 'isi cek notif')
        let currentNotification
  
        for (let i = 0; i < notifications.length; i++) {
          if (notifications[i].data.category === eventdata.category) {
            // if (notifications[i].data &&
            // notifications[i].data.userName === userName) {
            currentNotification = notifications[i]
          }
  
          // }
        }
  
        return currentNotification
      })
      .then(currentNotification => {
        let notificationTitle
        const options = {}
        if (currentNotification) {
          // We have an open notification, let's do something with it.
          if (currentNotification.data.newMessageCount === undefined) {
            currentNotification.data.newMessageCount = 1
          }
          const messageCount = currentNotification.data.newMessageCount + 1
          options.body = `You have ${messageCount} new Notifications.`
          options.data = {
            category: currentNotification.data.category,
            newMessageCount: messageCount
          }
          options.actions = currentNotification.actions
          notificationTitle = currentNotification.data.category
  
          // Remember to close the old notification.
          currentNotification.close()
          return registration.showNotification(notificationTitle, options)
        } else {
          let body, title, image, category
          let icon = '/statics/icons/icon-512x512.png'
          if (eventdata.icon) {
            icon = eventdata.icon
          }
          if (eventdata) {
            body = eventdata.body
            title = eventdata.title
            image = eventdata.image
            category = eventdata.category
          } else {
            body = 'Default body'
            title = 'Default title'
            image = null
            category = 'Default category'
          }
          console.log(category, 'kategory')
          const options = {
            body: body,
            image: image,
            badge: '/statics/icons/icon-128x128.png',
            icon: icon,
            vibrate: [100, 50, 100],
            data: {
              category: category,
              newMessageCount: 1
            },
            actions: [
              {
                action: 'explore',
                title: 'Go to the site',
                icon: '/statics/icons/checkmark.png'
              },
              {
                action: 'close',
                title: 'Close the notification',
                icon: '/statics/icons/xmark.png'
              }
            ]
          }
          console.log(options.data.category, 'options kategory')
  
          // event.waitUntil(
          //   self.registration.showNotification(title, options)
          // )
          return registration.showNotification(title, options)
        }
      }) // closing .then
  
    event.waitUntil(promiseChain)
  })
  
  // async function bindeventdata(data) {
  //   eventdata = await data.data.json()
  //   console.log(eventdata, 'async')
  // }
  