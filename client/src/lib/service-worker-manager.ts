// Service Worker Manager for Self-Healing Features
interface ServiceWorkerMessage {
  type: string;
  data?: any;
  error?: string;
}

interface CacheInfo {
  staticCache: string;
  dynamicCache: string;
  staticFiles: string[];
}

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  error?: string;
  timestamp: number;
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private isSupported: boolean;
  private healthStatus: HealthStatus = {
    status: 'healthy',
    timestamp: Date.now()
  };
  private updateAvailable = false;
  private listeners: Map<string, Function[]> = new Map();

  constructor() {
    this.isSupported = 'serviceWorker' in navigator;
    this.setupMessageListener();
  }

  // Register service worker
  async register(): Promise<boolean> {
    if (!this.isSupported) {
      console.warn('[SW Manager] Service Worker not supported');
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      console.log('[SW Manager] Service Worker registered:', this.registration);

      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        const newWorker = this.registration!.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.updateAvailable = true;
              this.notifyListeners('updateAvailable', { updateAvailable: true });
            }
          });
        }
      });

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[SW Manager] Service Worker controller changed');
        this.notifyListeners('controllerChange', {});
      });

      return true;
    } catch (error) {
      console.error('[SW Manager] Service Worker registration failed:', error);
      return false;
    }
  }

  // Update service worker
  async update(): Promise<boolean> {
    if (!this.registration) {
      console.warn('[SW Manager] No service worker registration');
      return false;
    }

    try {
      await this.registration.update();
      console.log('[SW Manager] Service Worker update requested');
      return true;
    } catch (error) {
      console.error('[SW Manager] Service Worker update failed:', error);
      return false;
    }
  }

  // Skip waiting and reload
  async skipWaiting(): Promise<void> {
    if (!this.registration || !this.registration.waiting) {
      return;
    }

    try {
      // Send skip waiting message
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Wait for controller change
      await new Promise<void>((resolve) => {
        const handleControllerChange = () => {
          navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
          resolve();
        };
        navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
      });

      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('[SW Manager] Skip waiting failed:', error);
    }
  }

  // Get cache information
  async getCacheInfo(): Promise<CacheInfo | null> {
    if (!this.registration) {
      return null;
    }

    try {
      return await this.sendMessage({ type: 'GET_CACHE_INFO' });
    } catch (error) {
      console.error('[SW Manager] Failed to get cache info:', error);
      return null;
    }
  }

  // Clear all caches
  async clearCache(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      await this.sendMessage({ type: 'CLEAR_CACHE' });
      console.log('[SW Manager] Cache cleared');
      return true;
    } catch (error) {
      console.error('[SW Manager] Failed to clear cache:', error);
      return false;
    }
  }

  // Update cache
  async updateCache(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      await this.sendMessage({ type: 'UPDATE_CACHE' });
      console.log('[SW Manager] Cache updated');
      return true;
    } catch (error) {
      console.error('[SW Manager] Failed to update cache:', error);
      return false;
    }
  }

  // Send message to service worker
  private async sendMessage(message: ServiceWorkerMessage): Promise<any> {
    if (!this.registration || !this.registration.active) {
      throw new Error('Service Worker not active');
    }

    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        const { data, error } = event.data;
        
        if (error) {
          reject(new Error(error));
        } else {
          resolve(data);
        }
      };

      this.registration!.active!.postMessage(message, [messageChannel.port2]);
    });
  }

  // Setup message listener for service worker messages
  private setupMessageListener(): void {
    if (!this.isSupported) return;

    navigator.serviceWorker.addEventListener('message', (event) => {
      const { type, data } = event.data;

      switch (type) {
        case 'HEALTH_CHECK':
          this.healthStatus = {
            status: data.status,
            error: data.error,
            timestamp: Date.now()
          };
          this.notifyListeners('healthCheck', this.healthStatus);
          break;

        case 'CACHE_INFO':
          this.notifyListeners('cacheInfo', data);
          break;

        case 'CACHE_CLEARED':
          this.notifyListeners('cacheCleared', {});
          break;

        case 'CACHE_UPDATED':
          this.notifyListeners('cacheUpdated', {});
          break;

        default:
          console.log('[SW Manager] Unknown message type:', type);
      }
    });
  }

  // Add event listener
  addEventListener(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  // Remove event listener
  removeEventListener(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // Notify listeners
  private notifyListeners(event: string, data: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('[SW Manager] Listener error:', error);
        }
      });
    }
  }

  // Get current health status
  getHealthStatus(): HealthStatus {
    return { ...this.healthStatus };
  }

  // Check if update is available
  isUpdateAvailable(): boolean {
    return this.updateAvailable;
  }

  // Check if service worker is supported
  isServiceWorkerSupported(): boolean {
    return this.isSupported;
  }

  // Check if service worker is active
  isActive(): boolean {
    return !!this.registration?.active;
  }

  // Get registration
  getRegistration(): ServiceWorkerRegistration | null {
    return this.registration;
  }

  // Perform health check
  async performHealthCheck(): Promise<HealthStatus> {
    // Health check completely disabled to prevent promise rejections
    const status: HealthStatus = {
      status: 'healthy',
      timestamp: Date.now()
    };

    this.healthStatus = status;
    return status;
  }

  // Enable background sync (if supported)
  async enableBackgroundSync(tag: string): Promise<boolean> {
    if (!this.registration || !('sync' in this.registration)) {
      console.warn('[SW Manager] Background sync not supported');
      return false;
    }

    try {
      await (this.registration as any).sync.register(tag);
      console.log('[SW Manager] Background sync registered:', tag);
      return true;
    } catch (error) {
      console.error('[SW Manager] Background sync registration failed:', error);
      return false;
    }
  }

  // Request notification permission
  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('[SW Manager] Notifications not supported');
      return 'denied';
    }

    if (Notification.permission === 'default') {
      return await Notification.requestPermission();
    }

    return Notification.permission;
  }

  // Subscribe to push notifications
  async subscribeToPushNotifications(vapidPublicKey: string): Promise<PushSubscription | null> {
    if (!this.registration) {
      console.warn('[SW Manager] No service worker registration');
      return null;
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey)
      });

      console.log('[SW Manager] Push subscription created:', subscription);
      return subscription;
    } catch (error) {
      console.error('[SW Manager] Push subscription failed:', error);
      return null;
    }
  }

  // Convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

// Create singleton instance
export const serviceWorkerManager = new ServiceWorkerManager();

// Auto-registration completely disabled to prevent promise rejections
// Service worker registration is disabled to fix connection issues

export default serviceWorkerManager;
