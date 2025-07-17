// Web Worker utilities for heavy computations

export class WebWorkerPool {
  private workers: Worker[] = [];
  private taskQueue: Array<{
    task: any;
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];
  private maxWorkers: number;
  private currentWorkerIndex = 0;

  constructor(workerScript: string, maxWorkers = navigator.hardwareConcurrency || 4) {
    this.maxWorkers = Math.min(maxWorkers, 8); // Cap at 8 workers
    this.initializeWorkers(workerScript);
  }

  private initializeWorkers(workerScript: string) {
    for (let i = 0; i < this.maxWorkers; i++) {
      try {
        const worker = new Worker(workerScript);
        this.workers.push(worker);
      } catch (error) {
        console.warn('Web Worker not supported or failed to initialize:', error);
        break;
      }
    }
  }

  execute<T = any>(task: any): Promise<T> {
    return new Promise((resolve, reject) => {
      if (this.workers.length === 0) {
        // Fallback to main thread if workers are not available
        resolve(this.fallbackExecution(task));
        return;
      }

      const worker = this.workers[this.currentWorkerIndex];
      this.currentWorkerIndex = (this.currentWorkerIndex + 1) % this.workers.length;

      const handleMessage = (event: MessageEvent) => {
        worker.removeEventListener('message', handleMessage);
        worker.removeEventListener('error', handleError);
        resolve(event.data);
      };

      const handleError = (error: ErrorEvent) => {
        worker.removeEventListener('message', handleMessage);
        worker.removeEventListener('error', handleError);
        reject(error);
      };

      worker.addEventListener('message', handleMessage);
      worker.addEventListener('error', handleError);
      worker.postMessage(task);
    });
  }

  private fallbackExecution(task: any): any {
    // Implement fallback logic for when Web Workers are not available
    console.warn('Executing task on main thread as fallback');
    return task;
  }

  terminate() {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
  }
}

// Search indexing worker
export const createSearchWorker = () => {
  const workerCode = `
    self.onmessage = function(e) {
      const { type, data } = e.data;
      
      if (type === 'INDEX_CONTENT') {
        // Process and index content
        const indexed = data.map(item => ({
          ...item,
          searchTokens: tokenize(item.content || item.title || ''),
          timestamp: Date.now()
        }));
        
        self.postMessage({ type: 'INDEX_COMPLETE', data: indexed });
      }
    };
    
    function tokenize(text) {
      return text.toLowerCase()
        .replace(/[^a-z0-9\\s]/g, '')
        .split(/\\s+/)
        .filter(token => token.length > 2);
    }
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return URL.createObjectURL(blob);
};

// Performance monitoring worker
export const createPerformanceWorker = () => {
  const workerCode = `
    let performanceData = [];
    
    self.onmessage = function(e) {
      const { type, data } = e.data;
      
      if (type === 'LOG_PERFORMANCE') {
        performanceData.push({
          ...data,
          timestamp: Date.now()
        });
        
        // Send aggregated data every 10 entries
        if (performanceData.length >= 10) {
          self.postMessage({
            type: 'PERFORMANCE_BATCH',
            data: performanceData.splice(0, 10)
          });
        }
      }
      
      if (type === 'GET_PERFORMANCE_DATA') {
        self.postMessage({
          type: 'PERFORMANCE_DATA',
          data: performanceData
        });
      }
    };
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return URL.createObjectURL(blob);
};

// Analytics worker
export const createAnalyticsWorker = () => {
  const workerCode = `
    let analyticsQueue = [];
    
    self.onmessage = function(e) {
      const { type, data } = e.data;
      
      if (type === 'TRACK_EVENT') {
        analyticsQueue.push({
          ...data,
          timestamp: Date.now(),
          sessionId: data.sessionId || 'anonymous'
        });
        
        // Batch send analytics data
        if (analyticsQueue.length >= 5) {
          self.postMessage({
            type: 'ANALYTICS_BATCH',
            data: analyticsQueue.splice(0, 5)
          });
        }
      }
      
      if (type === 'FLUSH_ANALYTICS') {
        if (analyticsQueue.length > 0) {
          self.postMessage({
            type: 'ANALYTICS_BATCH',
            data: analyticsQueue.splice(0)
          });
        }
      }
    };
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return URL.createObjectURL(blob);
};