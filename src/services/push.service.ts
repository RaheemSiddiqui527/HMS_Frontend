import api from './api';

const VAPID_PUBLIC_KEY = 'BFIVcqNZImFe0qMKdjf1PSOQfz5o38c0iVzfTbZcOZ14FHgtxzrjQ_M7AElmMlMXeC9KInVuSavVbb8G2E24rGg';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const pushService = {
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered with scope:', registration.scope);
        return registration;
      } catch (err) {
        console.error('Service Worker registration failed:', err);
      }
    }
  },

  async subscribeUser() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push messaging is not supported');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Check for existing subscription
      let subscription = await registration.pushManager.getSubscription();
      
      if (!subscription) {
        // Subscribe the user
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });
        
        // Send subscription to server
        await api.post('/push/subscribe', {
          subscription,
          userAgent: navigator.userAgent,
          deviceType: 'web'
        });
      }
      
      return subscription;
    } catch (err) {
      console.error('Failed to subscribe user:', err);
    }
  },

  async requestPermission() {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notifications');
      return false;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      await this.subscribeUser();
      return true;
    }
    return false;
  }
};
