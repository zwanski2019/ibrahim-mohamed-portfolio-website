// Performance Monitoring Web Worker
// This runs in a separate thread to reduce main thread work

let performanceData = [];
let isMonitoring = false;

// Listen for messages from main thread
self.addEventListener('message', function(e) {
  const { type, data } = e.data;
  
  switch (type) {
    case 'START_MONITORING':
      startMonitoring();
      break;
    case 'STOP_MONITORING':
      stopMonitoring();
      break;
    case 'ADD_METRIC':
      addMetric(data);
      break;
    case 'GET_REPORT':
      sendReport();
      break;
    default:
      break;
  }
});

function startMonitoring() {
  isMonitoring = true;
  performanceData = [];
  
  // Send initial acknowledgment
  self.postMessage({
    type: 'MONITORING_STARTED',
    timestamp: Date.now()
  });
}

function stopMonitoring() {
  isMonitoring = false;
  
  self.postMessage({
    type: 'MONITORING_STOPPED',
    timestamp: Date.now()
  });
}

function addMetric(metric) {
  if (!isMonitoring) return;
  
  performanceData.push({
    ...metric,
    timestamp: Date.now()
  });
  
  // Keep only last 100 metrics to prevent memory issues
  if (performanceData.length > 100) {
    performanceData = performanceData.slice(-100);
  }
}

function sendReport() {
  const report = {
    metrics: performanceData,
    summary: generateSummary(),
    timestamp: Date.now()
  };
  
  self.postMessage({
    type: 'PERFORMANCE_REPORT',
    data: report
  });
}

function generateSummary() {
  if (performanceData.length === 0) {
    return { total: 0, avgResponseTime: 0 };
  }
  
  const avgResponseTime = performanceData
    .filter(metric => metric.responseTime)
    .reduce((sum, metric) => sum + metric.responseTime, 0) / performanceData.length;
  
  return {
    total: performanceData.length,
    avgResponseTime: avgResponseTime || 0
  };
}
