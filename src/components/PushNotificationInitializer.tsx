'use client';

import { useEffect } from 'react';
import { pushService } from '@/services/push.service';

export default function PushNotificationInitializer() {
  useEffect(() => {
    // Register service worker on mount
    pushService.registerServiceWorker();
    
    // We could automatically ask for permission here, 
    // but it's better UX to do it on a user action.
    // For now, let's just ensure it's registered.
  }, []);

  return null;
}
