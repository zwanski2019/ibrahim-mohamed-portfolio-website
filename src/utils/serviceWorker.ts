// Service Worker registration and management

const SW_URL = '/sw.js';
const SW_SCOPE = '/';

interface ServiceWorkerOptions {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private options: ServiceWorkerOptions;

  constructor(options: ServiceWorkerOptions = {}) {
    this.options = options;
  }

  public async register(): Promise<ServiceWorkerRegistration | null> {
    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return null;
    }

    // Don't register in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Service Worker registration skipped in development');
      return null;
    }

    try {
      console.log('Registering Service Worker...');
      
      this.registration = await navigator.serviceWorker.register(SW_URL, {
        scope: SW_SCOPE,
        updateViaCache: 'none' // Always check for updates
      });

      console.log('Service Worker registered successfully:', this.registration);

      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        this.handleUpdate();
      });

      // Check for existing waiting worker
      if (this.registration.waiting) {
        this.handleUpdate();
      }

      // Check for updates every 30 minutes
      setInterval(() => {
        this.checkForUpdates();
      }, 30 * 60 * 1000);

      this.options.onSuccess?.(this.registration);
      return this.registration;

    } catch (error) {
      console.error('Service Worker registration failed:', error);
      this.options.onError?.(error as Error);
      return null;
    }
  }

  public async unregister(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const result = await this.registration.unregister();
      console.log('Service Worker unregistered:', result);
      this.registration = null;
      return result;
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
      return false;
    }
  }

  public async update(): Promise<void> {
    if (!this.registration) {
      return;
    }

    try {
      await this.registration.update();
      console.log('Service Worker update check completed');
    } catch (error) {
      console.error('Service Worker update failed:', error);
    }
  }

  public async skipWaiting(): Promise<void> {
    if (!this.registration?.waiting) {
      return;
    }

    // Send message to waiting worker to skip waiting
    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    
    // Reload the page to activate the new worker
    window.location.reload();
  }

  private handleUpdate(): void {
    if (!this.registration) return;

    const newWorker = this.registration.installing || this.registration.waiting;
    if (!newWorker) return;

    console.log('New Service Worker available');

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New worker is installed and ready
        this.options.onUpdate?.(this.registration!);
      }
    });
  }

  private async checkForUpdates(): Promise<void> {
    if (!this.registration) return;

    try {
      await this.registration.update();
    } catch (error) {
      console.error('Failed to check for Service Worker updates:', error);
    }
  }

  public getRegistration(): ServiceWorkerRegistration | null {
    return this.registration;
  }

  public isSupported(): boolean {
    return 'serviceWorker' in navigator;
  }

  public isRegistered(): boolean {
    return this.registration !== null;
  }
}

// Cache management utilities
export class CacheManager {
  public static async clearAllCaches(): Promise<void> {
    if (!('caches' in window)) return;

    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    } catch (error) {
      console.error('Failed to clear caches:', error);
    }
  }

  public static async getCacheSize(): Promise<number> {
    if (!('caches' in window)) return 0;

    try {
      const cacheNames = await caches.keys();
      let totalSize = 0;

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        }
      }

      return totalSize;
    } catch (error) {
      console.error('Failed to calculate cache size:', error);
      return 0;
    }
  }

  public static formatCacheSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }
}

// Background sync utilities
export class BackgroundSyncManager {
  public static async registerSync(tag: string): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      console.log('Background Sync not supported');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      // Background sync support check
      if ('sync' in registration) {
        await (registration as any).sync.register(tag);
        console.log(`Background sync registered: ${tag}`);
      }
    } catch (error) {
      console.error('Background sync registration failed:', error);
    }
  }

  public static async storeDataForSync(key: string, data: any): Promise<void> {
    try {
      localStorage.setItem(`sync_${key}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Failed to store data for sync:', error);
    }
  }

  public static getStoredSyncData(key: string): any | null {
    try {
      const stored = localStorage.getItem(`sync_${key}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to retrieve sync data:', error);
      return null;
    }
  }

  public static removeStoredSyncData(key: string): void {
    try {
      localStorage.removeItem(`sync_${key}`);
    } catch (error) {
      console.error('Failed to remove sync data:', error);
    }
  }
}

// Create singleton instance
export const serviceWorkerManager = new ServiceWorkerManager({
  onUpdate: (registration) => {
    console.log('Service Worker update available');
    
    // Show update notification to user
    const updateAvailable = new CustomEvent('sw-update-available', {
      detail: { registration }
    });
    window.dispatchEvent(updateAvailable);
  },
  onSuccess: (registration) => {
    console.log('Service Worker registered successfully');
  },
  onError: (error) => {
    console.error('Service Worker registration failed:', error);
  }
});

// Auto-register service worker when module loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    serviceWorkerManager.register();
  });
}